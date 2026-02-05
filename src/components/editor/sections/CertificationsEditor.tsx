"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { CertificationsData, CertificationItem } from "@/types/resume";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

export function CertificationsEditor() {
  const {
    resume,
    addCertificationItem,
    updateCertificationItem,
    deleteCertificationItem,
  } = useResumeStore();

  if (!resume) return null;

  const data = resume.sectionData.certifications as CertificationsData;

  const handleItemChange = (
    itemId: string,
    field: keyof CertificationItem,
    value: string
  ) => {
    updateCertificationItem(itemId, { [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {data.items.map((item) => (
          <Card key={item.id}>
            <CardContent className="pt-4 space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <Label>Certification Name</Label>
                  <Input
                    value={item.name}
                    onChange={(e) =>
                      handleItemChange(item.id, "name", e.target.value)
                    }
                    placeholder="AWS Certified Developer"
                  />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-2"
                  onClick={() => deleteCertificationItem(item.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
              <div>
                <Label>Issuing Organization</Label>
                <Input
                  value={item.issuer}
                  onChange={(e) =>
                    handleItemChange(item.id, "issuer", e.target.value)
                  }
                  placeholder="Amazon Web Services"
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
              <div>
                <Label>Credential Link (optional)</Label>
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
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={addCertificationItem}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Certification
      </Button>
    </div>
  );
}
