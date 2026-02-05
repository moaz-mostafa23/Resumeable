"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { HeaderData } from "@/types/resume";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function HeaderEditor() {
  const { resume, updateSectionData } = useResumeStore();

  if (!resume) return null;

  const data = resume.sectionData.header as HeaderData;

  const handleChange = (field: keyof HeaderData, value: string) => {
    updateSectionData<HeaderData>("header", { [field]: value });
  };

  return (
    <div className="space-y-6">
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
