// Section types
export type SectionType =
  | "header"
  | "summary"
  | "experience"
  | "education"
  | "skills"
  | "projects"
  | "certifications"
  | "custom";

// Section configuration
export interface SectionConfig {
  id: string;
  type: SectionType;
  label: string;
  visible: boolean;
  order: number;
}

// Header section data
export interface HeaderData {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  website: string;
}

// Summary section data
export interface SummaryData {
  content: string;
}

// Experience item
export interface ExperienceItem {
  id: string;
  company: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: BulletPoint[];
}

export interface BulletPoint {
  id: string;
  content: string;
}

// Experience section data
export interface ExperienceData {
  items: ExperienceItem[];
}

// Education item
export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa: string;
  details: string;
}

// Education section data
export interface EducationData {
  items: EducationItem[];
}

// Skills category
export interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

// Skills section data
export interface SkillsData {
  categories: SkillCategory[];
}

// Project item
export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link: string;
  bullets: BulletPoint[];
}

// Projects section data
export interface ProjectsData {
  items: ProjectItem[];
}

// Certification item
export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link: string;
}

// Certifications section data
export interface CertificationsData {
  items: CertificationItem[];
}

// Custom section item
export interface CustomItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
  bullets: BulletPoint[];
}

// Custom section data
export interface CustomSectionData {
  items: CustomItem[];
}

// Union type for all section data
export type SectionData =
  | HeaderData
  | SummaryData
  | ExperienceData
  | EducationData
  | SkillsData
  | ProjectsData
  | CertificationsData
  | CustomSectionData;

// Theme configuration
export interface ThemeConfig {
  primaryColor: string;
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  sectionSpacing: number;
  pageMargins: number;
}

// Complete resume document
export interface ResumeDocument {
  id: string;
  name: string;
  userId: string;
  sections: SectionConfig[];
  sectionData: Record<string, SectionData>;
  theme: ThemeConfig;
  createdAt: string;
  updatedAt: string;
}

// Default theme
export const defaultTheme: ThemeConfig = {
  primaryColor: "#2563eb",
  fontFamily: "Inter",
  fontSize: 11,
  lineHeight: 1.4,
  sectionSpacing: 16,
  pageMargins: 40,
};

// Default header data
export const defaultHeaderData: HeaderData = {
  fullName: "Your Name",
  title: "Professional Title",
  email: "email@example.com",
  phone: "(123) 456-7890",
  location: "City, State",
  linkedin: "linkedin.com/in/yourprofile",
  github: "github.com/yourusername",
  website: "",
};

// Default summary data
export const defaultSummaryData: SummaryData = {
  content:
    "Accomplished professional with extensive experience in your field. Proven track record of success in delivering results and driving innovation. Skilled in relevant technologies and methodologies.",
};

// Default experience data
export const defaultExperienceData: ExperienceData = {
  items: [
    {
      id: "exp-1",
      company: "Company Name",
      title: "Job Title",
      location: "City, State",
      startDate: "Jan 2022",
      endDate: "Present",
      current: true,
      bullets: [
        { id: "bullet-1", content: "Achieved significant results by implementing key initiatives" },
        { id: "bullet-2", content: "Led cross-functional teams to deliver projects on time" },
        { id: "bullet-3", content: "Improved processes resulting in increased efficiency" },
      ],
    },
  ],
};

// Default education data
export const defaultEducationData: EducationData = {
  items: [
    {
      id: "edu-1",
      institution: "University Name",
      degree: "Bachelor of Science",
      field: "Computer Science",
      location: "City, State",
      startDate: "Sep 2018",
      endDate: "May 2022",
      gpa: "3.8",
      details: "",
    },
  ],
};

// Default skills data
export const defaultSkillsData: SkillsData = {
  categories: [
    {
      id: "cat-1",
      name: "Programming Languages",
      skills: ["JavaScript", "TypeScript", "Python", "Java"],
    },
    {
      id: "cat-2",
      name: "Frameworks & Libraries",
      skills: ["React", "Next.js", "Node.js", "Express"],
    },
    {
      id: "cat-3",
      name: "Tools & Technologies",
      skills: ["Git", "Docker", "AWS", "PostgreSQL"],
    },
  ],
};

// Default projects data
export const defaultProjectsData: ProjectsData = {
  items: [
    {
      id: "proj-1",
      name: "Project Name",
      description: "A brief description of the project",
      technologies: ["React", "TypeScript", "Node.js"],
      link: "github.com/username/project",
      bullets: [
        { id: "pbullet-1", content: "Implemented key features using modern technologies" },
        { id: "pbullet-2", content: "Achieved significant user engagement metrics" },
      ],
    },
  ],
};

// Default certifications data
export const defaultCertificationsData: CertificationsData = {
  items: [
    {
      id: "cert-1",
      name: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      date: "2023",
      link: "",
    },
  ],
};

// Default sections configuration
export const defaultSections: SectionConfig[] = [
  { id: "header", type: "header", label: "Header", visible: true, order: 0 },
  { id: "summary", type: "summary", label: "Professional Summary", visible: true, order: 1 },
  { id: "experience", type: "experience", label: "Work Experience", visible: true, order: 2 },
  { id: "education", type: "education", label: "Education", visible: true, order: 3 },
  { id: "skills", type: "skills", label: "Skills", visible: true, order: 4 },
  { id: "projects", type: "projects", label: "Academic Projects", visible: true, order: 5 },
  { id: "certifications", type: "certifications", label: "Certifications", visible: true, order: 6 },
];

// Default section data
export const defaultSectionData: Record<string, SectionData> = {
  header: defaultHeaderData,
  summary: defaultSummaryData,
  experience: defaultExperienceData,
  education: defaultEducationData,
  skills: defaultSkillsData,
  projects: defaultProjectsData,
  certifications: defaultCertificationsData,
};

// Create default resume
export function createDefaultResume(userId: string): ResumeDocument {
  const now = new Date().toISOString();
  return {
    id: "",
    name: "Untitled Resume",
    userId,
    sections: [...defaultSections],
    sectionData: { ...defaultSectionData },
    theme: { ...defaultTheme },
    createdAt: now,
    updatedAt: now,
  };
}
