"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { HeaderData } from "@/types/resume";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRef, useCallback } from "react";
import { Camera, X } from "lucide-react";

function resizeImage(file: File, maxSize: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let w = img.width;
        let h = img.height;
        if (w > maxSize || h > maxSize) {
          if (w > h) {
            h = Math.round((h * maxSize) / w);
            w = maxSize;
          } else {
            w = Math.round((w * maxSize) / h);
            h = maxSize;
          }
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", 0.85));
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function HeaderEditor() {
  const { resume, updateSectionData } = useResumeStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const data = resume?.sectionData.header as HeaderData | undefined;

  const handleChange = useCallback(
    (field: keyof HeaderData, value: string) => {
      updateSectionData<HeaderData>("header", { [field]: value });
    },
    [updateSectionData]
  );

  const handlePhotoUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      if (file.size > 2 * 1024 * 1024) {
        alert("Image must be smaller than 2 MB");
        return;
      }
      try {
        const dataUrl = await resizeImage(file, 200);
        updateSectionData<HeaderData>("header", { photoUrl: dataUrl });
      } catch {
        alert("Failed to process image");
      }
      // Reset so the same file can be re-selected
      e.target.value = "";
    },
    [updateSectionData]
  );

  const handleRemovePhoto = useCallback(() => {
    updateSectionData<HeaderData>("header", { photoUrl: "" });
  }, [updateSectionData]);

  if (!resume || !data) return null;

  return (
    <div className="space-y-6">
      {/* Photo Upload */}
      <div>
        <Label>Profile Photo (optional)</Label>
        <p className="text-xs text-gray-500 mb-2">
          Used by photo templates (Elegant Photo, Bold Header). Max 2 MB.
        </p>
        <div className="flex items-center gap-4">
          {data.photoUrl ? (
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={data.photoUrl}
                alt="Profile preview"
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
              />
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div
              className="w-16 h-16 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-50"
              onClick={() => fileInputRef.current?.click()}
            >
              <Camera className="w-5 h-5 text-gray-400" />
            </div>
          )}
          <div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
            >
              {data.photoUrl ? "Change Photo" : "Upload Photo"}
            </Button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoUpload}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={data.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            placeholder="John Doe"
          />
        </div>

        <div className="col-span-2">
          <Label htmlFor="title">Professional Title</Label>
          <Input
            id="title"
            value={data.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Software Engineer"
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="john@example.com"
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={data.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="(123) 456-7890"
          />
        </div>

        <div className="col-span-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={data.location}
            onChange={(e) => handleChange("location", e.target.value)}
            placeholder="City, State"
          />
        </div>

        <div>
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            id="linkedin"
            value={data.linkedin}
            onChange={(e) => handleChange("linkedin", e.target.value)}
            placeholder="linkedin.com/in/yourprofile"
          />
        </div>

        <div>
          <Label htmlFor="github">GitHub</Label>
          <Input
            id="github"
            value={data.github}
            onChange={(e) => handleChange("github", e.target.value)}
            placeholder="github.com/yourusername"
          />
        </div>

        <div className="col-span-2">
          <Label htmlFor="website">Website (optional)</Label>
          <Input
            id="website"
            value={data.website}
            onChange={(e) => handleChange("website", e.target.value)}
            placeholder="yourwebsite.com"
          />
        </div>
      </div>
    </div>
  );
}
