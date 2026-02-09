"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Loader2, Sparkles, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSubscription } from "@/hooks/useSubscription";
import { MarketingShell } from "@/components/site/MarketingShell";

interface PlanFeature {
  text: string;
  included: boolean;
  highlight?: boolean;
}

const freePlanFeatures: PlanFeature[] = [
  { text: "Drag-and-drop editor", included: true },
  { text: "Real-time preview", included: true },
  { text: "2 professional templates", included: true },
  { text: "PDF export", included: true },
  { text: "15+ section types", included: true },
  { text: "1 saved resume (with account)", included: true },
  { text: "All premium templates", included: false },
  { text: "AI bullet-point suggestions", included: false },
  { text: "Watermark-free PDF export", included: false },
  { text: "Unlimited saved resumes", included: false },
];

const proPlanFeatures: PlanFeature[] = [
  { text: "Everything in Free", included: true },
  { text: "All premium templates", included: true, highlight: true },
  { text: "AI bullet-point suggestions", included: true, highlight: true },
  { text: "Watermark-free PDF export", included: true, highlight: true },
  { text: "Unlimited saved resumes", included: true },
  { text: "Custom colour themes", included: true },
  { text: "Priority new templates", included: true },
  { text: "Cover letter builder (coming soon)", included: true },
];

const faqs = [
  {
    q: "Is the free plan actually free?",
    a: "Yes. No trial, no credit card, and no hidden gate after you finish your resume.",
  },
  {
    q: "What do I get with Pro?",
    a: "Pro unlocks premium templates, AI bullet suggestions, clean PDF exports, and unlimited saved resumes.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Cancel from your billing settings and you will not be charged again.",
  },
  {
    q: "Do you offer one-time purchase options?",
    a: "Not yet. A one-time export pass is on the roadmap for users who only need one final PDF.",
  },
  {
    q: "Is my data safe?",
    a: "Resume data is stored securely with Supabase and protected by row-level access controls.",
  },
];

