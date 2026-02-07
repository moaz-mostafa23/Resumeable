import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createClient } from "@/lib/supabase/client";
import {
  ResumeDocument,
  SectionConfig,
  SectionType,
  SectionData,
  ThemeConfig,
  TemplateId,
  DEFAULT_TEMPLATE_ID,
  ExperienceData,
  EducationData,
  SkillsData,
  ProjectsData,
  CertificationsData,
  CustomSectionData,
  CoursesData,
  LanguagesData,
  AwardsData,
  VolunteerData,
  InterestsData,
  PublicationsData,
  ReferencesData,
  BulletPoint,
  ExperienceItem,
  EducationItem,
  SkillCategory,
  ProjectItem,
  CertificationItem,
  CustomItem,
  CourseItem,
  LanguageItem,
  AwardItem,
  VolunteerItem,
  PublicationItem,
  ReferenceItem,
  createDefaultResume,
} from "@/types/resume";
import { generateId } from "@/lib/utils";

interface ResumeState {
  resume: ResumeDocument | null;
  resumeSource: "local" | "remote" | null;
  loading: boolean;
  saving: boolean;
  error: string | null;

  // Resume actions
  loadResume: (id: string) => Promise<void>;
  createResume: (userId: string, name?: string, templateId?: TemplateId) => Promise<string | null>;
  saveResume: () => Promise<void>;
  setResumeName: (name: string) => void;

  // Draft actions (for anonymous users)
  createDraftResume: (templateId?: TemplateId) => string;
  loadDraftResume: (draftId: string) => void;
  publishDraftToAccount: (userId: string) => Promise<string | null>;
  clearResume: () => void;

  // Section actions
  setSections: (sections: SectionConfig[]) => void;
  toggleSectionVisibility: (sectionId: string) => void;
  updateSectionLabel: (sectionId: string, label: string) => void;
  reorderSections: (startIndex: number, endIndex: number) => void;
  addCustomSection: (label: string) => void;
  deleteSection: (sectionId: string) => void;

  // Section data actions
  updateSectionData: <T extends SectionData>(sectionId: string, data: Partial<T>) => void;

  // Experience actions
  addExperienceItem: () => void;
  updateExperienceItem: (itemId: string, data: Partial<ExperienceItem>) => void;
  deleteExperienceItem: (itemId: string) => void;
  reorderExperienceItems: (startIndex: number, endIndex: number) => void;
  addExperienceBullet: (itemId: string) => void;
  updateExperienceBullet: (itemId: string, bulletId: string, content: string) => void;
  deleteExperienceBullet: (itemId: string, bulletId: string) => void;
  reorderExperienceBullets: (itemId: string, startIndex: number, endIndex: number) => void;

  // Education actions
  addEducationItem: () => void;
  updateEducationItem: (itemId: string, data: Partial<EducationItem>) => void;
  deleteEducationItem: (itemId: string) => void;
  reorderEducationItems: (startIndex: number, endIndex: number) => void;

  // Skills actions
  addSkillCategory: () => void;
  updateSkillCategory: (categoryId: string, data: Partial<SkillCategory>) => void;
  deleteSkillCategory: (categoryId: string) => void;
  reorderSkillCategories: (startIndex: number, endIndex: number) => void;
  addSkill: (categoryId: string, skill: string) => void;
  removeSkill: (categoryId: string, skillIndex: number) => void;

  // Project actions
  addProjectItem: () => void;
  updateProjectItem: (itemId: string, data: Partial<ProjectItem>) => void;
  deleteProjectItem: (itemId: string) => void;
  reorderProjectItems: (startIndex: number, endIndex: number) => void;
  addProjectBullet: (itemId: string) => void;
  updateProjectBullet: (itemId: string, bulletId: string, content: string) => void;
  deleteProjectBullet: (itemId: string, bulletId: string) => void;
  addProjectTechnology: (itemId: string, tech: string) => void;
  removeProjectTechnology: (itemId: string, techIndex: number) => void;

  // Certification actions
  addCertificationItem: () => void;
  updateCertificationItem: (itemId: string, data: Partial<CertificationItem>) => void;
  deleteCertificationItem: (itemId: string) => void;
  reorderCertificationItems: (startIndex: number, endIndex: number) => void;

  // Prebuilt section action
  addPrebuiltSection: (type: SectionType, label: string, defaultData: SectionData) => void;

  // Course actions
  addCourseItem: () => void;
  updateCourseItem: (itemId: string, data: Partial<CourseItem>) => void;
  deleteCourseItem: (itemId: string) => void;
  reorderCourseItems: (startIndex: number, endIndex: number) => void;

