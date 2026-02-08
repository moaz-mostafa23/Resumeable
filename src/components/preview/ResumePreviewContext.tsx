"use client";

import { createContext, useContext, ReactNode } from "react";
import { ResumeDocument } from "@/types/resume";

const ResumePreviewContext = createContext<ResumeDocument | null>(null);

export function ResumePreviewProvider({
  resume,
  children,
}: {
  resume: ResumeDocument | null;
  children: ReactNode;
}) {
  return (
    <ResumePreviewContext.Provider value={resume}>
      {children}
    </ResumePreviewContext.Provider>
  );
}

export function useResumePreview() {
  return useContext(ResumePreviewContext);
}
