import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateAnthropicJson } from "@/lib/ai/anthropic";

export const runtime = "nodejs";

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

type ParsedRequestBody = {
  action: AIAction;
  targetRole: string;
  jobDescription: string;
  resume: ResumeSnapshot;
};

const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "by",
  "for",
  "from",
  "in",
  "into",
  "is",
  "it",
  "of",
  "on",
  "or",
  "that",
  "the",
  "their",
  "this",
  "to",
  "with",
  "you",
  "your",
  "will",
  "we",
  "our",
  "they",
  "them",
  "these",
  "those",
  "using",
  "use",
  "build",
  "work",
  "experience",
  "role",
  "team",
  "teams",
  "candidate",
  "required",
  "preferred",
]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function clampText(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function clampStringArray(value: unknown, itemMaxLength: number, maxItems: number): string[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean)
    .map((item) => item.slice(0, itemMaxLength))
    .slice(0, maxItems);
}

function normalizeResumeSnapshot(input: unknown): ResumeSnapshot {
  const source = isRecord(input) ? input : {};
  const headerSource = isRecord(source.header) ? source.header : {};
  const experienceSource = Array.isArray(source.experience) ? source.experience : [];
  const skillsSource = Array.isArray(source.skills) ? source.skills : [];

  return {
    header: {
      fullName: clampText(headerSource.fullName, 120),
      title: clampText(headerSource.title, 120),
    },
    summary: clampText(source.summary, 900),
    experience: experienceSource
      .map((item) => {
        const value = isRecord(item) ? item : {};
        return {
          itemId: clampText(value.itemId, 100),
          title: clampText(value.title, 120),
          company: clampText(value.company, 120),
          bullets: clampStringArray(value.bullets, 300, 10),
        };
      })
      .filter((item) => item.itemId),
    skills: skillsSource
      .map((item) => {
        const value = isRecord(item) ? item : {};
        return {
          category: clampText(value.category, 80),
          skills: clampStringArray(value.skills, 80, 20),
        };
      })
      .filter((item) => item.category || item.skills.length > 0),
  };
}

function parseRequestBody(body: unknown): ParsedRequestBody | null {
  if (!isRecord(body)) return null;

  const action = body.action;
  if (
    action !== "tailor-summary" &&
    action !== "rewrite-experience" &&
    action !== "suggest-skills" &&
    action !== "ats-review"
  ) {
    return null;
  }

  const targetRole = clampText(body.targetRole, 160);
  const jobDescription = clampText(body.jobDescription, 12000);
  const resume = normalizeResumeSnapshot(body.resume);

  if (!jobDescription && !targetRole) {
    return null;
  }

  return {
    action,
    targetRole,
    jobDescription,
    resume,
  };
}

function toResumePlainText(resume: ResumeSnapshot): string {
  const experienceText = resume.experience
    .map((item) => `${item.title} ${item.company} ${item.bullets.join(" ")}`)
    .join(" ");

  const skillsText = resume.skills
    .flatMap((category) => [category.category, ...category.skills])
    .join(" ");

  return [
    resume.header.fullName,
    resume.header.title,
    resume.summary,
    experienceText,
    skillsText,
  ]
    .join(" ")
    .toLowerCase();
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9+#./ -]/g, " ")
    .split(/\s+/)
    .map((token) => token.trim())
    .filter((token) => token.length >= 3 && !STOP_WORDS.has(token));
}

function extractTopKeywords(jobDescription: string, maxKeywords: number = 28): string[] {
  const tokens = tokenize(jobDescription);
  const counts = new Map<string, number>();

  for (const token of tokens) {
    counts.set(token, (counts.get(token) ?? 0) + 1);
  }

  return [...counts.entries()]
    .sort((a, b) => {
      if (b[1] !== a[1]) return b[1] - a[1];
      return b[0].length - a[0].length;
    })
    .map(([token]) => token)
    .slice(0, maxKeywords);
}

