"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { VolunteerData, VolunteerItem } from "@/types/resume";
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

export function VolunteerEditor() {
  const {
    resume,
    addVolunteerItem,
    updateVolunteerItem,
    deleteVolunteerItem,
    addVolunteerBullet,
    updateVolunteerBullet,
    deleteVolunteerBullet,
    reorderVolunteerBullets,
  } = useResumeStore();

  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  if (!resume) return null;

  const data = resume.sectionData.volunteer as VolunteerData;
  if (!data) return null;

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
    field: keyof VolunteerItem,
    value: string | boolean
  ) => {
    updateVolunteerItem(itemId, { [field]: value });
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
                      {item.role || "Volunteer Role"} at{" "}
                      {item.organization || "Organization"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.startDate} -{" "}
                      {item.current ? "Present" : item.endDate}
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
                      onClick={() => deleteVolunteerItem(item.id)}
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
                  <Label>Role</Label>
                  <Input
                    value={item.role}
                    onChange={(e) =>
                      handleItemChange(item.id, "role", e.target.value)
                    }
                    placeholder="Volunteer Coordinator"
                  />
                </div>
                <div>
                  <Label>Organization</Label>
                  <Input
                    value={item.organization}
                    onChange={(e) =>
                      handleItemChange(item.id, "organization", e.target.value)
                    }
                    placeholder="Organization Name"
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
                    <Label>Currently here</Label>
                  </div>
                </div>
                <div>
                  <Label>Start Date</Label>
                  <Input
                    value={item.startDate}
                    onChange={(e) =>
                      handleItemChange(item.id, "startDate", e.target.value)
                    }
                    placeholder="Jan 2023"
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
                    updateVolunteerBullet(item.id, bulletId, content)
                  }
                  onDelete={(bulletId) =>
                    deleteVolunteerBullet(item.id, bulletId)
                  }
                  onReorder={(startIndex, endIndex) =>
                    reorderVolunteerBullets(item.id, startIndex, endIndex)
                  }
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => addVolunteerBullet(item.id)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Bullet
                </Button>
              </div>
            </CardContent>
          )}
        </Card>
      ))}

      <Button
        variant="outline"
        className="w-full"
        onClick={addVolunteerItem}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Volunteer Experience
      </Button>
    </div>
  );
}
