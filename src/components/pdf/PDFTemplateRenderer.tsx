"use client";

import { ResumeDocument, TemplateId, DEFAULT_TEMPLATE_ID } from "@/types/resume";
import { ComponentType } from "react";

// Import PDF template components
import { PDFTemplate as ATSMinimalPDF } from "./templates/ats-minimal/PDFTemplate";
import { PDFTemplate as ModernMinimalPDF } from "./templates/modern-minimal/PDFTemplate";
import { PDFTemplate as TwoColumnSidebarPDF } from "./templates/two-column-sidebar/PDFTemplate";
import { PDFTemplate as CorporateTimelinePDF } from "./templates/corporate-timeline/PDFTemplate";
import { PDFTemplate as CreativeInfographicPDF } from "./templates/creative-infographic/PDFTemplate";

interface PDFTemplateProps {
  resume: ResumeDocument;
}

// Map template IDs to their PDF components
const templatePDFMap: Record<TemplateId, ComponentType<PDFTemplateProps>> = {
  'ats-minimal': ATSMinimalPDF,
  'modern-minimal': ModernMinimalPDF,
  'two-column-sidebar': TwoColumnSidebarPDF,
  'corporate-timeline': CorporateTimelinePDF,
  'creative-infographic': CreativeInfographicPDF,
};

export function getPDFTemplate(templateId: TemplateId): ComponentType<PDFTemplateProps> {
  return templatePDFMap[templateId] || templatePDFMap[DEFAULT_TEMPLATE_ID];
}

export function PDFTemplateRenderer({ resume }: PDFTemplateProps) {
  const templateId = resume.templateId || DEFAULT_TEMPLATE_ID;
  const Template = getPDFTemplate(templateId);
  return <Template resume={resume} />;
}
