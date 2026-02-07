import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createClient } from "@/lib/supabase/client";
import {
  ResumeDocument,
  SectionConfig,
  SectionData,
  ThemeConfig,
  ExperienceData,
  EducationData,
  SkillsData,
  ProjectsData,
  CertificationsData,
  CustomSectionData,
  BulletPoint,
  ExperienceItem,
  EducationItem,
  SkillCategory,
  ProjectItem,
  CertificationItem,
  CustomItem,
  createDefaultResume,
} from "@/types/resume";
import { generateId } from "@/lib/utils";

interface ResumeState {
  resume: ResumeDocument | null;
  loading: boolean;
  saving: boolean;
  error: string | null;

  // Resume actions
  loadResume: (id: string) => Promise<void>;
  createResume: (userId: string, name?: string) => Promise<string | null>;
  saveResume: () => Promise<void>;
  setResumeName: (name: string) => void;

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

  // Custom section actions
  addCustomItem: (sectionId: string) => void;
  updateCustomItem: (sectionId: string, itemId: string, data: Partial<CustomItem>) => void;
  deleteCustomItem: (sectionId: string, itemId: string) => void;

  // Theme actions
  updateTheme: (theme: Partial<ThemeConfig>) => void;
}

export const useResumeStore = create<ResumeState>()(
  immer((set, get) => ({
    resume: null,
    loading: false,
    saving: false,
    error: null,

    loadResume: async (id: string) => {
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
          state.loading = false;
        });
      } catch (error) {
        set((state) => {
          state.error = (error as Error).message;
          state.loading = false;
        });
      }
    },

    createResume: async (userId: string, name?: string) => {
      set((state) => {
        state.loading = true;
        state.error = null;
      });

      try {
        const supabase = createClient();
        const newResume = createDefaultResume(userId);

        const { data, error } = await supabase
          .from("resumes")
          .insert({
            user_id: userId,
            name: name ?? newResume.name,
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
            sections: data.sections,
            sectionData: data.section_data,
            theme: data.theme,
            createdAt: data.created_at,
            updatedAt: data.updated_at,
          };
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
      const { resume } = get();
      if (!resume) return;

      set((state) => {
        state.saving = true;
      });

      try {
        const supabase = createClient();
        const { error } = await supabase
          .from("resumes")
          .update({
            name: resume.name,
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
