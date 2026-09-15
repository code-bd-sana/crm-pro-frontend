"use client";

import { useEffect, useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Users, X } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { updateProject } from "@/services/project.service";
import { getUsers } from "@/services/user.service";
import { getErrorMessage } from "@/lib/utils";
import { Project, ProjectPriority, ProjectStatus } from "@/types/models.types";

const editProjectSchema = z.object({
  title: z.string().min(2, "Project name is required").max(255),
  description: z.string().optional(),
  status: z.nativeEnum(ProjectStatus),
  priority: z.nativeEnum(ProjectPriority),
  progress: z.string().refine((v) => !v || (!isNaN(Number(v)) && Number(v) >= 0 && Number(v) <= 100), "Progress must be 0-100"),
  budget: z.string().refine((v) => !v || (!isNaN(Number(v)) && Number(v) >= 0), "Budget must be a positive number"),
  startDate: z.string().optional(),
  dueDate: z.string().optional(),
  memberIds: z.array(z.string()),
});

type EditProjectFormValues = z.infer<typeof editProjectSchema>;

export function EditProjectForm({ project }: { project: Project }) {
  const queryClient = useQueryClient();
  const [membersOpen, setMembersOpen] = useState(false);

  const { data: users } = useQuery({
    queryKey: ["users", "options"],
    queryFn: getUsers,
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm<EditProjectFormValues>({
    resolver: zodResolver(editProjectSchema),
    defaultValues: {
      title: project.title,
      description: project.description ?? "",
      status: project.status,
      priority: project.priority,
      progress: String(project.progress ?? 0),
      budget: project.budget != null ? String(project.budget) : "",
      startDate: project.startDate ? project.startDate.slice(0, 10) : "",
      dueDate: project.dueDate ? project.dueDate.slice(0, 10) : "",
      memberIds: (project.members ?? []).map((member) => member.id),
    },
  });

  useEffect(() => {
    reset({
      title: project.title,
      description: project.description ?? "",
      status: project.status,
      priority: project.priority,
      progress: String(project.progress ?? 0),
      budget: project.budget != null ? String(project.budget) : "",
      startDate: project.startDate ? project.startDate.slice(0, 10) : "",
      dueDate: project.dueDate ? project.dueDate.slice(0, 10) : "",
      memberIds: (project.members ?? []).map((member) => member.id),
    });
  }, [project, reset]);

  const { mutate: saveProject, isPending } = useMutation({
    mutationFn: (values: EditProjectFormValues) =>
      updateProject(project.id, {
        title: values.title,
        description: values.description || undefined,
        status: values.status,
        priority: values.priority,
        progress: values.progress ? Number(values.progress) : 0,
        budget: values.budget ? Number(values.budget) : 0,
        startDate: values.startDate || undefined,
        dueDate: values.dueDate || undefined,
        memberIds: values.memberIds,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project", project.id] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project updated successfully");
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, "Failed to update project"));
    },
  });

  const memberOptions = users ?? [];
  const selectedMemberIds = useWatch({ control, name: "memberIds" }) ?? [];
  const selectedMembers = memberOptions.filter((user) => selectedMemberIds.includes(user.id));

  const toggleMember = (memberId: string, current: string[], onChange: (value: string[]) => void) => {
    onChange(
      current.includes(memberId)
        ? current.filter((id) => id !== memberId)
        : [...current, memberId]
    );
  };

  return (
    <form onSubmit={handleSubmit((values) => saveProject(values))} noValidate className="flex flex-col gap-6">
      <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-6 flex flex-col gap-4">
        <h3 className="text-[16px] font-semibold text-[#111111]">General</h3>

        <div className="flex flex-col gap-2">
          <label className="text-[#111111] font-medium text-[14px]">Project Name <span className="text-red-500">*</span></label>
          <Input
            {...register("title")}
            className="h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] focus-visible:ring-[#0891B2]"
          />
          {errors.title && <p className="text-[12px] text-red-600">{errors.title.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[#111111] font-medium text-[14px]">Description</label>
          <Textarea
            {...register("description")}
            className="min-h-[72px] resize-none border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] focus-visible:ring-[#0891B2]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-[#111111] font-medium text-[14px]">Status</label>
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  items={[
                    { value: ProjectStatus.ACTIVE, label: "Active" },
                    { value: ProjectStatus.ON_HOLD, label: "On Hold" },
                    { value: ProjectStatus.COMPLETED, label: "Completed" },
                    { value: ProjectStatus.CANCELLED, label: "Cancelled" },
                  ]}
                >
                  <SelectTrigger className="w-full h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ProjectStatus.ACTIVE}>Active</SelectItem>
                    <SelectItem value={ProjectStatus.ON_HOLD}>On Hold</SelectItem>
                    <SelectItem value={ProjectStatus.COMPLETED}>Completed</SelectItem>
                    <SelectItem value={ProjectStatus.CANCELLED}>Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[#111111] font-medium text-[14px]">Priority</label>
            <Controller
              control={control}
              name="priority"
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  items={[
                    { value: ProjectPriority.LOW, label: "Low" },
                    { value: ProjectPriority.MEDIUM, label: "Medium" },
                    { value: ProjectPriority.HIGH, label: "High" },
                    { value: ProjectPriority.URGENT, label: "Urgent" },
                  ]}
                >
                  <SelectTrigger className="w-full h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111]">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ProjectPriority.LOW}>Low</SelectItem>
                    <SelectItem value={ProjectPriority.MEDIUM}>Medium</SelectItem>
                    <SelectItem value={ProjectPriority.HIGH}>High</SelectItem>
                    <SelectItem value={ProjectPriority.URGENT}>Urgent</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[#111111] font-medium text-[14px]">Progress (%)</label>
            <Input
              type="number"
              min="0"
              max="100"
              {...register("progress")}
              className="h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] focus-visible:ring-[#0891B2]"
            />
            {errors.progress && <p className="text-[12px] text-red-600">{errors.progress.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[#111111] font-medium text-[14px]">Budget</label>
            <Input
              type="number"
              min="0"
              step="0.01"
              {...register("budget")}
              className="h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] focus-visible:ring-[#0891B2]"
            />
            {errors.budget && <p className="text-[12px] text-red-600">{errors.budget.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[#111111] font-medium text-[14px]">Start Date</label>
            <Input
              type="date"
              {...register("startDate")}
              className="h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] focus-visible:ring-[#0891B2]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[#111111] font-medium text-[14px]">Due Date</label>
            <Input
              type="date"
              {...register("dueDate")}
              className="h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] focus-visible:ring-[#0891B2]"
            />
          </div>
        </div>
      </div>

      {/* Team Members */}
      <Controller
        control={control}
        name="memberIds"
        render={({ field }) => (
          <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-6 flex flex-col gap-4">
            <h3 className="text-[16px] font-semibold text-[#111111]">Team Members</h3>
            <Popover open={membersOpen} onOpenChange={setMembersOpen}>
              <PopoverTrigger className="w-full h-[36px] border border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] rounded-[4px] px-3 flex items-center justify-between text-[14px]">
                <span className={selectedMembers.length ? "text-[#111111]" : "text-[#737373]"}>
                  {selectedMembers.length
                    ? `${selectedMembers.length} member${selectedMembers.length > 1 ? "s" : ""} selected`
                    : "Select team members"}
                </span>
                <Users className="w-4 h-4 text-[#737373]" />
              </PopoverTrigger>
              <PopoverContent className="w-[340px] p-0 border border-[#E5E5E5] rounded-[6px]" align="start">
                <div className="max-h-[240px] overflow-y-auto py-1">
                  {memberOptions.map((user) => (
                    <label key={user.id} className="flex items-center gap-3 px-4 py-2 hover:bg-[#F8FAFC] cursor-pointer">
                      <Checkbox
                        checked={field.value.includes(user.id)}
                        onCheckedChange={() => toggleMember(user.id, field.value, field.onChange)}
                        className="border-[#E5E5E5] data-checked:bg-[#0891B2] data-checked:border-[#0891B2]"
                      />
                      <span className="text-[14px] text-[#111111]">
                        {user.profile?.firstName} {user.profile?.lastName}
                      </span>
                      <span className="text-[12px] text-[#737373] ml-auto truncate">{user.email}</span>
                    </label>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            {selectedMembers.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {selectedMembers.map((member) => (
                  <span
                    key={member.id}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] bg-[#0891B2]/10 text-[#0891B2] text-[12px] font-medium"
                  >
                    {member.profile?.firstName} {member.profile?.lastName}
                    <button
                      type="button"
                      onClick={() => toggleMember(member.id, field.value, field.onChange)}
                      className="hover:text-[#0E7490]"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      />

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isPending || !isDirty}
          className="h-9 px-4 bg-[#0891B2] hover:bg-[#0891B2]/90 text-white rounded-[4px] text-[14px] font-medium"
        >
          {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Save Changes
        </Button>
      </div>
    </form>
  );
}
