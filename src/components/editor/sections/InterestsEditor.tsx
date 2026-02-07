"use client";

import { useState } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { InterestsData } from "@/types/resume";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";

export function InterestsEditor() {
  const { resume, addInterest, removeInterest } = useResumeStore();
  const [newInterest, setNewInterest] = useState("");

  if (!resume) return null;

  const data = resume.sectionData.interests as InterestsData;
  if (!data) return null;

  const handleAdd = () => {
    const trimmed = newInterest.trim();
    if (trimmed) {
      addInterest(trimmed);
      setNewInterest("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {data.items.map((interest, index) => (
          <Badge key={index} variant="secondary" className="pr-1 text-sm">
            {interest}
            <button
              className="ml-1 hover:bg-muted rounded-full p-0.5"
              onClick={() => removeInterest(index)}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          value={newInterest}
          onChange={(e) => setNewInterest(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add an interest (press Enter)"
          className="flex-1"
        />
        <Button variant="outline" size="sm" onClick={handleAdd}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
