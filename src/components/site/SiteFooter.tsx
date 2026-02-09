import Link from "next/link";
import { Logo } from "@/components/Logo";

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-[#d8d1c7] px-4 py-9">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 text-sm text-[#615d55] sm:flex-row">
        <div className="flex items-center gap-2.5">
          <Logo className="h-6 w-6 text-[#0f766e]" />
          <span className="font-semibold">Resumeable</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/templates" className="hover:text-[#111827]">
            Templates
          </Link>
          <Link href="/resume-examples" className="hover:text-[#111827]">
            Examples
          </Link>
          <Link href="/pricing" className="hover:text-[#111827]">
            Pricing
          </Link>
          <Link href="/privacy" className="hover:text-[#111827]">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-[#111827]">
            Terms
          </Link>
        </div>

        <p>&copy; {new Date().getFullYear()} Resumeable</p>
      </div>
    </footer>
  );
}
