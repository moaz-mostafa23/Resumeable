"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { templateDefinitions } from "@/lib/template-registry";
import { TemplateId } from "@/types/resume";
import { ArrowLeft, Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Public-facing template gallery.
 *
 * This page is server-indexed for SEO (the server component in page.tsx
 * sets all metadata). The interactive bits live here in a client component.
 */

// Reusable mini-preview matching the builder/new page style
function TemplateThumbnail({ id }: { id: TemplateId }) {
  const layouts: Record<TemplateId, React.ReactNode> = {
    "ats-minimal": (
      <>
        <div className="w-1/2 h-3 bg-gray-300 rounded mb-1 mx-auto" />
        <div className="w-1/3 h-2 bg-gray-200 rounded mb-3 mx-auto" />
        <div className="w-full h-2 bg-gray-100 rounded mb-1" />
        <div className="w-full h-2 bg-gray-100 rounded mb-1" />
        <div className="flex-1" />
        <div className="w-2/3 h-2 bg-gray-200 rounded mb-1" />
        <div className="w-full h-1.5 bg-gray-100 rounded mb-1" />
        <div className="w-full h-1.5 bg-gray-100 rounded" />
      </>
    ),
    "modern-minimal": (
      <>
        <div className="border-b-2 border-primary/40 pb-2 mb-2">
          <div className="w-1/2 h-3 bg-gray-300 rounded mb-1" />
          <div className="w-1/3 h-2 bg-primary/30 rounded" />
        </div>
        <div className="flex gap-2 mb-2">
          <div className="w-1 h-3 bg-primary/40 rounded" />
          <div className="w-1/4 h-2 bg-gray-200 rounded" />
        </div>
        <div className="flex-1" />
        <div className="flex gap-1 flex-wrap">
          <div className="w-8 h-3 bg-gray-100 rounded" />
          <div className="w-10 h-3 bg-gray-100 rounded" />
          <div className="w-6 h-3 bg-gray-100 rounded" />
        </div>
      </>
    ),
    "two-column-sidebar": (
      <div className="flex h-full gap-2">
        <div className="w-1/3 bg-primary/20 rounded p-1">
          <div className="w-full h-2 bg-white/60 rounded mb-2" />
          <div className="w-full h-1.5 bg-white/40 rounded mb-1" />
          <div className="w-full h-1.5 bg-white/40 rounded mb-1" />
          <div className="w-2/3 h-1.5 bg-white/40 rounded" />
        </div>
        <div className="flex-1 flex flex-col">
          <div className="w-full h-2 bg-gray-200 rounded mb-2" />
          <div className="w-full h-1.5 bg-gray-100 rounded mb-1" />
          <div className="w-full h-1.5 bg-gray-100 rounded mb-1" />
          <div className="flex-1" />
          <div className="w-2/3 h-1.5 bg-gray-100 rounded" />
        </div>
      </div>
    ),
    "corporate-timeline": (
      <>
        <div className="w-1/2 h-3 bg-gray-300 rounded mb-1" />
        <div className="w-1/3 h-2 bg-primary/30 rounded mb-3" />
        <div className="flex items-start gap-2 mb-2">
          <div className="w-8 text-right">
            <div className="w-full h-1.5 bg-gray-200 rounded" />
          </div>
          <div className="w-2 h-2 rounded-full bg-primary/40 mt-0.5" />
          <div className="flex-1">
            <div className="w-full h-2 bg-gray-200 rounded mb-1" />
            <div className="w-2/3 h-1.5 bg-gray-100 rounded" />
          </div>
        </div>
        <div className="flex-1" />
      </>
    ),
    "creative-infographic": (
      <>
        <div className="bg-primary/30 -m-3 mb-2 p-2">
          <div className="w-1/2 h-3 bg-white/80 rounded mb-1" />
          <div className="w-1/3 h-2 bg-white/60 rounded" />
        </div>
        <div className="flex items-center gap-1 mb-2">
          <div className="w-4 h-4 rounded bg-primary/20" />
          <div className="w-1/4 h-2 bg-gray-200 rounded" />
        </div>
        <div className="flex-1" />
        <div className="flex gap-1">
          <div className="flex-1 h-8 bg-gray-50 rounded p-1">
            <div className="w-full h-1.5 bg-primary/20 rounded mb-0.5" />
            <div className="w-2/3 h-1 bg-gray-200 rounded" />
          </div>
          <div className="flex-1 h-8 bg-gray-50 rounded p-1">
            <div className="w-full h-1.5 bg-primary/20 rounded mb-0.5" />
            <div className="w-2/3 h-1 bg-gray-200 rounded" />
          </div>
        </div>
      </>
    ),
  };

  return (
    <div className="w-full h-full bg-white rounded shadow-sm border border-gray-100 p-3 flex flex-col">
      {layouts[id]}
    </div>
  );
}

export function TemplatesGallery() {
  const router = useRouter();
  const enabled = templateDefinitions.filter((t) => t.isEnabled);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Home
                </Button>
              </Link>
              <div className="h-6 w-px bg-gray-200" />
              <div className="flex items-center gap-2">
                <Logo className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-semibold text-gray-900">
                  Resume Templates
                </h1>
              </div>
            </div>
            <Link href="/builder/new">
              <Button className="gap-2">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Intro (good for SEO — actual content on the page) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Free Resume Templates
        </h2>
        <p className="text-gray-600 max-w-2xl text-lg leading-relaxed">
          Every template is designed to be clean, readable, and compatible with
          applicant tracking systems. Pick the layout that fits your style, then
          customise colours, fonts, and spacing in the editor.
        </p>
      </div>

      {/* Template grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {enabled.map((template) => (
            <button
              key={template.id}
              onClick={() => router.push("/builder/new")}
              className="group relative bg-white rounded-xl border-2 border-gray-200 overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg text-left"
            >
              {/* Thumbnail */}
              <div className="aspect-[8.5/11] bg-gradient-to-br from-gray-100 to-gray-50 p-4 relative">
                <TemplateThumbnail id={template.id} />
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-1.5">
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {template.name}
                  </h3>
                  {template.atsFriendly && (
                    <span className="text-xs font-medium px-2 py-0.5 bg-green-100 text-green-700 rounded-full flex items-center gap-1">
                      <Check className="h-3 w-3" />
                      ATS Friendly
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mb-3">
                  {template.description}
                </p>
                {template.features.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {template.features.map((f) => (
                      <span
                        key={f}
                        className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <span className="bg-primary text-white px-4 py-2 rounded-lg font-medium shadow-lg translate-y-2 group-hover:translate-y-0 transition-transform">
                  Use this template
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Extra SEO content below the fold */}
        <div className="mt-16 max-w-3xl mx-auto text-center">
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
