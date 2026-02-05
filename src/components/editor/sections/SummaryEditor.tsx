"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { SummaryData } from "@/types/resume";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function SummaryEditor() {
  const { resume, updateSectionData } = useResumeStore();

  if (!resume) return null;

  const data = resume.sectionData.summary as SummaryData;

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="summary">Professional Summary</Label>
        <p className="text-sm text-muted-foreground mb-2">
          Write 2-3 sentences highlighting your key qualifications and career objectives.
        </p>
        <Textarea
          id="summary"
          value={data.content}
          onChange={(e) =>
            updateSectionData<SummaryData>("summary", { content: e.target.value })
          }
          placeholder="Accomplished professional with..."
          rows={6}
        />
      </div>
      <p className="text-xs text-muted-foreground">
        {data.content.length} characters
      </p>
    </div>
  );
}
