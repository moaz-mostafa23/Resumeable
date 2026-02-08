"use client";

import { useState, useCallback } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useResumeStore } from "@/store/useResumeStore";

const PDF_CAPTURE_ID = "pdf-capture";

export function usePDFDownload() {
  const [isGenerating, setIsGenerating] = useState(false);
  const { resume } = useResumeStore();

  const downloadPDF = useCallback(async () => {
    if (!resume) return;

    const element = document.getElementById(PDF_CAPTURE_ID);
    if (!element) return;

    setIsGenerating(true);

    try {
      // Capture the HTML preview element at 2x resolution for crisp output
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      // Letter size in PDF points (72 points per inch)
      const pdfWidthPt = 612; // 8.5in
      const pdfHeightPt = 792; // 11in

      // Preview element dimensions in CSS pixels (8.5in x 11in at 96 DPI = 816 x 1056)
      const pageWidthPx = 816;
      const pageHeightPx = 1056;
      const scaleFactor = 2; // matches html2canvas scale

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "letter",
      });

      const totalHeightPx = canvas.height / scaleFactor;
      const totalPages = Math.ceil(totalHeightPx / pageHeightPx);

      for (let i = 0; i < totalPages; i++) {
        if (i > 0) pdf.addPage();

        // Source region from the full canvas (in canvas pixels, i.e. 2x)
        const srcY = i * pageHeightPx * scaleFactor;
        const srcH = Math.min(
          pageHeightPx * scaleFactor,
          canvas.height - srcY
        );

        // Create a per-page canvas slice
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = pageWidthPx * scaleFactor;
        pageCanvas.height = pageHeightPx * scaleFactor;

        const ctx = pageCanvas.getContext("2d")!;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
        ctx.drawImage(
          canvas,
          0,
          srcY,
          pageWidthPx * scaleFactor,
          srcH,
          0,
          0,
          pageWidthPx * scaleFactor,
          srcH
        );

        const imgData = pageCanvas.toDataURL("image/png");
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidthPt, pdfHeightPt);
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
