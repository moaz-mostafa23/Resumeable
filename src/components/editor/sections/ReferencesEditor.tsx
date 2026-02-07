"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { ReferencesData, ReferenceItem } from "@/types/resume";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

export function ReferencesEditor() {
  const {
    resume,
    addReferenceItem,
    updateReferenceItem,
    deleteReferenceItem,
  } = useResumeStore();

  if (!resume) return null;

  const data = resume.sectionData.references as ReferencesData;
  if (!data) return null;

  const handleItemChange = (
    itemId: string,
    field: keyof ReferenceItem,
    value: string
  ) => {
    updateReferenceItem(itemId, { [field]: value });
  };

  return (
    <div className="space-y-4">
      {data.items.map((item) => (
        <Card key={item.id}>
          <CardContent className="pt-4 space-y-3">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <Label>Full Name</Label>
                <Input
                  value={item.name}
                  onChange={(e) =>
                    handleItemChange(item.id, "name", e.target.value)
                  }
                  placeholder="John Doe"
                />
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="ml-2"
                onClick={() => deleteReferenceItem(item.id)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Title</Label>
                <Input
                  value={item.title}
                  onChange={(e) =>
                    handleItemChange(item.id, "title", e.target.value)
                  }
                  placeholder="Senior Manager"
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
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Email</Label>
                <Input
                  value={item.email}
                  onChange={(e) =>
                    handleItemChange(item.id, "email", e.target.value)
                  }
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  value={item.phone}
                  onChange={(e) =>
                    handleItemChange(item.id, "phone", e.target.value)
                  }
                  placeholder="(123) 456-7890"
                />
              </div>
            </div>
            <div>
              <Label>Relationship</Label>
              <Input
                value={item.relationship}
                onChange={(e) =>
                  handleItemChange(item.id, "relationship", e.target.value)
                }
                placeholder="Former Manager"
              />
            </div>
          </CardContent>
        </Card>
      ))}

      <Button
        variant="outline"
        className="w-full"
        onClick={addReferenceItem}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Reference
      </Button>
    </div>
  );
}
