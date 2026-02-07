import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { ArrowLeft, ArrowRight, FileText } from "lucide-react";
import { resumeExamples, categories } from "@/data/resume-examples";

export const metadata: Metadata = {
  title: "Resume Examples for Every Job Title (2026) — Resumeable",
  description:
    "Browse 30+ free resume examples organized by industry. Each includes a full sample resume, writing tips, and key skills to help you build a job-winning resume.",
  alternates: {
    canonical: "https://www.resumeable.cv/resume-examples",
  },
  openGraph: {
    title: "Resume Examples for Every Job Title — Resumeable",
    description:
      "Browse 30+ free resume examples organized by industry. Real samples with writing tips and skills for every career level.",
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
    />
  );
}

export default function ResumeExamplesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <JsonLd />

      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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
              <span className="font-semibold text-lg">Resumeable</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Resume Examples for Every Job
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
          Browse real resume samples organized by industry and role. Each
          example includes a complete sample resume, specific writing tips, key
          skills, and common mistakes to avoid.
        </p>
        <p className="text-gray-500 max-w-xl mx-auto">
          Whether you&apos;re a software engineer, nurse, teacher, or career
          changer — find the example that fits your situation and use it as a
          starting point for your own resume.
        </p>
      </div>

      {/* Categories */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="space-y-12">
          {categories.map((category) => {
            const examples = resumeExamples.filter(
              (e) => e.category === category
            );
            if (examples.length === 0) return null;

            return (
              <section key={category}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <FileText className="h-6 w-6 text-primary" />
                  {category}
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {examples.map((example) => (
                    <Link
                      key={example.slug}
                      href={`/resume-examples/${example.slug}`}
                      className="group bg-white rounded-xl border border-gray-200 p-5 hover:border-primary hover:shadow-md transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                            {example.jobTitle}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                            {example.metaDescription}
                          </p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-primary shrink-0 ml-3 transition-colors" />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Ready to build your resume?
          </h2>
          <p className="text-gray-600 mb-6">
            Pick a template, fill in your details, and download — completely
            free.
          </p>
          <Link href="/builder/new">
            <Button size="lg">Create Your Resume</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
