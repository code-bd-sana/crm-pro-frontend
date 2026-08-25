"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "./KanbanBoard";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Calendar } from "lucide-react";

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
        {task.name}
      </h3>
      
      <div>
        {task.priority === "High" && (
          <Badge className="bg-[#FEF2F2] text-[#EF4444] hover:bg-[#FEF2F2] border-transparent font-medium rounded-[4px] shadow-none">
            High
          </Badge>
        )}
        {task.priority === "Medium" && (
          <Badge className="bg-[#FFFBEB] text-[#F59E0B] hover:bg-[#FFFBEB] border-transparent font-medium rounded-[4px] shadow-none">
            Medium
          </Badge>
        )}
        {task.priority === "Low" && (
          <Badge className="bg-[#F0FDF4] text-[#10B981] hover:bg-[#F0FDF4] border-transparent font-medium rounded-[4px] shadow-none">
            Low
          </Badge>
        )}
      </div>

      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[#737373]">
            <Calendar className="w-4 h-4" />
            <span className="text-[12px]">{task.dueDate}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#737373]">
            <MessageSquare className="w-4 h-4" />
            <span className="text-[12px]">2</span>
          </div>
        </div>
        
        <Avatar className="w-6 h-6 rounded-full border border-[#E5E5E5]">
          <AvatarImage src={task.assignee.avatar} />
          <AvatarFallback className="bg-[#F1F5F9] text-[#0891B2] text-[10px] font-semibold">
            {task.assignee.initials}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
