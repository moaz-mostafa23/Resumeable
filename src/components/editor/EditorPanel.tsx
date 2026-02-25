"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { useEditorStore } from "@/store/useEditorStore";
import { usePDFDownload } from "@/hooks/usePDFDownload";
import { HeaderEditor } from "./sections/HeaderEditor";
import { SummaryEditor } from "./sections/SummaryEditor";
import { ExperienceEditor } from "./sections/ExperienceEditor";
import { EducationEditor } from "./sections/EducationEditor";
import { SkillsEditor } from "./sections/SkillsEditor";
import { ProjectsEditor } from "./sections/ProjectsEditor";
import { CertificationsEditor } from "./sections/CertificationsEditor";
import { CoursesEditor } from "./sections/CoursesEditor";
import { LanguagesEditor } from "./sections/LanguagesEditor";
import { AwardsEditor } from "./sections/AwardsEditor";
import { VolunteerEditor } from "./sections/VolunteerEditor";
import { InterestsEditor } from "./sections/InterestsEditor";
import { PublicationsEditor } from "./sections/PublicationsEditor";
import { ReferencesEditor } from "./sections/ReferencesEditor";
import { CustomSectionEditor } from "./sections/CustomSectionEditor";
import { ThemeEditor } from "./sections/ThemeEditor";
import { AIAssistantEditor } from "./sections/AIAssistantEditor";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowRight, Download } from "lucide-react";

export function EditorPanel() {
  const { resume } = useResumeStore();
  const { activeSection, setActiveSection } = useEditorStore();
  const { downloadPDF, isGenerating } = usePDFDownload();

  if (!resume || !activeSection) {
    return (
      <div className="h-full flex items-center justify-center p-8 text-center text-muted-foreground">
        Select a section to edit
      </div>
    );
  }

  // Build ordered list of section IDs: visible sections by order, then "theme"
  const orderedSectionIds = [
    ...resume.sections
      .filter((s) => s.visible)
      .sort((a, b) => a.order - b.order)
      .map((s) => s.id),
    "ai-assistant",
    "theme",
  ];

  const currentIndex = orderedSectionIds.indexOf(activeSection);
  const isLastSection = currentIndex === orderedSectionIds.length - 1;

  const handleNextSection = () => {
    if (isLastSection) {
      downloadPDF();
    } else {
      setActiveSection(orderedSectionIds[currentIndex + 1]);
    }
  };

  if (activeSection === "theme") {
    return (
      <div className="h-full flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <ThemeEditor />
        </div>
        <BottomButton
          isLastSection={isLastSection}
          isGenerating={isGenerating}
          onClick={handleNextSection}
        />
      </div>
    );
  }

  if (activeSection === "ai-assistant") {
    return (
      <div className="h-full flex flex-col">
        <div className="flex-1 overflow-y-auto p-6">
          <AIAssistantEditor />
        </div>
        <BottomButton
          isLastSection={isLastSection}
          isGenerating={isGenerating}
          onClick={handleNextSection}
        />
      </div>
    );
  }

  const section = resume.sections.find((s) => s.id === activeSection);
  if (!section) {
    return (
      <div className="h-full flex items-center justify-center p-8 text-center text-muted-foreground">
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
      case "courses":
        return <CoursesEditor />;
      case "languages":
        return <LanguagesEditor />;
      case "awards":
        return <AwardsEditor />;
      case "volunteer":
        return <VolunteerEditor />;
      case "interests":
        return <InterestsEditor />;
      case "publications":
        return <PublicationsEditor />;
      case "references":
        return <ReferencesEditor />;
      case "custom":
        return <CustomSectionEditor sectionId={section.id} />;
      default:
        return <div>Unknown section type</div>;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-6">
        <h2 className="text-xl font-semibold mb-6">{section.label}</h2>
        {renderEditor()}
      </div>
      <BottomButton
        isLastSection={isLastSection}
        isGenerating={isGenerating}
        onClick={handleNextSection}
      />
    </div>
  );
}

function BottomButton({
  isLastSection,
  isGenerating,
  onClick,
}: {
  isLastSection: boolean;
  isGenerating: boolean;
  onClick: () => void;
}) {
  return (
    <div className="flex-shrink-0 border-t bg-white p-4">
      <Button
        className="w-full"
        size="lg"
        onClick={onClick}
        disabled={isLastSection && isGenerating}
      >
        {isLastSection
          ? isGenerating
            ? "Generating..."
            : "Download PDF"
          : "On to the next!"}
        {isLastSection ? (
          isGenerating ? (
            <Loader2 className="h-4 w-4 ml-2 animate-spin" />
          ) : (
            <Download className="h-4 w-4 ml-2" />
          )
        ) : (
          <ArrowRight className="h-4 w-4 ml-2" />
        )}
      </Button>
    </div>
  );
}
