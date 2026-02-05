"use client";

import { useState } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { useEditorStore } from "@/store/useEditorStore";
import { SortableSectionList } from "./dnd/SortableSectionList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Palette } from "lucide-react";

export function EditorSidebar() {
  const { resume, addCustomSection } = useResumeStore();
  const { activeSection, setActiveSection } = useEditorStore();
  const [showAddSection, setShowAddSection] = useState(false);
  const [newSectionName, setNewSectionName] = useState("");

  if (!resume) return null;

  const handleAddSection = () => {
    if (newSectionName.trim()) {
      addCustomSection(newSectionName.trim());
      setNewSectionName("");
      setShowAddSection(false);
    }
  };

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

      {showAddSection ? (
        <div className="mt-4 space-y-2">
          <Input
            placeholder="Section name"
            value={newSectionName}
            onChange={(e) => setNewSectionName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddSection();
              if (e.key === "Escape") setShowAddSection(false);
            }}
            autoFocus
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={handleAddSection}>
              Add
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowAddSection(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <Button
          variant="outline"
          size="sm"
          className="w-full mt-4"
          onClick={() => setShowAddSection(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Section
        </Button>
      )}

      <div className="border-t mt-6 pt-6">
        <Button
          variant={activeSection === "theme" ? "secondary" : "ghost"}
          className="w-full justify-start"
          onClick={() => setActiveSection("theme")}
        >
          <Palette className="h-4 w-4 mr-2" />
          Theme Settings
        </Button>
      </div>
    </div>
  );
}
