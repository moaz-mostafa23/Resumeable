import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Resumeable",
  description: "Privacy Policy for Resumeable",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground mb-8 inline-block"
        >
          &larr; Back to Home
        </Link>

        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground mb-10">
          Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Welcome to Resumeable. We respect your privacy and are committed to
              protecting the personal data you share with us. This Privacy Policy
              explains how we collect, use, and safeguard your information when you
              use our resume builder service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">2. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              We collect the following types of information:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>
                <strong className="text-foreground">Account Information:</strong> When
                you sign in with Google, we receive your name, email address, and
                profile picture from your Google account.
              </li>
              <li>
                <strong className="text-foreground">Resume Data:</strong> The content
                you enter into the resume builder, including personal details, work
                experience, education, and skills.
              </li>
              <li>
                <strong className="text-foreground">Usage Data:</strong> Information
                about how you interact with our service, such as pages visited and
                features used.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>To provide and maintain our resume builder service</li>
              <li>To authenticate your identity and manage your account</li>
              <li>To save and sync your resumes across sessions</li>
              <li>To improve and optimize our service</li>
              <li>To communicate important updates about our service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Data Storage and Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your data is stored securely using Supabase, which provides
              enterprise-grade security measures including encryption at rest and in
              transit. We implement appropriate technical and organizational measures
              to protect your personal data against unauthorized access, alteration,
              disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use the following third-party services:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-3">
              <li>
                <strong className="text-foreground">Google OAuth:</strong> For
                authentication. Google&apos;s privacy policy applies to data collected
                during the sign-in process.
              </li>
              <li>
                <strong className="text-foreground">Supabase:</strong> For data
                storage and authentication infrastructure.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Data Sharing</h2>
            <p className="text-muted-foreground leading-relaxed">
              We do not sell, trade, or rent your personal information to third
              parties. We may share data only when required by law or to protect our
              rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your account and associated data</li>
              <li>Export your resume data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">8. Cookies and Local Storage</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use browser local storage to save your work in progress for the
              anonymous builder experience. Authentication tokens are managed via
              secure cookies. We do not use third-party tracking cookies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">9. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you
              of any changes by posting the new policy on this page and updating the
              &quot;Last updated&quot; date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">10. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us
              at{" "}
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
