"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { createTask } from "@/services/task.service";
import { getProjects } from "@/services/project.service";
import { getUsers } from "@/services/user.service";
import { getErrorMessage } from "@/lib/utils";
import { TaskPriority, TaskStatus } from "@/types/models.types";

const taskSchema = z.object({
  title: z.string().min(2, "Task name is required").max(255),
  description: z.string().optional(),
  projectId: z.string().uuid("Select a project"),
  assigneeId: z.string().optional(),
  priority: z.nativeEnum(TaskPriority),
  status: z.nativeEnum(TaskStatus),
  dueDate: z.string().optional(),
  tags: z.string().optional(),
});

type TaskFormValues = z.infer<typeof taskSchema>;

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProjectId?: string;
}

export function AddTaskModal({ isOpen, onClose, defaultProjectId }: AddTaskModalProps) {
  const queryClient = useQueryClient();

  const { data: projectsData } = useQuery({
    queryKey: ["projects", "options"],
    queryFn: () => getProjects({ page: 1, limit: 100 }),
    enabled: isOpen,
  });

  const { data: users } = useQuery({
    queryKey: ["users", "options"],
    queryFn: getUsers,
    enabled: isOpen,
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      projectId: defaultProjectId ?? "",
      assigneeId: "",
      priority: TaskPriority.MEDIUM,
      status: TaskStatus.TODO,
      dueDate: "",
      tags: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        title: "",
        description: "",
        projectId: defaultProjectId ?? "",
        assigneeId: "",
        priority: TaskPriority.MEDIUM,
        status: TaskStatus.TODO,
        dueDate: "",
        tags: "",
      });
    }
  }, [isOpen, defaultProjectId, reset]);

  const { mutate: submitTask, isPending } = useMutation({
    mutationFn: (values: TaskFormValues) =>
      createTask({
        title: values.title,
        description: values.description || undefined,
        projectId: values.projectId,
        assigneeId: values.assigneeId || undefined,
        priority: values.priority,
        status: values.status,
        dueDate: values.dueDate || undefined,
        tags: values.tags
          ? values.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
          : undefined,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task created successfully");
      onClose();
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, "Failed to create task"));
    },
  });

  const projects = projectsData?.data ?? [];
  const memberOptions = users ?? [];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent showCloseButton={false} className="sm:max-w-[576px] p-0 border-[#E5E5E5] gap-0 !bg-[#FFFFFF] rounded-[6px] shadow-lg">

        {/* Header */}
        <DialogHeader className="px-[25px] pt-[25px] pb-4">
          <DialogTitle className="text-[#111111] font-semibold text-[18px] leading-[18px]">
            Create New Task
          </DialogTitle>
          <DialogClose className="absolute right-[25px] top-[25px] text-[#A3A3A3] hover:text-[#111111] transition-colors">
            <X className="w-4 h-4" />
          </DialogClose>
        </DialogHeader>

        {/* Form Body */}
        <form onSubmit={handleSubmit((values) => submitTask(values))} noValidate>
          <div className="px-[25px] py-4 flex flex-col gap-4 overflow-y-auto max-h-[70vh]">

            <div className="flex flex-col gap-2">
              <label className="text-[#111111] font-medium text-[14px] leading-[14px]">Task Name <span className="text-red-500">*</span></label>
              <Input
                placeholder="Design homepage mockups"
                {...register("title")}
                className="h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] focus-visible:ring-[#0891B2]"
              />
              {errors.title && <p className="text-[12px] text-red-600">{errors.title.message}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[#111111] font-medium text-[14px] leading-[14px]">Description</label>
              <Textarea
                placeholder="Describe what needs to be done..."
                {...register("description")}
                className="min-h-[64px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] placeholder:text-[#737373] resize-none focus-visible:ring-[#0891B2]"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-[#111111] font-medium text-[14px] leading-[14px]">Project <span className="text-red-500">*</span></label>
                <Controller
                  control={control}
                  name="projectId"
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      items={projects.map((project) => ({ value: project.id, label: project.title }))}
                    >
                      <SelectTrigger className="w-full h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] [&>span]:text-[#737373] data-[state=open]:ring-[#0891B2]">
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                      <SelectContent>
                        {projects.map((project) => (
                          <SelectItem key={project.id} value={project.id}>
                            {project.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.projectId && <p className="text-[12px] text-red-600">{errors.projectId.message}</p>}
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-[#111111] font-medium text-[14px] leading-[14px]">Assign To</label>
                <Controller
                  control={control}
                  name="assigneeId"
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      items={memberOptions.map((user) => ({
                        value: user.id,
                        label: `${user.profile?.firstName ?? ""} ${user.profile?.lastName ?? ""}`.trim(),
                      }))}
                    >
                      <SelectTrigger className="w-full h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] [&>span]:text-[#737373] data-[state=open]:ring-[#0891B2]">
                        <SelectValue placeholder="Unassigned" />
                      </SelectTrigger>
                      <SelectContent>
                        {memberOptions.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.profile?.firstName} {user.profile?.lastName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-[#111111] font-medium text-[14px] leading-[14px]">Priority</label>
                <Controller
                  control={control}
                  name="priority"
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      items={[
                        { value: TaskPriority.LOW, label: "Low" },
                        { value: TaskPriority.MEDIUM, label: "Medium" },
                        { value: TaskPriority.HIGH, label: "High" },
                        { value: TaskPriority.CRITICAL, label: "Critical" },
                      ]}
                    >
                      <SelectTrigger className="w-full h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] data-[state=open]:ring-[#0891B2]">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={TaskPriority.LOW}>Low</SelectItem>
                        <SelectItem value={TaskPriority.MEDIUM}>Medium</SelectItem>
                        <SelectItem value={TaskPriority.HIGH}>High</SelectItem>
                        <SelectItem value={TaskPriority.CRITICAL}>Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-[#111111] font-medium text-[14px] leading-[14px]">Status</label>
                <Controller
                  control={control}
                  name="status"
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      items={[
                        { value: TaskStatus.TODO, label: "To Do" },
                        { value: TaskStatus.IN_PROGRESS, label: "In Progress" },
                        { value: TaskStatus.DONE, label: "Done" },
                      ]}
                    >
                      <SelectTrigger className="w-full h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] data-[state=open]:ring-[#0891B2]">
                        <SelectValue placeholder="To Do" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={TaskStatus.TODO}>To Do</SelectItem>
                        <SelectItem value={TaskStatus.IN_PROGRESS}>In Progress</SelectItem>
                        <SelectItem value={TaskStatus.DONE}>Done</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[#111111] font-medium text-[14px] leading-[14px]">Due Date</label>
              <Input
                type="date"
                {...register("dueDate")}
                className="h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] focus-visible:ring-[#0891B2]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[#111111] font-medium text-[14px] leading-[14px]">Tags (Optional)</label>
              <Input
                placeholder="design, frontend, urgent"
                {...register("tags")}
                className="h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] placeholder:text-[#737373] focus-visible:ring-[#0891B2]"
              />
              <p className="text-[12px] text-[#737373] leading-[12px]">Separate tags with commas</p>
            </div>

          </div>

          {/* Footer */}
          <div className="px-[25px] py-4 flex items-center justify-end gap-2 border-t border-[#E5E5E5] mt-2">
            <DialogClose className="inline-flex items-center justify-center h-[36px] px-4 bg-[#FAFAFA] border border-[#E5E5E5] hover:bg-gray-50 rounded-[4px] text-[#111111] font-medium text-[14px] transition-colors">
              Cancel
            </DialogClose>
            <Button
              type="submit"
              disabled={isPending}
              className="h-[36px] px-4 bg-[#0891B2] hover:bg-[#0891B2]/90 rounded-[4px] text-white font-medium text-[14px] transition-colors"
            >
              {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Create Task
            </Button>
          </div>
        </form>

      </DialogContent>
    </Dialog>
  );
}
