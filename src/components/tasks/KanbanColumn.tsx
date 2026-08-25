"use client";

import React, { useMemo } from "react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { KanbanCard } from "./KanbanCard";
import { Task } from "./KanbanBoard";

interface KanbanColumnProps {
  columnId: string;
  tasks: Task[];
  onTaskClick?: (task: Task) => void;
}

export function KanbanColumn({ columnId, tasks, onTaskClick }: KanbanColumnProps) {
  const taskIds = useMemo(() => tasks.map((t) => t.id), [tasks]);

  const { setNodeRef, isOver } = useDroppable({
    id: columnId,
    data: {
      type: "Column",
      columnId,
    },
  });

  return (
    <div className="flex flex-col flex-1 min-w-[320px] max-w-[400px]">
      {/* Column Header */}
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-[16px] font-semibold text-[#111111]">{columnId}</h2>
        <div className="bg-[#F1F5F9] border border-[#E5E5E5] text-[#737373] text-[12px] font-semibold w-7 h-6 flex items-center justify-center rounded-full">
          {tasks.length}
        </div>
      </div>

      {/* Droppable Area */}
      <div
        ref={setNodeRef}
        className={`flex flex-col gap-4 min-h-[500px] rounded-xl transition-colors ${
          isOver ? "bg-[#F8FAFC]" : ""
        }`}
      >
        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <KanbanCard key={task.id} task={task} onTaskClick={onTaskClick} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
