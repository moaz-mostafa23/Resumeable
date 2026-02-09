import {
  AwardsData,
  CertificationsData,
  CoursesData,
  EducationData,
  ExperienceData,
  HeaderData,
  InterestsData,
  LanguagesData,
  ProjectsData,
  ResumeDocument,
  SectionConfig,
  SectionData,
  SkillsData,
  SummaryData,
  TemplateId,
  ThemeConfig,
} from "@/types/resume";
import { getMockTheme } from "@/data/mock-resume";

const STOCK_HEADSHOTS: Record<TemplateId, string> = {
  "ats-minimal":
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=420&q=80",
  "modern-minimal":
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=420&q=80",
  "two-column-sidebar":
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=420&q=80",
  "corporate-timeline":
    "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?auto=format&fit=crop&w=420&q=80",
  "creative-infographic":
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=420&q=80",
  "elegant-photo":
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=420&q=80",
  "bold-header":
    "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=420&q=80",
};

const TEMPLATE_NAMES: Record<TemplateId, string> = {
  "ats-minimal": "ATS Classic",
  "modern-minimal": "Modern Professional",
  "two-column-sidebar": "Specialist Sidebar",
  "corporate-timeline": "Executive Timeline",
  "creative-infographic": "Creative Narrative",
  "elegant-photo": "Elegant Profile",
  "bold-header": "Bold Profile",
};

const baseHeaderData: HeaderData = {
  fullName: "Alex Morgan",
  title: "Senior Product Designer",
  email: "alex.morgan@email.com",
  phone: "(415) 555-0198",
  location: "San Francisco, CA",
  linkedin: "alexmorgan",
  linkedinUrl: "https://linkedin.com/in/alexmorgan",
  github: "alexmorgan",
  githubUrl: "https://github.com/alexmorgan",
  website: "alexmorgan.design",
  websiteUrl: "https://alexmorgan.design",
  photoUrl: "",
};

const baseSummaryData: SummaryData = {
  content:
    "Senior product designer with 8+ years of experience shipping B2B and consumer experiences at scale. Expert in translating user research into measurable product outcomes, design systems, and high-velocity cross-functional delivery.",
};

const baseExperienceData: ExperienceData = {
  items: [
    {
      id: "exp-1",
      company: "Figma",
      title: "Senior Product Designer",
      location: "San Francisco, CA",
      startDate: "Apr 2022",
      endDate: "Present",
      current: true,
      bullets: [
        {
          id: "exp-1-b1",
          content:
            "Led end-to-end redesign of team workspaces, improving activation-to-retention conversion by 27% across enterprise accounts.",
        },
        {
          id: "exp-1-b2",
          content:
            "Built and documented 90+ design system components, reducing UX implementation variance by 38% across product squads.",
        },
        {
          id: "exp-1-b3",
          content:
            "Partnered with PM and engineering to ship AI-assisted prototyping flows used by 1.3M monthly active designers.",
        },
      ],
    },
    {
      id: "exp-2",
      company: "Notion",
      title: "Product Designer",
      location: "Remote",
      startDate: "Jan 2019",
      endDate: "Mar 2022",
      current: false,
      bullets: [
        {
          id: "exp-2-b1",
          content:
            "Designed onboarding and template discovery flows that reduced first-week drop-off by 31%.",
        },
        {
          id: "exp-2-b2",
          content:
            "Ran 60+ moderated usability sessions and synthesized research into a roadmap for collaboration features.",
        },
      ],
    },
    {
      id: "exp-3",
      company: "Shopify",
      title: "UX Designer",
      location: "Toronto, ON",
      startDate: "Jun 2016",
      endDate: "Dec 2018",
      current: false,
      bullets: [
        {
          id: "exp-3-b1",
          content:
            "Redesigned mobile checkout components for merchant stores, increasing completion rates by 14%.",
        },
        {
          id: "exp-3-b2",
          content:
            "Created reusable interaction patterns adopted across 4 product teams.",
        },
      ],
    },
  ],
};

const baseEducationData: EducationData = {
  items: [
    {
      id: "edu-1",
      institution: "Carnegie Mellon University",
      degree: "Master of Human-Computer Interaction",
      field: "Human-Computer Interaction",
      location: "Pittsburgh, PA",
      startDate: "Sep 2014",
      endDate: "May 2016",
      gpa: "3.9",
      details: "Capstone focused on enterprise design systems and accessibility.",
    },
  ],
};

const baseSkillsData: SkillsData = {
  categories: [
    {
      id: "skills-1",
      name: "Design",
      skills: ["Product Design", "Interaction Design", "Visual Systems", "Prototyping"],
    },
    {
      id: "skills-2",
      name: "Research",
      skills: ["Usability Testing", "JTBD Interviews", "Journey Mapping", "A/B Testing"],
    },
    {
      id: "skills-3",
      name: "Tools",
      skills: ["Figma", "Framer", "Notion", "Maze", "Amplitude"],
    },
  ],
};

