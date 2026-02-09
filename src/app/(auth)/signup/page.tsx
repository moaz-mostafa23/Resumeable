import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { SignupForm } from "@/components/auth/SignupForm";
import { MarketingShell } from "@/components/site/MarketingShell";

export default function SignupPage() {
  return (
    <MarketingShell title="Create Account" withFooter={false}>
      <section className="mx-auto flex min-h-[68vh] max-w-4xl items-center justify-center">
        <Suspense
          fallback={<Loader2 className="h-7 w-7 animate-spin text-[#0f766e]" />}
        >
          <SignupForm />
        </Suspense>
      </section>
    </MarketingShell>
  );
}
