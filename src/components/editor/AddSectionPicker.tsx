"use client";

import { useState } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { useEditorStore } from "@/store/useEditorStore";
import { addableSections, sectionIconMap } from "@/lib/section-config";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Puzzle, Plus } from "lucide-react";

interface AddSectionPickerProps {
  onClose: () => void;
}

export function AddSectionPicker({ onClose }: AddSectionPickerProps) {
  const { resume, addPrebuiltSection, addCustomSection } = useResumeStore();
  const { setActiveSection } = useEditorStore();
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customName, setCustomName] = useState("");

  if (!resume) return null;

  const existingSectionTypes = new Set(resume.sections.map((s) => s.type));
  const existingSectionIds = new Set(resume.sections.map((s) => s.id));
  const available = addableSections.filter(
    (s) => !existingSectionIds.has(s.type)
  );

  const handleAddPrebuilt = (def: (typeof addableSections)[0]) => {
    addPrebuiltSection(def.type, def.label, def.defaultData);
    setActiveSection(def.type);
    onClose();
  };

  const handleAddCustom = () => {
    const trimmed = customName.trim();
    if (trimmed) {
      addCustomSection(trimmed);
      setCustomName("");
      setShowCustomInput(false);
      onClose();
    }
  };

  return (
    <div className="mt-2 border rounded-lg bg-white shadow-lg p-2 space-y-1">
      {available.length > 0 && (
        <>
          {available.map((def) => {
            const Icon = sectionIconMap[def.type];
            return (
              <button
                key={def.type}
                className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 transition-colors text-left"
                onClick={() => handleAddPrebuilt(def)}
              >
                <Icon className="h-4 w-4 text-gray-500 shrink-0" />
                <div className="min-w-0">
                  <div className="text-sm font-medium">{def.label}</div>
                  <div className="text-xs text-muted-foreground truncate">
                    {def.description}
                  </div>
                </div>
              </button>
            );
          })}
          <div className="border-t my-1" />
        </>
      )}

      {showCustomInput ? (
        <div className="p-2 space-y-2">
          <Input
            placeholder="Section name"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddCustom();
              if (e.key === "Escape") {
                setShowCustomInput(false);
                setCustomName("");
              }
            }}
            autoFocus
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={handleAddCustom}>
              Add
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setShowCustomInput(false);
                setCustomName("");
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <button
          className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 transition-colors text-left"
          onClick={() => setShowCustomInput(true)}
        >
          <Puzzle className="h-4 w-4 text-gray-500 shrink-0" />
          <div className="min-w-0">
            <div className="text-sm font-medium">Build your own</div>
            <div className="text-xs text-muted-foreground">
              Create a custom section
            </div>
          </div>
        </button>
      )}

      <div className="border-t pt-1">
        <Button
          variant="ghost"
          size="sm"
          className="w-full text-muted-foreground"
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
