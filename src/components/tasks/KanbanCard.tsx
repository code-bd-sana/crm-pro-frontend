"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import type { Task, TaskPriority } from "@/types/models.types";

const PRIORITY_BADGES: Record<TaskPriority, { label: string; className: string }> = {
  LOW: { label: "Low", className: "bg-[#F0FDF4] text-[#10B981]" },
  MEDIUM: { label: "Medium", className: "bg-[#FFFBEB] text-[#F59E0B]" },
  HIGH: { label: "High", className: "bg-[#FEF2F2] text-[#EF4444]" },
  CRITICAL: { label: "Critical", className: "bg-[#FEF2F2] text-[#B91C1C]" },
};

interface KanbanCardProps {
  task: Task;
  onTaskClick?: (task: Task) => void;
}

export function KanbanCard({ task, onTaskClick }: KanbanCardProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const priority = PRIORITY_BADGES[task.priority] ?? PRIORITY_BADGES.MEDIUM;
  const initials = `${task.assignee?.profile?.firstName?.charAt(0) ?? ""}${task.assignee?.profile?.lastName?.charAt(0) ?? ""}`.toUpperCase();

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => onTaskClick?.(task)}
      className={`bg-white p-4 rounded-xl border border-[#E5E5E5] flex flex-col gap-3 cursor-grab active:cursor-grabbing hover:shadow-sm transition-shadow ${
        isDragging ? "opacity-50 ring-2 ring-[#0891B2] shadow-md" : ""
      }`}
    >
      <h3 className="text-[14px] font-medium text-[#111111] leading-snug">
        {task.title}
      </h3>

      <div>
        <Badge className={`${priority.className} hover:bg-inherit border-transparent font-medium rounded-[4px] shadow-none`}>
          {priority.label}
        </Badge>
      </div>

      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center gap-1.5 text-[#737373]">
          <Calendar className="w-4 h-4" />
          <span className="text-[12px]">
            {task.dueDate ? format(new Date(task.dueDate), "MMM d") : "—"}
          </span>
        </div>

        <Avatar className="w-6 h-6 rounded-full border border-[#E5E5E5]">
          <AvatarImage src={task.assignee?.profile?.avatarUrl} />
          <AvatarFallback className="bg-[#F1F5F9] text-[#0891B2] text-[10px] font-semibold">
            {initials || "U"}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
