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
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // For drafts: allow anonymous access (editor will load from localStorage)
  if (isDraft) {
    // If publishing, show loader
    if (shouldPublish && user) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
    }
    return <EditorLayout resumeId={resumeId} />;
  }

  // For remote resumes: require authentication
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Sign in required</CardTitle>
            <CardDescription>
              Please sign in to access this saved resume.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Link href={`/login?next=/builder/${resumeId}`}>
              <Button className="w-full">Sign in</Button>
            </Link>
            <Link href="/builder/new">
              <Button variant="outline" className="w-full">
                Create a new resume
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <EditorLayout resumeId={resumeId} />;
}
