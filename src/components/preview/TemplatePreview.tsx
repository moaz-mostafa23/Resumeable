"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { TemplateId, DEFAULT_TEMPLATE_ID } from "@/types/resume";
import { ATSMinimalPreview } from "./templates/ats-minimal/Preview";
import { ModernMinimalPreview } from "./templates/modern-minimal/Preview";
import { TwoColumnSidebarPreview } from "./templates/two-column-sidebar/Preview";
import { CorporateTimelinePreview } from "./templates/corporate-timeline/Preview";
import { CreativeInfographicPreview } from "./templates/creative-infographic/Preview";

// Map template IDs to their preview components
const templatePreviewMap: Record<TemplateId, React.ComponentType> = {
  'ats-minimal': ATSMinimalPreview,
  'modern-minimal': ModernMinimalPreview,
  'two-column-sidebar': TwoColumnSidebarPreview,
  'corporate-timeline': CorporateTimelinePreview,
  'creative-infographic': CreativeInfographicPreview,
};

export function TemplatePreview() {
  const { resume } = useResumeStore();

  if (!resume) return null;

  const templateId = resume.templateId || DEFAULT_TEMPLATE_ID;
  const PreviewComponent = templatePreviewMap[templateId] || templatePreviewMap[DEFAULT_TEMPLATE_ID];

  return <PreviewComponent />;
}
