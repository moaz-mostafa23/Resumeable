import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { LoginForm } from "@/components/auth/LoginForm";
import { MarketingShell } from "@/components/site/MarketingShell";

export default function LoginPage() {
  return (
    <MarketingShell title="Sign In" withFooter={false}>
      <section className="mx-auto flex min-h-[68vh] max-w-4xl items-center justify-center">
        <Suspense
          fallback={<Loader2 className="h-7 w-7 animate-spin text-[#0f766e]" />}
        >
          <LoginForm />
        </Suspense>
      </section>
    </MarketingShell>
  );
}
