"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthContext } from "@/components/auth/AuthProvider";
import { createClient } from "@/lib/supabase/client";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, FileText, Trash2, Loader2, LogOut, AlertTriangle, Copy, Edit2, Check, X } from "lucide-react";

interface ResumeListItem {
  id: string;
  name: string;
  updated_at: string;
}

export default function DashboardPage() {
  const { user, loading: authLoading, signOut } = useAuthContext();
  const [resumes, setResumes] = useState<ResumeListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState<string>("");
  const [duplicatingId, setDuplicatingId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchResumes = async () => {
      if (!user) return;

      const supabase = createClient();
      const { data, error } = await supabase
        .from("resumes")
        .select("id, name, updated_at")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false });

      if (!error && data) {
        setResumes(data);
      }
      setLoading(false);
    };

    if (user) {
      fetchResumes();
    }
  }, [user]);

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    const supabase = createClient();
    const { error } = await supabase.from("resumes").delete().eq("id", deleteTarget);

    if (!error) {
      setResumes(resumes.filter((r) => r.id !== deleteTarget));
    }
    setDeleteTarget(null);
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const generateUniqueName = (baseName: string, existingNames: string[]): string => {
    const basePattern = baseName.replace(/-\d+$/, "");
    
    const matchingNames = existingNames.filter((name) => {
      const namePattern = name.replace(/-\d+$/, "");
      return namePattern === basePattern;
    });

    if (matchingNames.length === 0) {
      return `${basePattern}-1`;
    }

    const numbers = matchingNames
      .map((name) => {
        const match = name.match(/-(\d+)$/);
        return match ? parseInt(match[1], 10) : 0;
      })
      .filter((num) => !isNaN(num))
      .sort((a, b) => b - a);

    const nextNumber = numbers.length > 0 ? numbers[0] + 1 : 1;
    return `${basePattern}-${nextNumber}`;
  };

  const handleDuplicate = async (resumeId: string) => {
    if (!user) return;

    setDuplicatingId(resumeId);
    try {
      const supabase = createClient();

      const { data: originalResume, error: fetchError } = await supabase
        .from("resumes")
        .select("*")
        .eq("id", resumeId)
        .single();

      if (fetchError || !originalResume) {
        throw fetchError || new Error("Resume not found");
      }

      const { data: allResumes, error: listError } = await supabase
        .from("resumes")
        .select("name")
        .eq("user_id", user.id);

      if (listError) throw listError;

      const existingNames = allResumes?.map((r) => r.name) || [];
      const newName = generateUniqueName(originalResume.name, existingNames);

      const { data: newResume, error: insertError } = await supabase
        .from("resumes")
        .insert({
          user_id: user.id,
          name: newName,
          template_id: originalResume.template_id,
          sections: originalResume.sections,
          section_data: originalResume.section_data,
          theme: originalResume.theme,
        })
        .select("id, name, updated_at")
        .single();

      if (insertError) throw insertError;

      setResumes([newResume, ...resumes]);
    } catch (error) {
      console.error("Error duplicating resume:", error);
    } finally {
      setDuplicatingId(null);
    }
  };

  const handleStartEdit = (resume: ResumeListItem) => {
    setEditingId(resume.id);
    setEditingName(resume.name);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 0);
  };

  const handleSaveEdit = async (resumeId: string) => {
    if (!user || !editingName.trim()) {
      setEditingId(null);
      return;
    }

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("resumes")
        .update({ name: editingName.trim() })
        .eq("id", resumeId);

      if (error) throw error;

      setResumes(
        resumes.map((r) => (r.id === resumeId ? { ...r, name: editingName.trim() } : r))
      );
      setEditingId(null);
    } catch (error) {
      console.error("Error updating resume name:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingName("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, resumeId: string) => {
    if (e.key === "Enter") {
      handleSaveEdit(resumeId);
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <Logo className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl">Resumeable</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{user?.email}</span>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Resumes</h1>
            <p className="text-gray-600">Create and manage your resumes</p>
          </div>
          <Link href="/builder/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Resume
            </Button>
          </Link>
        </div>

        {resumes.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <FileText className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h2 className="text-xl font-semibold mb-2">No resumes yet</h2>
              <p className="text-gray-500 mb-6">
                Create your first resume to get started
              </p>
              <Link href="/builder/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Resume
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <Card
                key={resume.id}
                className="hover:shadow-md transition-shadow group"
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      {editingId === resume.id ? (
                        <div className="flex items-center gap-2">
                          <Input
                            ref={inputRef}
                            value={editingName}
                            onChange={(e) => setEditingName(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, resume.id)}
                            className="text-lg font-semibold h-8"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSaveEdit(resume.id);
                            }}
                          >
                            <Check className="h-4 w-4 text-green-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCancelEdit();
                            }}
                          >
                            <X className="h-4 w-4 text-gray-500" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 group/name">
                          <CardTitle
                            className="text-lg cursor-pointer hover:text-primary transition-colors flex-1 min-w-0 truncate"
                            onClick={() => handleStartEdit(resume)}
                            title="Click to edit name"
                          >
                            {resume.name}
                          </CardTitle>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="opacity-0 group-hover/name:opacity-100 transition-opacity h-6 w-6 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStartEdit(resume);
                            }}
                          >
                            <Edit2 className="h-3 w-3 text-gray-500" />
                          </Button>
                        </div>
                      )}
                      <CardDescription>
                        Updated {new Date(resume.updated_at).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.preventDefault();
                        setDeleteTarget(resume.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link href={`/builder/${resume.id}`}>
                    <Button variant="outline" className="w-full">
                      Edit Resume
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDuplicate(resume.id);
                    }}
                    disabled={duplicatingId === resume.id}
                  >
                    {duplicatingId === resume.id ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Duplicating...
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Delete confirmation modal */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setDeleteTarget(null)}
        >
          <div
            className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-full">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold">Delete Resume</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this resume? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="outline" size="sm" onClick={() => setDeleteTarget(null)}>
                Cancel
              </Button>
              <Button
                size="sm"
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={handleConfirmDelete}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