  // Language actions
  addLanguageItem: () => void;
  updateLanguageItem: (itemId: string, data: Partial<LanguageItem>) => void;
  deleteLanguageItem: (itemId: string) => void;

  // Award actions
  addAwardItem: () => void;
  updateAwardItem: (itemId: string, data: Partial<AwardItem>) => void;
  deleteAwardItem: (itemId: string) => void;
  reorderAwardItems: (startIndex: number, endIndex: number) => void;

  // Volunteer actions
  addVolunteerItem: () => void;
  updateVolunteerItem: (itemId: string, data: Partial<VolunteerItem>) => void;
  deleteVolunteerItem: (itemId: string) => void;
  reorderVolunteerItems: (startIndex: number, endIndex: number) => void;
  addVolunteerBullet: (itemId: string) => void;
  updateVolunteerBullet: (itemId: string, bulletId: string, content: string) => void;
  deleteVolunteerBullet: (itemId: string, bulletId: string) => void;
  reorderVolunteerBullets: (itemId: string, startIndex: number, endIndex: number) => void;

  // Interest actions
  addInterest: (interest: string) => void;
  removeInterest: (index: number) => void;

  // Publication actions
  addPublicationItem: () => void;
  updatePublicationItem: (itemId: string, data: Partial<PublicationItem>) => void;
  deletePublicationItem: (itemId: string) => void;
  reorderPublicationItems: (startIndex: number, endIndex: number) => void;

  // Reference actions
  addReferenceItem: () => void;
  updateReferenceItem: (itemId: string, data: Partial<ReferenceItem>) => void;
  deleteReferenceItem: (itemId: string) => void;
  reorderReferenceItems: (startIndex: number, endIndex: number) => void;

  // Custom section actions
  addCustomItem: (sectionId: string) => void;
  updateCustomItem: (sectionId: string, itemId: string, data: Partial<CustomItem>) => void;
  deleteCustomItem: (sectionId: string, itemId: string) => void;

  // Theme actions
  updateTheme: (theme: Partial<ThemeConfig>) => void;
}

// localStorage key prefix for drafts
const DRAFT_STORAGE_KEY = "resumeable_draft_";

