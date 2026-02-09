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
    name: 'ATS Classic',
    description: 'Single-column, parser-first layout for high ATS compatibility and fast recruiter scanning.',
    thumbnail: '/templates/ats-minimal.png',
    atsFriendly: true,
    isEnabled: true,
    category: 'minimal',
    features: ['Single column', 'ATS-first structure', 'Clean hierarchy', 'Recruiter scan-friendly'],
  },
  {
    id: 'modern-minimal',
    name: 'Modern Professional',
    description: 'Contemporary one-column format with strong readability and polished visual rhythm.',
    thumbnail: '/templates/modern-minimal.png',
    atsFriendly: true,
    isEnabled: true,
    category: 'minimal',
    features: ['ATS-safe', 'Modern accents', 'Skill chips', 'Balanced spacing'],
  },
  {
    id: 'two-column-sidebar',
    name: 'Specialist Sidebar',
    description: 'Two-column resume that highlights skills, certifications, and contact details in a clear sidebar.',
    thumbnail: '/templates/two-column-sidebar.png',
    atsFriendly: true,
    isEnabled: true,
    category: 'professional',
    features: ['Skills sidebar', 'Structured sections', 'Technical profile fit', 'Clean contrast'],
  },
  {
    id: 'corporate-timeline',
    name: 'Executive Timeline',
    description: 'Chronological leadership template with clear date alignment and role progression emphasis.',
    thumbnail: '/templates/corporate-timeline.png',
    atsFriendly: true,
    isEnabled: true,
    category: 'professional',
    features: ['Timeline structure', 'Date clarity', 'Executive tone', 'Career progression'],
  },
  {
    id: 'creative-infographic',
    name: 'Creative Narrative',
    description: 'Expressive, visual-forward format for design and creative roles that still preserves structure.',
    thumbnail: '/templates/creative-infographic.png',
    atsFriendly: false,
    isEnabled: true,
    category: 'creative',
    features: ['Visual storytelling', 'Icons + blocks', 'Portfolio-friendly', 'Brand-forward'],
  },
  {
    id: 'elegant-photo',
    name: 'Elegant Profile',
    description: 'Refined profile template with a professional headshot and balanced two-column hierarchy.',
    thumbnail: '/templates/elegant-photo.png',
    atsFriendly: false,
    isEnabled: true,
    category: 'professional',
    features: ['Headshot support', 'Elegant typography', 'Client-facing roles', 'Profile sidebar'],
  },
  {
    id: 'bold-header',
    name: 'Bold Profile',
    description: 'Confident header-focused template with large identity section and modern section flow.',
    thumbnail: '/templates/bold-header.png',
    atsFriendly: false,
    isEnabled: true,
    category: 'creative',
    features: ['Large headshot', 'Strong header', 'Modern contrast', 'Creative applications'],
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