function buildAtsReview(jobDescription: string, resume: ResumeSnapshot): AtsReviewResponse {
  const keywords = extractTopKeywords(jobDescription, 28);
  const resumeText = toResumePlainText(resume);

  const matchedKeywords = keywords.filter((keyword) => resumeText.includes(keyword));
  const missingKeywords = keywords.filter((keyword) => !resumeText.includes(keyword));

  const denominator = Math.max(keywords.length, 1);
  const matchScore = Math.round((matchedKeywords.length / denominator) * 100);

  const hasNumbers = /\d/.test(resume.summary) || resume.experience.some((item) =>
    item.bullets.some((bullet) => /\d/.test(bullet))
  );

  const strengths: string[] = [];
  if (matchScore >= 70) {
    strengths.push("Strong keyword alignment with the target job description.");
  } else if (matchScore >= 50) {
    strengths.push("Moderate keyword alignment; core requirements are partially covered.");
  }
  if (resume.summary.length >= 120) {
    strengths.push("Summary section is substantial enough to support ATS parsing.");
  }
  if (hasNumbers) {
    strengths.push("Resume includes quantified achievements, which improves recruiter readability.");
  }
  if (resume.experience.length > 0) {
    strengths.push("Experience section is populated with role-specific bullet points.");
  }

  const gaps: string[] = [];
  if (matchScore < 50) {
    gaps.push("Low keyword overlap with the job description.");
  }
  if (!hasNumbers) {
    gaps.push("Very few quantified results detected in experience bullets.");
  }
  if (missingKeywords.length > 0) {
    gaps.push("Important target-job keywords are missing from summary or skills sections.");
  }
  if (resume.skills.length === 0 || resume.skills.every((category) => category.skills.length === 0)) {
    gaps.push("Skills section is sparse, limiting ATS keyword coverage.");
  }

  const topMissing = missingKeywords.slice(0, 6);
  const quickWins = [
    ...topMissing.slice(0, 3).map((keyword) => `Add "${keyword}" in a relevant experience bullet using truthful context.`),
    ...topMissing.slice(3, 6).map((keyword) => `Include "${keyword}" in the skills section if you can defend it in interviews.`),
  ];

  return {
    matchScore,
    matchedKeywords: matchedKeywords.slice(0, 18),
    missingKeywords: missingKeywords.slice(0, 18),
    strengths: strengths.slice(0, 4),
    gaps: gaps.slice(0, 4),
    quickWins: quickWins.slice(0, 6),
  };
}

function buildSummaryPrompt(input: ParsedRequestBody): { systemPrompt: string; userPrompt: string } {
  const systemPrompt = [
    "You are an expert resume writer and ATS optimization specialist.",
    "Use only facts present in the provided resume snapshot and job description.",
    "Never fabricate accomplishments, companies, certifications, dates, or metrics.",
    "Return valid JSON only. Do not include markdown or extra commentary.",
  ].join(" ");

  const userPrompt = JSON.stringify(
    {
      task: "Tailor the professional summary to the target role and job description.",
      outputSchema: {
        summary: "string (2-4 sentences, 60-450 characters, no first-person pronouns)",
        rationale: ["string", "string"],
        keywordsUsed: ["string"],
      },
      constraints: [
        "Prioritize concrete skills and business impact.",
        "Avoid cliches and buzzword stuffing.",
      ],
      input: input,
    },
    null,
    2
  );

  return { systemPrompt, userPrompt };
}

function buildExperiencePrompt(input: ParsedRequestBody): { systemPrompt: string; userPrompt: string } {
  const systemPrompt = [
    "You are an expert resume writer focused on high-impact bullet points.",
    "Rewrite bullets to be concise, specific, and ATS-friendly.",
    "Never invent outcomes or numbers not supported by input.",
    "Return valid JSON only.",
  ].join(" ");

  const userPrompt = JSON.stringify(
    {
      task: "Rewrite each experience entry's bullets for stronger impact and job-fit relevance.",
      outputSchema: {
        items: [
          {
            itemId: "string (must match input itemId exactly)",
            bullets: ["string (3-5 bullets, each <= 26 words)"],
          },
        ],
        notes: ["string"],
        keywordsUsed: ["string"],
      },
      constraints: [
        "Start bullets with strong action verbs.",
        "Keep claims factual and grounded in provided information.",
      ],
      input: input,
    },
    null,
    2
  );

  return { systemPrompt, userPrompt };
}

function buildSkillsPrompt(input: ParsedRequestBody): { systemPrompt: string; userPrompt: string } {
  const systemPrompt = [
    "You are an ATS-focused resume strategist.",
    "Compare the resume skills with job requirements and identify realistic additions.",
    "Never include credentials or tools not implied by the candidate context.",
    "Return valid JSON only.",
  ].join(" ");

  const userPrompt = JSON.stringify(
    {
      task: "Suggest skill categories and missing job-aligned keywords.",
      outputSchema: {
        categories: [
          {
            name: "string",
            skills: ["string"],
          },
        ],
        missingKeywords: ["string"],
        notes: ["string"],
      },
      constraints: [
        "Return 2-4 categories and up to 8 skills per category.",
        "Prefer hard skills and tools over soft skills.",
      ],
      input: input,
    },
    null,
    2
  );

  return { systemPrompt, userPrompt };
}

