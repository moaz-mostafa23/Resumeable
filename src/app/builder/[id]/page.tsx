"use client";

import { useEffect, useRef } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuthContext } from "@/components/auth/AuthProvider";
import { useResumeStore } from "@/store/useResumeStore";
import { EditorLayout } from "@/components/editor/EditorLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function BuilderPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading: authLoading } = useAuthContext();
  const { publishDraftToAccount } = useResumeStore();
  const resumeId = params.id as string;
  const isDraft = resumeId.startsWith("draft-");
  const shouldPublish = searchParams.get("publish") === "1";
  const hasPublished = useRef(false);

  // Handle auto-publish when user logs in with a draft
  useEffect(() => {
    if (authLoading) return;
    if (!isDraft || !user || !shouldPublish) return;
    if (hasPublished.current) return;
    hasPublished.current = true;

    const publish = async () => {
      const newId = await publishDraftToAccount(user.id);
      if (newId) {
        router.replace(`/builder/${newId}`);
      }
    };

    publish();
  }, [authLoading, isDraft, user, shouldPublish, publishDraftToAccount, router]);

  // Show loader while auth is loading
  if (authLoading) {
    return (
      <div className="homepage-root flex min-h-screen items-center justify-center bg-[#f5f4ef]">
        <Loader2 className="h-8 w-8 animate-spin text-[#0f766e]" />
      </div>
    );
  }

  // For drafts: allow anonymous access (editor will load from localStorage)
  if (isDraft) {
    // If publishing, show loader
    if (shouldPublish && user) {
      return (
        <div className="homepage-root flex min-h-screen items-center justify-center bg-[#f5f4ef]">
          <Loader2 className="h-8 w-8 animate-spin text-[#0f766e]" />
        </div>
      );
    }
    return <EditorLayout resumeId={resumeId} />;
  }

  // For remote resumes: require authentication
  if (!user) {
    return (
      <div className="homepage-root min-h-screen bg-[#f5f4ef] px-4">
        <div className="homepage-grid-bg pointer-events-none fixed inset-0 opacity-80" aria-hidden />
        <div className="relative z-10 flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-md rounded-3xl border-[#ddd5ca] bg-[#fffdf9] shadow-[0_28px_80px_-62px_rgba(16,24,40,0.8)]">
          <CardHeader className="text-center">
            <CardTitle className="font-[family-name:var(--font-fraunces)] text-3xl font-medium text-[#111827]">
              Sign in required
            </CardTitle>
            <CardDescription className="text-[#4f4b44]">
              Please sign in to access this saved resume.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Link href={`/login?next=/builder/${resumeId}`}>
              <Button className="w-full rounded-full bg-[#0f766e] font-semibold text-white hover:bg-[#0b5f59]">
                Sign in
              </Button>
            </Link>
            <Link href="/templates">
              <Button
                variant="outline"
                className="w-full rounded-full border-[#cbc2b7] bg-[#f8f5ef] font-semibold text-[#1f2937] hover:bg-[#ede5d9]"
              >
                Create a new resume
              </Button>
            </Link>
          </CardContent>
        </Card>
        </div>
      </div>
    );
  }

  return <EditorLayout resumeId={resumeId} />;
}
