"use client";

import { useEffect, useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { X, Loader2, Users } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import { createProject } from "@/services/project.service";
import { getClients } from "@/services/client.service";
import { getUsers } from "@/services/user.service";
import { getErrorMessage } from "@/lib/utils";
import { ProjectPriority, ProjectStatus } from "@/types/models.types";

const projectSchema = z.object({
  title: z.string().min(2, "Project name is required").max(255),
  clientId: z.string().uuid("Select a client"),
  status: z.nativeEnum(ProjectStatus),
  priority: z.nativeEnum(ProjectPriority),
  dueDate: z.string().optional(),
  description: z.string().optional(),
  budget: z.string().optional().refine((v) => !v || (!isNaN(Number(v)) && Number(v) >= 0), "Budget must be a positive number"),
  memberIds: z.array(z.string()),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

interface NewProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewProjectDialog({ open, onOpenChange }: NewProjectDialogProps) {
  const queryClient = useQueryClient();
  const [membersOpen, setMembersOpen] = useState(false);

  const { data: clientsData } = useQuery({
    queryKey: ["clients", "options"],
    queryFn: () => getClients({ page: 1, limit: 100 }),
    enabled: open,
  });

  const { data: users } = useQuery({
    queryKey: ["users", "options"],
    queryFn: getUsers,
    enabled: open,
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      clientId: "",
      status: ProjectStatus.ACTIVE,
      priority: ProjectPriority.MEDIUM,
      dueDate: "",
      description: "",
      budget: "",
      memberIds: [],
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        title: "",
        clientId: "",
        status: ProjectStatus.ACTIVE,
        priority: ProjectPriority.MEDIUM,
        dueDate: "",
        description: "",
        budget: "",
        memberIds: [],
      });
    }
  }, [open, reset]);

  const { mutate: submitProject, isPending } = useMutation({
    mutationFn: (values: ProjectFormValues) =>
      createProject({
        ...values,
        dueDate: values.dueDate || undefined,
        description: values.description || undefined,
        budget: values.budget ? Number(values.budget) : undefined,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project created successfully");
      onOpenChange(false);
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, "Failed to create project"));
    },
  });

  const clients = clientsData?.data ?? [];
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="sm:max-w-[576px] p-0 border-[#E5E5E5] gap-0 !bg-[#FFFFFF] rounded-[6px] shadow-lg">
        {/* Header */}
        <DialogHeader className="px-[25px] pt-[25px] pb-4">
          <DialogTitle className="text-[#111111] font-semibold text-[18px] leading-[18px]">
            Create New Project
          </DialogTitle>
          <DialogClose className="absolute right-[25px] top-[25px] text-[#A3A3A3] hover:text-[#111111] transition-colors">
            <X className="w-4 h-4" />
          </DialogClose>
        </DialogHeader>

        {/* Form Content */}
        <form onSubmit={handleSubmit((values) => submitProject(values))} noValidate>
          <div className="px-[25px] py-4 flex flex-col gap-4 overflow-y-auto max-h-[70vh]">

            {/* Project Name */}
            <div className="flex flex-col gap-2">
              <label className="text-[#111111] font-medium text-[14px] leading-[14px]">Project Name <span className="text-red-500">*</span></label>
              <Input
                placeholder="Website Redesign"
                {...register("title")}
                className="h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] placeholder:text-[#737373] focus-visible:ring-[#0891B2]"
              />
              {errors.title && <p className="text-[12px] text-red-600">{errors.title.message}</p>}
            </div>

            {/* Client & Status */}
            <div className="flex gap-4">
              <div className="flex-1 flex flex-col gap-2">
                <label className="text-[#111111] font-medium text-[14px] leading-[14px]">Client <span className="text-red-500">*</span></label>
                <Controller
                  control={control}
                  name="clientId"
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      items={clients.map((client) => ({ value: client.id, label: client.companyName }))}
                    >
                      <SelectTrigger className="w-full h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] [&>span]:text-[#737373] data-[state=open]:ring-[#0891B2]">
                        <SelectValue placeholder="Select client" />
                      </SelectTrigger>
                      <SelectContent>
                        {clients.map((client) => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.companyName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.clientId && <p className="text-[12px] text-red-600">{errors.clientId.message}</p>}
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <label className="text-[#111111] font-medium text-[14px] leading-[14px]">Status</label>
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
                      <SelectTrigger className="w-full h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] data-[state=open]:ring-[#0891B2]">
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
            </div>

            {/* Priority & Deadline */}
            <div className="flex gap-4">
              <div className="flex-1 flex flex-col gap-2">
                <label className="text-[#111111] font-medium text-[14px] leading-[14px]">Priority</label>
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
                      <SelectTrigger className="w-full h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] data-[state=open]:ring-[#0891B2]">
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
              <div className="flex-1 flex flex-col gap-2">
                <label className="text-[#111111] font-medium text-[14px] leading-[14px]">Deadline</label>
                <Input
                  type="date"
                  {...register("dueDate")}
                  className="h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] focus-visible:ring-[#0891B2]"
                />
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <label className="text-[#111111] font-medium text-[14px] leading-[14px]">Description</label>
              <Textarea
                placeholder="Describe the project goals and scope..."
                {...register("description")}
                className="min-h-[64px] resize-none border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] placeholder:text-[#737373] focus-visible:ring-[#0891B2]"
              />
            </div>

            {/* Assign Team Members */}
            <Controller
              control={control}
              name="memberIds"
              render={({ field }) => (
                <div className="flex flex-col gap-2">
                  <label className="text-[#111111] font-medium text-[14px] leading-[14px]">Assign Team Members</label>
                  <Popover open={membersOpen} onOpenChange={setMembersOpen}>
                    <PopoverTrigger className="w-full h-[36px] border border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] rounded-[4px] px-3 flex items-center justify-between text-[14px] data-[state=open]:ring-[#0891B2]">
                      <span className={selectedMembers.length ? "text-[#111111]" : "text-[#737373]"}>
                        {selectedMembers.length
                          ? `${selectedMembers.length} member${selectedMembers.length > 1 ? "s" : ""} selected`
                          : "Select team members"}
                      </span>
                      <Users className="w-4 h-4 text-[#737373]" />
                    </PopoverTrigger>
                    <PopoverContent className="w-[320px] p-0 border border-[#E5E5E5] rounded-[6px]" align="start">
                      <div className="max-h-[240px] overflow-y-auto py-1">
                        {memberOptions.map((user) => (
                          <label
                            key={user.id}
                            className="flex items-center gap-3 px-4 py-2 hover:bg-[#F8FAFC] cursor-pointer"
                          >
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

            {/* Budget */}
            <div className="flex flex-col gap-2">
              <label className="text-[#111111] font-medium text-[14px] leading-[14px]">Budget (Optional)</label>
              <Input
                placeholder="25000"
                type="number"
                step="0.01"
                min="0"
                {...register("budget")}
                className="h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] placeholder:text-[#737373] focus-visible:ring-[#0891B2]"
              />
              {errors.budget && <p className="text-[12px] text-red-600">{errors.budget.message}</p>}
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
              Create Project
            </Button>
          </div>
        </form>

      </DialogContent>
    </Dialog>
  );
}