const baseProjectsData: ProjectsData = {
  items: [
    {
      id: "proj-1",
      name: "Growth Experiment Toolkit",
      description:
        "Reusable framework for running product growth experiments across onboarding and monetization surfaces.",
      technologies: ["Figma", "TypeScript", "Amplitude"],
      link: "github.com/alexmorgan/growth-toolkit",
      bullets: [
        {
          id: "proj-1-b1",
          content:
            "Built templates for experiment design and analysis used by 6 teams to standardize reporting.",
        },
        {
          id: "proj-1-b2",
          content:
            "Shortened experiment setup time from 5 days to 2 days through reusable component kits.",
        },
      ],
    },
    {
      id: "proj-2",
      name: "Accessible Commerce Patterns",
      description:
        "Open-source pattern library for high-converting and WCAG-aware ecommerce interactions.",
      technologies: ["React", "Storybook", "CSS"],
      link: "alexmorgan.design/accessibility",
      bullets: [
        {
          id: "proj-2-b1",
          content:
            "Published 40+ production-ready patterns with keyboard and screen-reader support.",
        },
      ],
    },
  ],
};

const baseCertificationsData: CertificationsData = {
  items: [
    {
      id: "cert-1",
      name: "Google UX Design Professional Certificate",
      issuer: "Google",
      date: "2023",
      link: "",
    },
    {
      id: "cert-2",
      name: "NN/g UX Certification",
      issuer: "Nielsen Norman Group",
      date: "2022",
      link: "",
    },
  ],
};

const baseLanguagesData: LanguagesData = {
  items: [
    { id: "lang-1", language: "English", proficiency: "native" },
    { id: "lang-2", language: "Spanish", proficiency: "advanced" },
  ],
};

const baseInterestsData: InterestsData = {
  items: ["Human-centered AI", "Photography", "Design mentorship"],
};

const baseCoursesData: CoursesData = {
  items: [
    {
      id: "course-1",
      name: "Advanced Product Strategy",
      institution: "Reforge",
      date: "2024",
      link: "",
    },
  ],
};

const baseAwardsData: AwardsData = {
  items: [
    {
      id: "award-1",
      name: "Design Leadership Award",
      issuer: "Product Design Guild",
      date: "2023",
      description: "Recognized for leading cross-functional product redesign programs.",
    },
  ],
};

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function getSeedSections(templateId: TemplateId): SectionConfig[] {
  const sections: SectionConfig[] = [
    { id: "header", type: "header", label: "Header", visible: true, order: 0 },
    { id: "summary", type: "summary", label: "Professional Summary", visible: true, order: 1 },
    { id: "experience", type: "experience", label: "Work Experience", visible: true, order: 2 },
    { id: "projects", type: "projects", label: "Projects", visible: true, order: 3 },
    { id: "skills", type: "skills", label: "Skills", visible: true, order: 4 },
    { id: "education", type: "education", label: "Education", visible: true, order: 5 },
    { id: "certifications", type: "certifications", label: "Certifications", visible: true, order: 6 },
    { id: "languages", type: "languages", label: "Languages", visible: true, order: 7 },
    { id: "interests", type: "interests", label: "Interests", visible: true, order: 8 },
  ];

  if (
    templateId === "two-column-sidebar" ||
    templateId === "elegant-photo" ||
    templateId === "bold-header"
  ) {
    sections.push({
      id: "courses",
      type: "courses",
      label: "Courses",
      visible: true,
      order: 9,
    });
  }

  if (templateId === "corporate-timeline" || templateId === "creative-infographic") {
    sections.push({
      id: "awards",
      type: "awards",
      label: "Awards",
      visible: true,
      order: 9,
    });
  }

  return sections;
}

function getSeedSectionData(templateId: TemplateId): Record<string, SectionData> {
  const header = clone(baseHeaderData);
  header.photoUrl = STOCK_HEADSHOTS[templateId];

  const sectionData: Record<string, SectionData> = {
    header,
    summary: clone(baseSummaryData),
    experience: clone(baseExperienceData),
    education: clone(baseEducationData),
    skills: clone(baseSkillsData),
    projects: clone(baseProjectsData),
    certifications: clone(baseCertificationsData),
    languages: clone(baseLanguagesData),
    interests: clone(baseInterestsData),
  };

  if (
    templateId === "two-column-sidebar" ||
    templateId === "elegant-photo" ||
    templateId === "bold-header"
  ) {
    sectionData.courses = clone(baseCoursesData);
  }

  if (templateId === "corporate-timeline" || templateId === "creative-infographic") {
    sectionData.awards = clone(baseAwardsData);
  }

  return sectionData;
}

export function createTemplateSeedResume(
  userId: string,
  templateId: TemplateId,
  options?: { id?: string; name?: string }
): ResumeDocument {
  const now = new Date().toISOString();
  const sections = getSeedSections(templateId);
  const sectionData = getSeedSectionData(templateId);
  const theme: ThemeConfig = getMockTheme(templateId);

  return {
    id: options?.id ?? "",
    userId,
    templateId,
    name: options?.name ?? `${TEMPLATE_NAMES[templateId]} Starter`,
    sections,
    sectionData,
    theme,
    createdAt: now,
    updatedAt: now,
  };
}

