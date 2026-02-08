"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { ResumeDocument, DEFAULT_TEMPLATE_ID } from "@/types/resume";
import { TemplatePreview } from "./TemplatePreview";
import { ResumePreviewProvider } from "./ResumePreviewContext";
import { Loader2 } from "lucide-react";

interface ResumePreviewThumbnailProps {
  resumeId: string;
  className?: string;
}

export function ResumePreviewThumbnail({ resumeId, className }: ResumePreviewThumbnailProps) {
  const [resume, setResume] = useState<ResumeDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [previewScale, setPreviewScale] = useState(0.25);

  useEffect(() => {
    let isMounted = true;

    const loadResume = async () => {
      try {
        const supabase = createClient();
        const { data, error: fetchError } = await supabase
          .from("resumes")
          .select("*")
          .eq("id", resumeId)
          .single();

        if (fetchError) throw fetchError;

        if (isMounted && data) {
          const loadedResume: ResumeDocument = {
            id: data.id,
            name: data.name,
            userId: data.user_id,
            templateId: data.template_id ?? DEFAULT_TEMPLATE_ID,
            sections: data.sections,
            sectionData: data.section_data,
            theme: {
              ...data.theme,
              nameFontSize: data.theme.nameFontSize ?? 28,
              titleFontSize: data.theme.titleFontSize ?? 14,
            },
            createdAt: data.created_at,
            updatedAt: data.updated_at,
          };
          setResume(loadedResume);
        }
      } catch (err) {
        if (isMounted) {
          setError((err as Error).message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadResume();
  }, [resumeId]);

  const calculateScale = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const padding = 8;
    const availableWidth = container.clientWidth - padding * 2;
    const availableHeight = container.clientHeight - padding * 2;
    const widthScale = availableWidth / 816;
    const heightScale = availableHeight / 1056;
    const scale = Math.min(widthScale, heightScale, 0.3);
    setPreviewScale(Math.max(scale, 0.2));
  }, []);

  useEffect(() => {
    if (!loading && resume) {
      calculateScale();
      const observer = new ResizeObserver(calculateScale);
      if (containerRef.current) {
        observer.observe(containerRef.current);
      }
      return () => observer.disconnect();
    }
  }, [loading, resume, calculateScale]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && previewModalOpen) {
        setPreviewModalOpen(false);
      }
    };

    if (previewModalOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [previewModalOpen]);

  if (loading) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 ${className}`} style={{ minHeight: "200px" }}>
        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error || !resume) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 ${className}`} style={{ minHeight: "200px" }}>
        <p className="text-sm text-gray-400">Preview unavailable</p>
      </div>
    );
  }

  return (
    <ResumePreviewProvider resume={resume}>
      <>
        <div
          ref={containerRef}
          className={`flex items-start justify-center overflow-hidden bg-gray-100 p-2 cursor-pointer hover:bg-gray-200 transition-colors ${className}`}
          style={{ height: "192px" }}
          onClick={() => setPreviewModalOpen(true)}
        >
          <div
            id={`preview-content-${resumeId}`}
            style={{
              transform: `scale(${previewScale})`,
              transformOrigin: "top center",
            }}
          >
            <TemplatePreview />
          </div>
        </div>

        {/* Preview modal overlay */}
        {previewModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-[2px]"
            onClick={() => setPreviewModalOpen(false)}
          >
            <div
              className="overflow-y-auto max-h-[95vh] shadow-2xl rounded-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <TemplatePreview />
            </div>
          </div>
        )}
      </>
    </ResumePreviewProvider>
  );
}
