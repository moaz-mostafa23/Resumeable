"use client";

import { useRef, useState, useEffect } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { useResumePreview } from "./ResumePreviewContext";
import { TemplateId, DEFAULT_TEMPLATE_ID } from "@/types/resume";
import { ATSMinimalPreview } from "./templates/ats-minimal/Preview";
import { ModernMinimalPreview } from "./templates/modern-minimal/Preview";
import { TwoColumnSidebarPreview } from "./templates/two-column-sidebar/Preview";
import { CorporateTimelinePreview } from "./templates/corporate-timeline/Preview";
import { CreativeInfographicPreview } from "./templates/creative-infographic/Preview";
import { ElegantPhotoPreview } from "./templates/elegant-photo/Preview";
import { BoldHeaderPreview } from "./templates/bold-header/Preview";

// Map template IDs to their preview components
const templatePreviewMap: Record<TemplateId, React.ComponentType> = {
  'ats-minimal': ATSMinimalPreview,
  'modern-minimal': ModernMinimalPreview,
  'two-column-sidebar': TwoColumnSidebarPreview,
  'corporate-timeline': CorporateTimelinePreview,
  'creative-infographic': CreativeInfographicPreview,
  'elegant-photo': ElegantPhotoPreview,
  'bold-header': BoldHeaderPreview,
};

// Letter page height: 11in at 96 DPI
const PAGE_HEIGHT_PX = 1056;
// Minimum content height required to show an additional page
const MIN_OVERFLOW_FOR_NEW_PAGE = 100;

export function TemplatePreview() {
  const contextResume = useResumePreview();
  const { resume: storeResume } = useResumeStore();
  const resume = contextResume || storeResume;
  const measureRef = useRef<HTMLDivElement>(null);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    const el = measureRef.current;
    if (!el) return;

    const measure = () => {
      const h = el.scrollHeight;
      const fullPages = Math.floor(h / PAGE_HEIGHT_PX);
      const overflow = h % PAGE_HEIGHT_PX;
      // Only add an extra page if there's substantial content on it
      const needsExtraPage = overflow > MIN_OVERFLOW_FOR_NEW_PAGE;
      setPageCount(Math.max(1, fullPages + (needsExtraPage ? 1 : 0)));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!resume) return null;

  const templateId = resume.templateId || DEFAULT_TEMPLATE_ID;
  const PreviewComponent = templatePreviewMap[templateId] || templatePreviewMap[DEFAULT_TEMPLATE_ID];

  return (
    <div className="flex flex-col" style={{ gap: "24px" }}>
      {Array.from({ length: pageCount }).map((_, i) => (
        <div
          key={i}
          className="pdf-page"
          style={{
            width: "816px",
            height: `${PAGE_HEIGHT_PX}px`,
            overflow: "hidden",
            background: "white",
          }}
        >
          <div
            ref={i === 0 ? measureRef : undefined}
            style={i > 0 ? { transform: `translateY(-${i * PAGE_HEIGHT_PX}px)` } : undefined}
          >
            <PreviewComponent />
          </div>
        </div>
      ))}
    </div>
  );
}
