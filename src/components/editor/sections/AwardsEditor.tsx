"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { AwardsData, AwardItem } from "@/types/resume";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

export function AwardsEditor() {
  const {
    resume,
    addAwardItem,
    updateAwardItem,
    deleteAwardItem,
  } = useResumeStore();

  if (!resume) return null;

  const data = resume.sectionData.awards as AwardsData;
  if (!data) return null;

  const handleItemChange = (
    itemId: string,
    field: keyof AwardItem,
    value: string
  ) => {
    updateAwardItem(itemId, { [field]: value });
  };

  return (
    <div className="space-y-4">
      {data.items.map((item) => (
        <Card key={item.id}>
          <CardContent className="pt-4 space-y-3">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <Label>Award Name</Label>
                <Input
                  value={item.name}
                  onChange={(e) =>
                    handleItemChange(item.id, "name", e.target.value)
                  }
                  placeholder="Dean's List"
                />
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="ml-2"
                onClick={() => deleteAwardItem(item.id)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Issuer</Label>
                <Input
                  value={item.issuer}
                  onChange={(e) =>
                    handleItemChange(item.id, "issuer", e.target.value)
                  }
                  placeholder="University Name"
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
              <Label>Description (optional)</Label>
              <textarea
                value={item.description}
                onChange={(e) =>
                  handleItemChange(item.id, "description", e.target.value)
                }
                placeholder="Brief description of the award..."
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
        onClick={addAwardItem}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Award
      </Button>
    </div>
  );
}
