import type { Metadata } from "next";
import { MarketingShell } from "@/components/site/MarketingShell";

const LAST_UPDATED = "February 9, 2026";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read the terms that govern your use of Resumeable, including account use, content ownership, and service availability.",
  alternates: {
    canonical: "https://www.resumeable.cv/terms",
  },
  openGraph: {
    title: "Terms of Service — Resumeable",
    description:
      "Legal terms for using Resumeable, including acceptable use and account responsibilities.",
    url: "https://www.resumeable.cv/terms",
  },
};

export default function TermsOfServicePage() {
  return (
    <MarketingShell title="Terms" backHref="/" backLabel="Home">
      <article className="mx-auto max-w-3xl rounded-3xl border border-[#ddd5ca] bg-[#fffdf9] p-6 sm:p-8">
        <header>
          <h1 className="font-[family-name:var(--font-fraunces)] text-4xl font-semibold text-[#111827] sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-2 text-sm font-semibold uppercase tracking-[0.1em] text-[#6b665d]">
            Last updated: {LAST_UPDATED}
          </p>
        </header>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-[#4f4b44] sm:text-base">
          <section>
            <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-medium text-[#111827]">1. Acceptance of Terms</h2>
            <p className="mt-2">
              By using Resumeable, you agree to these Terms of Service. If you do not agree, please do not use the service.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-medium text-[#111827]">2. Service Description</h2>
            <p className="mt-2">
              Resumeable provides an online resume builder with templates, editing tools, and PDF export.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-medium text-[#111827]">3. Accounts</h2>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>You may sign in through Google OAuth.</li>
              <li>You are responsible for account security and all account activity.</li>
              <li>You agree to provide accurate information.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-medium text-[#111827]">4. User Content</h2>
            <p className="mt-2">
              You retain ownership of your resume content. You grant Resumeable a limited license to store and process that content to provide the service.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-medium text-[#111827]">5. Acceptable Use</h2>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>No unlawful use of the service.</li>
              <li>No attempts to gain unauthorized access.</li>
              <li>No disruption, scraping abuse, or impersonation.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-medium text-[#111827]">6. Intellectual Property</h2>
            <p className="mt-2">
              Resumeable branding, software, and template designs are protected by intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-medium text-[#111827]">7. Availability</h2>
            <p className="mt-2">
              We aim for high reliability but cannot guarantee uninterrupted service at all times.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-medium text-[#111827]">8. Limitation of Liability</h2>
            <p className="mt-2">
              The service is provided as is. To the extent allowed by law, Resumeable is not liable for indirect or consequential damages arising from use.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-medium text-[#111827]">9. Termination</h2>
            <p className="mt-2">
              We may suspend or terminate accounts that violate these terms. Users can stop using the service at any time.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-medium text-[#111827]">10. Changes to Terms</h2>
            <p className="mt-2">
              We may update these terms over time. Continued use after updates means acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-medium text-[#111827]">11. Contact</h2>
            <p className="mt-2">
              Questions about these terms can be sent to <a href="mailto:support@resumeable.com" className="text-[#0f766e] underline underline-offset-2">support@resumeable.com</a>.
            </p>
          </section>
        </div>
      </article>
    </MarketingShell>
  );
}
