"use client";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableSectionItem } from "./SortableSectionItem";
import { SectionConfig } from "@/types/resume";
import { useResumeStore } from "@/store/useResumeStore";

interface SortableSectionListProps {
  sections: SectionConfig[];
  activeSection: string | null;
  onSectionClick: (sectionId: string) => void;
}

export function SortableSectionList({
  sections,
  activeSection,
  onSectionClick,
}: SortableSectionListProps) {
  const { reorderSections } = useResumeStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = sections.findIndex((s) => s.id === active.id);
      const newIndex = sections.findIndex((s) => s.id === over.id);
      reorderSections(oldIndex, newIndex);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={sections.map((s) => s.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2">
          {sections.map((section) => (
            <SortableSectionItem
              key={section.id}
              section={section}
              isActive={activeSection === section.id}
              onClick={() => onSectionClick(section.id)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
