"use client";

import { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { X, CheckSquare, Flag, User, Calendar, MessageSquare, Plus, Trash2, Loader2, Paperclip, Tag } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  getTaskById,
  updateTask,
  getSubtasks,
  createSubtask,
  updateSubtask,
  deleteSubtask,
  getTaskComments,
  addTaskComment,
  deleteTaskComment,
} from "@/services/task.service";
import { getAttachments, uploadAttachment, deleteAttachment, type Attachment } from "@/services/attachment.service";
import { getUsers } from "@/services/user.service";
import { getErrorMessage } from "@/lib/utils";
import { PermissionGuard } from "@/components/shared/PermissionGuard";
import { useRBAC } from "@/hooks/useRBAC";
import { PermissionEnum } from "@/types/auth.types";
import { TaskPriority, TaskStatus } from "@/types/models.types";
import type { UpdateTaskDto } from "@/types/models.types";
import { useAuthStore } from "@/store/useAuthStore";

const PRIORITY_OPTIONS = [
  { value: TaskPriority.LOW, label: "Low" },
  { value: TaskPriority.MEDIUM, label: "Medium" },
  { value: TaskPriority.HIGH, label: "High" },
  { value: TaskPriority.CRITICAL, label: "Critical" },
];

const STATUS_OPTIONS = [
  { value: TaskStatus.TODO, label: "To Do" },
  { value: TaskStatus.IN_PROGRESS, label: "In Progress" },
  { value: TaskStatus.DONE, label: "Done" },
];

const PRIORITY_BADGES: Record<TaskPriority, string> = {
  LOW: "bg-[#F0FDF4] text-[#10B981]",
  MEDIUM: "bg-[#FFFBEB] text-[#F59E0B]",
  HIGH: "bg-[#FEF2F2] text-[#EF4444]",
  CRITICAL: "bg-[#FEF2F2] text-[#B91C1C]",
};

const UNASSIGNED = "__unassigned__";

interface DraftState {
  taskId: string | null;
  value: string;
}

