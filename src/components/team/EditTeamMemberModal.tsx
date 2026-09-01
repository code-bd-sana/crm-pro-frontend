"use client";

import React, { useEffect } from "react";
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
import { updateUser } from "@/services/user.service";

const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  departmentId: z.string().min(1, "Department is required"),
  roleId: z.string().min(1, "Role is required"),
});

type FormValues = z.infer<typeof formSchema>;

interface EditTeamMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: any;
}

export function EditTeamMemberModal({ isOpen, onClose, member }: EditTeamMemberModalProps) {
  const queryClient = useQueryClient();

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
    },
  });

  useEffect(() => {
    if (isOpen && member) {
      form.reset({
        firstName: member.profile?.firstName || "",
        lastName: member.profile?.lastName || "",
        email: member.email || "",
        phone: member.phone || "",
        departmentId: member.departmentId || "",
        roleId: member.roles?.[0]?.id || "",
      });
    }
  }, [isOpen, member, form]);

  const { mutate: editMember, isPending } = useMutation({
    mutationFn: (values: FormValues) => {
      const payload = {
        ...values,
        roleIds: [values.roleId], // Wrap single role in array for backend
      };
      return updateUser(member.id, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Team member updated successfully");
      onClose();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update team member");
    },
  });

  const onSubmit = (values: FormValues) => {
    editMember(values);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[526px] sm:max-w-[526px] p-0 overflow-hidden bg-[#FAFAFA] border-[#E5E5E5] shadow-md rounded-[6px]">
        <div className="px-6 pt-6 pb-4">
          <DialogHeader>
            <DialogTitle className="text-[#111111] font-semibold text-[18px]">
              Edit Team Member
            </DialogTitle>
          </DialogHeader>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto px-6 pb-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14px] font-medium text-[#111111]">First Name</FormLabel>
                    <FormControl>
                      <Input className="bg-[#FFFFFF] border-[#E5E5E5] h-[36px]" {...field} />
                    </FormControl>
                    <FormMessage />
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
                      <Input className="bg-[#FFFFFF] border-[#E5E5E5] h-[36px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[14px] font-medium text-[#111111]">Email</FormLabel>
                  <FormControl>
                    <Input type="email" disabled className="bg-[#F5F5F5] border-[#E5E5E5] text-[#737373] h-[36px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14px] font-medium text-[#111111]">Phone</FormLabel>
                    <FormControl>
                      <Input type="tel" className="bg-[#FFFFFF] border-[#E5E5E5] h-[36px]" {...field} />
                    </FormControl>
                    <FormMessage />
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
                          <SelectValue placeholder={isLoadingDepts ? "Loading..." : "Select department"}>
                            {field.value ? departments.find(d => d.id === field.value)?.name : null}
                          </SelectValue>
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="roleId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[14px] font-medium text-[#111111]">Role</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full bg-[#FFFFFF] border-[#E5E5E5] h-[36px]">
                        <SelectValue placeholder={isLoadingRoles ? "Loading..." : "Select role"}>
                          {field.value ? roles.find(r => r.id === field.value)?.name : null}
                        </SelectValue>
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
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-4 -mx-6 -mb-4 px-6 py-4 bg-[#FAFAFA] flex justify-end gap-2 border-t border-[#E5E5E5]">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
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
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
