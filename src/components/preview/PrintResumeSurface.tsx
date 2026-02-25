"use client";

import { useEffect, useState } from "react";
import { ResumePreviewProvider } from "@/components/preview/ResumePreviewContext";
import { TemplatePreview } from "@/components/preview/TemplatePreview";
import { ResumeDocument } from "@/types/resume";

type PrintWindow = Window & {
  __RESUME_PRINT_PAYLOAD?: ResumeDocument;
  __RESUME_PRINT_READY?: boolean;
};

function readPayloadFromWindow(): ResumeDocument | null {
  if (typeof window === "undefined") return null;
  const value = (window as PrintWindow).__RESUME_PRINT_PAYLOAD;
  if (!value || typeof value !== "object") return null;
  return value;
}

export function PrintResumeSurface() {
  const [resume, setResume] = useState<ResumeDocument | null>(null);
  const [missingPayload, setMissingPayload] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const payload = readPayloadFromWindow();
      if (!payload) {
        setMissingPayload(true);
        return;
      }

      setResume(payload);
      setMissingPayload(false);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    const markReady = async () => {
      if (typeof window === "undefined") return;
      const printWindow = window as PrintWindow;
      printWindow.__RESUME_PRINT_READY = false;

      if (typeof document !== "undefined" && "fonts" in document) {
        try {
          await document.fonts.ready;
        } catch {
          // Ignore font readiness failures and continue.
        }
      }

      const waitForImages = async () => {
        const images = Array.from(document.images);
        await Promise.all(
          images.map(
            (img) =>
              new Promise<void>((resolve) => {
                if (img.complete) {
                  resolve();
                  return;
                }
                img.addEventListener("load", () => resolve(), { once: true });
                img.addEventListener("error", () => resolve(), { once: true });
              })
          )
        );
      };

      await waitForImages();

      let stableRounds = 0;
      let previousCount = -1;

      while (!cancelled && stableRounds < 3) {
        await new Promise((resolve) => setTimeout(resolve, 120));
        const count = document.querySelectorAll(".pdf-page").length;
        if (count > 0 && count === previousCount) {
          stableRounds += 1;
        } else {
          stableRounds = 0;
          previousCount = count;
        }
      }

      if (!cancelled) {
        printWindow.__RESUME_PRINT_READY = true;
      }
    };

    if (resume || missingPayload) {
      void markReady();
    }

    return () => {
      cancelled = true;
    };
  }, [resume, missingPayload]);

  if (missingPayload) {
    return (
      <main className="min-h-screen bg-white p-6 text-sm text-red-700">
        Missing resume payload.
      </main>
    );
  }

  if (!resume) {
    return (
      <main className="min-h-screen bg-white p-6 text-sm text-gray-500">
        Preparing print preview...
      </main>
    );
  }

  return (
    <ResumePreviewProvider resume={resume}>
      <main className="print-canvas" id="print-root">
        <TemplatePreview pageGap={0} />
      </main>
    </ResumePreviewProvider>
  );
}