export const useResumeStore = create<ResumeState>()(
  immer((set, get) => ({
    resume: null,
    resumeSource: null,
    loading: false,
    saving: false,
    error: null,

    loadResume: async (id: string) => {
      // Check if this is a local draft
      if (id.startsWith("draft-")) {
        get().loadDraftResume(id);
        return;
      }

      set((state) => {
        state.loading = true;
        state.error = null;
      });

      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("resumes")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;

        set((state) => {
          state.resume = {
            id: data.id,
            name: data.name,
            userId: data.user_id,
            templateId: data.template_id ?? DEFAULT_TEMPLATE_ID,
            sections: data.sections,
            sectionData: data.section_data,
            theme: {
              ...data.theme,
              // Ensure new theme properties exist with defaults
              nameFontSize: data.theme.nameFontSize ?? 28,
              titleFontSize: data.theme.titleFontSize ?? 14,
            },
            createdAt: data.created_at,
            updatedAt: data.updated_at,
          };
          state.resumeSource = "remote";
          state.loading = false;
        });
      } catch (error) {
        set((state) => {
          state.error = (error as Error).message;
          state.loading = false;
        });
      }
    },

    createResume: async (userId: string, name?: string, templateId?: TemplateId) => {
      set((state) => {
        state.loading = true;
        state.error = null;
      });

      try {
        const supabase = createClient();
        const newResume = createDefaultResume(userId, templateId);

        const { data, error } = await supabase
          .from("resumes")
          .insert({
            user_id: userId,
            name: name ?? newResume.name,
            template_id: newResume.templateId,
            sections: newResume.sections,
            section_data: newResume.sectionData,
            theme: newResume.theme,
          })
          .select()
          .single();

        if (error) throw error;

        set((state) => {
          state.resume = {
            id: data.id,
            name: data.name,
            userId: data.user_id,
            templateId: data.template_id ?? DEFAULT_TEMPLATE_ID,
            sections: data.sections,
            sectionData: data.section_data,
            theme: data.theme,
            createdAt: data.created_at,
            updatedAt: data.updated_at,
          };
          state.resumeSource = "remote";
          state.loading = false;
        });

        return data.id;
      } catch (error) {
        set((state) => {
          state.error = (error as Error).message;
          state.loading = false;
        });
        return null;
      }
    },

    saveResume: async () => {
      const { resume, resumeSource } = get();
      if (!resume) return;

      // For local drafts, save to localStorage
      if (resumeSource === "local") {
        try {
          localStorage.setItem(
            DRAFT_STORAGE_KEY + resume.id,
            JSON.stringify(resume)
          );
        } catch (error) {
          console.error("Failed to save draft to localStorage:", error);
        }
        return;
      }

      // For remote resumes, save to Supabase
      set((state) => {
        state.saving = true;
      });

      try {
        const supabase = createClient();
        const { error } = await supabase
          .from("resumes")
          .update({
            name: resume.name,
            template_id: resume.templateId,
            sections: resume.sections,
            section_data: resume.sectionData,
            theme: resume.theme,
          })
          .eq("id", resume.id);

        if (error) throw error;

        set((state) => {
          state.saving = false;
        });
      } catch (error) {
        set((state) => {
          state.error = (error as Error).message;
          state.saving = false;
        });
      }
    },

    setResumeName: (name: string) => {
      set((state) => {
        if (state.resume) {
          state.resume.name = name;
        }
      });
    },

    // Draft actions for anonymous users
    createDraftResume: (templateId?: TemplateId) => {
      const draftId = `draft-${generateId()}`;
      const now = new Date().toISOString();
      const newResume = createDefaultResume("", templateId);
      newResume.id = draftId;
      newResume.userId = "";
      newResume.createdAt = now;
      newResume.updatedAt = now;

      set((state) => {
        state.resume = newResume;
        state.resumeSource = "local";
        state.loading = false;
        state.error = null;
      });

      // Persist to localStorage
      try {
        localStorage.setItem(DRAFT_STORAGE_KEY + draftId, JSON.stringify(newResume));
      } catch (error) {
        console.error("Failed to save draft to localStorage:", error);
      }

      return draftId;
    },

    loadDraftResume: (draftId: string) => {
      set((state) => {
        state.loading = true;
        state.error = null;
      });

      try {
        const stored = localStorage.getItem(DRAFT_STORAGE_KEY + draftId);
        if (stored) {
          const resume = JSON.parse(stored) as ResumeDocument;
          set((state) => {
            state.resume = resume;
            state.resumeSource = "local";
            state.loading = false;
          });
        } else {
          // Draft not found in localStorage, create a new one with the same id
          const now = new Date().toISOString();
          const newResume = createDefaultResume("");
          newResume.id = draftId;
          newResume.userId = "";
          newResume.createdAt = now;
          newResume.updatedAt = now;

          set((state) => {
            state.resume = newResume;
            state.resumeSource = "local";
            state.loading = false;
          });

          localStorage.setItem(DRAFT_STORAGE_KEY + draftId, JSON.stringify(newResume));
        }
      } catch (error) {
        set((state) => {
          state.error = (error as Error).message;
          state.loading = false;
        });
      }
    },

    publishDraftToAccount: async (userId: string) => {
      const { resume } = get();
      if (!resume || !resume.id.startsWith("draft-")) return null;

      set((state) => {
        state.loading = true;
        state.error = null;
      });

      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("resumes")
          .insert({
            user_id: userId,
            name: resume.name,
            template_id: resume.templateId,
            sections: resume.sections,
            section_data: resume.sectionData,
            theme: resume.theme,
          })
          .select()
          .single();

        if (error) throw error;

        // Remove from localStorage
        try {
          localStorage.removeItem(DRAFT_STORAGE_KEY + resume.id);
        } catch {
          // Ignore localStorage errors
        }

        set((state) => {
          state.resume = {
            id: data.id,
            name: data.name,
            userId: data.user_id,
            templateId: data.template_id ?? DEFAULT_TEMPLATE_ID,
            sections: data.sections,
            sectionData: data.section_data,
            theme: data.theme,
            createdAt: data.created_at,
            updatedAt: data.updated_at,
          };
          state.resumeSource = "remote";
          state.loading = false;
        });

        return data.id;
      } catch (error) {
        set((state) => {
          state.error = (error as Error).message;
          state.loading = false;
        });
        return null;
      }
    },

    clearResume: () => {
      set((state) => {
        state.resume = null;
        state.resumeSource = null;
        state.loading = false;
        state.saving = false;
        state.error = null;
      });
    },

    setSections: (sections: SectionConfig[]) => {
      set((state) => {
        if (state.resume) {
          state.resume.sections = sections;
        }
      });
    },

    toggleSectionVisibility: (sectionId: string) => {
      set((state) => {
        if (state.resume) {
          const section = state.resume.sections.find((s) => s.id === sectionId);
          if (section) {
            section.visible = !section.visible;
          }
        }
      });
    },

    updateSectionLabel: (sectionId: string, label: string) => {
      set((state) => {
        if (state.resume) {
          const section = state.resume.sections.find((s) => s.id === sectionId);
          if (section) {
            section.label = label;
          }
        }
      });
    },

    reorderSections: (startIndex: number, endIndex: number) => {
      set((state) => {
        if (state.resume) {
          const [removed] = state.resume.sections.splice(startIndex, 1);
          state.resume.sections.splice(endIndex, 0, removed);
          state.resume.sections.forEach((s, i) => (s.order = i));
        }
      });
    },

    addCustomSection: (label: string) => {
      set((state) => {
        if (state.resume) {
          const id = `custom-${generateId()}`;
          state.resume.sections.push({
            id,
            type: "custom",
            label,
            visible: true,
            order: state.resume.sections.length,
          });
          state.resume.sectionData[id] = { items: [] } as CustomSectionData;
        }
      });
    },

    deleteSection: (sectionId: string) => {
      set((state) => {
        if (state.resume) {
          state.resume.sections = state.resume.sections.filter((s) => s.id !== sectionId);
          delete state.resume.sectionData[sectionId];
        }
      });
    },

    updateSectionData: <T extends SectionData>(sectionId: string, data: Partial<T>) => {
      set((state) => {
        if (state.resume && state.resume.sectionData[sectionId]) {
          state.resume.sectionData[sectionId] = {
            ...state.resume.sectionData[sectionId],
            ...data,
          } as T;
        }
      });
    },

    // Experience actions
    addExperienceItem: () => {
      set((state) => {
        if (state.resume) {
          const data = state.resume.sectionData.experience as ExperienceData;
          data.items.push({
            id: `exp-${generateId()}`,
            company: "Company Name",
            title: "Job Title",
            location: "City, State",
            startDate: "Jan 2023",
            endDate: "Present",
            current: true,
            bullets: [{ id: `bullet-${generateId()}`, content: "Describe your responsibilities and achievements" }],
          });
        }
      });
    },

    updateExperienceItem: (itemId: string, data: Partial<ExperienceItem>) => {
      set((state) => {
        if (state.resume) {
          const expData = state.resume.sectionData.experience as ExperienceData;
          const item = expData.items.find((i) => i.id === itemId);
          if (item) {
            Object.assign(item, data);
          }
        }
      });
    },

    deleteExperienceItem: (itemId: string) => {
      set((state) => {
        if (state.resume) {
          const data = state.resume.sectionData.experience as ExperienceData;
          data.items = data.items.filter((i) => i.id !== itemId);
        }
      });
    },

    reorderExperienceItems: (startIndex: number, endIndex: number) => {
      set((state) => {
        if (state.resume) {
          const data = state.resume.sectionData.experience as ExperienceData;
          const [removed] = data.items.splice(startIndex, 1);
          data.items.splice(endIndex, 0, removed);
        }
      });
    },

    addExperienceBullet: (itemId: string) => {
      set((state) => {
        if (state.resume) {
          const data = state.resume.sectionData.experience as ExperienceData;
          const item = data.items.find((i) => i.id === itemId);
          if (item) {
            item.bullets.push({ id: `bullet-${generateId()}`, content: "" });
          }
        }
      });
    },

    updateExperienceBullet: (itemId: string, bulletId: string, content: string) => {
      set((state) => {
        if (state.resume) {
          const data = state.resume.sectionData.experience as ExperienceData;
          const item = data.items.find((i) => i.id === itemId);
          if (item) {
            const bullet = item.bullets.find((b) => b.id === bulletId);
            if (bullet) {
              bullet.content = content;
            }
          }
        }
      });
    },

    deleteExperienceBullet: (itemId: string, bulletId: string) => {
      set((state) => {
        if (state.resume) {
          const data = state.resume.sectionData.experience as ExperienceData;
          const item = data.items.find((i) => i.id === itemId);
          if (item) {
            item.bullets = item.bullets.filter((b) => b.id !== bulletId);
          }
        }
      });
    },

    reorderExperienceBullets: (itemId: string, startIndex: number, endIndex: number) => {
      set((state) => {
        if (state.resume) {
          const data = state.resume.sectionData.experience as ExperienceData;
          const item = data.items.find((i) => i.id === itemId);
          if (item) {
            const [removed] = item.bullets.splice(startIndex, 1);
            item.bullets.splice(endIndex, 0, removed);
          }
        }
      });
    },

    // Education actions
    addEducationItem: () => {
      set((state) => {
        if (state.resume) {
          const data = state.resume.sectionData.education as EducationData;
          data.items.push({
            id: `edu-${generateId()}`,
            institution: "University Name",
            degree: "Degree",
            field: "Field of Study",
            location: "City, State",
            startDate: "Sep 2019",
            endDate: "May 2023",
            gpa: "",
            details: "",
          });
        }
      });
    },

    updateEducationItem: (itemId: string, data: Partial<EducationItem>) => {
      set((state) => {
        if (state.resume) {
          const eduData = state.resume.sectionData.education as EducationData;
          const item = eduData.items.find((i) => i.id === itemId);
          if (item) {
            Object.assign(item, data);
          }
        }
      });
    },

    deleteEducationItem: (itemId: string) => {
      set((state) => {
        if (state.resume) {
          const data = state.resume.sectionData.education as EducationData;
          data.items = data.items.filter((i) => i.id !== itemId);
        }
      });
    },

    reorderEducationItems: (startIndex: number, endIndex: number) => {
      set((state) => {
        if (state.resume) {
          const data = state.resume.sectionData.education as EducationData;
          const [removed] = data.items.splice(startIndex, 1);
          data.items.splice(endIndex, 0, removed);
        }
      });
    },

    // Skills actions
    addSkillCategory: () => {
      set((state) => {
        if (state.resume) {
          const data = state.resume.sectionData.skills as SkillsData;
          data.categories.push({
            id: `cat-${generateId()}`,
            name: "Category Name",
            skills: [],
          });
        }
      });
    },

    updateSkillCategory: (categoryId: string, data: Partial<SkillCategory>) => {
      set((state) => {
        if (state.resume) {
          const skillsData = state.resume.sectionData.skills as SkillsData;
          const category = skillsData.categories.find((c) => c.id === categoryId);
          if (category) {
            Object.assign(category, data);
          }
        }
      });
    },

    deleteSkillCategory: (categoryId: string) => {
      set((state) => {
        if (state.resume) {
          const data = state.resume.sectionData.skills as SkillsData;
          data.categories = data.categories.filter((c) => c.id !== categoryId);
        }
      });
    },

    reorderSkillCategories: (startIndex: number, endIndex: number) => {
      set((state) => {
        if (state.resume) {
          const data = state.resume.sectionData.skills as SkillsData;
          const [removed] = data.categories.splice(startIndex, 1);
          data.categories.splice(endIndex, 0, removed);
        }
      });
    },

    addSkill: (categoryId: string, skill: string) => {
      set((state) => {
        if (state.resume) {
          const data = state.resume.sectionData.skills as SkillsData;
          const category = data.categories.find((c) => c.id === categoryId);
          if (category) {
            category.skills.push(skill);
          }
        }
      });
    },

    removeSkill: (categoryId: string, skillIndex: number) => {
      set((state) => {
        if (state.resume) {
          const data = state.resume.sectionData.skills as SkillsData;
          const category = data.categories.find((c) => c.id === categoryId);
          if (category) {
            category.skills.splice(skillIndex, 1);
          }
        }
      });
    },

    // Project actions
    addProjectItem: () => {
      set((state) => {
        if (state.resume) {
          const data = state.resume.sectionData.projects as ProjectsData;
          data.items.push({
            id: `proj-${generateId()}`,
            name: "Project Name",
            description: "",
            technologies: [],
            link: "",
            bullets: [{ id: `pbullet-${generateId()}`, content: "" }],
          });
        }
      });
    },

    updateProjectItem: (itemId: string, data: Partial<ProjectItem>) => {
      set((state) => {
        if (state.resume) {
          const projData = state.resume.sectionData.projects as ProjectsData;
          const item = projData.items.find((i) => i.id === itemId);
          if (item) {
            Object.assign(item, data);
          }
        }
      });
    },

    deleteProjectItem: (itemId: string) => {
      set((state) => {
        if (state.resume) {
          const data = state.resume.sectionData.projects as ProjectsData;
          data.items = data.items.filter((i) => i.id !== itemId);
        }
      });
    },

    reorderProjectItems: (startIndex: number, endIndex: number) => {
      set((state) => {
        if (state.resume) {
          const data = state.resume.sectionData.projects as ProjectsData;
          const [removed] = data.items.splice(startIndex, 1);
          data.items.splice(endIndex, 0, removed);
        }
      });
    },

    addProjectBullet: (itemId: string) => {
      set((state) => {
        if (state.resume) {
          const data = state.resume.sectionData.projects as ProjectsData;
          const item = data.items.find((i) => i.id === itemId);
          if (item) {
            item.bullets.push({ id: `pbullet-${generateId()}`, content: "" });
          }
        }
      });
    },

    updateProjectBullet: (itemId: string, bulletId: string, content: string) => {
      set((state) => {
        if (state.resume) {
          const data = state.resume.sectionData.projects as ProjectsData;
          const item = data.items.find((i) => i.id === itemId);
          if (item) {
            const bullet = item.bullets.find((b) => b.id === bulletId);
            if (bullet) {
              bullet.content = content;
            }
          }
        }
      });
    },

    deleteProjectBullet: (itemId: string, bulletId: string) => {
      set((state) => {
        if (state.resume) {
          const data = state.resume.sectionData.projects as ProjectsData;
          const item = data.items.find((i) => i.id === itemId);
          if (item) {
            item.bullets = item.bullets.filter((b) => b.id !== bulletId);
          }
        }
      });
    },

    addProjectTechnology: (itemId: string, tech: string) => {
      set((state) => {
        if (state.resume) {
          const data = state.resume.sectionData.projects as ProjectsData;
          const item = data.items.find((i) => i.id === itemId);
          if (item) {
            item.technologies.push(tech);
          }
        }
      });
    },

    removeProjectTechnology: (itemId: string, techIndex: number) => {
      set((state) => {
        if (state.resume) {
          const data = state.resume.sectionData.projects as ProjectsData;
          const item = data.items.find((i) => i.id === itemId);
          if (item) {
            item.technologies.splice(techIndex, 1);
          }
        }
      });
    },

    // Certification actions
    addCertificationItem: () => {
      set((state) => {
        if (state.resume) {
          const data = state.resume.sectionData.certifications as CertificationsData;
          data.items.push({
            id: `cert-${generateId()}`,
            name: "Certification Name",
            issuer: "Issuing Organization",
            date: "2023",
            link: "",
          });
        }
      });
    },

    updateCertificationItem: (itemId: string, data: Partial<CertificationItem>) => {
      set((state) => {
        if (state.resume) {
          const certData = state.resume.sectionData.certifications as CertificationsData;
          const item = certData.items.find((i) => i.id === itemId);
          if (item) {
            Object.assign(item, data);
          }
        }
      });
    },

    deleteCertificationItem: (itemId: string) => {
      set((state) => {
        if (state.resume) {
          const data = state.resume.sectionData.certifications as CertificationsData;
          data.items = data.items.filter((i) => i.id !== itemId);
        }
      });
    },

    reorderCertificationItems: (startIndex: number, endIndex: number) => {
      set((state) => {
        if (state.resume) {
          const data = state.resume.sectionData.certifications as CertificationsData;
          const [removed] = data.items.splice(startIndex, 1);
          data.items.splice(endIndex, 0, removed);
        }
      });
    },

    // Prebuilt section action
    addPrebuiltSection: (type: SectionType, label: string, defaultData: SectionData) => {
      set((state) => {
        if (state.resume) {
          // Prevent duplicates — use type as section id for singletons
          if (state.resume.sections.some((s) => s.id === type)) return;
          state.resume.sections.push({
            id: type,
            type,
            label,
            visible: true,
            order: state.resume.sections.length,
          });
          state.resume.sectionData[type] = defaultData;
        }
      });
    },

    // Course actions
    addCourseItem: () => {
      set((state) => {
        if (state.resume) {
          const data = state.resume.sectionData.courses as CoursesData;
          if (data) {
            data.items.push({
              id: `course-${generateId()}`,
              name: "Course Name",
              institution: "Platform / Institution",
              date: "2023",
              link: "",
            });
          }
        }
      });
    },

    updateCourseItem: (itemId: string, data: Partial<CourseItem>) => {
      set((state) => {
        if (state.resume) {
          const courseData = state.resume.sectionData.courses as CoursesData;
          if (courseData) {
            const item = courseData.items.find((i) => i.id === itemId);
            if (item) Object.assign(item, data);
          }
        }
      });
    },

    deleteCourseItem: (itemId: string) => {
      set((state) => {
        if (state.resume) {
          const data = state.resume.sectionData.courses as CoursesData;
          if (data) data.items = data.items.filter((i) => i.id !== itemId);
        }
      });
    },

    reorderCourseItems: (startIndex: number, endIndex: number) => {
      set((state) => {
        if (state.resume) {
          const data = state.resume.sectionData.courses as CoursesData;
          if (data) {
            const [removed] = data.items.splice(startIndex, 1);
            data.items.splice(endIndex, 0, removed);
          }
        }
      });
    },

    // Language actions
    addLanguageItem: () => {
      set((state) => {
        if (state.resume) {
          const data = state.resume.sectionData.languages as LanguagesData;
          if (data) {
            data.items.push({
              id: `lang-${generateId()}`,
              language: "Language",
              proficiency: "intermediate",
            });
          }
        }
      });
    },

    updateLanguageItem: (itemId: string, data: Partial<LanguageItem>) => {
      set((state) => {
        if (state.resume) {
          const langData = state.resume.sectionData.languages as LanguagesData;
          if (langData) {
            const item = langData.items.find((i) => i.id === itemId);
            if (item) Object.assign(item, data);
          }
        }
      });
    },

    deleteLanguageItem: (itemId: string) => {
      set((state) => {
        if (state.resume) {
          const data = state.resume.sectionData.languages as LanguagesData;
          if (data) data.items = data.items.filter((i) => i.id !== itemId);
        }
      });
    },

    // Award actions
    addAwardItem: () => {
      set((state) => {
        if (state.resume) {
          const data = state.resume.sectionData.awards as AwardsData;
          if (data) {
            data.items.push({
              id: `award-${generateId()}`,
              name: "Award Name",
              issuer: "Issuing Organization",
              date: "2023",
              description: "",
            });
          }
        }
      });
    },

    updateAwardItem: (itemId: string, data: Partial<AwardItem>) => {
      set((state) => {
        if (state.resume) {
          const awardData = state.resume.sectionData.awards as AwardsData;
          if (awardData) {
            const item = awardData.items.find((i) => i.id === itemId);
            if (item) Object.assign(item, data);
          }
        }
      });
    },

    deleteAwardItem: (itemId: string) => {
      set((state) => {
        if (state.resume) {
          const data = state.resume.sectionData.awards as AwardsData;
          if (data) data.items = data.items.filter((i) => i.id !== itemId);
        }
      });
    },

    reorderAwardItems: (startIndex: number, endIndex: number) => {
      set((state) => {
        if (state.resume) {
          const data = state.resume.sectionData.awards as AwardsData;
          if (data) {
            const [removed] = data.items.splice(startIndex, 1);
            data.items.splice(endIndex, 0, removed);
          }
        }
      });
    },

    // Volunteer actions
    addVolunteerItem: () => {
      set((state) => {
        if (state.resume) {
          const data = state.resume.sectionData.volunteer as VolunteerData;
          if (data) {
            data.items.push({
              id: `vol-${generateId()}`,
              organization: "Organization Name",
              role: "Volunteer Role",
              location: "City, State",
              startDate: "Jan 2023",
              endDate: "Present",
              current: true,
              bullets: [{ id: `vbullet-${generateId()}`, content: "" }],
            });
          }
        }
      });
    },

    updateVolunteerItem: (itemId: string, data: Partial<VolunteerItem>) => {
      set((state) => {
        if (state.resume) {
          const volData = state.resume.sectionData.volunteer as VolunteerData;
          if (volData) {
            const item = volData.items.find((i) => i.id === itemId);
            if (item) Object.assign(item, data);
          }
        }
      });
    },

    deleteVolunteerItem: (itemId: string) => {
      set((state) => {
        if (state.resume) {
          const data = state.resume.sectionData.volunteer as VolunteerData;
          if (data) data.items = data.items.filter((i) => i.id !== itemId);
        }
      });
    },

    reorderVolunteerItems: (startIndex: number, endIndex: number) => {
      set((state) => {
        if (state.resume) {
          const data = state.resume.sectionData.volunteer as VolunteerData;
          if (data) {
            const [removed] = data.items.splice(startIndex, 1);
            data.items.splice(endIndex, 0, removed);
          }
        }
      });
    },

    addVolunteerBullet: (itemId: string) => {
      set((state) => {
        if (state.resume) {
          const data = state.resume.sectionData.volunteer as VolunteerData;
          if (data) {
            const item = data.items.find((i) => i.id === itemId);
            if (item) item.bullets.push({ id: `vbullet-${generateId()}`, content: "" });
          }
        }
      });
    },

    updateVolunteerBullet: (itemId: string, bulletId: string, content: string) => {
      set((state) => {
        if (state.resume) {
          const data = state.resume.sectionData.volunteer as VolunteerData;
          if (data) {
            const item = data.items.find((i) => i.id === itemId);
            if (item) {
              const bullet = item.bullets.find((b) => b.id === bulletId);
              if (bullet) bullet.content = content;
            }
          }
        }
      });
    },

    deleteVolunteerBullet: (itemId: string, bulletId: string) => {
      set((state) => {
        if (state.resume) {
          const data = state.resume.sectionData.volunteer as VolunteerData;
          if (data) {
            const item = data.items.find((i) => i.id === itemId);
            if (item) item.bullets = item.bullets.filter((b) => b.id !== bulletId);
          }
        }
      });
    },

    reorderVolunteerBullets: (itemId: string, startIndex: number, endIndex: number) => {
      set((state) => {
        if (state.resume) {
          const data = state.resume.sectionData.volunteer as VolunteerData;
          if (data) {
            const item = data.items.find((i) => i.id === itemId);
            if (item) {
              const [removed] = item.bullets.splice(startIndex, 1);
              item.bullets.splice(endIndex, 0, removed);
            }
          }
        }
      });
    },

    // Interest actions
    addInterest: (interest: string) => {
      set((state) => {
        if (state.resume) {
          const data = state.resume.sectionData.interests as InterestsData;
          if (data) data.items.push(interest);
        }
      });
    },

    removeInterest: (index: number) => {
      set((state) => {
        if (state.resume) {
          const data = state.resume.sectionData.interests as InterestsData;
          if (data) data.items.splice(index, 1);
        }
      });
    },

    // Publication actions
    addPublicationItem: () => {
      set((state) => {
        if (state.resume) {
          const data = state.resume.sectionData.publications as PublicationsData;
          if (data) {
            data.items.push({
              id: `pub-${generateId()}`,
              title: "Publication Title",
              publisher: "Publisher",
              date: "2023",
              link: "",
              description: "",
            });
          }
        }
      });
    },

    updatePublicationItem: (itemId: string, data: Partial<PublicationItem>) => {
      set((state) => {
        if (state.resume) {
          const pubData = state.resume.sectionData.publications as PublicationsData;
          if (pubData) {
            const item = pubData.items.find((i) => i.id === itemId);
            if (item) Object.assign(item, data);
          }
        }
      });
    },

    deletePublicationItem: (itemId: string) => {
      set((state) => {
        if (state.resume) {
          const data = state.resume.sectionData.publications as PublicationsData;
          if (data) data.items = data.items.filter((i) => i.id !== itemId);
        }
      });
    },

    reorderPublicationItems: (startIndex: number, endIndex: number) => {
      set((state) => {
        if (state.resume) {
          const data = state.resume.sectionData.publications as PublicationsData;
          if (data) {
            const [removed] = data.items.splice(startIndex, 1);
            data.items.splice(endIndex, 0, removed);
          }
        }
      });
    },

    // Reference actions
    addReferenceItem: () => {
      set((state) => {
        if (state.resume) {
          const data = state.resume.sectionData.references as ReferencesData;
          if (data) {
            data.items.push({
              id: `ref-${generateId()}`,
              name: "Reference Name",
              title: "Job Title",
              company: "Company Name",
              email: "",
              phone: "",
              relationship: "",
            });
          }
        }
      });
    },

    updateReferenceItem: (itemId: string, data: Partial<ReferenceItem>) => {
      set((state) => {
        if (state.resume) {
          const refData = state.resume.sectionData.references as ReferencesData;
          if (refData) {
            const item = refData.items.find((i) => i.id === itemId);
            if (item) Object.assign(item, data);
          }
        }
      });
    },

    deleteReferenceItem: (itemId: string) => {
      set((state) => {
        if (state.resume) {
          const data = state.resume.sectionData.references as ReferencesData;
          if (data) data.items = data.items.filter((i) => i.id !== itemId);
        }
      });
    },

    reorderReferenceItems: (startIndex: number, endIndex: number) => {
      set((state) => {
        if (state.resume) {
          const data = state.resume.sectionData.references as ReferencesData;
          if (data) {
            const [removed] = data.items.splice(startIndex, 1);
            data.items.splice(endIndex, 0, removed);
          }
        }
      });
    },

    // Custom section actions
    addCustomItem: (sectionId: string) => {
      set((state) => {
        if (state.resume) {
          const data = state.resume.sectionData[sectionId] as CustomSectionData;
          if (data) {
            data.items.push({
              id: `custom-item-${generateId()}`,
              title: "Title",
              subtitle: "Subtitle",
              date: "",
              description: "",
              bullets: [],
            });
          }
        }
      });
    },

    updateCustomItem: (sectionId: string, itemId: string, data: Partial<CustomItem>) => {
      set((state) => {
        if (state.resume) {
          const sectionData = state.resume.sectionData[sectionId] as CustomSectionData;
          if (sectionData) {
            const item = sectionData.items.find((i) => i.id === itemId);
            if (item) {
              Object.assign(item, data);
            }
          }
        }
      });
    },

    deleteCustomItem: (sectionId: string, itemId: string) => {
      set((state) => {
        if (state.resume) {
          const data = state.resume.sectionData[sectionId] as CustomSectionData;
          if (data) {
            data.items = data.items.filter((i) => i.id !== itemId);
          }
        }
      });
    },

    // Theme actions
    updateTheme: (theme: Partial<ThemeConfig>) => {
      set((state) => {
        if (state.resume) {
          state.resume.theme = { ...state.resume.theme, ...theme };
        }
      });
    },
  }))
);