export function PricingPage() {
  const { isPro, startCheckout, loading: subLoading } = useSubscription();
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const handleUpgrade = async () => {
    setCheckoutLoading(true);
    try {
      await startCheckout();
    } finally {
      setCheckoutLoading(false);
    }
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <MarketingShell title="Pricing">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="mx-auto max-w-4xl text-center">
        <p className="inline-flex rounded-full border border-[#d8d1c7] bg-[#ede7de] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#4f4b44]">
          Transparent plans
        </p>
        <h1 className="mt-5 font-[family-name:var(--font-fraunces)] text-4xl font-semibold leading-[1.05] text-[#111827] sm:text-6xl">
          Pay only for power features.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl font-[family-name:var(--font-manrope)] text-lg leading-relaxed text-[#4f4b44] sm:text-xl">
          Start free, ship your resume fast, and upgrade only when you need deeper customization.
        </p>
      </section>

      <section className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-2">
        <article className="rounded-3xl border border-[#ddd5ca] bg-[#fdfaf5] p-7 shadow-[0_24px_80px_-62px_rgba(16,24,40,0.6)]">
          <h2 className="font-[family-name:var(--font-fraunces)] text-3xl font-medium text-[#111827]">
            Free
          </h2>
          <div className="mt-2 flex items-end gap-2">
            <span className="text-5xl font-semibold text-[#111827]">$0</span>
            <span className="pb-1 text-sm font-semibold uppercase tracking-[0.08em] text-[#6a665e]">
              forever
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-[#4f4b44]">
            Perfect for first drafts, quick applications, and early career updates.
          </p>

          <ul className="mt-6 space-y-3">
            {freePlanFeatures.map((feature) => (
              <li key={feature.text} className="flex items-start gap-2.5 text-sm">
                {feature.included ? (
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0f766e]" />
                ) : (
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-[#bbb4a9]" />
                )}
                <span className={cn(feature.included ? "text-[#3f3c36]" : "text-[#9f988d]")}>{feature.text}</span>
              </li>
            ))}
          </ul>

          <Link href="/builder/new" className="mt-7 block">
            <Button
              size="lg"
              variant="outline"
              className="w-full rounded-full border-[#cbc2b7] bg-[#f8f5ef] text-base font-semibold text-[#1f2937] hover:bg-[#ede5d9]"
            >
              Start free
            </Button>
          </Link>
        </article>

        <article className="relative rounded-3xl border border-[#a6cbc3] bg-[#eefaf7] p-7 shadow-[0_30px_90px_-60px_rgba(15,118,110,0.7)]">
          <div className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full border border-[#8ecfc1] bg-[#daf5ee] px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-[#0f766e]">
            <Sparkles className="h-3.5 w-3.5" />
            Most popular
          </div>

          <h2 className="font-[family-name:var(--font-fraunces)] text-3xl font-medium text-[#0f172a]">
            Pro
          </h2>
          <div className="mt-2 flex items-end gap-2">
            <span className="text-5xl font-semibold text-[#0f172a]">$5</span>
            <span className="pb-1 text-sm font-semibold uppercase tracking-[0.08em] text-[#1d4f48]">
              / month
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-[#1d4f48]">
            For active job searches that need higher velocity and cleaner output.
          </p>

          <ul className="mt-6 space-y-3">
            {proPlanFeatures.map((feature) => (
              <li key={feature.text} className="flex items-start gap-2.5 text-sm text-[#103b37]">
                <Check
                  className={cn(
                    "mt-0.5 h-4 w-4 shrink-0",
                    feature.highlight ? "text-[#0f766e]" : "text-[#0f766e]/80"
                  )}
                />
                <span className={cn(feature.highlight ? "font-semibold" : "")}>{feature.text}</span>
              </li>
            ))}
          </ul>

          {isPro ? (
            <Link href="/dashboard" className="mt-7 block">
              <Button
                size="lg"
                className="w-full rounded-full bg-[#0f766e] text-base font-semibold text-white hover:bg-[#0b5f59]"
              >
                <Check className="mr-2 h-4 w-4" />
                You&apos;re on Pro
              </Button>
            </Link>
          ) : (
            <Button
              size="lg"
              onClick={handleUpgrade}
              disabled={checkoutLoading || subLoading}
              className="mt-7 w-full rounded-full bg-[#0f766e] text-base font-semibold text-white hover:bg-[#0b5f59]"
            >
              {checkoutLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Zap className="mr-2 h-4 w-4" />
              )}
              {checkoutLoading ? "Redirecting..." : "Upgrade to Pro"}
            </Button>
          )}
        </article>
      </section>

      <section className="mx-auto mt-16 grid max-w-5xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-3xl border border-[#ddd5ca] bg-[#fcfaf6] p-7">
          <h2 className="font-[family-name:var(--font-fraunces)] text-3xl font-medium text-[#111827]">
            Plan guidance
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-[#4f4b44]">
            <p>
              Choose <strong className="text-[#111827]">Free</strong> if you need one polished resume quickly.
            </p>
            <p>
              Choose <strong className="text-[#111827]">Pro</strong> if you are applying to multiple roles and want AI-assisted iterations.
            </p>
            <p>
              Both plans keep the editor experience fast and ATS-conscious by default.
            </p>
          </div>
          <Link href="/builder/new" className="mt-6 inline-block">
            <Button className="rounded-full bg-[#0f766e] px-6 font-semibold text-white hover:bg-[#0b5f59]">
              Build a free draft first
            </Button>
          </Link>
        </article>

        <article className="rounded-3xl border border-[#dfd7cc] bg-[#fbf8f3] p-7">
          <h2 className="font-[family-name:var(--font-fraunces)] text-3xl font-medium text-[#111827]">
            FAQs
          </h2>
          <div className="mt-5 space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded-xl border border-[#e1d8cd] bg-[#fffdf9] p-4">
                <h3 className="font-semibold text-[#111827]">{faq.q}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#4f4b44]">{faq.a}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </MarketingShell>
  );
}
