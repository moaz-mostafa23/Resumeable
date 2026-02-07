"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { PublicationsData, PublicationItem } from "@/types/resume";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

export function PublicationsEditor() {
  const {
    resume,
    addPublicationItem,
    updatePublicationItem,
    deletePublicationItem,
  } = useResumeStore();

  if (!resume) return null;

  const data = resume.sectionData.publications as PublicationsData;
  if (!data) return null;

  const handleItemChange = (
    itemId: string,
    field: keyof PublicationItem,
    value: string
  ) => {
    updatePublicationItem(itemId, { [field]: value });
  };

  return (
    <div className="space-y-4">
      {data.items.map((item) => (
        <Card key={item.id}>
          <CardContent className="pt-4 space-y-3">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <Label>Title</Label>
                <Input
                  value={item.title}
                  onChange={(e) =>
                    handleItemChange(item.id, "title", e.target.value)
                  }
                  placeholder="Publication Title"
                />
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="ml-2"
                onClick={() => deletePublicationItem(item.id)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Publisher</Label>
                <Input
                  value={item.publisher}
                  onChange={(e) =>
                    handleItemChange(item.id, "publisher", e.target.value)
                  }
                  placeholder="Journal / Publisher"
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
            <div>
              <Label>Description (optional)</Label>
              <textarea
                value={item.description}
                onChange={(e) =>
                  handleItemChange(item.id, "description", e.target.value)
                }
                placeholder="Brief description..."
                className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                rows={2}
              />
            </div>
          </CardContent>
        </Card>
      ))}

      <Button
        variant="outline"
        className="w-full"
        onClick={addPublicationItem}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Publication
      </Button>
    </div>
  );
}
