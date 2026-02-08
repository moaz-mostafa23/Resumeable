"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { useResumePreview } from "@/components/preview/ResumePreviewContext";
import { ResumeDocument } from "@/types/resume";

export function useResume(): ResumeDocument | null {
  const contextResume = useResumePreview();
  const { resume: storeResume } = useResumeStore();
  return contextResume || storeResume;
}
