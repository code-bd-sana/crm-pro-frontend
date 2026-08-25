import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { X, CheckSquare, Flag, User, Calendar, MessageSquare, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Task } from "./KanbanBoard";

interface TaskDetailsPanelProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TaskDetailsPanel({ task, isOpen, onClose }: TaskDetailsPanelProps) {
  if (!task) return null;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <SheetContent className="w-full sm:max-w-[480px] p-0 border-l border-[#E5E5E5] !bg-[#FFFFFF] shadow-xl overflow-y-auto">
        <div className="flex flex-col h-full">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#E5E5E5] flex flex-col gap-3 sticky top-0 bg-white z-10">
            <div className="flex flex-row items-start justify-between">
              <SheetTitle className="text-[#111111] font-semibold text-[18px]">
                {task.name}
              </SheetTitle>
              <SheetClose className="text-[#A3A3A3] hover:text-[#111111] transition-colors rounded-sm focus:outline-none focus:ring-2 focus:ring-[#0891B2] focus:ring-offset-2">
                <X className="w-5 h-5" />
              </SheetClose>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-[#F1F5F9] text-[#475569] hover:bg-[#F1F5F9] border-transparent font-medium rounded-[4px] shadow-none">
                {task.project || "Website Redesign"}
              </Badge>
              {task.priority === "High" && (
                <Badge className="bg-[#FFF7ED] text-[#F97316] hover:bg-[#FFF7ED] border-transparent font-medium rounded-[4px] shadow-none">
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
          </div>

          {/* Body Content */}
          <div className="p-6 flex flex-col gap-6">
            
            {/* Attributes Grid */}
            <div className="flex flex-col gap-6">
              
              {/* Status */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[#737373]">
                  <CheckSquare className="w-4 h-4" />
                  <span className="text-[14px] font-medium text-[#111111]">Status</span>
                </div>
                <Select defaultValue={task.status.toLowerCase().replace(" ", "_")}>
                  <SelectTrigger className="w-full h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] focus:ring-[#0891B2]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todo">To Do</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Priority */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[#737373]">
                  <Flag className="w-4 h-4" />
                  <span className="text-[14px] font-medium text-[#111111]">Priority</span>
                </div>
                <Select defaultValue={task.priority.toLowerCase()}>
                  <SelectTrigger className="w-full h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] focus:ring-[#0891B2]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Assignee */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[#737373]">
                  <User className="w-4 h-4" />
                  <span className="text-[14px] font-medium text-[#111111]">Assignee</span>
                </div>
                <div className="w-full h-[36px] flex items-center gap-2 border border-[#E5E5E5] bg-[#FFFFFF] rounded-[4px] px-3">
                  <Avatar className="w-5 h-5 rounded-full border border-[#E5E5E5]">
                    <AvatarImage src={task.assignee.avatar} />
                    <AvatarFallback className="bg-[#F1F5F9] text-[#0891B2] text-[10px] font-semibold">
                      {task.assignee.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-[14px] text-[#111111]">{task.assignee.name}</span>
                </div>
              </div>

              {/* Due Date */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[#737373]">
                  <Calendar className="w-4 h-4" />
                  <span className="text-[14px] font-medium text-[#111111]">Due Date</span>
                </div>
                <div className="w-full h-[36px] border border-[#E5E5E5] bg-[#FFFFFF] rounded-[4px] px-3 flex items-center text-[14px] text-[#111111]">
                  {task.dueDate}
                </div>
              </div>

            </div>

            <hr className="border-[#E5E5E5]" />

            {/* Description */}
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-medium text-[#111111]">Description</label>
              <Textarea 
                placeholder="Add a description..."
                className="min-h-[100px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] placeholder:text-[#737373] resize-none focus-visible:ring-[#0891B2]"
              />
            </div>

            <hr className="border-[#E5E5E5]" />

            {/* Subtasks */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <label className="text-[14px] font-medium text-[#111111]">Subtasks</label>
                <Button variant="ghost" className="h-[24px] px-2 text-[12px] font-medium text-[#111111] hover:bg-transparent">
                  Add subtask
                </Button>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-start gap-3 hover:bg-[#FAFAFA] rounded-[6px] group py-1">
                  <Checkbox defaultChecked className="mt-0.5 border-[#E5E5E5] data-checked:bg-[#0891B2] data-checked:border-[#0891B2]" />
                  <span className="text-[14px] text-[#737373] line-through">Review current design</span>
                </div>
                <div className="flex items-start gap-3 hover:bg-[#FAFAFA] rounded-[6px] group py-1">
                  <Checkbox defaultChecked className="mt-0.5 border-[#E5E5E5] data-checked:bg-[#0891B2] data-checked:border-[#0891B2]" />
                  <span className="text-[14px] text-[#737373] line-through">Create new mockups</span>
                </div>
                <div className="flex items-start gap-3 hover:bg-[#FAFAFA] rounded-[6px] group py-1">
                  <Checkbox className="mt-0.5 border-[#E5E5E5] data-checked:bg-[#0891B2] data-checked:border-[#0891B2]" />
                  <span className="text-[14px] text-[#111111]">Get client approval</span>
                </div>
                <div className="flex items-start gap-3 hover:bg-[#FAFAFA] rounded-[6px] group py-1">
                  <Checkbox className="mt-0.5 border-[#E5E5E5] data-checked:bg-[#0891B2] data-checked:border-[#0891B2]" />
                  <span className="text-[14px] text-[#111111]">Implement changes</span>
                </div>
              </div>
            </div>

            <hr className="border-[#E5E5E5]" />

            {/* Attachments */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-[#737373]">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                <span className="text-[14px] font-medium text-[#111111]">Attachments</span>
              </div>
              <div className="border border-dashed border-[#E5E5E5] rounded-[6px] bg-[#FFFFFF] p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-[#FAFAFA] transition-colors">
                <svg className="w-5 h-5 text-[#737373]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                <span className="text-[14px] text-[#737373]">Drag and drop files here or click to browse</span>
              </div>
            </div>

            <hr className="border-[#E5E5E5]" />

            {/* Comments */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-[#737373]">
                <MessageSquare className="w-4 h-4" />
                <span className="text-[14px] font-medium text-[#111111]">Comments</span>
              </div>
              
              <div className="flex gap-3">
                <Avatar className="w-8 h-8 rounded-full border border-[#E5E5E5]">
                  <AvatarFallback className="bg-[#E0F2FE] text-[#0369A1] text-[12px] font-semibold">
                    SC
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col flex-1 gap-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[14px] text-[#111111] font-medium">Sarah Chen</span>
                    <span className="text-[12px] text-[#737373]">2 hours ago</span>
                  </div>
                  <p className="text-[14px] text-[#404040] leading-[20px]">
                    I've updated the mockups based on the feedback. Can you review?
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
