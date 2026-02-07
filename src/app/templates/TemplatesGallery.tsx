"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { templateDefinitions, TemplateDefinition } from "@/lib/template-registry";
import { TemplateId } from "@/types/resume";
import { ArrowLeft, Check, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  StaticATSMinimal,
  StaticModernMinimal,
  StaticTwoColumnSidebar,
  StaticCorporateTimeline,
  StaticCreativeInfographic,
  StaticElegantPhoto,
  StaticBoldHeader,
} from "@/components/templates/previews";

/**
 * Public-facing template gallery — premium design with realistic previews.
 *
 * Server-indexed for SEO (the server component in page.tsx sets all metadata).
 * Interactive bits (filters, hover states, navigation) live here.
 */

type FilterCategory = "all" | "minimal" | "professional" | "creative";

const filterOptions: { label: string; value: FilterCategory }[] = [
  { label: "All Templates", value: "all" },
  { label: "Minimal", value: "minimal" },
  { label: "Professional", value: "professional" },
  { label: "Creative", value: "creative" },
];

// Map template IDs to their static preview components
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
      className="group relative bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 text-left focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2"
    >
      {/* Preview area — renders at card size directly, no transform scaling */}
      <div className="relative overflow-hidden bg-white" style={{ aspectRatio: "8.5 / 11", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <TemplatePreviewRenderer id={template.id} />
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-end pb-8">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <span className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-2.5 rounded-full font-semibold text-sm shadow-lg">
              <Sparkles className="h-4 w-4" />
              Use this template
            </span>
          </div>
        </div>
      </div>

      {/* Card info */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="font-semibold text-gray-900 text-lg leading-tight">
            {template.name}
          </h3>
          {template.atsFriendly && (
            <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200/60">
              <Check className="h-3 w-3" />
              ATS
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500 leading-relaxed mb-3 line-clamp-2">
          {template.description}
        </p>
        {template.features.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {template.features.map((f) => (
              <span
                key={f}
                className="text-xs px-2.5 py-0.5 bg-gray-50 text-gray-500 rounded-full border border-gray-100"
              >
                {f}
              </span>
            ))}
          </div>
        )}
      </div>
    </button>
  );
}

export function TemplatesGallery() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");

  const enabled = templateDefinitions.filter((t) => t.isEnabled);
  const filtered =
    activeFilter === "all"
      ? enabled
      : enabled.filter((t) => t.category === activeFilter);

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2 text-gray-600 hover:text-gray-900">
                  <ArrowLeft className="h-4 w-4" />
                  Home
                </Button>
              </Link>
              <div className="h-6 w-px bg-gray-200" />
              <div className="flex items-center gap-2">
                <Logo className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-semibold text-gray-900">
                  Templates
                </h1>
              </div>
            </div>
            <Link href="/builder/new">
              <Button className="gap-2 shadow-sm">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero intro */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-2">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Professional Resume Templates
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Every template is designed to be clean, readable, and compatible with
            applicant tracking systems. Pick the layout that fits your style, then
            customise colours, fonts, and spacing in the editor.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setActiveFilter(opt.value)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                activeFilter === opt.value
                  ? "bg-gray-900 text-white shadow-sm"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:text-gray-900"
              )}
            >
              {opt.label}
              {opt.value !== "all" && (
                <span className="ml-1.5 text-xs opacity-70">
                  ({enabled.filter((t) => t.category === opt.value).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Template grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              No templates in this category yet. More designs are coming soon!
            </p>
          </div>
        )}

        {/* Extra SEO content below the fold */}
        <div className="mt-20 max-w-3xl mx-auto text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            What makes a good resume template?
          </h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            The best resume templates balance visual appeal with readability.
            Applicant tracking systems (ATS) parse resumes before a human ever
            sees them, so clean structure matters more than flashy design. All
            Resumeable templates are tested against common ATS parsers and
            designed with recruiter feedback in mind.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Whether you&apos;re a recent graduate or a seasoned professional,
            the right template puts your experience front and centre. Pick one
            above and start building — it only takes a few minutes.
          </p>
        </div>
      </main>
    </div>
  );
}
