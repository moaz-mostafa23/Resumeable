"use client";

import { useState } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { useEditorStore } from "@/store/useEditorStore";
import { SortableSectionList } from "./dnd/SortableSectionList";
import { AddSectionPicker } from "./AddSectionPicker";
import { Button } from "@/components/ui/button";
import { Plus, Palette, Sparkles } from "lucide-react";

export function EditorSidebar() {
  const { resume } = useResumeStore();
  const { activeSection, setActiveSection } = useEditorStore();
  const [showPicker, setShowPicker] = useState(false);

  if (!resume) return null;

  return (
    <div className="p-4">
      <h2 className="font-semibold text-sm text-gray-500 uppercase tracking-wide mb-4">
        Sections
      </h2>

      <SortableSectionList
        sections={resume.sections}
        activeSection={activeSection}
        onSectionClick={setActiveSection}
      />

      {showPicker ? (
        <AddSectionPicker onClose={() => setShowPicker(false)} />
      ) : (
        <Button
          variant="outline"
          size="sm"
          className="w-full mt-4"
          onClick={() => setShowPicker(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Section
        </Button>
      )}

      <div className="border-t mt-6 pt-6">
        <Button
          variant={activeSection === "ai-assistant" ? "secondary" : "ghost"}
          className="w-full justify-start"
          onClick={() => setActiveSection("ai-assistant")}
        >
          <Sparkles className="h-4 w-4 mr-2" />
          AI Assistant
        </Button>
        <Button
          variant={activeSection === "theme" ? "secondary" : "ghost"}
          className="w-full justify-start"
          onClick={() => setActiveSection("theme")}
        >
          <Palette className="h-4 w-4 mr-2" />
          Customize & tinker
        </Button>
      </div>
    </div>
  );
}
