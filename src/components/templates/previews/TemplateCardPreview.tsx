"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ResumePreviewProvider } from "@/components/preview/ResumePreviewContext";
import { TemplateId } from "@/types/resume";
import { ATSMinimalPreview } from "@/components/preview/templates/ats-minimal/Preview";
import { ModernMinimalPreview } from "@/components/preview/templates/modern-minimal/Preview";
import { TwoColumnSidebarPreview } from "@/components/preview/templates/two-column-sidebar/Preview";
import { CorporateTimelinePreview } from "@/components/preview/templates/corporate-timeline/Preview";
import { CreativeInfographicPreview } from "@/components/preview/templates/creative-infographic/Preview";
import { ElegantPhotoPreview } from "@/components/preview/templates/elegant-photo/Preview";
import { BoldHeaderPreview } from "@/components/preview/templates/bold-header/Preview";
import { createTemplateSeedResume } from "@/data/template-seeds";

const PREVIEW_WIDTH = 816;
const PREVIEW_HEIGHT = 1056;

const templatePreviewMap: Record<TemplateId, React.ComponentType> = {
  "ats-minimal": ATSMinimalPreview,
  "modern-minimal": ModernMinimalPreview,
  "two-column-sidebar": TwoColumnSidebarPreview,
  "corporate-timeline": CorporateTimelinePreview,
  "creative-infographic": CreativeInfographicPreview,
  "elegant-photo": ElegantPhotoPreview,
  "bold-header": BoldHeaderPreview,
};

export function TemplateCardPreview({ templateId }: { templateId: TemplateId }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.24);
  const PreviewComponent = templatePreviewMap[templateId];

  const previewResume = useMemo(
    () =>
      createTemplateSeedResume("preview-user", templateId, {
        id: `preview-${templateId}`,
        name: `Preview ${templateId}`,
      }),
    [templateId]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const syncScale = () => {
      const widthScale = container.clientWidth / PREVIEW_WIDTH;
      const heightScale = container.clientHeight / PREVIEW_HEIGHT;
      setScale(Math.min(widthScale, heightScale));
    };

    syncScale();
    const observer = new ResizeObserver(syncScale);
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return (
    <ResumePreviewProvider resume={previewResume}>
      <div ref={containerRef} className="relative h-full w-full overflow-hidden bg-white">
        <div
          style={{
            width: PREVIEW_WIDTH,
            height: PREVIEW_HEIGHT,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <PreviewComponent />
        </div>
      </div>
    </ResumePreviewProvider>
  );
}

