"use client";

import { useEffect, useRef } from "react";
import { useResumeStore } from "@/store/useResumeStore";

export function useAutoSave(delay: number = 2000) {
  const { resume, saveResume } = useResumeStore();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const previousResumeRef = useRef<string | null>(null);

  useEffect(() => {
    if (!resume) return;

    const currentResumeJson = JSON.stringify({
      name: resume.name,
      sections: resume.sections,
      sectionData: resume.sectionData,
      theme: resume.theme,
    });

    // Skip if nothing changed
    if (previousResumeRef.current === currentResumeJson) return;

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout for auto-save
    timeoutRef.current = setTimeout(() => {
      saveResume();
      previousResumeRef.current = currentResumeJson;
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [resume, saveResume, delay]);
}
