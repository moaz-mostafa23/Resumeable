"use client";

import { useState } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { CustomSectionData, CustomItem } from "@/types/resume";
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

interface CustomSectionEditorProps {
  sectionId: string;
}

export function CustomSectionEditor({ sectionId }: CustomSectionEditorProps) {
  const {
    resume,
    updateSectionLabel,
    addCustomItem,
    updateCustomItem,
    deleteCustomItem,
    deleteSection,
  } = useResumeStore();

  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  if (!resume) return null;

  const section = resume.sections.find((s) => s.id === sectionId);
  const data = resume.sectionData[sectionId] as CustomSectionData;

  if (!section || !data) return null;

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
    field: keyof CustomItem,
    value: string
  ) => {
    updateCustomItem(sectionId, itemId, { [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Label>Section Title</Label>
          <Input
            value={section.label}
            onChange={(e) => updateSectionLabel(sectionId, e.target.value)}
            placeholder="Section Title"
          />
        </div>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => deleteSection(sectionId)}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete Section
        </Button>
      </div>

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
                        {item.title || "Item Title"}
                      </h3>
                      {item.subtitle && (
                        <p className="text-sm text-muted-foreground">
                          {item.subtitle}
                        </p>
                      )}
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
                        onClick={() => deleteCustomItem(sectionId, item.id)}
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
                    <Label>Title</Label>
                    <Input
                      value={item.title}
                      onChange={(e) =>
                        handleItemChange(item.id, "title", e.target.value)
                      }
                      placeholder="Title"
                    />
                  </div>
                  <div>
                    <Label>Subtitle (optional)</Label>
                    <Input
                      value={item.subtitle}
                      onChange={(e) =>
                        handleItemChange(item.id, "subtitle", e.target.value)
                      }
                      placeholder="Subtitle"
                    />
                  </div>
                  <div>
                    <Label>Date (optional)</Label>
                    <Input
                      value={item.date}
                      onChange={(e) =>
                        handleItemChange(item.id, "date", e.target.value)
                      }
                      placeholder="2023"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label>Description (optional)</Label>
                    <Textarea
                      value={item.description}
                      onChange={(e) =>
                        handleItemChange(item.id, "description", e.target.value)
                      }
                      placeholder="Description..."
                      rows={3}
                    />
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}

        <Button
          variant="outline"
          className="w-full"
          onClick={() => addCustomItem(sectionId)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </div>
    </div>
  );
}