interface TaskDetailsPanelProps {
  taskId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TaskDetailsPanel({ taskId, isOpen, onClose }: TaskDetailsPanelProps) {
  const queryClient = useQueryClient();
  const currentUser = useAuthStore((state) => state.user);
  const { hasPermission } = useRBAC();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Drafts are scoped to the current task; they fall back to the server value when switching tasks
  const [titleDraft, setTitleDraft] = useState<DraftState>({ taskId: null, value: "" });
  const [descriptionDraft, setDescriptionDraft] = useState<DraftState>({ taskId: null, value: "" });
  const [tagsDraft, setTagsDraft] = useState<DraftState>({ taskId: null, value: "" });
  const [newSubtask, setNewSubtask] = useState("");
  const [newComment, setNewComment] = useState("");

  const { data: task, isLoading } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getTaskById(taskId as string),
    enabled: isOpen && !!taskId,
  });

  const { data: subtasks } = useQuery({
    queryKey: ["task", taskId, "subtasks"],
    queryFn: () => getSubtasks(taskId as string),
    enabled: isOpen && !!taskId,
  });

  const { data: comments } = useQuery({
    queryKey: ["task", taskId, "comments"],
    queryFn: () => getTaskComments(taskId as string),
    enabled: isOpen && !!taskId,
  });

  const { data: attachments } = useQuery({
    queryKey: ["attachments", "TASK", taskId],
    queryFn: () => getAttachments("TASK", taskId as string),
    enabled: isOpen && !!taskId,
  });

  const { data: users } = useQuery({
    queryKey: ["users", "options"],
    queryFn: getUsers,
    enabled: isOpen,
  });

  const invalidateTask = () => {
    queryClient.invalidateQueries({ queryKey: ["task", taskId] });
    queryClient.invalidateQueries({ queryKey: ["tasks"] });
  };

  const { mutate: updateTaskMutation } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTaskDto }) => updateTask(id, data),
    onSuccess: () => {
      invalidateTask();
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, "Failed to update task"));
    },
  });

  const { mutate: saveField, isPending: isSavingField } = useMutation({
    mutationFn: ({ data }: { data: UpdateTaskDto }) => updateTask(taskId as string, data),
    onSuccess: () => {
      invalidateTask();
      toast.success("Task updated");
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, "Failed to update task"));
    },
  });

  const { mutate: addSubtaskMutation, isPending: isAddingSubtask } = useMutation({
    mutationFn: () => createSubtask(taskId as string, { title: newSubtask }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task", taskId, "subtasks"] });
      setNewSubtask("");
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, "Failed to add subtask"));
    },
  });

  const { mutate: toggleSubtask } = useMutation({
    mutationFn: ({ subtaskId, isCompleted }: { subtaskId: string; isCompleted: boolean }) =>
      updateSubtask(taskId as string, subtaskId, { isCompleted }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task", taskId, "subtasks"] });
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, "Failed to update subtask"));
    },
  });

  const { mutate: removeSubtask } = useMutation({
    mutationFn: (subtaskId: string) => deleteSubtask(taskId as string, subtaskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task", taskId, "subtasks"] });
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, "Failed to delete subtask"));
    },
  });

  const { mutate: submitComment, isPending: isAddingComment } = useMutation({
    mutationFn: () => addTaskComment(taskId as string, newComment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task", taskId, "comments"] });
      setNewComment("");
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, "Failed to add comment"));
    },
  });

  const { mutate: removeComment } = useMutation({
    mutationFn: (commentId: string) => deleteTaskComment(taskId as string, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task", taskId, "comments"] });
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, "Failed to delete comment"));
    },
  });

  const { mutate: uploadFile, isPending: isUploading } = useMutation({
    mutationFn: (file: File) => uploadAttachment(file, "TASK", taskId as string),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attachments", "TASK", taskId] });
      toast.success("File uploaded");
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, "Failed to upload file"));
    },
  });

  const { mutate: removeFile } = useMutation({
    mutationFn: (id: string) => deleteAttachment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attachments", "TASK", taskId] });
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, "Failed to delete file"));
    },
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadFile(file);
    }
    event.target.value = "";
  };

  if (!taskId) return null;

  const draftOf = (
    draft: DraftState,
    setDraft: React.Dispatch<React.SetStateAction<DraftState>>,
    serverValue: string
  ) => ({
    value: draft.taskId === taskId ? draft.value : serverValue,
    onChange: (value: string) => setDraft({ taskId, value }),
  });

  const title = draftOf(titleDraft, setTitleDraft, task?.title ?? "");
  const description = draftOf(descriptionDraft, setDescriptionDraft, task?.description ?? "");
  const tags = draftOf(tagsDraft, setTagsDraft, (task?.tags ?? []).join(", "));

  const initials = `${task?.assignee?.profile?.firstName?.charAt(0) ?? ""}${task?.assignee?.profile?.lastName?.charAt(0) ?? ""}`.toUpperCase();
  const canEdit = hasPermission(PermissionEnum.TASKS_UPDATE);

  const saveTitle = () => {
    if (title.value.trim() && title.value !== (task?.title ?? "")) {
      saveField({ data: { title: title.value.trim() } });
    }
  };

  const saveDescription = () => {
    if (description.value !== (task?.description ?? "")) {
      saveField({ data: { description: description.value || undefined } });
    }
  };

  const saveTags = () => {
    const nextTags = tags.value.split(",").map((tag) => tag.trim()).filter(Boolean);
    if (tags.value !== (task?.tags ?? []).join(", ")) {
      saveField({ data: { tags: nextTags } });
    }
  };

  const assigneeItems = [
    { value: UNASSIGNED, label: "Unassigned" },
    ...(users ?? []).map((user) => ({
      value: user.id,
      label: `${user.profile?.firstName ?? ""} ${user.profile?.lastName ?? ""}`.trim() || user.email,
    })),
  ];

  return (
    <Sheet open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <SheetContent className="w-full sm:max-w-[480px] p-0 border-l border-[#E5E5E5] !bg-[#FFFFFF] shadow-xl overflow-y-auto">
        <div className="flex flex-col h-full">

          {/* Header */}
          <SheetHeader className="px-6 py-5 border-b border-[#E5E5E5] flex flex-col gap-3 sticky top-0 bg-white z-10">
            <div className="flex flex-row items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                {isLoading || !task ? (
                  <SheetTitle className="text-[#111111] font-semibold text-[18px]">Loading task...</SheetTitle>
                ) : canEdit ? (
                  <input
                    value={title.value}
                    onChange={(e) => title.onChange(e.target.value)}
                    onBlur={saveTitle}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        (e.target as HTMLInputElement).blur();
                      }
                    }}
                    aria-label="Task title"
                    className="w-full text-[18px] font-semibold text-[#111111] bg-transparent border border-transparent hover:border-[#E5E5E5] focus:border-[#0891B2] rounded-[4px] px-2 -ml-2 py-0.5 outline-none transition-colors"
                  />
                ) : (
                  <SheetTitle className="text-[#111111] font-semibold text-[18px]">{task.title}</SheetTitle>
                )}
              </div>
              <SheetClose className="text-[#A3A3A3] hover:text-[#111111] transition-colors rounded-sm focus:outline-none focus:ring-2 focus:ring-[#0891B2] focus:ring-offset-2 shrink-0">
                <X className="w-5 h-5" />
              </SheetClose>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {task?.project && (
                <Badge className="bg-[#F1F5F9] text-[#475569] hover:bg-[#F1F5F9] border-transparent font-medium rounded-[4px] shadow-none">
                  {task.project.title}
                </Badge>
              )}
              {task && (
                <Badge className={`${PRIORITY_BADGES[task.priority] ?? PRIORITY_BADGES.MEDIUM} hover:bg-inherit border-transparent font-medium rounded-[4px] shadow-none`}>
                  {task.priority.toLowerCase()}
                </Badge>
              )}
              {isSavingField && <Loader2 className="w-3.5 h-3.5 text-[#0891B2] animate-spin" />}
            </div>
          </SheetHeader>

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
                <PermissionGuard
                  fallback={
                    <div className="w-full h-[36px] flex items-center px-3 border border-[#E5E5E5] rounded-[4px] text-[14px] text-[#111111] bg-[#FAFAFA]">
                      {STATUS_OPTIONS.find((o) => o.value === task?.status)?.label ?? task?.status ?? "—"}
                    </div>
                  }
                  permission={PermissionEnum.TASKS_UPDATE}
                >
                  <Select
                    value={task?.status ?? null}
                    onValueChange={(status) => updateTaskMutation({ id: taskId, data: { status: status as TaskStatus } })}
                    items={STATUS_OPTIONS}
                  >
                    <SelectTrigger className="w-full h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] focus:ring-[#0891B2]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </PermissionGuard>
              </div>

              {/* Priority */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[#737373]">
                  <Flag className="w-4 h-4" />
                  <span className="text-[14px] font-medium text-[#111111]">Priority</span>
                </div>
                <PermissionGuard
                  fallback={
                    <div className="w-full h-[36px] flex items-center px-3 border border-[#E5E5E5] rounded-[4px] text-[14px] text-[#111111] bg-[#FAFAFA]">
                      {PRIORITY_OPTIONS.find((o) => o.value === task?.priority)?.label ?? task?.priority ?? "—"}
                    </div>
                  }
                  permission={PermissionEnum.TASKS_UPDATE}
                >
                  <Select
                    value={task?.priority ?? null}
                    onValueChange={(priority) => updateTaskMutation({ id: taskId, data: { priority: priority as TaskPriority } })}
                    items={PRIORITY_OPTIONS}
                  >
                    <SelectTrigger className="w-full h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] focus:ring-[#0891B2]">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      {PRIORITY_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </PermissionGuard>
              </div>

              {/* Assignee */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[#737373]">
                  <User className="w-4 h-4" />
                  <span className="text-[14px] font-medium text-[#111111]">Assignee</span>
                </div>
                <PermissionGuard
                  fallback={
                    <div className="w-full h-[36px] flex items-center gap-2 border border-[#E5E5E5] bg-[#FAFAFA] rounded-[4px] px-3">
                      <Avatar className="w-5 h-5 rounded-full border border-[#E5E5E5]">
                        <AvatarImage src={task?.assignee?.profile?.avatarUrl} />
                        <AvatarFallback className="bg-[#F1F5F9] text-[#0891B2] text-[10px] font-semibold">
                          {initials || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-[14px] text-[#111111]">
                        {task?.assignee ? `${task.assignee.profile?.firstName ?? ""} ${task.assignee.profile?.lastName ?? ""}`.trim() || task.assignee.email : "Unassigned"}
                      </span>
                    </div>
                  }
                  permission={PermissionEnum.TASKS_UPDATE}
                >
                  <Select
                    value={task?.assignee?.id ?? UNASSIGNED}
                    onValueChange={(assigneeId) =>
                      updateTaskMutation({
                        id: taskId,
                        data: { assigneeId: !assigneeId || assigneeId === UNASSIGNED ? null : assigneeId },
                      })
                    }
                    items={assigneeItems}
                  >
                    <SelectTrigger className="w-full h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] focus:ring-[#0891B2]">
                      <SelectValue placeholder="Unassigned" />
                    </SelectTrigger>
                    <SelectContent>
                      {assigneeItems.map((item) => (
                        <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </PermissionGuard>
              </div>

              {/* Due Date */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[#737373]">
                  <Calendar className="w-4 h-4" />
                  <span className="text-[14px] font-medium text-[#111111]">Due Date</span>
                </div>
                <PermissionGuard
                  fallback={
                    <div className="w-full h-[36px] border border-[#E5E5E5] bg-[#FAFAFA] rounded-[4px] px-3 flex items-center text-[14px] text-[#111111]">
                      {task?.dueDate ? format(new Date(task.dueDate), "MMM d, yyyy") : "No due date"}
                    </div>
                  }
                  permission={PermissionEnum.TASKS_UPDATE}
                >
                  <Input
                    type="date"
                    value={task?.dueDate ? task.dueDate.slice(0, 10) : ""}
                    onChange={(e) => updateTaskMutation({ id: taskId, data: { dueDate: e.target.value || undefined } })}
                    className="w-full h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] focus-visible:ring-[#0891B2]"
                  />
                </PermissionGuard>
              </div>

              {/* Tags */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[#737373]">
                  <Tag className="w-4 h-4" />
                  <span className="text-[14px] font-medium text-[#111111]">Tags</span>
                </div>
                <PermissionGuard
                  fallback={
                    <div className="w-full min-h-[36px] flex items-center flex-wrap gap-1.5 px-3 py-1.5 border border-[#E5E5E5] bg-[#FAFAFA] rounded-[4px]">
                      {(task?.tags ?? []).length === 0 ? (
                        <span className="text-[14px] text-[#A3A3A3]">No tags</span>
                      ) : (
                        (task?.tags ?? []).map((tag) => (
                          <Badge key={tag} className="bg-[#F1F5F9] text-[#475569] hover:bg-[#F1F5F9] border-transparent font-medium rounded-[4px] shadow-none">
                            {tag}
                          </Badge>
                        ))
                      )}
                    </div>
                  }
                  permission={PermissionEnum.TASKS_UPDATE}
                >
                  <Input
                    value={tags.value}
                    onChange={(e) => tags.onChange(e.target.value)}
                    onBlur={saveTags}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        (e.target as HTMLInputElement).blur();
                      }
                    }}
                    placeholder="design, frontend, urgent"
                    className="w-full h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] placeholder:text-[#A3A3A3] focus-visible:ring-[#0891B2]"
                  />
                  <p className="text-[12px] text-[#737373]">Separate tags with commas — saves on blur</p>
                </PermissionGuard>
              </div>

            </div>

            <hr className="border-[#E5E5E5]" />

            {/* Description */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-[14px] font-medium text-[#111111]">Description</label>
                {canEdit && (
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={description.value === (task?.description ?? "") || isSavingField}
                    onClick={saveDescription}
                    className="h-[24px] px-2 text-[12px] font-medium text-[#0891B2] hover:bg-transparent disabled:opacity-40"
                  >
                    {isSavingField ? <Loader2 className="w-3 h-3 animate-spin" /> : "Save"}
                  </Button>
                )}
              </div>
              <Textarea
                value={description.value}
                onChange={(e) => description.onChange(e.target.value)}
                disabled={!canEdit}
                placeholder="Add a description..."
                className="min-h-[100px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] placeholder:text-[#737373] resize-none focus-visible:ring-[#0891B2] disabled:cursor-not-allowed"
              />
            </div>

            <hr className="border-[#E5E5E5]" />

            {/* Subtasks */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <label className="text-[14px] font-medium text-[#111111]">
                  Subtasks {(subtasks?.length ?? 0) > 0 && <span className="text-[#737373] font-normal">({subtasks!.filter((s) => s.isCompleted).length}/{subtasks!.length})</span>}
                </label>
              </div>
              <PermissionGuard permission={PermissionEnum.TASKS_UPDATE}>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a subtask..."
                    value={newSubtask}
                    onChange={(e) => setNewSubtask(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && newSubtask.trim()) {
                        e.preventDefault();
                        addSubtaskMutation();
                      }
                    }}
                    className="h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] focus-visible:ring-[#0891B2]"
                  />
                  <Button
                    onClick={() => addSubtaskMutation()}
                    disabled={!newSubtask.trim() || isAddingSubtask}
                    className="h-[36px] px-3 bg-[#0891B2] hover:bg-[#0891B2]/90 text-white shrink-0"
                  >
                    {isAddingSubtask ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  </Button>
                </div>
              </PermissionGuard>
              <div className="flex flex-col gap-2">
                {(subtasks ?? []).map((subtask) => (
                  <div key={subtask.id} className="flex items-start gap-3 hover:bg-[#FAFAFA] rounded-[6px] group py-1">
                    <Checkbox
                      checked={subtask.isCompleted}
                      onCheckedChange={() => toggleSubtask({ subtaskId: subtask.id, isCompleted: !subtask.isCompleted })}
                      className="mt-0.5 border-[#E5E5E5] data-checked:bg-[#0891B2] data-checked:border-[#0891B2]"
                    />
                    <span className={`text-[14px] flex-1 ${subtask.isCompleted ? "text-[#737373] line-through" : "text-[#111111]"}`}>
                      {subtask.title}
                    </span>
                    <PermissionGuard permission={PermissionEnum.TASKS_UPDATE}>
                      <button
                        onClick={() => removeSubtask(subtask.id)}
                        className="text-[#A3A3A3] hover:text-[#EF4444] transition-colors opacity-0 group-hover:opacity-100"
                        aria-label="Delete subtask"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </PermissionGuard>
                  </div>
                ))}
                {(subtasks ?? []).length === 0 && (
                  <p className="text-[13px] text-[#737373]">No subtasks yet.</p>
                )}
              </div>
            </div>

            <hr className="border-[#E5E5E5]" />

            {/* Attachments */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#737373]">
                  <Paperclip className="w-4 h-4" />
                  <span className="text-[14px] font-medium text-[#111111]">Attachments</span>
                </div>
                <PermissionGuard permission={PermissionEnum.TASKS_UPDATE}>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept="image/jpeg,image/png,image/webp,application/pdf"
                    onChange={handleFileSelect}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="h-[24px] px-2 text-[12px] font-medium text-[#111111] hover:bg-transparent"
                  >
                    {isUploading ? <Loader2 className="w-3 h-3 animate-spin" /> : "Upload"}
                  </Button>
                </PermissionGuard>
              </div>
              {(attachments ?? []).length > 0 && (
                <div className="flex flex-col gap-2">
                  {(attachments ?? []).map((attachment: Attachment) => (
                    <div key={attachment.id} className="flex items-center gap-2 group">
                      <a
                        href={attachment.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[13px] text-[#0891B2] hover:underline truncate flex-1"
                      >
                        {attachment.fileName}
                      </a>
                      <PermissionGuard permission={PermissionEnum.TASKS_UPDATE}>
                        <button
                          onClick={() => removeFile(attachment.id)}
                          className="text-[#A3A3A3] hover:text-[#EF4444] transition-colors opacity-0 group-hover:opacity-100"
                          aria-label="Delete attachment"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </PermissionGuard>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <hr className="border-[#E5E5E5]" />

            {/* Comments */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-[#737373]">
                <MessageSquare className="w-4 h-4" />
                <span className="text-[14px] font-medium text-[#111111]">Comments</span>
              </div>

              <div className="flex flex-col gap-4">
                {(comments ?? []).map((comment) => {
                  const commentInitials = `${comment.user?.profile?.firstName?.charAt(0) ?? ""}${comment.user?.profile?.lastName?.charAt(0) ?? ""}`.toUpperCase();
                  return (
                    <div key={comment.id} className="flex gap-3 group">
                      <Avatar className="w-8 h-8 rounded-full border border-[#E5E5E5] shrink-0">
                        <AvatarImage src={comment.user?.profile?.avatarUrl} />
                        <AvatarFallback className="bg-[#E0F2FE] text-[#0369A1] text-[12px] font-semibold">
                          {commentInitials || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col flex-1 gap-1 min-w-0">
                        <div className="flex items-baseline gap-2">
                          <span className="text-[14px] text-[#111111] font-medium">
                            {comment.user?.profile?.firstName} {comment.user?.profile?.lastName}
                          </span>
                          <span className="text-[12px] text-[#737373]">
                            {comment.createdAt ? format(new Date(comment.createdAt), "MMM d, h:mm a") : ""}
                          </span>
                          {currentUser?.id === comment.user?.id && (
                            <button
                              onClick={() => removeComment(comment.id)}
                              className="text-[#A3A3A3] hover:text-[#EF4444] transition-colors opacity-0 group-hover:opacity-100 ml-auto"
                              aria-label="Delete comment"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                        <p className="text-[14px] text-[#404040] leading-[20px] break-words">
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  );
                })}
                {(comments ?? []).length === 0 && (
                  <p className="text-[13px] text-[#737373]">No comments yet.</p>
                )}
              </div>

              {/* Add Comment */}
              <div className="flex flex-col gap-2">
                <Textarea
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="min-h-[64px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] placeholder:text-[#737373] resize-none focus-visible:ring-[#0891B2]"
                />
                <Button
                  onClick={() => submitComment()}
                  disabled={!newComment.trim() || isAddingComment}
                  className="h-[32px] px-3 self-end bg-[#0891B2] hover:bg-[#0891B2]/90 text-white text-[13px]"
                >
                  {isAddingComment ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Comment"}
                </Button>
              </div>
            </div>

          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
