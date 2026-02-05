"use client";

import { useState } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { ProjectsData, ProjectItem } from "@/types/resume";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Plus,
  Trash2,
  GripVertical,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";
import { SortableBulletList } from "../dnd/SortableBulletList";

export function ProjectsEditor() {
  const {
    resume,
    addProjectItem,
    updateProjectItem,
    deleteProjectItem,
    addProjectBullet,
    updateProjectBullet,
    deleteProjectBullet,
    addProjectTechnology,
    removeProjectTechnology,
  } = useResumeStore();

  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [newTech, setNewTech] = useState<Record<string, string>>({});

  if (!resume) return null;

  const data = resume.sectionData.projects as ProjectsData;

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
    field: keyof ProjectItem,
    value: string | string[]
  ) => {
    updateProjectItem(itemId, { [field]: value });
  };

  const handleAddTech = (itemId: string) => {
    const tech = newTech[itemId]?.trim();
    if (tech) {
      addProjectTechnology(itemId, tech);
      setNewTech((prev) => ({ ...prev, [itemId]: "" }));
    }
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
                      {item.name || "Project Name"}
                    </h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {item.technologies.slice(0, 3).map((tech, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {item.technologies.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{item.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
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
                      onClick={() => deleteProjectItem(item.id)}
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
                <div className="col-span-2">
                  <Label>Project Name</Label>
                  <Input
                    value={item.name}
                    onChange={(e) =>
                      handleItemChange(item.id, "name", e.target.value)
                    }
                    placeholder="My Awesome Project"
                  />
                </div>
                <div className="col-span-2">
                  <Label>Link (optional)</Label>
                  <Input
                    value={item.link}
                    onChange={(e) =>
                      handleItemChange(item.id, "link", e.target.value)
                    }
                    placeholder="github.com/user/project"
                  />
                </div>
              </div>

              <div>
                <Label className="mb-2 block">Technologies</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {item.technologies.map((tech, index) => (
                    <Badge key={index} variant="secondary" className="pr-1">
                      {tech}
                      <button
                        className="ml-1 hover:bg-muted rounded-full p-0.5"
                        onClick={() => removeProjectTechnology(item.id, index)}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newTech[item.id] || ""}
                    onChange={(e) =>
                      setNewTech((prev) => ({
                        ...prev,
                        [item.id]: e.target.value,
                      }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTech(item.id);
                      }
                    }}
                    placeholder="Add technology"
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddTech(item.id)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <Label className="mb-2 block">Description / Bullet Points</Label>
                <SortableBulletList
                  bullets={item.bullets}
                  onUpdate={(bulletId, content) =>
                    updateProjectBullet(item.id, bulletId, content)
                  }
                  onDelete={(bulletId) =>
                    deleteProjectBullet(item.id, bulletId)
                  }
                  onReorder={() => {}}
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => addProjectBullet(item.id)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Bullet
                </Button>
              </div>
            </CardContent>
          )}
        </Card>
      ))}

      <Button variant="outline" className="w-full" onClick={addProjectItem}>
        <Plus className="h-4 w-4 mr-2" />
        Add Project
      </Button>
    </div>
  );
}
