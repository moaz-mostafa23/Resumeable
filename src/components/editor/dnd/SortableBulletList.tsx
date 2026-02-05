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
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BulletPoint } from "@/types/resume";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GripVertical, Trash2 } from "lucide-react";

interface SortableBulletListProps {
  bullets: BulletPoint[];
  onUpdate: (bulletId: string, content: string) => void;
  onDelete: (bulletId: string) => void;
  onReorder: (startIndex: number, endIndex: number) => void;
}

function SortableBulletItem({
  bullet,
  onUpdate,
  onDelete,
}: {
  bullet: BulletPoint;
  onUpdate: (bulletId: string, content: string) => void;
  onDelete: (bulletId: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: bullet.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-2 ${isDragging ? "opacity-50" : ""}`}
    >
      <button
        className="cursor-grab hover:bg-gray-100 rounded p-1"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-4 w-4 text-gray-400" />
      </button>
      <Input
        value={bullet.content}
        onChange={(e) => onUpdate(bullet.id, e.target.value)}
        placeholder="Describe your achievement..."
        className="flex-1"
      />
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDelete(bullet.id)}
      >
        <Trash2 className="h-4 w-4 text-red-500" />
      </Button>
    </div>
  );
}

export function SortableBulletList({
  bullets,
  onUpdate,
  onDelete,
  onReorder,
}: SortableBulletListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = bullets.findIndex((b) => b.id === active.id);
      const newIndex = bullets.findIndex((b) => b.id === over.id);
      onReorder(oldIndex, newIndex);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={bullets.map((b) => b.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2">
          {bullets.map((bullet) => (
            <SortableBulletItem
              key={bullet.id}
              bullet={bullet}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
