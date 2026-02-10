"use client";

import { getStoredBulletMode, sanitizeBulletHtmlForRender } from "@/lib/rich-text-bullets";
import { cn } from "@/lib/utils";

interface RichTextInlineProps {
  html: string;
  className?: string;
}

export function RichTextInline({ html, className }: RichTextInlineProps) {
  const safeHtml = sanitizeBulletHtmlForRender(html);
  const mode = getStoredBulletMode(html);

  if (!safeHtml) {
    return null;
  }

  if (mode === "list") {
    return (
      <span
        className={cn("rich-text-inline", className)}
        data-bullet-mode={mode}
        dangerouslySetInnerHTML={{ __html: safeHtml }}
      />
    );
  }

  return (
    <div
      className={cn("rich-text-inline", className)}
      data-bullet-mode={mode}
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  );
}
