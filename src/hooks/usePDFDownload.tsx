"use client";

import { useState, useCallback } from "react";
import { pdf } from "@react-pdf/renderer";
import { PDFTemplate } from "@/components/pdf/templates/precision-line/PDFTemplate";
import { useResumeStore } from "@/store/useResumeStore";

export function usePDFDownload() {
  const [isGenerating, setIsGenerating] = useState(false);
  const { resume } = useResumeStore();

  const downloadPDF = useCallback(async () => {
    if (!resume) return;

    setIsGenerating(true);

    try {
      const doc = <PDFTemplate resume={resume} />;
      const blob = await pdf(doc).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${resume.name.replace(/\s+/g, "_")}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsGenerating(false);
    }
  }, [resume]);

  return { downloadPDF, isGenerating };
}
