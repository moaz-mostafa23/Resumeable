"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { CoursesData, CourseItem } from "@/types/resume";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

export function CoursesEditor() {
  const {
    resume,
    addCourseItem,
    updateCourseItem,
    deleteCourseItem,
  } = useResumeStore();

  if (!resume) return null;

  const data = resume.sectionData.courses as CoursesData;
  if (!data) return null;

  const handleItemChange = (
    itemId: string,
    field: keyof CourseItem,
    value: string
  ) => {
    updateCourseItem(itemId, { [field]: value });
  };

  return (
    <div className="space-y-4">
      {data.items.map((item) => (
        <Card key={item.id}>
          <CardContent className="pt-4 space-y-3">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <Label>Course Name</Label>
                <Input
                  value={item.name}
                  onChange={(e) =>
                    handleItemChange(item.id, "name", e.target.value)
                  }
                  placeholder="Machine Learning Specialization"
                />
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="ml-2"
                onClick={() => deleteCourseItem(item.id)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Institution / Platform</Label>
                <Input
                  value={item.institution}
                  onChange={(e) =>
                    handleItemChange(item.id, "institution", e.target.value)
                  }
                  placeholder="Coursera"
                />
              </div>
              <div>
                <Label>Date</Label>
                <Input
                  value={item.date}
                  onChange={(e) =>
                    handleItemChange(item.id, "date", e.target.value)
                  }
                  placeholder="2023"
                />
              </div>
            </div>
            <div>
              <Label>Link (optional)</Label>
              <Input
                value={item.link}
                onChange={(e) =>
                  handleItemChange(item.id, "link", e.target.value)
                }
                placeholder="https://..."
              />
            </div>
          </CardContent>
        </Card>
      ))}

      <Button
        variant="outline"
        className="w-full"
        onClick={addCourseItem}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Course
      </Button>
    </div>
  );
}
