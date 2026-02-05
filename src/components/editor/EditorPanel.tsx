"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { useEditorStore } from "@/store/useEditorStore";
import { HeaderEditor } from "./sections/HeaderEditor";
import { SummaryEditor } from "./sections/SummaryEditor";
import { ExperienceEditor } from "./sections/ExperienceEditor";
import { EducationEditor } from "./sections/EducationEditor";
import { SkillsEditor } from "./sections/SkillsEditor";
import { ProjectsEditor } from "./sections/ProjectsEditor";
import { CertificationsEditor } from "./sections/CertificationsEditor";
import { CustomSectionEditor } from "./sections/CustomSectionEditor";
import { ThemeEditor } from "./sections/ThemeEditor";

export function EditorPanel() {
  const { resume } = useResumeStore();
  const { activeSection } = useEditorStore();

  if (!resume || !activeSection) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Select a section to edit
      </div>
    );
  }

  if (activeSection === "theme") {
    return <ThemeEditor />;
  }

  const section = resume.sections.find((s) => s.id === activeSection);
  if (!section) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Section not found
      </div>
    );
  }

  const renderEditor = () => {
    switch (section.type) {
      case "header":
        return <HeaderEditor />;
      case "summary":
        return <SummaryEditor />;
      case "experience":
        return <ExperienceEditor />;
      case "education":
        return <EducationEditor />;
      case "skills":
        return <SkillsEditor />;
      case "projects":
        return <ProjectsEditor />;
      case "certifications":
        return <CertificationsEditor />;
      case "custom":
        return <CustomSectionEditor sectionId={section.id} />;
      default:
        return <div>Unknown section type</div>;
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">{section.label}</h2>
      {renderEditor()}
    </div>
  );
}
