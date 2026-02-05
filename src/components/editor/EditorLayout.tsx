"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useResumeStore } from "@/store/useResumeStore";
import { useEditorStore } from "@/store/useEditorStore";
import { useAutoSave } from "@/hooks/useAutoSave";
import { usePDFDownload } from "@/hooks/usePDFDownload";
import { EditorSidebar } from "./EditorSidebar";
import { EditorPanel } from "./EditorPanel";
import { ResumePreview } from "@/components/preview/ResumePreview";
import { Loader2, Menu, Download, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EditorLayoutProps {
  resumeId: string;
}

export function EditorLayout({ resumeId }: EditorLayoutProps) {
  const { resume, loading, saving, loadResume, setResumeName } = useResumeStore();
  const { sidebarOpen, toggleSidebar, previewZoom, setPreviewZoom } = useEditorStore();
  const { downloadPDF, isGenerating } = usePDFDownload();

  useAutoSave(2000);

  useEffect(() => {
    loadResume(resumeId);
  }, [resumeId, loadResume]);

  if (loading || !resume) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Top bar */}
      <div className="h-14 border-b flex items-center justify-between px-4 bg-white">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
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
          {saving && (
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Loader2 className="h-3 w-3 animate-spin" />
              Saving...
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 mr-4">
            <span className="text-sm text-muted-foreground">Zoom:</span>
            <select
              value={previewZoom}
              onChange={(e) => setPreviewZoom(Number(e.target.value))}
              className="text-sm border rounded px-2 py-1"
            >
              <option value={50}>50%</option>
              <option value={75}>75%</option>
              <option value={100}>100%</option>
              <option value={125}>125%</option>
              <option value={150}>150%</option>
            </select>
          </div>
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
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        {sidebarOpen && (
          <div className="w-64 border-r bg-gray-50 overflow-y-auto">
            <EditorSidebar />
          </div>
        )}

        {/* Editor panel */}
        <div className="flex-1 overflow-y-auto bg-white">
          <EditorPanel />
        </div>

        {/* Preview panel */}
        <div className="flex-1 overflow-auto bg-gray-100 p-8">
          <div
            className="mx-auto bg-white shadow-lg"
            style={{
              transform: `scale(${previewZoom / 100})`,
              transformOrigin: "top center",
            }}
          >
            <ResumePreview />
          </div>
        </div>
      </div>
    </div>
  );
}
