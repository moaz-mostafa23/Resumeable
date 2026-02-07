"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/components/auth/AuthProvider";
import { useResumeStore } from "@/store/useResumeStore";
import { templateDefinitions } from "@/lib/template-registry";
import { TemplateId, DEFAULT_TEMPLATE_ID } from "@/types/resume";
import { Loader2, Check, ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function NewResumePage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuthContext();
  const { createResume, createDraftResume } = useResumeStore();
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>(DEFAULT_TEMPLATE_ID);
  const [isCreating, setIsCreating] = useState(false);

  const enabledTemplates = templateDefinitions.filter((t) => t.isEnabled);

  const handleCreateResume = async () => {
    setIsCreating(true);
    try {
      if (user) {
        const id = await createResume(user.id, undefined, selectedTemplate);
        if (id) {
          router.replace(`/builder/${id}`);
        } else {
          router.replace("/dashboard");
        }
      } else {
        const draftId = createDraftResume(selectedTemplate);
        router.replace(`/builder/${draftId}`);
      }
    } catch {
      setIsCreating(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href={user ? "/dashboard" : "/"}>
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
              </Link>
              <div className="h-6 w-px bg-gray-200" />
              <h1 className="text-xl font-semibold text-gray-900">Choose a Template</h1>
            </div>
            <Button
              onClick={handleCreateResume}
              disabled={isCreating}
              className="gap-2"
            >
              {isCreating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4" />
                  Create Resume
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Template Gallery */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-gray-600 mb-6">
          Select a template to start building your resume. You can always try a different template later.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {enabledTemplates.map((template) => {
            const isSelected = selectedTemplate === template.id;
            return (
              <button
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={cn(
                  "group relative bg-white rounded-xl border-2 overflow-hidden transition-all text-left",
                  isSelected
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                )}
              >
                {/* Template Preview Thumbnail */}
                <div className="aspect-[8.5/11] bg-gradient-to-br from-gray-100 to-gray-50 p-4 relative">
                  {/* Placeholder preview - shows template layout hint */}
                  <div className="w-full h-full bg-white rounded shadow-sm border border-gray-100 p-3 flex flex-col">
                    {template.id === "ats-minimal" && (
                      <>
                        <div className="w-1/2 h-3 bg-gray-300 rounded mb-1 mx-auto" />
                        <div className="w-1/3 h-2 bg-gray-200 rounded mb-3 mx-auto" />
                        <div className="w-full h-2 bg-gray-100 rounded mb-1" />
                        <div className="w-full h-2 bg-gray-100 rounded mb-1" />
                        <div className="flex-1" />
                        <div className="w-2/3 h-2 bg-gray-200 rounded mb-1" />
                        <div className="w-full h-1.5 bg-gray-100 rounded mb-1" />
                        <div className="w-full h-1.5 bg-gray-100 rounded" />
                      </>
                    )}
                    {template.id === "modern-minimal" && (
                      <>
                        <div className="border-b-2 border-primary/40 pb-2 mb-2">
                          <div className="w-1/2 h-3 bg-gray-300 rounded mb-1" />
                          <div className="w-1/3 h-2 bg-primary/30 rounded" />
                        </div>
                        <div className="flex gap-2 mb-2">
                          <div className="w-1 h-3 bg-primary/40 rounded" />
                          <div className="w-1/4 h-2 bg-gray-200 rounded" />
                        </div>
                        <div className="flex-1" />
                        <div className="flex gap-1 flex-wrap">
                          <div className="w-8 h-3 bg-gray-100 rounded" />
                          <div className="w-10 h-3 bg-gray-100 rounded" />
                          <div className="w-6 h-3 bg-gray-100 rounded" />
                        </div>
                      </>
                    )}
                    {template.id === "two-column-sidebar" && (
                      <div className="flex h-full gap-2">
                        <div className="w-1/3 bg-primary/20 rounded p-1">
                          <div className="w-full h-2 bg-white/60 rounded mb-2" />
                          <div className="w-full h-1.5 bg-white/40 rounded mb-1" />
                          <div className="w-full h-1.5 bg-white/40 rounded mb-1" />
                          <div className="w-2/3 h-1.5 bg-white/40 rounded" />
                        </div>
                        <div className="flex-1 flex flex-col">
                          <div className="w-full h-2 bg-gray-200 rounded mb-2" />
                          <div className="w-full h-1.5 bg-gray-100 rounded mb-1" />
                          <div className="w-full h-1.5 bg-gray-100 rounded mb-1" />
                          <div className="flex-1" />
                          <div className="w-2/3 h-1.5 bg-gray-100 rounded" />
                        </div>
                      </div>
                    )}
                    {template.id === "corporate-timeline" && (
                      <>
                        <div className="w-1/2 h-3 bg-gray-300 rounded mb-1" />
                        <div className="w-1/3 h-2 bg-primary/30 rounded mb-3" />
                        <div className="flex items-start gap-2 mb-2">
                          <div className="w-8 text-right">
                            <div className="w-full h-1.5 bg-gray-200 rounded" />
                          </div>
                          <div className="w-2 h-2 rounded-full bg-primary/40 mt-0.5" />
                          <div className="flex-1">
                            <div className="w-full h-2 bg-gray-200 rounded mb-1" />
                            <div className="w-2/3 h-1.5 bg-gray-100 rounded" />
                          </div>
                        </div>
                        <div className="flex-1" />
                      </>
                    )}
                    {template.id === "creative-infographic" && (
                      <>
                        <div className="bg-primary/30 -m-3 mb-2 p-2">
                          <div className="w-1/2 h-3 bg-white/80 rounded mb-1" />
                          <div className="w-1/3 h-2 bg-white/60 rounded" />
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          <div className="w-4 h-4 rounded bg-primary/20" />
                          <div className="w-1/4 h-2 bg-gray-200 rounded" />
                        </div>
                        <div className="flex-1" />
                        <div className="flex gap-1">
                          <div className="flex-1 h-8 bg-gray-50 rounded p-1">
                            <div className="w-full h-1.5 bg-primary/20 rounded mb-0.5" />
                            <div className="w-2/3 h-1 bg-gray-200 rounded" />
                          </div>
                          <div className="flex-1 h-8 bg-gray-50 rounded p-1">
                            <div className="w-full h-1.5 bg-primary/20 rounded mb-0.5" />
                            <div className="w-2/3 h-1 bg-gray-200 rounded" />
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Selected Checkmark */}
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-md">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>

                {/* Template Info */}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-gray-900">{template.name}</h3>
                    {template.atsFriendly && (
                      <span className="text-xs px-1.5 py-0.5 bg-green-100 text-green-700 rounded">
                        ATS Friendly
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2">{template.description}</p>
                  {template.features && template.features.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {template.features.slice(0, 3).map((feature) => (
                        <span
                          key={feature}
                          className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
}
