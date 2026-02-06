import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - Resumeable",
  description: "Terms of Service for Resumeable",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground mb-8 inline-block"
        >
          &larr; Back to Home
        </Link>

        <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-muted-foreground mb-10">
          Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing or using Resumeable, you agree to be bound by these Terms
              of Service. If you do not agree to these terms, please do not use our
              service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">2. Description of Service</h2>
            <p className="text-muted-foreground leading-relaxed">
              Resumeable is an online resume builder that allows users to create,
              edit, and export professional resumes. We provide templates, a
              drag-and-drop editor, and PDF export functionality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. User Accounts</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>
                You may sign in using your Google account. You are responsible for
                maintaining the security of your account.
              </li>
              <li>
                You must provide accurate and complete information when creating your
                account.
              </li>
              <li>
                You are responsible for all activities that occur under your account.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. User Content</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              You retain ownership of all content you create using Resumeable,
              including your resume data and personal information. By using our
              service, you grant us a limited license to store and process your
              content solely for the purpose of providing the service to you.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              You are solely responsible for the accuracy and legality of the content
              you include in your resumes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Acceptable Use</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              You agree not to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Use the service for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the service or its infrastructure</li>
              <li>
                Use automated tools to scrape or extract data from the service
              </li>
              <li>Impersonate another person or entity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Resumeable service, including its design, templates, logo, and
              underlying code, is owned by Resumeable and protected by intellectual
              property laws. You may not copy, modify, or distribute our templates or
              service design without permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Service Availability</h2>
            <p className="text-muted-foreground leading-relaxed">
              We strive to keep Resumeable available at all times, but we do not
              guarantee uninterrupted access. We may modify, suspend, or discontinue
              any part of the service at any time without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">8. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              Resumeable is provided &quot;as is&quot; without warranties of any kind.
              To the fullest extent permitted by law, we shall not be liable for any
              indirect, incidental, special, or consequential damages arising from
              your use of the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">9. Account Termination</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to suspend or terminate your account if you violate
              these terms. You may delete your account at any time, which will result
              in the removal of your stored data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">10. Changes to These Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update these Terms of Service from time to time. Continued use of
              the service after changes constitutes acceptance of the new terms. We
              will notify users of significant changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">11. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about these Terms of Service, please contact
              us at{" "}
              <a
                href="mailto:support@resumeable.com"
                className="text-primary hover:underline"
              >
                support@resumeable.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
