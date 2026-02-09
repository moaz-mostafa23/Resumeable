"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  Check,
  Copy,
  Edit2,
  FileText,
  Loader2,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { useAuthContext } from "@/components/auth/AuthProvider";
import { createClient } from "@/lib/supabase/client";
import { ResumePreviewThumbnail } from "@/components/preview/ResumePreviewThumbnail";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SiteHeader } from "@/components/site/SiteHeader";

interface ResumeListItem {
  id: string;
  name: string;
  updated_at: string;
}

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuthContext();
  const [resumes, setResumes] = useState<ResumeListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [duplicatingId, setDuplicatingId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?next=/dashboard");
    }
  }, [authLoading, router, user]);

  useEffect(() => {
    const fetchResumes = async () => {
      if (!user) {
        return;
      }

      const supabase = createClient();
      const { data, error } = await supabase
        .from("resumes")
        .select("id, name, updated_at")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false });

      if (!error && data) {
        setResumes(data);
      }

      setLoading(false);
    };

    if (user) {
      fetchResumes();
    }
  }, [user]);

  const handleConfirmDelete = async () => {
    if (!deleteTarget) {
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.from("resumes").delete().eq("id", deleteTarget);

    if (!error) {
      setResumes(resumes.filter((resume) => resume.id !== deleteTarget));
    }

    setDeleteTarget(null);
  };

  const generateUniqueName = (baseName: string, existingNames: string[]) => {
    const basePattern = baseName.replace(/-\d+$/, "");

    const matchingNames = existingNames.filter((name) => {
      const pattern = name.replace(/-\d+$/, "");
      return pattern === basePattern;
    });

    if (matchingNames.length === 0) {
      return `${basePattern}-1`;
    }

    const numbers = matchingNames
      .map((name) => {
        const match = name.match(/-(\d+)$/);
        return match ? parseInt(match[1], 10) : 0;
      })
      .filter((num) => !Number.isNaN(num))
      .sort((a, b) => b - a);

    const nextNumber = numbers.length > 0 ? numbers[0] + 1 : 1;
    return `${basePattern}-${nextNumber}`;
  };

  const handleDuplicate = async (resumeId: string) => {
    if (!user) {
      return;
    }

    setDuplicatingId(resumeId);

    try {
      const supabase = createClient();

      const { data: originalResume, error: fetchError } = await supabase
        .from("resumes")
        .select("*")
        .eq("id", resumeId)
        .single();

      if (fetchError || !originalResume) {
        throw fetchError || new Error("Resume not found");
      }

      const { data: allResumes, error: listError } = await supabase
        .from("resumes")
        .select("name")
        .eq("user_id", user.id);

      if (listError) {
        throw listError;
      }

      const existingNames = allResumes?.map((item) => item.name) ?? [];
      const newName = generateUniqueName(originalResume.name, existingNames);

      const { data: newResume, error: insertError } = await supabase
        .from("resumes")
        .insert({
          user_id: user.id,
          name: newName,
          template_id: originalResume.template_id,
          sections: originalResume.sections,
          section_data: originalResume.section_data,
          theme: originalResume.theme,
        })
        .select("id, name, updated_at")
        .single();

      if (insertError) {
        throw insertError;
      }

      setResumes([newResume, ...resumes]);
    } catch (error) {
      console.error("Error duplicating resume:", error);
    } finally {
      setDuplicatingId(null);
    }
  };

  const handleStartEdit = (resume: ResumeListItem) => {
    setEditingId(resume.id);
    setEditingName(resume.name);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 0);
  };

  const handleSaveEdit = async (resumeId: string) => {
    if (!user || !editingName.trim()) {
      setEditingId(null);
      return;
    }

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("resumes")
        .update({ name: editingName.trim() })
        .eq("id", resumeId);

      if (error) {
        throw error;
      }

      setResumes(
        resumes.map((resume) =>
          resume.id === resumeId ? { ...resume, name: editingName.trim() } : resume
        )
      );
      setEditingId(null);
    } catch (error) {
      console.error("Error updating resume name:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingName("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, resumeId: string) => {
    if (e.key === "Enter") {
      handleSaveEdit(resumeId);
    }
    if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  if (authLoading || loading) {
    return (
      <div className="homepage-root flex min-h-screen items-center justify-center bg-[#f5f4ef]">
        <Loader2 className="h-8 w-8 animate-spin text-[#0f766e]" />
      </div>
    );
  }

  return (
    <div className="homepage-root min-h-screen bg-[#f5f4ef] text-[#121214]">
      <div className="homepage-grid-bg pointer-events-none fixed inset-0 opacity-80" aria-hidden />
      <SiteHeader title="Dashboard" />

      <main className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-8">
        <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6c685e]">
              Saved resumes
            </p>
            <h1 className="mt-2 font-[family-name:var(--font-fraunces)] text-4xl font-semibold text-[#111827] sm:text-5xl">
              Your dashboard
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-[#4f4b44] sm:text-base">
              {user?.email ? `Signed in as ${user.email}` : "Manage and iterate your resumes quickly."}
            </p>
          </div>

          <Link href="/templates" className="w-full sm:w-auto">
            <Button className="w-full rounded-full bg-[#0f766e] px-7 font-semibold text-white hover:bg-[#0b5f59] sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              New resume
            </Button>
          </Link>
        </section>

        {resumes.length === 0 ? (
          <section className="mt-8 rounded-3xl border border-[#ddd5ca] bg-[#fffdf9] px-6 py-12 text-center sm:px-10">
            <FileText className="mx-auto h-14 w-14 text-[#b0a89b]" />
            <h2 className="mt-4 font-[family-name:var(--font-fraunces)] text-3xl font-medium text-[#111827]">
              No resumes yet
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#4f4b44] sm:text-base">
              Create your first resume and it will appear here for quick editing and duplication.
            </p>
            <Link href="/templates" className="mt-6 inline-block">
              <Button className="rounded-full bg-[#0f766e] px-7 font-semibold text-white hover:bg-[#0b5f59]">
                <Plus className="mr-2 h-4 w-4" />
                Create resume
              </Button>
            </Link>
          </section>
        ) : (
          <section className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {resumes.map((resume) => (
              <Card
                key={resume.id}
                className="overflow-hidden rounded-3xl border-[#ddd5ca] bg-[#fffdf9] shadow-none transition-shadow hover:shadow-[0_24px_70px_-58px_rgba(16,24,40,0.9)]"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      {editingId === resume.id ? (
                        <div className="flex items-center gap-1.5">
                          <Input
                            ref={inputRef}
                            value={editingName}
                            onChange={(e) => setEditingName(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, resume.id)}
                            className="h-10 border-[#d8d1c7] bg-[#fefcf8] text-base font-semibold"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 rounded-full"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSaveEdit(resume.id);
                            }}
                          >
                            <Check className="h-4 w-4 text-[#0f766e]" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 rounded-full"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCancelEdit();
                            }}
                          >
                            <X className="h-4 w-4 text-[#7b7469]" />
                          </Button>
                        </div>
                      ) : (
                        <div className="group/name flex items-start gap-2">
                          <CardTitle
                            className="min-w-0 flex-1 truncate text-lg text-[#111827]"
                            title="Click to edit name"
                            onClick={() => handleStartEdit(resume)}
                          >
                            {resume.name}
                          </CardTitle>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full opacity-0 transition-opacity group-hover/name:opacity-100"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStartEdit(resume);
                            }}
                          >
                            <Edit2 className="h-3.5 w-3.5 text-[#7b7469]" />
                          </Button>
                        </div>
                      )}

                      <CardDescription className="pt-1 text-[#6b665d]">
                        Updated {new Date(resume.updated_at).toLocaleDateString()}
                      </CardDescription>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-full"
                      onClick={(e) => {
                        e.preventDefault();
                        setDeleteTarget(resume.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-[#b14646]" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="h-52 overflow-hidden rounded-xl border border-[#e1d8cd]">
                    <ResumePreviewThumbnail resumeId={resume.id} className="h-full w-full" />
                  </div>

                  <Link href={`/builder/${resume.id}`}>
                    <Button
                      variant="outline"
                      className="w-full rounded-full border-[#cbc2b7] bg-[#f8f5ef] font-semibold text-[#1f2937] hover:bg-[#ede5d9]"
                    >
                      Edit resume
                    </Button>
                  </Link>

                  <Button
                    variant="outline"
                    className="w-full rounded-full border-[#cbc2b7] bg-[#f8f5ef] font-semibold text-[#1f2937] hover:bg-[#ede5d9]"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDuplicate(resume.id);
                    }}
                    disabled={duplicatingId === resume.id}
                  >
                    {duplicatingId === resume.id ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Duplicating...
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" />
                        Duplicate
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </section>
        )}
      </main>

      {deleteTarget ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4"
          onClick={() => setDeleteTarget(null)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-[#efcfcf] bg-[#fffdf9] p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#fff1f1]">
                <AlertTriangle className="h-5 w-5 text-[#c24141]" />
              </span>
              <h3 className="font-[family-name:var(--font-fraunces)] text-2xl font-medium text-[#111827]">
                Delete resume
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-[#4f4b44]">
              This action cannot be undone. The selected resume will be permanently removed.
            </p>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <Button
                variant="outline"
                onClick={() => setDeleteTarget(null)}
                className="rounded-full border-[#cbc2b7] bg-[#f8f5ef] font-semibold text-[#1f2937] hover:bg-[#ede5d9]"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmDelete}
                className="rounded-full bg-[#b14646] font-semibold text-white hover:bg-[#973b3b]"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
