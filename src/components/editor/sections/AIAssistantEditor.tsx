"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useAuthContext } from "@/components/auth/AuthProvider";
import { useResumeStore } from "@/store/useResumeStore";
import { createClient } from "@/lib/supabase/client";
import {
  ExperienceData,
  SkillsData,
  SummaryData,
  type SkillCategory,
} from "@/types/resume";
import { generateId } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Sparkles,
  Target,
  Wand2,
} from "lucide-react";

type AIAction =
  | "tailor-summary"
  | "rewrite-experience"
  | "suggest-skills"
  | "ats-review";

interface ResumeSnapshot {
  header: {
    fullName: string;
    title: string;
  };
  summary: string;
  experience: Array<{
    itemId: string;
    title: string;
    company: string;
    bullets: string[];
  }>;
  skills: Array<{
    category: string;
    skills: string[];
  }>;
}

interface TailorSummaryResponse {
  summary: string;
  rationale: string[];
  keywordsUsed: string[];
}

interface RewriteExperienceResponse {
  items: Array<{
    itemId: string;
    bullets: string[];
  }>;
  notes: string[];
  keywordsUsed: string[];
}

interface SuggestSkillsResponse {
  categories: Array<{
    name: string;
    skills: string[];
  }>;
  missingKeywords: string[];
  notes: string[];
}

interface AtsReviewResponse {
  matchScore: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  strengths: string[];
  gaps: string[];
  quickWins: string[];
}

const ROLE_STORAGE_KEY = "resumeable_ai_target_role";
const JD_STORAGE_KEY = "resumeable_ai_job_description";

function normalizeValue(value: string): string {
  return value.trim().toLowerCase();
}

function mergeUniqueStrings(existing: string[], incoming: string[]): string[] {
  const seen = new Set(existing.map((item) => normalizeValue(item)));
  const merged = [...existing];

  for (const candidate of incoming) {
    const normalized = normalizeValue(candidate);
    if (!normalized || seen.has(normalized)) continue;
    seen.add(normalized);
    merged.push(candidate.trim());
  }

  return merged;
}

