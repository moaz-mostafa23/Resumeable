import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingShell } from "@/components/site/MarketingShell";

export default function NotFound() {
  return (
    <MarketingShell title="Not Found" withFooter={false}>
      <section className="mx-auto flex min-h-[68vh] max-w-3xl flex-col items-center justify-center text-center">
        <p className="rounded-full border border-[#d8d1c7] bg-[#ede7de] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#4f4b44]">
          404
        </p>
        <h1 className="mt-5 font-[family-name:var(--font-fraunces)] text-5xl font-semibold text-[#111827] sm:text-6xl">
          Page not found
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#4f4b44] sm:text-base">
          The page you are looking for does not exist or has moved. Use one of the actions below to continue.
        </p>

        <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/" className="flex-1 sm:flex-initial">
            <Button
              variant="outline"
              className="w-full rounded-full border-[#cbc2b7] bg-[#f8f5ef] px-7 font-semibold text-[#1f2937] hover:bg-[#ede5d9]"
            >
              Go home
            </Button>
          </Link>
          <Link href="/templates" className="flex-1 sm:flex-initial">
            <Button className="w-full rounded-full bg-[#0f766e] px-7 font-semibold text-white hover:bg-[#0b5f59]">
              Create a resume
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </MarketingShell>
  );
}
