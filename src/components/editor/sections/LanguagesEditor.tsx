"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { LanguagesData, LanguageItem, LanguageProficiency } from "@/types/resume";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

const proficiencyOptions: { value: LanguageProficiency; label: string }[] = [
  { value: "native", label: "Native" },
  { value: "fluent", label: "Fluent" },
  { value: "advanced", label: "Advanced" },
  { value: "intermediate", label: "Intermediate" },
  { value: "beginner", label: "Beginner" },
];

export function LanguagesEditor() {
  const {
    resume,
    addLanguageItem,
    updateLanguageItem,
    deleteLanguageItem,
  } = useResumeStore();

  if (!resume) return null;

  const data = resume.sectionData.languages as LanguagesData;
  if (!data) return null;

  return (
    <div className="space-y-3">
      {data.items.map((item) => (
        <div key={item.id} className="flex items-end gap-3">
          <div className="flex-1">
            <Label>Language</Label>
            <Input
              value={item.language}
              onChange={(e) =>
                updateLanguageItem(item.id, { language: e.target.value })
              }
              placeholder="English"
            />
          </div>
          <div className="w-40">
            <Label>Proficiency</Label>
            <select
              value={item.proficiency}
              onChange={(e) =>
                updateLanguageItem(item.id, {
                  proficiency: e.target.value as LanguageProficiency,
                })
              }
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {proficiencyOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => deleteLanguageItem(item.id)}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      ))}

      <Button
        variant="outline"
        className="w-full"
        onClick={addLanguageItem}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Language
      </Button>
    </div>
  );
}