export function AIAssistantEditor() {
  const { user } = useAuthContext();
  const {
    resume,
    updateSectionData,
    updateExperienceItem,
  } = useResumeStore();

  const [targetRole, setTargetRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loadingAction, setLoadingAction] = useState<AIAction | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const [summarySuggestion, setSummarySuggestion] = useState<TailorSummaryResponse | null>(null);
  const [experienceSuggestion, setExperienceSuggestion] = useState<RewriteExperienceResponse | null>(null);
  const [skillsSuggestion, setSkillsSuggestion] = useState<SuggestSkillsResponse | null>(null);
  const [atsReview, setAtsReview] = useState<AtsReviewResponse | null>(null);

  useEffect(() => {
    const storedRole = window.localStorage.getItem(ROLE_STORAGE_KEY) ?? "";
    const storedDescription = window.localStorage.getItem(JD_STORAGE_KEY) ?? "";
    setTargetRole(storedRole);
    setJobDescription(storedDescription);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(ROLE_STORAGE_KEY, targetRole);
  }, [targetRole]);

  useEffect(() => {
    window.localStorage.setItem(JD_STORAGE_KEY, jobDescription);
  }, [jobDescription]);

  const resumeSnapshot = useMemo<ResumeSnapshot | null>(() => {
    if (!resume) return null;

    const summaryData = resume.sectionData.summary as SummaryData | undefined;
    const experienceData = resume.sectionData.experience as ExperienceData | undefined;
    const skillsData = resume.sectionData.skills as SkillsData | undefined;

    const headerData = resume.sectionData.header as {
      fullName?: string;
      title?: string;
    } | undefined;

    return {
      header: {
        fullName: headerData?.fullName ?? "",
        title: headerData?.title ?? "",
      },
      summary: summaryData?.content ?? "",
      experience: (experienceData?.items ?? []).map((item) => ({
        itemId: item.id,
        title: item.title,
        company: item.company,
        bullets: item.bullets.map((bullet) => bullet.content),
      })),
      skills: (skillsData?.categories ?? []).map((category) => ({
        category: category.name,
        skills: category.skills,
      })),
    };
  }, [resume]);

  const applySummarySuggestion = () => {
    if (!summarySuggestion?.summary) return;

    updateSectionData<SummaryData>("summary", {
      content: summarySuggestion.summary,
    });
    setNotice("Summary updated from AI suggestion.");
  };

  const applyExperienceSuggestion = () => {
    if (!resume || !experienceSuggestion) return;

    const experienceData = resume.sectionData.experience as ExperienceData | undefined;
    if (!experienceData) {
      setError("Experience section is missing.");
      return;
    }

    for (const suggestedItem of experienceSuggestion.items) {
      const existingItem = experienceData.items.find((item) => item.id === suggestedItem.itemId);
      if (!existingItem) continue;

      const bullets = suggestedItem.bullets.map((content, index) => ({
        id: existingItem.bullets[index]?.id ?? `bullet-${generateId()}`,
        content,
      }));

      updateExperienceItem(existingItem.id, { bullets });
    }

    setNotice("Experience bullets updated.");
  };

  const applySkillsSuggestion = () => {
    if (!resume || !skillsSuggestion) return;

    const skillsData = resume.sectionData.skills as SkillsData | undefined;
    if (!skillsData) {
      setError("Skills section is missing.");
      return;
    }

    const mergedCategories: SkillCategory[] = skillsData.categories.map((category) => ({
      id: category.id,
      name: category.name,
      skills: [...category.skills],
    }));

    for (const suggestedCategory of skillsSuggestion.categories) {
      const existingCategory = mergedCategories.find(
        (category) => normalizeValue(category.name) === normalizeValue(suggestedCategory.name)
      );

      if (existingCategory) {
        existingCategory.skills = mergeUniqueStrings(
          existingCategory.skills,
          suggestedCategory.skills
        );
        continue;
      }

      mergedCategories.push({
        id: `cat-${generateId()}`,
        name: suggestedCategory.name,
        skills: mergeUniqueStrings([], suggestedCategory.skills),
      });
    }

    updateSectionData<SkillsData>("skills", {
      categories: mergedCategories,
    });
    setNotice("Skills suggestions added.");
  };

  const runAction = async (action: AIAction) => {
    if (!resumeSnapshot) {
      setError("Resume data is not loaded yet.");
      return;
    }

    if (!targetRole.trim() && !jobDescription.trim()) {
      setError("Add a target role or a job description before running AI tools.");
      return;
    }

    if (jobDescription.trim().length < 40) {
      setError("Paste more of the job description for better, more accurate results.");
      return;
    }

    setLoadingAction(action);
    setError(null);
    setNotice(null);

    try {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const response = await fetch("/api/ai/resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(session?.access_token
            ? { Authorization: `Bearer ${session.access_token}` }
            : {}),
        },
        body: JSON.stringify({
          action,
          targetRole: targetRole.trim(),
          jobDescription: jobDescription.trim(),
          resume: resumeSnapshot,
        }),
      });

      const payload = (await response.json()) as {
        data?: unknown;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(payload.error || "AI request failed.");
      }

      if (action === "tailor-summary") {
        setSummarySuggestion(payload.data as TailorSummaryResponse);
      } else if (action === "rewrite-experience") {
        setExperienceSuggestion(payload.data as RewriteExperienceResponse);
      } else if (action === "suggest-skills") {
        setSkillsSuggestion(payload.data as SuggestSkillsResponse);
      } else if (action === "ats-review") {
        setAtsReview(payload.data as AtsReviewResponse);
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoadingAction(null);
    }
  };

  if (!resume) {
    return null;
  }

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">AI Assistant</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Sign in to unlock AI summary tailoring, bullet rewrites, skill suggestions, and ATS checks.
          </p>
          <Link href="/login">
            <Button>Sign in to use AI</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-5">
      <Card className="border-emerald-200 bg-emerald-50/40">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-700" />
            AI Resume Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="target-role">Target role</Label>
            <Input
              id="target-role"
              value={targetRole}
              onChange={(event) => setTargetRole(event.target.value)}
              placeholder="Senior Frontend Engineer"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="job-description">Job description</Label>
            <Textarea
              id="job-description"
              value={jobDescription}
              onChange={(event) => setJobDescription(event.target.value)}
              placeholder="Paste the full job posting here..."
              rows={8}
            />
            <p className="text-xs text-muted-foreground">
              Paste the full posting for better keyword and skills matching.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Button
              variant="outline"
              onClick={() => runAction("tailor-summary")}
              disabled={loadingAction !== null}
            >
              {loadingAction === "tailor-summary" ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Wand2 className="h-4 w-4 mr-2" />
              )}
              Tailor Summary
            </Button>
            <Button
              variant="outline"
              onClick={() => runAction("rewrite-experience")}
              disabled={loadingAction !== null}
            >
              {loadingAction === "rewrite-experience" ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Wand2 className="h-4 w-4 mr-2" />
              )}
              Rewrite Experience
            </Button>
            <Button
              variant="outline"
              onClick={() => runAction("suggest-skills")}
              disabled={loadingAction !== null}
            >
              {loadingAction === "suggest-skills" ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Wand2 className="h-4 w-4 mr-2" />
              )}
              Suggest Skills
            </Button>
            <Button
              variant="outline"
              onClick={() => runAction("ats-review")}
              disabled={loadingAction !== null}
            >
              {loadingAction === "ats-review" ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Target className="h-4 w-4 mr-2" />
              )}
              ATS Match Check
            </Button>
          </div>

          {error && (
            <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {notice && (
            <div className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700 flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" />
              <span>{notice}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {summarySuggestion && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Summary Suggestion</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm leading-6">{summarySuggestion.summary}</p>
            {summarySuggestion.keywordsUsed.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {summarySuggestion.keywordsUsed.map((keyword) => (
                  <Badge key={keyword} variant="secondary">
                    {keyword}
                  </Badge>
                ))}
              </div>
            )}
            <Button size="sm" onClick={applySummarySuggestion}>
              Apply Summary
            </Button>
          </CardContent>
        </Card>
      )}

      {experienceSuggestion && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Experience Rewrite</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {experienceSuggestion.items.map((item) => (
              <div key={item.itemId} className="space-y-2">
                <p className="text-sm font-medium">
                  {(resume.sectionData.experience as ExperienceData).items.find((entry) => entry.id === item.itemId)?.title || "Experience"} 
                </p>
                <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                  {item.bullets.map((bullet, index) => (
                    <li key={`${item.itemId}-${index}`}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
            {experienceSuggestion.keywordsUsed.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {experienceSuggestion.keywordsUsed.map((keyword) => (
                  <Badge key={keyword} variant="secondary">
                    {keyword}
                  </Badge>
                ))}
              </div>
            )}
            <Button size="sm" onClick={applyExperienceSuggestion}>
              Apply Experience Bullets
            </Button>
          </CardContent>
        </Card>
      )}

      {skillsSuggestion && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Skills Suggestions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {skillsSuggestion.categories.map((category) => (
              <div key={category.name} className="space-y-2">
                <p className="text-sm font-medium">{category.name}</p>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge key={`${category.name}-${skill}`} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
            {skillsSuggestion.missingKeywords.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Missing keywords</p>
                <div className="flex flex-wrap gap-2">
                  {skillsSuggestion.missingKeywords.map((keyword) => (
                    <Badge key={keyword} variant="outline">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            <Button size="sm" onClick={applySkillsSuggestion}>
              Add Suggested Skills
            </Button>
          </CardContent>
        </Card>
      )}

      {atsReview && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">ATS Match Review</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-md border px-3 py-2 text-sm">
              Match score: <strong>{atsReview.matchScore}%</strong>
            </div>

            {atsReview.matchedKeywords.length > 0 && (
              <div className="space-y-1">
                <p className="text-sm font-medium">Matched keywords</p>
                <div className="flex flex-wrap gap-2">
                  {atsReview.matchedKeywords.map((keyword) => (
                    <Badge key={`matched-${keyword}`} variant="secondary">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {atsReview.missingKeywords.length > 0 && (
              <div className="space-y-1">
                <p className="text-sm font-medium">Missing keywords</p>
                <div className="flex flex-wrap gap-2">
                  {atsReview.missingKeywords.map((keyword) => (
                    <Badge key={`missing-${keyword}`} variant="outline">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {atsReview.quickWins.length > 0 && (
              <div className="space-y-1">
                <p className="text-sm font-medium">Quick wins</p>
                <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                  {atsReview.quickWins.map((tip, index) => (
                    <li key={`tip-${index}`}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
