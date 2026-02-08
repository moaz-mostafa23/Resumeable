import {
  ResumeDocument,
  SectionConfig,
  HeaderData,
  SummaryData,
  ExperienceData,
  EducationData,
  SkillsData,
  ProjectsData,
  CertificationsData,
  ThemeConfig,
  SectionData,
} from "@/types/resume";

// Mock header data
export const mockHeaderData: HeaderData = {
  fullName: "Sarah Chen",
  title: "Senior UX Designer",
  email: "sarah.chen@email.com",
  phone: "(415) 555-0142",
  location: "San Francisco, CA",
  linkedin: "sarahchen",
  linkedinUrl: "https://linkedin.com/in/sarahchen",
  github: "",
  githubUrl: "",
  website: "sarahchen.design",
  websiteUrl: "https://sarahchen.design",
};

// Mock summary data
export const mockSummaryData: SummaryData = {
  content:
    "Award-winning UX designer with 6+ years of experience crafting intuitive digital experiences for enterprise SaaS and consumer products. Passionate about bridging user research insights with elegant design solutions that drive measurable business outcomes.",
};

// Mock experience data
export const mockExperienceData: ExperienceData = {
  items: [
    {
      id: "exp-1",
      company: "Stripe",
      title: "Senior UX Designer",
      location: "San Francisco, CA",
      startDate: "Mar 2022",
      endDate: "Present",
      current: true,
      bullets: [
        {
          id: "b-1",
          content:
            "Led redesign of the merchant dashboard, increasing task completion rates by 34% across 2M+ active users",
        },
        {
          id: "b-2",
          content:
            "Established a component library of 120+ reusable patterns, reducing design-to-dev handoff time by 40%",
        },
        {
          id: "b-3",
          content:
            "Conducted 50+ user interviews and usability tests to inform the payments onboarding flow redesign",
        },
      ],
    },
    {
      id: "exp-2",
      company: "Figma",
      title: "UX Designer",
      location: "San Francisco, CA",
      startDate: "Jun 2019",
      endDate: "Feb 2022",
      current: false,
      bullets: [
        {
          id: "b-4",
          content:
            "Designed collaborative features used by 4M+ designers, including real-time cursor presence indicators",
        },
        {
          id: "b-5",
          content:
            "Reduced new user drop-off by 28% through an iterative onboarding redesign validated with A/B testing",
        },
        {
          id: "b-6",
          content:
            "Partnered with engineering to ship accessibility improvements achieving WCAG 2.1 AA compliance",
        },
      ],
    },
  ],
};

// Mock education data
export const mockEducationData: EducationData = {
  items: [
    {
      id: "edu-1",
      institution: "Stanford University",
      degree: "Master of Science",
      field: "Human-Computer Interaction",
      location: "Stanford, CA",
      startDate: "Sep 2017",
      endDate: "Jun 2019",
      gpa: "3.9",
      details: "",
    },
  ],
};

// Mock skills data
export const mockSkillsData: SkillsData = {
  categories: [
    {
      id: "cat-1",
      name: "Design Tools",
      skills: ["Figma", "Sketch", "Adobe XD", "Framer"],
    },
    {
      id: "cat-2",
      name: "Research & Strategy",
      skills: ["User Interviews", "A/B Testing", "Journey Mapping"],
    },
    {
      id: "cat-3",
      name: "Technical",
      skills: ["HTML/CSS", "React Prototyping", "Design Systems"],
    },
  ],
};

// Mock projects data
export const mockProjectsData: ProjectsData = {
  items: [
    {
      id: "proj-1",
      name: "DesignOps Toolkit",
      description:
        "Open-source design operations framework for scaling design teams",
      technologies: ["Figma Plugins", "TypeScript", "React"],
      link: "designops-toolkit.dev",
      bullets: [
        {
          id: "pb-1",
          content:
            "Built a Figma plugin automating design token syncing, adopted by 200+ teams",
        },
        {
          id: "pb-2",
          content:
            "Created workflow templates reducing design review cycles from 5 days to 2",
        },
      ],
    },
  ],
};

// Mock certifications data
export const mockCertificationsData: CertificationsData = {
  items: [
    {
      id: "cert-1",
      name: "Google UX Design Professional Certificate",
      issuer: "Google",
      date: "2023",
      link: "",
    },
  ],
};

// Mock sections configuration (only the ones we render in previews)
export const mockSections: SectionConfig[] = [
  {
    id: "header",
    type: "header",
    label: "Header",
    visible: true,
    order: 0,
  },
  {
    id: "summary",
    type: "summary",
    label: "Professional Summary",
    visible: true,
    order: 1,
  },
  {
    id: "experience",
    type: "experience",
    label: "Work Experience",
    visible: true,
    order: 2,
  },
  {
    id: "education",
    type: "education",
    label: "Education",
    visible: true,
    order: 3,
  },
  {
    id: "skills",
    type: "skills",
    label: "Skills",
    visible: true,
    order: 4,
  },
  {
    id: "projects",
    type: "projects",
    label: "Projects",
    visible: true,
    order: 5,
  },
  {
    id: "certifications",
    type: "certifications",
    label: "Certifications",
    visible: true,
    order: 6,
  },
];

// Mock section data map
export const mockSectionData: Record<string, SectionData> = {
  header: mockHeaderData,
  summary: mockSummaryData,
  experience: mockExperienceData,
  education: mockEducationData,
  skills: mockSkillsData,
  projects: mockProjectsData,
  certifications: mockCertificationsData,
};

// Default theme for gallery previews
export const mockTheme: ThemeConfig = {
  primaryColor: "#000000",
  textColor: "#000000",
  fontFamily: "Inter",
  fontSize: 13,
  lineHeight: 1.4,
  sectionSpacing: 16,
  marginVertical: 40,
  marginHorizontal: 40,
  nameFontSize: 28,
  titleFontSize: 18,
  textAlign: "center",
};

// Per-template theme overrides to showcase variety
export const templateThemeOverrides: Record<string, Partial<ThemeConfig>> = {
  "ats-minimal": {
    primaryColor: "#1a1a1a",
  },
  "modern-minimal": {
    primaryColor: "#2563eb",
  },
  "two-column-sidebar": {
    primaryColor: "#1e293b",
  },
  "corporate-timeline": {
    primaryColor: "#0f172a",
  },
  "creative-infographic": {
    primaryColor: "#7c3aed",
  },
  "elegant-photo": {
    primaryColor: "#334155",
  },
  "bold-header": {
    primaryColor: "#0d9488",
  },
};

// Get a complete mock theme for a specific template
export function getMockTheme(templateId: string): ThemeConfig {
  return {
    ...mockTheme,
    ...(templateThemeOverrides[templateId] || {}),
  };
}

// Full mock resume document (useful if needed)
export const mockResumeDocument: ResumeDocument = {
  id: "mock-preview",
  name: "Sarah Chen Resume",
  userId: "mock",
  templateId: "ats-minimal",
  sections: mockSections,
  sectionData: mockSectionData,
  theme: mockTheme,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
