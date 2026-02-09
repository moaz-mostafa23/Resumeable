"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { templateDefinitions, TemplateDefinition } from "@/lib/template-registry";
import { MarketingShell } from "@/components/site/MarketingShell";
import { useAuthContext } from "@/components/auth/AuthProvider";
import { useResumeStore } from "@/store/useResumeStore";
import { TemplateCardPreview } from "@/components/templates/previews";

type FilterCategory = "all" | "minimal" | "professional" | "creative";

const filterOptions: { label: string; value: FilterCategory }[] = [
  { label: "All templates", value: "all" },
  { label: "Minimal", value: "minimal" },
  { label: "Professional", value: "professional" },
  { label: "Creative", value: "creative" },
];

function TemplateCard({
  template,
  disabled,
  isCreating,
  onCreate,
}: {
  template: TemplateDefinition;
  disabled: boolean;
  isCreating: boolean;
  onCreate: (template: TemplateDefinition) => void;
}) {
  return (
    <button
      id={template.id}
      onClick={() => onCreate(template)}
      disabled={disabled}
      aria-busy={isCreating}
      className="group relative overflow-hidden rounded-2xl border border-[#ddd5ca] bg-[#fffdf9] text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#a5c9c2] hover:shadow-[0_30px_80px_-65px_rgba(16,24,40,0.8)] focus:outline-none focus:ring-2 focus:ring-[#0f766e]/30 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
      aria-label={`Use ${template.name} template`}
    >
      <div className="relative overflow-hidden bg-white" style={{ aspectRatio: "8.5 / 11", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <TemplateCardPreview templateId={template.id} />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-black/55 via-black/20 to-transparent pb-8 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <div className="translate-y-4 transform transition-transform duration-300 group-hover:translate-y-0">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-[#111827] shadow-lg">
              {isCreating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              {isCreating ? "Preparing..." : "Use this template"}
            </span>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-2 flex items-center gap-2">
          <h3 className="text-lg font-semibold leading-tight text-[#111827]">{template.name}</h3>
          {template.atsFriendly ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-[#8fd0c4] bg-[#daf5ee] px-2 py-0.5 text-xs font-medium text-[#0f766e]">
              <Check className="h-3 w-3" />
              ATS
            </span>
          ) : null}
        </div>

        <p className="line-clamp-2 text-sm leading-relaxed text-[#4f4b44]">{template.description}</p>

        {template.features.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {template.features.map((feature) => (
              <span
                key={feature}
                className="rounded-full border border-[#e4ddd2] bg-[#f8f4ee] px-2.5 py-0.5 text-xs text-[#655f55]"
              >
                {feature}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </button>
  );
}

export function TemplatesGallery() {
  const router = useRouter();
  const { user } = useAuthContext();
  const { createResumeFromTemplate, createDraftResumeFromTemplate } = useResumeStore();
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
  const [creatingTemplateId, setCreatingTemplateId] = useState<string | null>(null);

  const enabled = useMemo(
    () => templateDefinitions.filter((template) => template.isEnabled),
    []
  );

  const filtered =
    activeFilter === "all"
      ? enabled
      : enabled.filter((template) => template.category === activeFilter);

  const handleCreateFromTemplate = async (template: TemplateDefinition) => {
    if (creatingTemplateId) return;

    setCreatingTemplateId(template.id);
    try {
      if (user) {
        const resumeId = await createResumeFromTemplate(
          user.id,
          template.id,
          `${template.name} Resume`
        );

        if (resumeId) {
          router.push(`/builder/${resumeId}`);
          return;
        }

        // Fallback to a local draft if network or DB write fails.
        const fallbackDraftId = createDraftResumeFromTemplate(
          template.id,
          `${template.name} Resume`
        );
        router.push(`/builder/${fallbackDraftId}`);
        return;
      } else {
        const draftId = createDraftResumeFromTemplate(
          template.id,
          `${template.name} Resume`
        );
        router.push(`/builder/${draftId}`);
        return;
      }
    } finally {
      setCreatingTemplateId(null);
    }
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: enabled.map((template, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: template.name,
      url: `https://www.resumeable.cv/templates#${template.id}`,
      description: template.description,
    })),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do templates open directly in the editor?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Selecting a template now creates a resume instantly and opens the editor with prefilled starter content.",
        },
      },
      {
        "@type": "Question",
        name: "Can I upload a headshot?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. You can upload a photo in the Header section editor, and photo-enabled templates will display it immediately.",
        },
      },
      {
        "@type": "Question",
        name: "Are these templates ATS-friendly?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ATS-labeled templates use simplified structure and predictable section hierarchy designed for parser compatibility.",
        },
      },
    ],
  };

  return (
    <MarketingShell title="Templates">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="max-w-4xl">
        <p className="inline-flex rounded-full border border-[#d8d1c7] bg-[#ede7de] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#4f4b44]">
          Template library
        </p>
        <h1 className="mt-5 font-[family-name:var(--font-fraunces)] text-4xl font-semibold leading-[1.05] text-[#111827] sm:text-6xl">
          Choose a proven layout and start editing instantly.
        </h1>
        <p className="mt-5 max-w-2xl font-[family-name:var(--font-manrope)] text-lg leading-relaxed text-[#4f4b44] sm:text-xl">
          Every template opens directly in the editor with high-quality mock content, so you can replace text instead of starting from a blank page.
        </p>
      </section>

      <section className="mt-8 flex flex-wrap gap-2">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setActiveFilter(option.value)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200",
              activeFilter === option.value
                ? "border-[#0f766e] bg-[#daf5ee] text-[#0f766e]"
                : "border-[#d9d1c6] bg-[#f8f5ef] text-[#5d584f] hover:border-[#c7bcaf] hover:text-[#111827]"
            )}
          >
            {option.label}
            {option.value !== "all" ? (
              <span className="ml-1.5 text-xs opacity-70">
                ({enabled.filter((template) => template.category === option.value).length})
              </span>
            ) : null}
          </button>
        ))}
      </section>

      <section className="mt-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              disabled={creatingTemplateId !== null}
              isCreating={creatingTemplateId === template.id}
              onCreate={handleCreateFromTemplate}
            />
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-[#ddd5ca] bg-[#fbf8f3] px-6 py-12 text-center">
            <p className="text-lg text-[#5d584f]">No templates in this category yet. More are on the way.</p>
          </div>
        ) : null}
      </section>

      <section className="mt-16 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="rounded-3xl border border-[#ddd5ca] bg-[#fcfaf6] p-7">
          <h2 className="font-[family-name:var(--font-fraunces)] text-3xl font-medium text-[#111827]">
            Template selection guidance
          </h2>
          <ul className="mt-5 space-y-3 text-sm leading-relaxed text-[#4f4b44]">
            <li>Use ATS Classic or Modern Professional for strict parser compatibility.</li>
            <li>Use Specialist Sidebar when skill taxonomy needs visual emphasis.</li>
            <li>Use profile-photo templates for portfolio, consulting, and client-facing applications.</li>
          </ul>
          <Button
            className="mt-7 rounded-full bg-[#0f766e] px-6 font-semibold text-white hover:bg-[#0b5f59]"
            onClick={() => {
              if (enabled.length > 0) {
                handleCreateFromTemplate(enabled[0]);
              }
            }}
            disabled={!!creatingTemplateId}
          >
            {creatingTemplateId ? "Preparing editor..." : "Start with recommended"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </article>

        <article className="rounded-3xl border border-[#c7ddd8] bg-[#eefaf7] p-7">
          <h2 className="font-[family-name:var(--font-fraunces)] text-3xl font-medium text-[#0f172a]">
            Pick the right template faster
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#1d4f48]">
            Filter by style, compare real full-page previews, and choose the layout that matches your target role.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[#1d4f48]">
            When you click a template, you go straight into the editor with quality starter content already filled in so you can edit immediately.
          </p>
        </article>
      </section>
    </MarketingShell>
  );
}
