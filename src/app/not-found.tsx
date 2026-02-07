import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50">
      <Logo className="h-12 w-12 text-primary mb-6" />
      <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
      <h2 className="text-xl font-medium text-gray-600 mb-6">
        Page not found
      </h2>
      <p className="text-gray-500 text-center max-w-md mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Let&apos;s get you back on track.
      </p>
      <div className="flex gap-3">
        <Link href="/">
          <Button variant="outline">Go Home</Button>
        </Link>
        <Link href="/builder/new">
          <Button>Create a Resume</Button>
        </Link>
      </div>
    </div>
  );
}
