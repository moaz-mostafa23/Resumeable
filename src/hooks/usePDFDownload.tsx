"use client";

import { useState, useCallback } from "react";
import { useResumeStore } from "@/store/useResumeStore";

function sanitizeFileName(name: string): string {
  const normalized = name.trim().replace(/\s+/g, "_");
  const safe = normalized.replace(/[^\w.-]/g, "");
  return safe || "resume";
}

export function usePDFDownload() {
  const [isGenerating, setIsGenerating] = useState(false);
  const { resume } = useResumeStore();

  const downloadPDF = useCallback(async () => {
    if (!resume) return;

    setIsGenerating(true);

    try {
      const response = await fetch("/api/pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resume }),
      });

      if (!response.ok) {
        const responseRequestId = response.headers.get("x-request-id");
        const responseReasonCode = response.headers.get("x-error-code");
        let serverMessage = "";
        let bodyRequestId = "";
        let bodyReasonCode = "";

        try {
          const data = (await response.json()) as {
            error?: string;
            requestId?: string;
            reasonCode?: string;
            step?: string;
          };
          if (typeof data.error === "string") {
            serverMessage = data.error;
          }
          if (typeof data.requestId === "string") {
            bodyRequestId = data.requestId;
          }
          if (typeof data.reasonCode === "string") {
            bodyReasonCode = data.reasonCode;
          }
        } catch {
          // Ignore JSON parse failures for non-JSON error responses.
        }

        const requestId = responseRequestId || bodyRequestId;
        const reasonCode = responseReasonCode || bodyReasonCode;
        const details = [
          `status=${response.status}`,
          requestId ? `requestId=${requestId}` : "",
          reasonCode ? `reasonCode=${reasonCode}` : "",
          serverMessage ? `message=${serverMessage}` : "",
        ]
          .filter(Boolean)
          .join(" ");

        throw new Error(`PDF generation failed (${details})`);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const fileName = sanitizeFileName(resume.name);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${fileName}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsGenerating(false);
    }
  }, [resume]);

  return { downloadPDF, isGenerating };
}
