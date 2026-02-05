"use client";

import { useState } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { SkillsData, SkillCategory } from "@/types/resume";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Plus, Trash2, X } from "lucide-react";

export function SkillsEditor() {
  const {
    resume,
    addSkillCategory,
    updateSkillCategory,
    deleteSkillCategory,
    addSkill,
    removeSkill,
  } = useResumeStore();

  const [newSkills, setNewSkills] = useState<Record<string, string>>({});

  if (!resume) return null;

  const data = resume.sectionData.skills as SkillsData;

  const handleAddSkill = (categoryId: string) => {
    const skill = newSkills[categoryId]?.trim();
    if (skill) {
      addSkill(categoryId, skill);
      setNewSkills((prev) => ({ ...prev, [categoryId]: "" }));
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    categoryId: string
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill(categoryId);
    }
  };

  return (
    <div className="space-y-4">
      {data.categories.map((category) => (
        <Card key={category.id}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <Input
                value={category.name}
                onChange={(e) =>
                  updateSkillCategory(category.id, { name: e.target.value })
                }
                className="font-medium border-0 p-0 h-auto text-base focus-visible:ring-0"
                placeholder="Category Name"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteSkillCategory(category.id)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {category.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="pr-1">
                  {skill}
                  <button
                    className="ml-1 hover:bg-muted rounded-full p-0.5"
                    onClick={() => removeSkill(category.id, index)}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newSkills[category.id] || ""}
                onChange={(e) =>
                  setNewSkills((prev) => ({
                    ...prev,
                    [category.id]: e.target.value,
                  }))
                }
                onKeyDown={(e) => handleKeyDown(e, category.id)}
                placeholder="Add a skill"
                className="flex-1"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAddSkill(category.id)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button variant="outline" className="w-full" onClick={addSkillCategory}>
        <Plus className="h-4 w-4 mr-2" />
        Add Category
      </Button>
    </div>
  );
}
