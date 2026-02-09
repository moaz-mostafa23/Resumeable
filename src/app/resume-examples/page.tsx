import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { resumeExamples, categories } from "@/data/resume-examples";
import { MarketingShell } from "@/components/site/MarketingShell";

export const metadata: Metadata = {
  title: "Resume Examples for Every Job Title (2026)",
  description:
    "Browse 30+ free resume examples by industry and role. Each example includes sample content, writing guidance, and key skills to improve your resume.",
  alternates: {
    canonical: "https://www.resumeable.cv/resume-examples",
  },
  openGraph: {
    title: "Resume Examples for Every Job Title — Resumeable",
    description:
      "Explore 30+ resume examples with practical writing guidance and role-specific skills.",
    url: "https://www.resumeable.cv/resume-examples",
  },
};

function JsonLd() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.resumeable.cv",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Resume Examples",
        item: "https://www.resumeable.cv/resume-examples",
      },
    ],
  };

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: resumeExamples.map((example, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://www.resumeable.cv/resume-examples/${example.slug}`,
      name: `${example.jobTitle} resume example`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
    </>
  );
}

export default function ResumeExamplesPage() {
  return (
    <MarketingShell title="Resume Examples">
      <JsonLd />

      <section className="mx-auto max-w-4xl text-center">
        <p className="inline-flex rounded-full border border-[#d8d1c7] bg-[#ede7de] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#4f4b44]">
          Writing references
        </p>
        <h1 className="mt-5 font-[family-name:var(--font-fraunces)] text-4xl font-semibold leading-[1.06] text-[#111827] sm:text-6xl">
          Real resume examples, role by role.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl font-[family-name:var(--font-manrope)] text-lg leading-relaxed text-[#4f4b44] sm:text-xl">
          Use these examples to improve structure, phrasing, and impact bullets before you edit your own resume.
        </p>
      </section>

      <section className="mx-auto mt-12 max-w-6xl space-y-10">
        {categories.map((category) => {
          const examples = resumeExamples.filter((example) => example.category === category);
          if (examples.length === 0) {
            return null;
          }

          return (
            <section key={category}>
              <h2 className="mb-4 flex items-center gap-2.5 font-[family-name:var(--font-fraunces)] text-2xl font-medium text-[#111827] sm:text-3xl">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#e4ddd2] text-[#0f766e]">
                  <FileText className="h-4 w-4" />
                </span>
                {category}
              </h2>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {examples.map((example) => (
                  <Link
                    key={example.slug}
                    href={`/resume-examples/${example.slug}`}
                    className="group rounded-2xl border border-[#ddd5ca] bg-[#fffdf9] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#a5c9c2] hover:shadow-[0_20px_55px_-45px_rgba(16,24,40,0.9)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold text-[#111827] group-hover:text-[#0f766e]">
                          {example.jobTitle}
                        </h3>
                        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-[#4f4b44]">
                          {example.metaDescription}
                        </p>
                      </div>
                      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-[#7a746a] group-hover:text-[#0f766e]" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </section>

      <section className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <article className="rounded-3xl border border-[#ddd5ca] bg-[#fcfaf6] p-7">
          <h2 className="font-[family-name:var(--font-fraunces)] text-3xl font-medium text-[#111827]">
            How to use these examples
          </h2>
          <ol className="mt-5 space-y-3 text-sm leading-relaxed text-[#4f4b44]">
            <li>1. Pick the closest role and seniority level.</li>
            <li>2. Borrow structure and bullet style, not exact wording.</li>
            <li>3. Rewrite each point with your own impact metrics.</li>
          </ol>
          <Link href="/builder/new" className="mt-7 inline-block">
            <Button className="rounded-full bg-[#0f766e] px-6 font-semibold text-white hover:bg-[#0b5f59]">
              Build from an example
            </Button>
          </Link>
        </article>

        <article className="rounded-3xl border border-[#c7ddd8] bg-[#eefaf7] p-7">
          <h2 className="font-[family-name:var(--font-fraunces)] text-3xl font-medium text-[#0f172a]">
            What hiring teams scan first
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#1d4f48]">
            Clear titles, recent experience, and concise, measurable bullets. Keep each section skimmable on both desktop and mobile.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[#1d4f48]">
            This page groups examples by role so users on small screens can find relevant samples quickly.
          </p>
        </article>
      </section>
    </MarketingShell>
  );
}
