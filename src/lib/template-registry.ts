import { TemplateId } from "@/types/resume";
import { ComponentType } from "react";
import { ResumeDocument } from "@/types/resume";

// Template metadata and component references
export interface TemplateDefinition {
  id: TemplateId;
  name: string;
  description: string;
  thumbnail: string; // path to preview image
  atsFriendly: boolean;
  isEnabled: boolean; // false = coming soon
  category: 'minimal' | 'professional' | 'creative' | 'academic';
  features: string[];
}

// Props passed to all template components
export interface TemplateProps {
  resume: ResumeDocument;
}

// Template metadata registry
export const templateDefinitions: TemplateDefinition[] = [
  {
    id: 'ats-minimal',
    name: 'ATS Minimal',
    description: 'Clean single-column layout optimized for applicant tracking systems. Maximum compatibility with automated resume parsers.',
    thumbnail: '/templates/ats-minimal.png',
    atsFriendly: true,
    isEnabled: true,
    category: 'minimal',
    features: ['Single column', 'No graphics', 'ATS optimized', 'Clean typography'],
  },
  {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    description: 'Contemporary single-column design with subtle accent colors and refined typography.',
    thumbnail: '/templates/modern-minimal.png',
    atsFriendly: true,
    isEnabled: true,
    category: 'minimal',
    features: ['Accent colors', 'Modern fonts', 'Skill chips', 'Clean lines'],
  },
  {
    id: 'two-column-sidebar',
    name: 'Two Column',
    description: 'Professional layout with a sidebar for skills and contact info. Perfect for showcasing technical expertise.',
    thumbnail: '/templates/two-column-sidebar.png',
    atsFriendly: false,
    isEnabled: true,
    category: 'professional',
    features: ['Sidebar layout', 'Skills emphasis', 'Contact sidebar', 'Visual hierarchy'],
  },
  {
    id: 'corporate-timeline',
    name: 'Corporate Timeline',
    description: 'Executive-style chronological layout with a date rail. Ideal for experienced professionals.',
    thumbnail: '/templates/corporate-timeline.png',
    atsFriendly: true,
    isEnabled: true,
    category: 'professional',
    features: ['Date alignment', 'Career focus', 'Professional look', 'Timeline view'],
  },
  {
    id: 'creative-infographic',
    name: 'Creative',
    description: 'Bold design with visual elements for creative professionals. Stand out with a unique presentation.',
    thumbnail: '/templates/creative-infographic.png',
    atsFriendly: false,
    isEnabled: true,
    category: 'creative',
    features: ['Visual design', 'Icons', 'Color blocks', 'Infographic style'],
  },
];

// Get template definition by ID
export function getTemplateDefinition(templateId: TemplateId): TemplateDefinition | undefined {
  return templateDefinitions.find(t => t.id === templateId);
}

// Get all enabled templates
export function getEnabledTemplates(): TemplateDefinition[] {
  return templateDefinitions.filter(t => t.isEnabled);
}

// Get templates by category
export function getTemplatesByCategory(category: TemplateDefinition['category']): TemplateDefinition[] {
  return templateDefinitions.filter(t => t.category === category && t.isEnabled);
}
