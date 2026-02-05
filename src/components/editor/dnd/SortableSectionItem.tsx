"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SectionConfig } from "@/types/resume";
import { useResumeStore } from "@/store/useResumeStore";
import { Switch } from "@/components/ui/switch";
import { GripVertical, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface SortableSectionItemProps {
  section: SectionConfig;
  isActive: boolean;
  onClick: () => void;
}

export function SortableSectionItem({
  section,
  isActive,
  onClick,
}: SortableSectionItemProps) {
  const { toggleSectionVisibility } = useResumeStore();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleVisibilityToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSectionVisibility(section.id);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors",
        isActive ? "bg-primary/10 border border-primary" : "hover:bg-gray-100",
        isDragging && "opacity-50 shadow-lg",
        !section.visible && "opacity-50"
      )}
      onClick={onClick}
    >
      <button
        className="cursor-grab hover:bg-gray-200 rounded p-1"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-4 w-4 text-gray-400" />
      </button>

      <span className="flex-1 text-sm font-medium truncate">{section.label}</span>

      <button
        className="p-1 hover:bg-gray-200 rounded"
        onClick={handleVisibilityToggle}
      >
        {section.visible ? (
          <Eye className="h-4 w-4 text-gray-500" />
        ) : (
          <EyeOff className="h-4 w-4 text-gray-400" />
        )}
      </button>
    </div>
  );
}
