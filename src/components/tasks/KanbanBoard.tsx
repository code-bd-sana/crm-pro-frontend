"use client";

import React, { useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import {
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { KanbanColumn } from "./KanbanColumn";
import { KanbanCard } from "./KanbanCard";
import type { Task } from "@/types/models.types";
import { TaskStatus } from "@/types/models.types";

const COLUMNS: { id: TaskStatus; label: string }[] = [
  { id: TaskStatus.TODO, label: "To Do" },
  { id: TaskStatus.IN_PROGRESS, label: "In Progress" },
  { id: TaskStatus.DONE, label: "Done" },
];

type KanbanBoardProps = {
  tasks: Task[];
  onTaskClick?: (task: Task) => void;
  onStatusChange?: (taskId: string, status: TaskStatus) => void;
};

export function KanbanBoard({ tasks, onTaskClick, onStatusChange }: KanbanBoardProps) {
  // Optimistic overrides applied while dragging across columns; cleared when props catch up
  const [statusOverrides, setStatusOverrides] = useState<Record<string, TaskStatus>>({});
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const displayedTasks = tasks.map((task) =>
    statusOverrides[task.id] ? { ...task, status: statusOverrides[task.id] } : task
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getTaskStatus = (taskId: string): TaskStatus | undefined =>
    displayedTasks.find((t) => t.id === taskId)?.status;

  const resolveTargetStatus = (overId: string, overType: string | undefined): TaskStatus | undefined => {
    if (overType === "Column") return overId as TaskStatus;
    if (overType === "Task") return getTaskStatus(overId);
    return undefined;
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = displayedTasks.find((t) => t.id === active.id);
    if (task) setActiveTask(task);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const isActiveTask = active.data.current?.type === "Task";
    if (!isActiveTask) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    if (activeId === overId) return;

    const targetStatus = resolveTargetStatus(overId, over.data.current?.type);
    if (!targetStatus) return;

    const currentStatus = getTaskStatus(activeId);
    if (!currentStatus || currentStatus === targetStatus) return;

    setStatusOverrides((prev) => ({ ...prev, [activeId]: targetStatus }));
    onStatusChange?.(activeId, targetStatus);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);
    if (activeId === overId) return;

    const targetStatus = resolveTargetStatus(overId, over.data.current?.type);
    if (!targetStatus) return;

    const currentStatus = getTaskStatus(activeId);
    if (!currentStatus || currentStatus === targetStatus) return;

    setStatusOverrides((prev) => ({ ...prev, [activeId]: targetStatus }));
    onStatusChange?.(activeId, targetStatus);
  };

  const dropAnimationConfig = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0.4",
        },
      },
    }),
  };

  return (
    <div className="flex h-full w-full overflow-x-auto gap-4 md:gap-6 pb-4 snap-x snap-mandatory scroll-p-6">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {COLUMNS.map((column) => (
          <KanbanColumn
            key={column.id}
            columnId={column.id}
            label={column.label}
            tasks={displayedTasks.filter((t) => t.status === column.id)}
            onTaskClick={onTaskClick}
          />
        ))}

        <DragOverlay dropAnimation={dropAnimationConfig}>
          {activeTask ? <KanbanCard task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
