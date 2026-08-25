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
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { KanbanColumn } from "./KanbanColumn";
import { KanbanCard } from "./KanbanCard";

// Define Task Type
export type Task = {
  id: string;
  name: string;
  assignee: { name: string; initials: string; avatar: string };
  project: string;
  dueDate: string;
  priority: string;
  status: "To Do" | "In Progress" | "Done" | "Completed" | "Pending";
};

type KanbanBoardProps = {
  initialTasks: Task[];
  onTaskClick?: (task: Task) => void;
};

const COLUMNS = ["To Do", "In Progress", "Done"] as const;

export function KanbanBoard({ initialTasks, onTaskClick }: KanbanBoardProps) {
  // Normalize status for Kanban board to match the 3 columns
  const normalizedTasks = initialTasks.map((t) => ({
    ...t,
    column: t.status === "Pending" ? "To Do" : t.status === "Completed" ? "Done" : t.status,
  }));

  const [tasks, setTasks] = useState(normalizedTasks);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // 5px movement required before drag starts
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks.find((t) => t.id === active.id);
    if (task) setActiveTask(task as any);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === "Task";
    const isOverTask = over.data.current?.type === "Task";
    const isOverColumn = over.data.current?.type === "Column";

    if (!isActiveTask) return;

    // Dropping a Task over another Task
    if (isActiveTask && isOverTask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex].column !== tasks[overIndex].column) {
          const newTasks = [...tasks];
          newTasks[activeIndex].column = tasks[overIndex].column;
          return arrayMove(newTasks, activeIndex, overIndex);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    // Dropping a Task over a Column (empty space)
    if (isActiveTask && isOverColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const newTasks = [...tasks];
        newTasks[activeIndex].column = overId as "To Do" | "In Progress" | "Done";
        return arrayMove(newTasks, activeIndex, activeIndex);
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    setTasks((tasks) => {
      const activeIndex = tasks.findIndex((t) => t.id === activeId);
      const overIndex = tasks.findIndex((t) => t.id === overId);
      return arrayMove(tasks, activeIndex, overIndex);
    });
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
    <div className="flex h-full w-full overflow-x-auto gap-6 pb-4">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {COLUMNS.map((colId) => (
          <KanbanColumn
            key={colId}
            columnId={colId}
            tasks={tasks.filter((t) => t.column === colId) as any}
            onTaskClick={onTaskClick}
          />
        ))}

        <DragOverlay dropAnimation={dropAnimationConfig}>
          {activeTask ? <KanbanCard task={activeTask as any} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
