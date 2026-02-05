"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { ExperienceData, ExperienceItem } from "@/types/resume";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Plus,
  Trash2,
  GripVertical,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";
import { SortableBulletList } from "../dnd/SortableBulletList";

export function ExperienceEditor() {
  const {
    resume,
    addExperienceItem,
    updateExperienceItem,
    deleteExperienceItem,
    addExperienceBullet,
    updateExperienceBullet,
    deleteExperienceBullet,
    reorderExperienceBullets,
  } = useResumeStore();

  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  if (!resume) return null;

  const data = resume.sectionData.experience as ExperienceData;

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
    field: keyof ExperienceItem,
    value: string | boolean
  ) => {
    updateExperienceItem(itemId, { [field]: value });
  };

  return (
    <div className="space-y-4">
      {data.items.map((item, index) => (
        <Card key={item.id} className="relative">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <GripVertical className="h-5 w-5 text-gray-400 cursor-grab" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">
                      {item.title || "Job Title"} at {item.company || "Company"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.startDate} - {item.current ? "Present" : item.endDate}
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
                      onClick={() => deleteExperienceItem(item.id)}
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
                  <Label>Job Title</Label>
                  <Input
                    value={item.title}
                    onChange={(e) =>
                      handleItemChange(item.id, "title", e.target.value)
                    }
                    placeholder="Software Engineer"
                  />
                </div>
                <div>
                  <Label>Company</Label>
                  <Input
                    value={item.company}
                    onChange={(e) =>
                      handleItemChange(item.id, "company", e.target.value)
                    }
                    placeholder="Company Name"
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
                <div className="flex items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={item.current}
                      onCheckedChange={(checked) =>
                        handleItemChange(item.id, "current", checked)
                      }
                    />
                    <Label>Currently working here</Label>
                  </div>
                </div>
                <div>
                  <Label>Start Date</Label>
                  <Input
                    value={item.startDate}
                    onChange={(e) =>
                      handleItemChange(item.id, "startDate", e.target.value)
                    }
                    placeholder="Jan 2022"
                  />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input
                    value={item.endDate}
                    onChange={(e) =>
                      handleItemChange(item.id, "endDate", e.target.value)
                    }
                    placeholder="Dec 2023"
                    disabled={item.current}
                  />
                </div>
              </div>

              <div>
                <Label className="mb-2 block">Bullet Points</Label>
                <SortableBulletList
                  bullets={item.bullets}
                  onUpdate={(bulletId, content) =>
                    updateExperienceBullet(item.id, bulletId, content)
                  }
                  onDelete={(bulletId) =>
                    deleteExperienceBullet(item.id, bulletId)
                  }
                  onReorder={(startIndex, endIndex) =>
                    reorderExperienceBullets(item.id, startIndex, endIndex)
                  }
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => addExperienceBullet(item.id)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Bullet
                </Button>
              </div>
            </CardContent>
          )}
        </Card>
      ))}

      <Button variant="outline" className="w-full" onClick={addExperienceItem}>
        <Plus className="h-4 w-4 mr-2" />
        Add Experience
      </Button>
    </div>
  );
}
