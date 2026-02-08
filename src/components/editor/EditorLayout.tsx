"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { useResumeStore } from "@/store/useResumeStore";
import { useEditorStore } from "@/store/useEditorStore";
import { useAuthContext } from "@/components/auth/AuthProvider";
import { useAutoSave } from "@/hooks/useAutoSave";
import { usePDFDownload } from "@/hooks/usePDFDownload";
import { EditorSidebar } from "./EditorSidebar";
import { EditorPanel } from "./EditorPanel";
import { TemplatePreview } from "@/components/preview/TemplatePreview";
import { Loader2, Menu, Download, ArrowLeft, GripVertical, LogIn, Monitor, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EditorLayoutProps {
  resumeId: string;
}

export function EditorLayout({ resumeId }: EditorLayoutProps) {
  const { resume, loading, error, loadResume, setResumeName, resumeSource } = useResumeStore();
  const { sidebarOpen, toggleSidebar } = useEditorStore();
  const { user } = useAuthContext();
  const { downloadPDF, isGenerating } = usePDFDownload();

  const isDraft = resumeSource === "local";

  // Draggable divider: editorWidth is percentage of the content area (excluding sidebar)
  const [editorWidthPct, setEditorWidthPct] = useState(25);
  const contentRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // Preview auto-fit
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const [previewScale, setPreviewScale] = useState(1);

  // Preview modal
  const [previewModalOpen, setPreviewModalOpen] = useState(false);

  useAutoSave(2000);

  useEffect(() => {
    loadResume(resumeId);
  }, [resumeId, loadResume]);

  const calculateScale = useCallback(() => {
    const container = previewContainerRef.current;
    if (!container) return;
    const padding = 32;
    const availableWidth = container.clientWidth - padding * 2;
    setPreviewScale(Math.min(availableWidth / 816, 1));
  }, []);

  useEffect(() => {
    calculateScale();
    const observer = new ResizeObserver(calculateScale);
    if (previewContainerRef.current) {
      observer.observe(previewContainerRef.current);
    }
    return () => observer.disconnect();
  }, [calculateScale]);

  const handleMouseDown = useCallback(() => {
    isDragging.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !contentRef.current) return;
      const contentRect = contentRef.current.getBoundingClientRect();
      const sidebarWidth = sidebarOpen ? 256 : 0;
      const availableWidth = contentRect.width - sidebarWidth;
      const relativeX = e.clientX - contentRect.left - sidebarWidth;
      const pct = (relativeX / availableWidth) * 100;
      setEditorWidthPct(Math.min(Math.max(pct, 20), 70));
    };

    const handleMouseUp = () => {
      if (isDragging.current) {
        isDragging.current = false;
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [sidebarOpen]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !resume) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-100 mb-4">
            <AlertTriangle className="h-7 w-7 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold mb-2">
            {error ? "Something went wrong" : "Resume not found"}
          </h2>
          <p className="text-muted-foreground mb-6">
            {error
              ? "We couldn\u2019t load this resume. It might have been deleted, or there\u2019s a connection issue."
              : "This resume doesn\u2019t exist or you don\u2019t have access to it."}
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={() => loadResume(resumeId)}>
              Try again
            </Button>
            <Link href={user ? "/dashboard" : "/"}>
              <Button>
                {user ? "Back to Dashboard" : "Go Home"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Mobile warning — editor needs a real screen */}
      <div className="lg:hidden bg-amber-50 border-b border-amber-200 px-4 py-3 flex items-center gap-3 text-sm text-amber-800">
        <Monitor className="h-4 w-4 shrink-0" />
        <span>
          The resume editor works best on a desktop or laptop. Some features may
          not display correctly on smaller screens.
        </span>
      </div>

      {/* Top bar */}
      <div className="h-14 border-b flex items-center justify-between px-4 bg-white">
        <div className="flex items-center gap-4">
          <Link href={user ? "/dashboard" : "/"}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <Menu className="h-5 w-5" />
          </Button>
          <Input
            value={resume.name}
            onChange={(e) => setResumeName(e.target.value)}
            className="w-64 font-medium"
          />
        </div>
        <div className="flex items-center gap-2">
          {/* Sign in to save button for anonymous users */}
          {!user && isDraft && (
            <Link href={`/login?next=/builder/${resumeId}?publish=1`}>
              <Button variant="default" size="sm">
                <LogIn className="h-4 w-4 mr-2" />
                Sign in to save
              </Button>
            </Link>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={downloadPDF}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Download className="h-4 w-4 mr-2" />
            )}
            Download PDF
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div ref={contentRef} className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        {sidebarOpen && (
          <div className="w-64 border-r bg-gray-50 overflow-y-auto flex-shrink-0">
            <EditorSidebar />
          </div>
        )}

        {/* Editor panel */}
        <div className="bg-white" style={{ width: `${editorWidthPct}%` }}>
          <EditorPanel />
        </div>

        {/* Draggable divider */}
        <div
          className="w-2 flex-shrink-0 bg-gray-200 hover:bg-gray-300 cursor-col-resize flex items-center justify-center transition-colors"
          onMouseDown={handleMouseDown}
        >
          <GripVertical className="w-3 h-3 text-gray-400" />
        </div>

        {/* Preview panel */}
        <div
          ref={previewContainerRef}
          className="flex-1 flex items-start justify-center overflow-y-auto bg-gray-100 p-4 cursor-pointer"
          onClick={() => setPreviewModalOpen(true)}
        >
          <div
            id="preview-content"
            style={{
              transform: `scale(${previewScale})`,
              transformOrigin: "top center",
            }}
          >
            <TemplatePreview />
          </div>
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

    </div>
  );
}
