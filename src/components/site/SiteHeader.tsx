"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { useAuthContext } from "@/components/auth/AuthProvider";

const navLinks = [
  { href: "/templates", label: "Templates" },
  { href: "/resume-examples", label: "Examples" },
  { href: "/pricing", label: "Pricing" },
];

interface SiteHeaderProps {
  title?: string;
  backHref?: string;
  backLabel?: string;
}

export function SiteHeader({
  title,
  backHref,
  backLabel = "Back",
}: SiteHeaderProps) {
  const { user, signOut } = useAuthContext();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.refresh();
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#ded8cf]/80 bg-[#f5f4ef]/92 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
          {backHref ? (
            <Link href={backHref}>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full px-3 text-[#3f3c36] hover:bg-[#e7e1d8] hover:text-[#111827]"
              >
                <ArrowLeft className="mr-1.5 h-4 w-4" />
                <span className="hidden sm:inline">{backLabel}</span>
              </Button>
            </Link>
          ) : null}

          <Link href="/" className="flex items-center gap-2.5">
            <Logo className="h-8 w-8 text-[#0f766e]" />
            <span className="font-[family-name:var(--font-manrope)] text-lg font-extrabold tracking-tight text-[#111827]">
              Resumeable
            </span>
          </Link>

          {title ? (
            <>
              <span className="hidden h-5 w-px bg-[#d7d0c6] sm:inline-block" />
              <span className="hidden truncate rounded-full border border-[#d8d1c7] bg-[#ede7de] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#524f49] sm:inline-flex">
                {title}
              </span>
            </>
          ) : null}
        </div>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className="rounded-full px-4 text-sm font-semibold text-[#3f3c36] hover:bg-[#e7e1d8] hover:text-[#111827]"
              >
                {item.label}
              </Button>
            </Link>
          ))}

          {user ? (
            <>
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  className="rounded-full px-4 text-sm font-semibold text-[#3f3c36] hover:bg-[#e7e1d8]"
                >
                  Dashboard
                </Button>
              </Link>
              <Button
                variant="ghost"
                onClick={handleSignOut}
                className="rounded-full px-4 text-sm font-semibold text-[#3f3c36] hover:bg-[#e7e1d8]"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="rounded-full px-4 text-sm font-semibold text-[#3f3c36] hover:bg-[#e7e1d8]"
                >
                  Sign in
                </Button>
              </Link>
              <Link href="/builder/new">
                <Button className="rounded-full bg-[#0f766e] px-5 text-sm font-semibold text-white hover:bg-[#0b5f59]">
                  Start free
                </Button>
              </Link>
            </>
          )}
        </div>

        <div className="md:hidden">
          {user ? (
            <Link href="/dashboard">
              <Button className="rounded-full bg-[#0f766e] px-4 text-sm font-semibold text-white hover:bg-[#0b5f59]">
                Dashboard
              </Button>
            </Link>
          ) : (
            <Link href="/builder/new">
              <Button className="rounded-full bg-[#0f766e] px-4 text-sm font-semibold text-white hover:bg-[#0b5f59]">
                Start
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
