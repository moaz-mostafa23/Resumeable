"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, FileText, Loader2 } from "lucide-react";
import { useAuthContext } from "@/components/auth/AuthProvider";
import { useResumeStore } from "@/store/useResumeStore";
import { templateDefinitions } from "@/lib/template-registry";
import { DEFAULT_TEMPLATE_ID, TemplateId } from "@/types/resume";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/site/SiteHeader";

export default function NewResumePage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuthContext();
  const { createDraftResume, createResume } = useResumeStore();
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>(DEFAULT_TEMPLATE_ID);
  const [isCreating, setIsCreating] = useState(false);

  const enabledTemplates = templateDefinitions.filter((template) => template.isEnabled);

  const handleCreateResume = async () => {
    setIsCreating(true);

    try {
      if (user) {
        const id = await createResume(user.id, undefined, selectedTemplate);
        if (id) {
          router.replace(`/builder/${id}`);
          return;
        }
        router.replace("/dashboard");
        return;
      }

      const draftId = createDraftResume(selectedTemplate);
      router.replace(`/builder/${draftId}`);
    } catch {
      setIsCreating(false);
    }
  };

  if (authLoading) {
    return (
      <div className="homepage-root flex min-h-screen items-center justify-center bg-[#f5f4ef]">
        <Loader2 className="h-8 w-8 animate-spin text-[#0f766e]" />
      </div>
    );
  }

  return (
    <div className="homepage-root min-h-screen bg-[#f5f4ef] text-[#121214]">
      <div className="homepage-grid-bg pointer-events-none fixed inset-0 opacity-80" aria-hidden />
      <SiteHeader title="Start Builder" backHref={user ? "/dashboard" : "/"} backLabel="Back" />

      <main className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-28 pt-28 sm:px-6 sm:pt-32 lg:px-8">
        <section className="max-w-4xl">
          <p className="inline-flex rounded-full border border-[#d8d1c7] bg-[#ede7de] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#4f4b44]">
            Template step
          </p>
          <h1 className="mt-5 font-[family-name:var(--font-fraunces)] text-4xl font-semibold leading-[1.06] text-[#111827] sm:text-6xl">
            Choose your starting layout.
          </h1>
          <p className="mt-5 max-w-2xl font-[family-name:var(--font-manrope)] text-lg leading-relaxed text-[#4f4b44] sm:text-xl">
            Select the structure that best fits your experience. You can switch templates later without losing content.
          </p>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {enabledTemplates.map((template) => {
            const isSelected = selectedTemplate === template.id;

            return (
              <button
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={cn(
                  "group overflow-hidden rounded-2xl border-2 bg-[#fffdf9] text-left transition-all",
                  isSelected
                    ? "border-[#0f766e] shadow-[0_26px_70px_-56px_rgba(15,118,110,0.8)]"
                    : "border-[#ddd5ca] hover:-translate-y-0.5 hover:border-[#a5c9c2]"
                )}
              >
                <div className="relative aspect-[8.5/11] bg-gradient-to-br from-[#f4f1eb] to-[#ebe5da] p-4">
                  <div className="flex h-full flex-col rounded-md border border-[#ded6ca] bg-white p-3 shadow-sm">
                    {template.id === "ats-minimal" ? (
                      <>
                        <div className="mx-auto mb-1 h-3 w-1/2 rounded bg-[#cfc6ba]" />
                        <div className="mx-auto mb-3 h-2 w-1/3 rounded bg-[#ddd5ca]" />
                        <div className="mb-1 h-2 w-full rounded bg-[#efebe4]" />
                        <div className="mb-1 h-2 w-full rounded bg-[#efebe4]" />
                        <div className="flex-1" />
                        <div className="mb-1 h-2 w-2/3 rounded bg-[#ddd5ca]" />
                        <div className="mb-1 h-1.5 w-full rounded bg-[#efebe4]" />
                        <div className="h-1.5 w-full rounded bg-[#efebe4]" />
                      </>
                    ) : null}

                    {template.id === "modern-minimal" ? (
                      <>
                        <div className="mb-2 border-b-2 border-[#8dcac0] pb-2">
                          <div className="mb-1 h-3 w-1/2 rounded bg-[#cfc6ba]" />
                          <div className="h-2 w-1/3 rounded bg-[#cde8e2]" />
                        </div>
                        <div className="mb-2 flex gap-2">
                          <div className="h-3 w-1 rounded bg-[#8dcac0]" />
                          <div className="h-2 w-1/4 rounded bg-[#ddd5ca]" />
                        </div>
                        <div className="flex-1" />
                        <div className="flex flex-wrap gap-1">
                          <div className="h-3 w-8 rounded bg-[#efebe4]" />
                          <div className="h-3 w-10 rounded bg-[#efebe4]" />
                          <div className="h-3 w-6 rounded bg-[#efebe4]" />
                        </div>
                      </>
                    ) : null}

                    {template.id === "two-column-sidebar" ? (
                      <div className="flex h-full gap-2">
                        <div className="w-1/3 rounded bg-[#d8efe8] p-1">
                          <div className="mb-2 h-2 w-full rounded bg-white/80" />
                          <div className="mb-1 h-1.5 w-full rounded bg-white/60" />
                          <div className="mb-1 h-1.5 w-full rounded bg-white/60" />
                          <div className="h-1.5 w-2/3 rounded bg-white/60" />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="mb-2 h-2 w-full rounded bg-[#ddd5ca]" />
                          <div className="mb-1 h-1.5 w-full rounded bg-[#efebe4]" />
                          <div className="mb-1 h-1.5 w-full rounded bg-[#efebe4]" />
                          <div className="flex-1" />
                          <div className="h-1.5 w-2/3 rounded bg-[#efebe4]" />
                        </div>
                      </div>
                    ) : null}

                    {template.id === "corporate-timeline" ? (
                      <>
                        <div className="mb-1 h-3 w-1/2 rounded bg-[#cfc6ba]" />
                        <div className="mb-3 h-2 w-1/3 rounded bg-[#cde8e2]" />
                        <div className="mb-2 flex items-start gap-2">
                          <div className="w-8 text-right">
                            <div className="h-1.5 w-full rounded bg-[#ddd5ca]" />
                          </div>
                          <div className="mt-0.5 h-2 w-2 rounded-full bg-[#8dcac0]" />
                          <div className="flex-1">
                            <div className="mb-1 h-2 w-full rounded bg-[#ddd5ca]" />
                            <div className="h-1.5 w-2/3 rounded bg-[#efebe4]" />
                          </div>
                        </div>
                        <div className="flex-1" />
                      </>
                    ) : null}

                    {template.id === "creative-infographic" ? (
                      <>
                        <div className="-m-3 mb-2 bg-[#d8efe8] p-2">
                          <div className="mb-1 h-3 w-1/2 rounded bg-white/80" />
                          <div className="h-2 w-1/3 rounded bg-white/60" />
                        </div>
                        <div className="mb-2 flex items-center gap-1">
                          <div className="h-4 w-4 rounded bg-[#cde8e2]" />
                          <div className="h-2 w-1/4 rounded bg-[#ddd5ca]" />
                        </div>
                        <div className="flex-1" />
                        <div className="flex gap-1">
                          <div className="h-8 flex-1 rounded bg-[#f4f1eb] p-1">
                            <div className="mb-0.5 h-1.5 w-full rounded bg-[#cde8e2]" />
                            <div className="h-1 w-2/3 rounded bg-[#ddd5ca]" />
                          </div>
                          <div className="h-8 flex-1 rounded bg-[#f4f1eb] p-1">
                            <div className="mb-0.5 h-1.5 w-full rounded bg-[#cde8e2]" />
                            <div className="h-1 w-2/3 rounded bg-[#ddd5ca]" />
                          </div>
                        </div>
                      </>
                    ) : null}
                  </div>

                  {isSelected ? (
                    <div className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#0f766e] text-white shadow-md">
                      <Check className="h-4 w-4" />
                    </div>
                  ) : null}
                </div>

                <div className="p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-base font-semibold text-[#111827]">{template.name}</h2>
                    {template.atsFriendly ? (
                      <span className="rounded-full border border-[#8fd0c4] bg-[#daf5ee] px-2 py-0.5 text-xs font-medium text-[#0f766e]">
                        ATS-friendly
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-[#4f4b44]">
                    {template.description}
                  </p>
                  {template.features?.length ? (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {template.features.slice(0, 3).map((feature) => (
                        <span
                          key={feature}
                          className="rounded-full border border-[#e4ddd2] bg-[#f8f4ee] px-2 py-0.5 text-xs text-[#665f55]"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </button>
            );
          })}
        </section>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#d8d1c7] bg-[#f5f4ef]/95 p-3 backdrop-blur sm:p-4">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-1 sm:px-2">
          <Link href={user ? "/dashboard" : "/"}>
            <Button
              variant="outline"
              className="rounded-full border-[#cbc2b7] bg-[#f8f5ef] px-4 font-semibold text-[#1f2937] hover:bg-[#ede5d9]"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <Button
            onClick={handleCreateResume}
            disabled={isCreating}
            className="rounded-full bg-[#0f766e] px-6 font-semibold text-white hover:bg-[#0b5f59]"
          >
            {isCreating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" />
                Create resume
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