function sanitizeSummaryResponse(value: unknown): TailorSummaryResponse {
  const source = isRecord(value) ? value : {};

  return {
    summary: clampText(source.summary, 550),
    rationale: clampStringArray(source.rationale, 220, 4),
    keywordsUsed: clampStringArray(source.keywordsUsed, 80, 10),
  };
}

function sanitizeExperienceResponse(
  value: unknown,
  allowedItemIds: Set<string>
): RewriteExperienceResponse {
  const source = isRecord(value) ? value : {};
  const itemsSource = Array.isArray(source.items) ? source.items : [];

  const items = itemsSource
    .map((item) => {
      const entry = isRecord(item) ? item : {};
      return {
        itemId: clampText(entry.itemId, 100),
        bullets: clampStringArray(entry.bullets, 260, 6),
      };
    })
    .filter((item) => item.itemId && allowedItemIds.has(item.itemId) && item.bullets.length > 0);

  return {
    items,
    notes: clampStringArray(source.notes, 220, 5),
    keywordsUsed: clampStringArray(source.keywordsUsed, 80, 12),
  };
}

function sanitizeSkillsResponse(value: unknown): SuggestSkillsResponse {
  const source = isRecord(value) ? value : {};
  const categoriesSource = Array.isArray(source.categories) ? source.categories : [];

  const categories = categoriesSource
    .map((category) => {
      const entry = isRecord(category) ? category : {};
      return {
        name: clampText(entry.name, 80),
        skills: clampStringArray(entry.skills, 80, 10),
      };
    })
    .filter((category) => category.name && category.skills.length > 0)
    .slice(0, 5);

  return {
    categories,
    missingKeywords: clampStringArray(source.missingKeywords, 80, 15),
    notes: clampStringArray(source.notes, 220, 5),
  };
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Sign in to use AI features." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const parsed = parseRequestBody(body);

    if (!parsed) {
      return NextResponse.json(
        { error: "Invalid request payload." },
        { status: 400 }
      );
    }

    if (parsed.action === "ats-review") {
      const review = buildAtsReview(parsed.jobDescription, parsed.resume);
      return NextResponse.json({
        action: parsed.action,
        data: review,
      });
    }

    if (parsed.action === "tailor-summary") {
      const { systemPrompt, userPrompt } = buildSummaryPrompt(parsed);
      const rawResponse = await generateAnthropicJson<unknown>({
        systemPrompt,
        userPrompt,
        maxTokens: 900,
        temperature: 0.3,
      });
      const data = sanitizeSummaryResponse(rawResponse);

      if (!data.summary) {
        return NextResponse.json(
          { error: "AI did not return a usable summary." },
          { status: 502 }
        );
      }

      return NextResponse.json({ action: parsed.action, data });
    }

    if (parsed.action === "rewrite-experience") {
      if (parsed.resume.experience.length === 0) {
        return NextResponse.json(
          { error: "Add at least one experience entry first." },
          { status: 400 }
        );
      }

      const { systemPrompt, userPrompt } = buildExperiencePrompt(parsed);
      const rawResponse = await generateAnthropicJson<unknown>({
        systemPrompt,
        userPrompt,
        maxTokens: 1400,
        temperature: 0.25,
      });

      const allowedIds = new Set(parsed.resume.experience.map((item) => item.itemId));
      const data = sanitizeExperienceResponse(rawResponse, allowedIds);

      if (data.items.length === 0) {
        return NextResponse.json(
          { error: "AI did not return usable experience bullets." },
          { status: 502 }
        );
      }

      return NextResponse.json({ action: parsed.action, data });
    }

    const { systemPrompt, userPrompt } = buildSkillsPrompt(parsed);
    const rawResponse = await generateAnthropicJson<unknown>({
      systemPrompt,
      userPrompt,
      maxTokens: 1100,
      temperature: 0.25,
    });
    const data = sanitizeSkillsResponse(rawResponse);

    if (data.categories.length === 0 && data.missingKeywords.length === 0) {
      return NextResponse.json(
        { error: "AI did not return usable skill suggestions." },
        { status: 502 }
      );
    }

    return NextResponse.json({ action: parsed.action, data });
  } catch (error) {
    console.error("AI resume route error:", error);
    return NextResponse.json(
      { error: (error as Error).message || "Failed to process AI request." },
      { status: 500 }
    );
  }
}
