"use client";

import { useState, useCallback } from "react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { useResumeStore } from "@/store/useResumeStore";

export function usePDFDownload() {
  const [isGenerating, setIsGenerating] = useState(false);
  const { resume } = useResumeStore();

  const downloadPDF = useCallback(async () => {
    if (!resume) return;

    // Scope to main preview to avoid duplicates from the modal
    const container = document.getElementById("preview-content");
    if (!container) return;

    const pages = container.querySelectorAll<HTMLElement>(".pdf-page");
    if (pages.length === 0) return;

    setIsGenerating(true);

    try {
      // Letter size in PDF points (72 pt/in)
      const pdfWidthPt = 612; // 8.5in
      const pdfHeightPt = 792; // 11in

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "letter",
      });

      for (let i = 0; i < pages.length; i++) {
        if (i > 0) pdf.addPage();

        // Clone the page so we can capture it outside the scaled parent
        const clone = pages[i].cloneNode(true) as HTMLElement;
        clone.style.position = "fixed";
        clone.style.left = "0";
        clone.style.top = "0";
        clone.style.zIndex = "-1";
        clone.style.pointerEvents = "none";
        clone.className = ""; // remove classes to avoid style conflicts
        clone.style.width = "816px";
        clone.style.height = "1056px";
        clone.style.overflow = "hidden";
        clone.style.background = "#ffffff";
        document.body.appendChild(clone);

        await new Promise((r) => setTimeout(r, 50));

        const dataUrl = await toPng(clone, {
          pixelRatio: 2,
          backgroundColor: "#ffffff",
          width: 816,
          height: 1056,
        });

        document.body.removeChild(clone);

        pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidthPt, pdfHeightPt);
      }

      pdf.save(`${resume.name.replace(/\s+/g, "_")}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsGenerating(false);
    }
  }, [resume]);

  return { downloadPDF, isGenerating };
}
