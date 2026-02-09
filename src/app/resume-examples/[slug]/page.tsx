import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  AlertTriangle,
  Briefcase,
  CheckCircle2,
  GraduationCap,
  Lightbulb,
  Mail,
  MapPin,
  Phone,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getExampleBySlug,
  getRelatedExamples,
  resumeExamples,
} from "@/data/resume-examples";
import { MarketingShell } from "@/components/site/MarketingShell";

export function generateStaticParams() {
  return resumeExamples.map((example) => ({
    slug: example.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const example = getExampleBySlug(slug);

  if (!example) {
    return {};
  }

  const title = `${example.jobTitle} Resume Example & Writing Guide (2026)`;
  const url = `https://www.resumeable.cv/resume-examples/${slug}`;

  return {
    title,
    description: example.metaDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description: example.metaDescription,
      url,
    },
  };
}

function JsonLd({ title, slug }: { title: string; slug: string }) {
  const url = `https://www.resumeable.cv/resume-examples/${slug}`;

  const data = [
    {
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
        {
          "@type": "ListItem",
          position: 3,
          name: title,
          item: url,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `${title} Resume Example & Writing Guide`,
      url,
      publisher: {
        "@type": "Organization",
        name: "Resumeable",
        url: "https://www.resumeable.cv",
      },
    },
  ];

  return (
    <>
      {data.map((entry, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
        />
      ))}
    </>
  );
}

export default async function ResumeExamplePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const example = getExampleBySlug(slug);

  if (!example) {
    notFound();
  }

  const relatedExamples = getRelatedExamples(slug, 3);
  const sample = example.sampleResume;

  return (
    <MarketingShell title="Resume Example" backHref="/resume-examples" backLabel="All examples">
      <JsonLd title={example.jobTitle} slug={slug} />

      <section className="max-w-4xl">
        <p className="inline-flex rounded-full border border-[#d8d1c7] bg-[#ede7de] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#4f4b44]">
          {example.category}
        </p>
        <h1 className="mt-5 font-[family-name:var(--font-fraunces)] text-4xl font-semibold leading-[1.06] text-[#111827] sm:text-5xl">
          {example.jobTitle} Resume Example
        </h1>
        <p className="mt-4 max-w-3xl font-[family-name:var(--font-manrope)] text-lg leading-relaxed text-[#4f4b44]">
          {example.intro}
        </p>
      </section>

      <section className="mt-10 rounded-3xl border border-[#ddd5ca] bg-[#fffdf9] p-5 sm:p-7">
        <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-medium text-[#111827] sm:text-3xl">
          Sample {example.jobTitle} Resume
        </h2>

        <article className="mt-5 rounded-2xl border border-[#e1d9ce] bg-[#fefcf8] p-5 sm:p-6">
          <header className="border-b border-[#e7dfd4] pb-4">
            <h3 className="text-2xl font-semibold text-[#111827]">{sample.name}</h3>
            <p className="mt-1 font-semibold text-[#0f766e]">{sample.title}</p>
            <div className="mt-3 grid gap-2 text-sm text-[#5f5a51] sm:grid-cols-2">
              <span className="inline-flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5" />
                {sample.email}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5" />
                {sample.phone}
              </span>
              <span className="inline-flex items-center gap-1.5 sm:col-span-2">
                <MapPin className="h-3.5 w-3.5" />
                {sample.location}
              </span>
            </div>
          </header>

          <section className="mt-5">
            <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8b857b]">
              Professional summary
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-[#4f4b44]">{sample.summary}</p>
          </section>

          <section className="mt-6">
            <h4 className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#8b857b]">
              <Briefcase className="h-3.5 w-3.5" />
              Experience
            </h4>
            <div className="mt-3 space-y-5">
              {sample.experience.map((item, index) => (
                <article key={index} className="rounded-xl border border-[#e6dfd4] bg-white p-4">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <h5 className="font-semibold text-[#111827]">{item.title}</h5>
                    <span className="text-sm text-[#6e685f]">{item.period}</span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-[#0f766e]">{item.company}</p>
                  <ul className="mt-2 space-y-1.5">
                    {item.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="relative pl-4 text-sm leading-relaxed text-[#4f4b44]">
                        <span className="absolute left-0 top-0 text-[#a39b8f]">•</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-6">
            <h4 className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#8b857b]">
              <GraduationCap className="h-3.5 w-3.5" />
              Education
            </h4>
            <div className="mt-3 space-y-3">
              {sample.education.map((item, index) => (
                <div key={index} className="rounded-xl border border-[#e6dfd4] bg-white p-4">
                  <p className="font-semibold text-[#111827]">{item.degree}</p>
                  <p className="text-sm text-[#5e5a51]">{item.school}</p>
                  <p className="mt-1 text-sm text-[#6e685f]">{item.year}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-6">
            <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8b857b]">Skills</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {sample.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-[#e4ddd2] bg-[#f8f4ee] px-3 py-1 text-sm text-[#5f5a51]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </article>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        <article className="rounded-3xl border border-[#ddd5ca] bg-[#fcfaf6] p-6">
          <h2 className="inline-flex items-center gap-2 font-[family-name:var(--font-fraunces)] text-2xl font-medium text-[#111827]">
            <Lightbulb className="h-5 w-5 text-[#b7791f]" />
            How to write this resume
          </h2>
          <div className="mt-4 space-y-3">
            {example.writingTips.map((tip, index) => (
              <div key={index} className="rounded-xl border border-[#e3dbcf] bg-white p-4">
                <h3 className="font-semibold text-[#111827]">{tip.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#4f4b44]">{tip.description}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="space-y-6">
          <div className="rounded-3xl border border-[#c7ddd8] bg-[#eefaf7] p-6">
            <h2 className="inline-flex items-center gap-2 font-[family-name:var(--font-fraunces)] text-2xl font-medium text-[#0f172a]">
              <CheckCircle2 className="h-5 w-5 text-[#0f766e]" />
              Key skills to include
            </h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {example.keySkills.map((skill) => (
                <li key={skill} className="rounded-xl border border-[#d4ebe5] bg-[#f7fffc] px-3 py-2 text-sm text-[#12453f]">
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-[#efcfcf] bg-[#fff1f1] p-6">
            <h2 className="inline-flex items-center gap-2 font-[family-name:var(--font-fraunces)] text-2xl font-medium text-[#5b1b1b]">
              <AlertTriangle className="h-5 w-5 text-[#c24141]" />
              Common mistakes
            </h2>
            <ul className="mt-4 space-y-2">
              {example.commonMistakes.map((mistake) => (
                <li
                  key={mistake}
                  className="rounded-xl border border-[#f4d7d7] bg-white px-3 py-2 text-sm text-[#6c2c2c]"
                >
                  {mistake}
                </li>
              ))}
            </ul>
          </div>
        </article>
      </section>

      {relatedExamples.length > 0 ? (
        <section className="mt-10">
          <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-medium text-[#111827] sm:text-3xl">
            Related examples
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedExamples.map((related) => (
              <Link
                key={related.slug}
                href={`/resume-examples/${related.slug}`}
                className="group rounded-2xl border border-[#ddd5ca] bg-[#fffdf9] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#a5c9c2]"
              >
                <h3 className="font-semibold text-[#111827] group-hover:text-[#0f766e]">{related.jobTitle}</h3>
                <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-[#4f4b44]">
                  {related.metaDescription}
                </p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-10 rounded-3xl border border-[#c7ddd8] bg-[#eaf7f4] p-7 text-center sm:p-10">
        <Zap className="mx-auto h-8 w-8 text-[#0f766e]" />
        <h2 className="mt-3 font-[family-name:var(--font-fraunces)] text-3xl font-semibold text-[#0f172a]">
          Build your {example.jobTitle} resume now
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#1d4f48] sm:text-base">
          Use this example as a framework, then tailor each bullet to your own outcomes.
        </p>
        <Link href="/builder/new" className="mt-6 inline-block">
          <Button className="rounded-full bg-[#0f766e] px-7 font-semibold text-white hover:bg-[#0b5f59]">
            Create your resume
          </Button>
        </Link>
      </section>
    </MarketingShell>
  );
}
