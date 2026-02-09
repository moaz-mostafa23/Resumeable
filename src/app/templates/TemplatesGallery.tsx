"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { templateDefinitions, TemplateDefinition } from "@/lib/template-registry";
import { TemplateId } from "@/types/resume";
import {
  StaticATSMinimal,
  StaticBoldHeader,
  StaticCorporateTimeline,
  StaticCreativeInfographic,
  StaticElegantPhoto,
  StaticModernMinimal,
  StaticTwoColumnSidebar,
} from "@/components/templates/previews";
import { MarketingShell } from "@/components/site/MarketingShell";

type FilterCategory = "all" | "minimal" | "professional" | "creative";

const filterOptions: { label: string; value: FilterCategory }[] = [
  { label: "All templates", value: "all" },
  { label: "Minimal", value: "minimal" },
  { label: "Professional", value: "professional" },
  { label: "Creative", value: "creative" },
];

function TemplatePreviewRenderer({ id }: { id: TemplateId }) {
  switch (id) {
    case "ats-minimal":
      return <StaticATSMinimal />;
    case "modern-minimal":
      return <StaticModernMinimal />;
    case "two-column-sidebar":
      return <StaticTwoColumnSidebar />;
    case "corporate-timeline":
      return <StaticCorporateTimeline />;
    case "creative-infographic":
      return <StaticCreativeInfographic />;
    case "elegant-photo":
      return <StaticElegantPhoto />;
    case "bold-header":
      return <StaticBoldHeader />;
    default:
      return null;
  }
}

function TemplateCard({ template }: { template: TemplateDefinition }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/builder/new")}
      className="group relative overflow-hidden rounded-2xl border border-[#ddd5ca] bg-[#fffdf9] text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#a5c9c2] hover:shadow-[0_30px_80px_-65px_rgba(16,24,40,0.8)] focus:outline-none focus:ring-2 focus:ring-[#0f766e]/30 focus:ring-offset-2"
    >
      <div className="relative overflow-hidden bg-white" style={{ aspectRatio: "8.5 / 11", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <TemplatePreviewRenderer id={template.id} />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-black/55 via-black/20 to-transparent pb-8 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <div className="translate-y-4 transform transition-transform duration-300 group-hover:translate-y-0">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-gray-900 shadow-lg">
              <Sparkles className="h-4 w-4" />
              Use this template
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
            {template.features.map((f) => (
              <span
                key={f}
                className="rounded-full border border-[#e4ddd2] bg-[#f8f4ee] px-2.5 py-0.5 text-xs text-[#655f55]"
              >
                {f}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </button>
  );
}

export function TemplatesGallery() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");

  const enabled = useMemo(
    () => templateDefinitions.filter((template) => template.isEnabled),
    []
  );

  const filtered =
    activeFilter === "all"
      ? enabled
      : enabled.filter((template) => template.category === activeFilter);

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: enabled.map((template, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: template.name,
      url: "https://www.resumeable.cv/templates",
    })),
  };

  return (
    <MarketingShell title="Templates">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <section className="max-w-4xl">
        <p className="inline-flex rounded-full border border-[#d8d1c7] bg-[#ede7de] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#4f4b44]">
          Template library
        </p>
        <h1 className="mt-5 font-[family-name:var(--font-fraunces)] text-4xl font-semibold leading-[1.05] text-[#111827] sm:text-6xl">
          ATS-safe templates with clear hierarchy.
        </h1>
        <p className="mt-5 max-w-2xl font-[family-name:var(--font-manrope)] text-lg leading-relaxed text-[#4f4b44] sm:text-xl">
          Pick the structure that fits your career story. Every template is built for readability, recruiter scanning, and clean PDF export.
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
            <TemplateCard key={template.id} template={template} />
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
            Choosing the right template
          </h2>
          <ul className="mt-5 space-y-3 text-sm leading-relaxed text-[#4f4b44]">
            <li>Use minimal layouts if your experience is linear and results-driven.</li>
            <li>Use professional layouts when you need clean sections for mixed experience.</li>
            <li>Use creative layouts for design-forward roles while keeping ATS-safe content order.</li>
          </ul>
          <Link href="/builder/new" className="mt-7 inline-block">
            <Button className="rounded-full bg-[#0f766e] px-6 font-semibold text-white hover:bg-[#0b5f59]">
              Start with this style
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </article>

        <article className="rounded-3xl border border-[#c7ddd8] bg-[#eefaf7] p-7">
          <h2 className="font-[family-name:var(--font-fraunces)] text-3xl font-medium text-[#0f172a]">
            Why these templates rank well
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#1d4f48]">
            Search engines and users both reward pages that are specific and useful. These templates are paired with clear use cases, scannable copy, and direct action paths.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[#1d4f48]">
            You can switch layouts later without rewriting your content, which supports iteration during active job searches.
          </p>
        </article>
      </section>
    </MarketingShell>
  );
}
