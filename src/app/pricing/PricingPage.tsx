"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import {
  Check,
  X,
  ArrowLeft,
  Sparkles,
  Zap,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSubscription } from "@/hooks/useSubscription";

// ── Plan data ───────────────────────────────────────────────────────────

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

// ── FAQ data ────────────────────────────────────────────────────────────

const faqs = [
  {
    q: "Is the free plan actually free?",
    a: "Yes — no trial period, no credit card required. You can build and download resumes right now without paying anything. The free plan includes our core templates and full editor.",
  },
  {
    q: "What do I get with Pro?",
    a: "Pro unlocks all premium templates, removes the small 'Built with Resumeable' footer from PDFs, gives you AI-powered bullet-point suggestions, and lets you save unlimited resumes to your account.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Absolutely. Cancel from your account settings and you won't be charged again. Your resumes stay accessible on the free plan.",
  },
  {
    q: "Do you offer a one-time purchase?",
    a: "We're working on a one-time download pass for people who just need a single clean PDF. Stay tuned!",
  },
  {
    q: "Is my data safe?",
    a: "Your resume data is stored securely on Supabase with row-level security. We don't sell or share your information with anyone. Anonymous drafts are stored locally in your browser.",
  },
];

// ── Component ───────────────────────────────────────────────────────────

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
                <span className="font-semibold text-lg">Resumeable</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Simple, honest pricing
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Build your resume for free. Upgrade if you want the extras.
          No surprises, no hidden fees.
        </p>
      </div>

      {/* Plans */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Free Plan */}
          <div className="relative rounded-2xl border-2 border-gray-200 bg-white p-8 flex flex-col">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-1">Free</h2>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-bold text-gray-900">$0</span>
                <span className="text-gray-500">forever</span>
              </div>
              <p className="text-gray-600 text-sm">
                Everything you need to build a great resume. No strings attached.
              </p>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {freePlanFeatures.map((feature) => (
                <li key={feature.text} className="flex items-start gap-3">
                  {feature.included ? (
                    <Check className="h-5 w-5 mt-0.5 shrink-0 text-green-500" />
                  ) : (
                    <X className="h-5 w-5 mt-0.5 shrink-0 text-gray-300" />
                  )}
                  <span
                    className={cn(
                      "text-sm",
                      feature.included ? "text-gray-700" : "text-gray-400"
                    )}
                  >
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>

            <Link href="/builder/new">
              <Button
                className="w-full bg-white text-gray-900 border border-gray-300 hover:bg-gray-50"
                size="lg"
              >
                Start Building
              </Button>
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="relative rounded-2xl border-2 border-primary shadow-xl shadow-primary/10 bg-white p-8 flex flex-col">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center gap-1 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                <Sparkles className="h-3 w-3" />
                Most Popular
              </span>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-1">Pro</h2>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-bold text-gray-900">$5</span>
                <span className="text-gray-500">/month</span>
              </div>
              <p className="text-gray-600 text-sm">
                Premium templates, AI writing help, and unlimited everything.
              </p>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {proPlanFeatures.map((feature) => (
                <li key={feature.text} className="flex items-start gap-3">
                  <Check
                    className={cn(
                      "h-5 w-5 mt-0.5 shrink-0",
                      feature.highlight ? "text-primary" : "text-green-500"
                    )}
                  />
                  <span className="text-sm text-gray-700">{feature.text}</span>
                </li>
              ))}
            </ul>

            {isPro ? (
              <Link href="/dashboard">
                <Button className="w-full" size="lg">
                  <Check className="h-4 w-4 mr-2" />
                  You&apos;re on Pro
                </Button>
              </Link>
            ) : (
              <Button
                className="w-full"
                size="lg"
                onClick={handleUpgrade}
                disabled={checkoutLoading || subLoading}
              >
                {checkoutLoading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Zap className="h-4 w-4 mr-2" />
                )}
                {checkoutLoading ? "Redirecting…" : "Upgrade to Pro"}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
            Frequently asked questions
          </h2>
          <div className="space-y-8">
            {faqs.map((faq) => (
              <div key={faq.q}>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  {faq.q}
                </h3>
                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-gray-600 mb-4">
            Still not sure? Try the free plan first — no account needed.
          </p>
          <Link href="/builder/new">
            <Button size="lg">Create Your Resume</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
