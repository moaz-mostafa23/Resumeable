import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderGit2,
  Award,
  BookOpen,
  Languages,
  Trophy,
  Heart,
  Sparkles,
  BookMarked,
  Users,
  Puzzle,
  LucideIcon,
} from "lucide-react";
import {
  SectionType,
  SectionData,
  defaultCoursesData,
  defaultLanguagesData,
  defaultAwardsData,
  defaultVolunteerData,
  defaultInterestsData,
  defaultPublicationsData,
  defaultReferencesData,
} from "@/types/resume";

export const sectionIconMap: Record<SectionType, LucideIcon> = {
  header: User,
  summary: FileText,
  experience: Briefcase,
  education: GraduationCap,
  skills: Wrench,
  projects: FolderGit2,
  certifications: Award,
  courses: BookOpen,
  languages: Languages,
  awards: Trophy,
  volunteer: Heart,
  interests: Sparkles,
  publications: BookMarked,
  references: Users,
  custom: Puzzle,
};

export interface AddableSectionDef {
  type: SectionType;
  label: string;
  description: string;
  defaultData: SectionData;
}

export const addableSections: AddableSectionDef[] = [
  {
    type: "courses",
    label: "Courses",
    description: "Show off what you've been learning",
    defaultData: defaultCoursesData,
  },
  {
    type: "languages",
    label: "Languages",
    description: "Let them know you're multilingual",
    defaultData: defaultLanguagesData,
  },
  {
    type: "awards",
    label: "Awards & Honors",
    description: "Flex those achievements",
    defaultData: defaultAwardsData,
  },
  {
    type: "volunteer",
    label: "Volunteer Experience",
    description: "Good deeds deserve a spotlight",
    defaultData: defaultVolunteerData,
  },
  {
    type: "interests",
    label: "Interests",
    description: "Add a personal touch",
    defaultData: defaultInterestsData,
  },
  {
    type: "publications",
    label: "Publications",
    description: "Papers, articles, and your written work",
    defaultData: defaultPublicationsData,
  },
  {
    type: "references",
    label: "References",
    description: "People who'll vouch for you",
    defaultData: defaultReferencesData,
  },
];
