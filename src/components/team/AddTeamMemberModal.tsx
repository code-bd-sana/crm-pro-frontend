"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { getRoles } from "@/services/role.service";
import { getDepartments } from "@/services/department.service";
import { createUser } from "@/services/user.service";

const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  departmentId: z.string().min(1, "Department is required"),
  roleId: z.string().min(1, "Role is required"),
  startDate: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface AddTeamMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddTeamMemberModal({ isOpen, onClose }: AddTeamMemberModalProps) {
  const queryClient = useQueryClient();

  // Fetch Roles and Departments
  const { data: roles = [], isLoading: isLoadingRoles } = useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,
    enabled: isOpen,
  });

  const { data: departments = [], isLoading: isLoadingDepts } = useQuery({
    queryKey: ["departments"],
    queryFn: getDepartments,
    enabled: isOpen,
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      departmentId: "",
      roleId: "",
      startDate: "",
    },
  });

  const { mutate: addMember, isPending } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Team member added successfully");
      form.reset();
      onClose();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to add team member");
    },
  });

  const onSubmit = (values: FormValues) => {
    // Wrap roleId into roleIds array as expected by CreateUserDto
    const payload = {
      ...values,
      roleIds: [values.roleId],
    };
    // Zod's roleId is stripped and payload expects roleIds
    addMember(payload);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      form.reset();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[526px] sm:max-w-[526px] p-0 overflow-hidden bg-[#FAFAFA] border-[#E5E5E5] shadow-md rounded-[6px]">
        <div className="px-6 pt-6 pb-4">
          <DialogHeader>
            <DialogTitle className="text-[#111111] font-semibold text-[18px]">
              Add Team Member
            </DialogTitle>
          </DialogHeader>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto px-6 pb-4">
            {/* Row 1: First Name & Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14px] font-medium text-[#111111]">First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" className="bg-[#FFFFFF] border-[#E5E5E5] text-[#111111] h-[36px]" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14px] font-medium text-[#111111]">Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" className="bg-[#FFFFFF] border-[#E5E5E5] text-[#111111] h-[36px]" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            {/* Row 2: Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[14px] font-medium text-[#111111]">Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john.doe@example.com" className="bg-[#FFFFFF] border-[#E5E5E5] text-[#111111] h-[36px]" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Row 3: Phone & Department */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14px] font-medium text-[#111111]">Phone</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="+1 (555) 000-0000" className="bg-[#FFFFFF] border-[#E5E5E5] text-[#111111] h-[36px]" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="departmentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14px] font-medium text-[#111111]">Department</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full bg-[#FFFFFF] border-[#E5E5E5] h-[36px]">
                          <SelectValue placeholder={isLoadingDepts ? "Loading..." : "Select department"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept.id} value={dept.id}>
                            {dept.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            {/* Row 4: Role & Start Date */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="roleId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14px] font-medium text-[#111111]">Role</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full bg-[#FFFFFF] border-[#E5E5E5] h-[36px]">
                          <SelectValue placeholder={isLoadingRoles ? "Loading..." : "Select role"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role.id} value={role.id}>
                            {role.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14px] font-medium text-[#111111]">Start Date</FormLabel>
                    <FormControl>
                      <Input type="date" className="bg-[#FFFFFF] border-[#E5E5E5] text-[#111111] h-[36px] block [color-scheme:light]" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            {/* Footer */}
            <div className="mt-4 -mx-6 -mb-4 px-6 py-4 bg-[#FAFAFA] flex justify-end gap-2 border-t border-[#E5E5E5]">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
                className="bg-[#FAFAFA] hover:bg-[#F5F5F5] border-[#E5E5E5] text-[#111111] rounded-[4px] h-[36px]"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="bg-[#0891B2] hover:bg-[#0E7490] text-white rounded-[4px] h-[36px] px-4 font-medium transition-colors"
              >
                {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Add Member
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
