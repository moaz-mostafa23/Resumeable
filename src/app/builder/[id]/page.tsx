"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuthContext } from "@/components/auth/AuthProvider";
import { EditorLayout } from "@/components/editor/EditorLayout";
import { Loader2 } from "lucide-react";

export default function BuilderPage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading } = useAuthContext();
  const resumeId = params.id as string;

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <EditorLayout resumeId={resumeId} />;
}
