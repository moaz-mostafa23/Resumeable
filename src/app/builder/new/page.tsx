"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/components/auth/AuthProvider";
import { useResumeStore } from "@/store/useResumeStore";
import { Loader2 } from "lucide-react";

export default function NewResumePage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuthContext();
  const { createResume, createDraftResume } = useResumeStore();
  const hasCreated = useRef(false);

  useEffect(() => {
    // Wait for auth to load
    if (authLoading) return;
    // Prevent double-creation in strict mode
    if (hasCreated.current) return;
    hasCreated.current = true;

    const create = async () => {
      if (user) {
        // Logged in: create a remote resume
        const id = await createResume(user.id);
        if (id) {
          router.replace(`/builder/${id}`);
        } else {
          // Error creating resume, go to dashboard
          router.replace("/dashboard");
        }
      } else {
        // Not logged in: create a local draft
        const draftId = createDraftResume();
        router.replace(`/builder/${draftId}`);
      }
    };

    create();
  }, [authLoading, user, createResume, createDraftResume, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}
