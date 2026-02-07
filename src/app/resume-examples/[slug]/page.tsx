import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import {
  ArrowLeft,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import {
  resumeExamples,
  getExampleBySlug,
  getRelatedExamples,
} from "@/data/resume-examples";

// ── Static params ──────────────────────────────────────────────────────

export function generateStaticParams() {
  return resumeExamples.map((example) => ({
    slug: example.slug,
  }));
}

// ── Metadata ───────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const example = getExampleBySlug(slug);
  if (!example) return {};

  const title = `${example.jobTitle} Resume Example & Writing Guide (2026)`;
  const url = `https://www.resumeable.cv/resume-examples/${slug}`;

  return {
    title,
    description: example.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: example.metaDescription,
      url,
    },
  };
}

// ── JSON-LD ────────────────────────────────────────────────────────────

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
      {data.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }}
        />
      ))}
    </>
  );
}

// ── Page ────────────────────────────────────────────────────────────────

export default async function ResumeExamplePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const example = getExampleBySlug(slug);
  if (!example) notFound();

  const { sampleResume: r } = example;

  return (
    <div className="min-h-screen bg-gray-50">
      <JsonLd title={example.jobTitle} slug={slug} />

      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/resume-examples">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                All Examples
              </Button>
            </Link>
            <div className="h-6 w-px bg-gray-200" />
            <div className="flex items-center gap-2">
              <Logo className="h-6 w-6 text-primary" />
              <span className="font-semibold text-lg">Resumeable</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-gray-700">
            Home
          </Link>
          {" / "}
          <Link href="/resume-examples" className="hover:text-gray-700">
            Resume Examples
          </Link>
          {" / "}
          <span className="text-gray-900">{example.jobTitle}</span>
        </nav>

        {/* H1 + Intro */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          {example.jobTitle} Resume Example
        </h1>
        <p className="text-lg text-gray-600 mb-10 leading-relaxed">
          {example.intro}
        </p>

        {/* ── Sample Resume Card ────────────────────────────────────── */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Sample {example.jobTitle} Resume
          </h2>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
            {/* Header */}
            <div className="border-b border-gray-100 pb-5">
              <h3 className="text-2xl font-bold text-gray-900">{r.name}</h3>
              <p className="text-primary font-medium mt-1">{r.title}</p>
              <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5" />
                  {r.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="h-3.5 w-3.5" />
                  {r.phone}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {r.location}
                </span>
              </div>
            </div>

            {/* Summary */}
            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Professional Summary
              </h4>
              <p className="text-gray-700 leading-relaxed">{r.summary}</p>
            </div>

            {/* Experience */}
            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Briefcase className="h-3.5 w-3.5" />
                Experience
              </h4>
              <div className="space-y-5">
                {r.experience.map((exp, i) => (
                  <div key={i}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                      <h5 className="font-semibold text-gray-900">
                        {exp.title}
                      </h5>
                      <span className="text-sm text-gray-500">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-sm text-primary mb-2">{exp.company}</p>
                    <ul className="space-y-1.5">
                      {exp.bullets.map((bullet, j) => (
                        <li
                          key={j}
                          className="text-sm text-gray-600 pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-gray-400"
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <GraduationCap className="h-3.5 w-3.5" />
                Education
              </h4>
              <div className="space-y-2">
                {r.education.map((edu, i) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row sm:justify-between"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{edu.degree}</p>
                      <p className="text-sm text-gray-500">{edu.school}</p>
                    </div>
                    <span className="text-sm text-gray-500">{edu.year}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {r.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Writing Tips ──────────────────────────────────────────── */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-amber-500" />
            How to Write a {example.jobTitle} Resume
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {example.writingTips.map((tip, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-200 p-5"
              >
                <h3 className="font-semibold text-gray-900 mb-2">
                  {tip.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {tip.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Key Skills ────────────────────────────────────────────── */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            Key Skills for {example.jobTitle} Resumes
          </h2>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <ul className="grid sm:grid-cols-2 gap-2">
              {example.keySkills.map((skill) => (
                <li
                  key={skill}
                  className="flex items-start gap-2 text-sm text-gray-700"
                >
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Common Mistakes ───────────────────────────────────────── */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Common Mistakes to Avoid
          </h2>
          <div className="bg-red-50 rounded-xl border border-red-100 p-5">
            <ul className="space-y-3">
              {example.commonMistakes.map((mistake) => (
                <li
                  key={mistake}
                  className="flex items-start gap-2 text-sm text-red-800"
                >
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                  {mistake}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Related Examples ──────────────────────────────────────── */}
        {(() => {
          const related = getRelatedExamples(slug, 3);
          if (related.length === 0) return null;
          return (
            <section className="mb-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Related Resume Examples
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {related.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/resume-examples/${rel.slug}`}
                    className="group bg-white rounded-xl border border-gray-200 p-5 hover:border-primary hover:shadow-md transition-all"
                  >
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                      {rel.jobTitle}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {rel.metaDescription}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })()}

        {/* ── CTA ───────────────────────────────────────────────────── */}
        <section className="bg-primary/5 rounded-2xl border border-primary/10 p-8 text-center">
          <Zap className="h-8 w-8 text-primary mx-auto mb-3" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Build Your {example.jobTitle} Resume Now
          </h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Use this example as inspiration. Pick a template, fill in your
            details, and download your resume — completely free.
          </p>
          <Link href="/builder/new">
            <Button size="lg">
              <Zap className="h-4 w-4 mr-2" />
              Create Your Resume
            </Button>
          </Link>
        </section>
      </div>
    </div>
  );
}
