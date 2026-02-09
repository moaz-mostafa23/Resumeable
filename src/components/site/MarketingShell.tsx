"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

interface MarketingShellProps {
  children: ReactNode;
  title?: string;
  backHref?: string;
  backLabel?: string;
  withFooter?: boolean;
  contentClassName?: string;
}

export function MarketingShell({
  children,
  title,
  backHref,
  backLabel,
  withFooter = true,
  contentClassName,
}: MarketingShellProps) {
  return (
    <div className="homepage-root min-h-screen overflow-x-hidden bg-[#f5f4ef] text-[#121214]">
      <div
        className="homepage-grid-bg pointer-events-none fixed inset-0 opacity-80"
        aria-hidden
      />
      <SiteHeader title={title} backHref={backHref} backLabel={backLabel} />
      <main
        className={cn(
          "relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-8",
          contentClassName
        )}
      >
        {children}
      </main>
      {withFooter ? <SiteFooter /> : null}
    </div>
  );
}
