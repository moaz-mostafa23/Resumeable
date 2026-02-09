import type { Metadata } from "next";
import { MarketingShell } from "@/components/site/MarketingShell";

const LAST_UPDATED = "February 9, 2026";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read how Resumeable collects, uses, and protects your data when you use our resume builder.",
  alternates: {
    canonical: "https://www.resumeable.cv/privacy",
  },
  openGraph: {
    title: "Privacy Policy — Resumeable",
    description:
      "How Resumeable handles account data, resume content, and security practices.",
    url: "https://www.resumeable.cv/privacy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <MarketingShell title="Privacy" backHref="/" backLabel="Home">
      <article className="mx-auto max-w-3xl rounded-3xl border border-[#ddd5ca] bg-[#fffdf9] p-6 sm:p-8">
        <header>
          <h1 className="font-[family-name:var(--font-fraunces)] text-4xl font-semibold text-[#111827] sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm font-semibold uppercase tracking-[0.1em] text-[#6b665d]">
            Last updated: {LAST_UPDATED}
          </p>
        </header>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-[#4f4b44] sm:text-base">
          <section>
            <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-medium text-[#111827]">1. Introduction</h2>
            <p className="mt-2">
              Resumeable respects your privacy and is committed to protecting your personal data. This policy explains what we collect and how we use it.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-medium text-[#111827]">2. Information We Collect</h2>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>
                <strong className="text-[#111827]">Account data:</strong> Name, email, and profile info from Google authentication.
              </li>
              <li>
                <strong className="text-[#111827]">Resume data:</strong> Content you add to the editor, including experience, education, and skills.
              </li>
              <li>
                <strong className="text-[#111827]">Usage data:</strong> Product interaction and performance information used to improve reliability.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-medium text-[#111827]">3. How We Use Data</h2>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>Provide and maintain resume-building functionality</li>
              <li>Authenticate users and secure accounts</li>
              <li>Store and sync resumes for signed-in users</li>
              <li>Improve product quality, speed, and reliability</li>
            </ul>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-medium text-[#111827]">4. Storage and Security</h2>
            <p className="mt-2">
              Data is stored using Supabase infrastructure with transport encryption and access controls. We apply reasonable technical and organizational safeguards.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-medium text-[#111827]">5. Third-Party Services</h2>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>Google OAuth for authentication</li>
              <li>Supabase for storage and auth infrastructure</li>
            </ul>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-medium text-[#111827]">6. Data Sharing</h2>
            <p className="mt-2">
              We do not sell personal data. We may disclose data only when legally required or to protect the service from abuse.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-medium text-[#111827]">7. Your Rights</h2>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>Access your data</li>
              <li>Request corrections</li>
              <li>Request deletion of account data</li>
              <li>Export resume content</li>
            </ul>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-medium text-[#111827]">8. Cookies and Local Storage</h2>
            <p className="mt-2">
              We use browser local storage for anonymous drafts and secure cookies for authentication. We do not rely on third-party ad tracking cookies.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-medium text-[#111827]">9. Policy Changes</h2>
            <p className="mt-2">
              We may update this policy as the product evolves. Significant changes will be reflected by an updated date on this page.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-medium text-[#111827]">10. Contact</h2>
            <p className="mt-2">
              Questions about this policy can be sent to <a href="mailto:support@resumeable.com" className="text-[#0f766e] underline underline-offset-2">support@resumeable.com</a>.
            </p>
          </section>
        </div>
      </article>
    </MarketingShell>
  );
}
