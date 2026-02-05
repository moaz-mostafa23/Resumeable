"use client";

import { useState } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { EducationData, EducationItem } from "@/types/resume";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Plus,
  Trash2,
  GripVertical,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export function EducationEditor() {
  const {
    resume,
    addEducationItem,
    updateEducationItem,
    deleteEducationItem,
  } = useResumeStore();

  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  if (!resume) return null;

  const data = resume.sectionData.education as EducationData;

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }
      return next;
    });
  };

  const handleItemChange = (
    itemId: string,
    field: keyof EducationItem,
    value: string
  ) => {
    updateEducationItem(itemId, { [field]: value });
  };

  return (
    <div className="space-y-4">
      {data.items.map((item) => (
        <Card key={item.id} className="relative">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <GripVertical className="h-5 w-5 text-gray-400 cursor-grab" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">
                      {item.degree || "Degree"} in {item.field || "Field"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.institution || "Institution"} • {item.startDate} -{" "}
                      {item.endDate}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpanded(item.id)}
                    >
                      {expandedItems.has(item.id) ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteEducationItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>

          {expandedItems.has(item.id) && (
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Institution</Label>
                  <Input
                    value={item.institution}
                    onChange={(e) =>
                      handleItemChange(item.id, "institution", e.target.value)
                    }
                    placeholder="University Name"
                  />
                </div>
                <div>
                  <Label>Location</Label>
                  <Input
                    value={item.location}
                    onChange={(e) =>
                      handleItemChange(item.id, "location", e.target.value)
                    }
                    placeholder="City, State"
                  />
                </div>
                <div>
                  <Label>Degree</Label>
                  <Input
                    value={item.degree}
                    onChange={(e) =>
                      handleItemChange(item.id, "degree", e.target.value)
                    }
                    placeholder="Bachelor of Science"
                  />
                </div>
                <div>
                  <Label>Field of Study</Label>
                  <Input
                    value={item.field}
                    onChange={(e) =>
                      handleItemChange(item.id, "field", e.target.value)
                    }
                    placeholder="Computer Science"
                  />
                </div>
                <div>
                  <Label>Start Date</Label>
                  <Input
                    value={item.startDate}
                    onChange={(e) =>
                      handleItemChange(item.id, "startDate", e.target.value)
                    }
                    placeholder="Sep 2019"
                  />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input
                    value={item.endDate}
                    onChange={(e) =>
                      handleItemChange(item.id, "endDate", e.target.value)
                    }
                    placeholder="May 2023"
                  />
                </div>
                <div>
                  <Label>GPA (optional)</Label>
                  <Input
                    value={item.gpa}
                    onChange={(e) =>
                      handleItemChange(item.id, "gpa", e.target.value)
                    }
                    placeholder="3.8"
                  />
                </div>
              </div>
              <div>
                <Label>Additional Details (optional)</Label>
                <Textarea
                  value={item.details}
                  onChange={(e) =>
                    handleItemChange(item.id, "details", e.target.value)
                  }
                  placeholder="Honors, relevant coursework, activities..."
                  rows={3}
                />
              </div>
            </CardContent>
          )}
        </Card>
      ))}

      <Button variant="outline" className="w-full" onClick={addEducationItem}>
        <Plus className="h-4 w-4 mr-2" />
        Add Education
      </Button>
    </div>
  );
}
