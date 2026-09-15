"use client";

import React, { useState } from "react";
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
import { Loader2, Copy, Check, Mail, ShieldCheck } from "lucide-react";
import { getRoles } from "@/services/role.service";
import { getDepartments } from "@/services/department.service";
import { createUser } from "@/services/user.service";
import { getErrorMessage } from "@/lib/utils";

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
  const [successState, setSuccessState] = useState<{
    name: string;
    email: string;
    temporaryPassword: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

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
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      if (result.temporaryPassword) {
        setSuccessState({
          name: `${result.user.profile?.firstName ?? ""} ${result.user.profile?.lastName ?? ""}`.trim(),
          email: result.user.email,
          temporaryPassword: result.temporaryPassword,
        });
      } else {
        toast.success("Team member added successfully");
        handleClose();
      }
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, "Failed to add team member"));
    },
  });

  const onSubmit = (values: FormValues) => {
    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone || undefined,
      departmentId: values.departmentId,
      startDate: values.startDate || undefined,
      roleIds: [values.roleId],
    };
    addMember(payload);
  };

  const handleClose = () => {
    setSuccessState(null);
    form.reset();
    onClose();
  };

  const handleCopyPassword = () => {
    if (!successState) return;
    navigator.clipboard.writeText(successState.temporaryPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) handleClose(); }}>
      <DialogContent className="max-w-[526px] sm:max-w-[526px] p-0 overflow-hidden bg-[#FAFAFA] border-[#E5E5E5] shadow-md rounded-[6px]">
        {successState ? (
          /* ─── Success State ─── */
          <div className="flex flex-col items-center text-center px-6 pt-8 pb-6">
            <div className="w-14 h-14 rounded-full bg-[#DCFCE7] flex items-center justify-center mb-4">
              <ShieldCheck className="w-7 h-7 text-[#16A34A]" />
            </div>

            <DialogHeader>
              <DialogTitle className="text-[#111111] font-semibold text-[18px]">
                Team Member Added
              </DialogTitle>
            </DialogHeader>

            <p className="text-[14px] text-[#737373] mt-2 max-w-[380px]">
              An account has been created for <strong className="text-[#111111]">{successState.name}</strong>.
              A temporary password has been emailed to <strong className="text-[#111111]">{successState.email}</strong>.
            </p>

            {/* Temporary Password Box */}
            <div className="w-full mt-6 bg-[#F5F5F5] border border-[#E5E5E5] rounded-[8px] p-4">
              <p className="text-[12px] text-[#737373] font-medium uppercase tracking-wide mb-2">
                Temporary Password
              </p>
              <div className="flex items-center justify-between gap-3">
                <code className="text-[22px] font-bold text-[#111111] tracking-[3px] font-mono">
                  {successState.temporaryPassword}
                </code>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleCopyPassword}
                  className="border-[#E5E5E5] bg-white text-[#111111] hover:bg-[#F5F5F5] h-8 px-3"
                >
                  {copied ? (
                    <Check className="w-4 h-4 mr-1 text-[#16A34A]" />
                  ) : (
                    <Copy className="w-4 h-4 mr-1" />
                  )}
                  {copied ? "Copied" : "Copy"}
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-2 mt-4 text-left w-full bg-[#DBEAFE]/40 border border-[#BFDBFE] rounded-[6px] p-3">
              <Mail className="w-4 h-4 text-[#0891B2] mt-0.5 shrink-0" />
              <p className="text-[13px] text-[#1E40AF]">
                The temporary password has also been sent to the user&apos;s email address.
                Please ask them to change their password after the first login.
              </p>
            </div>

            <Button
              onClick={handleClose}
              className="mt-6 bg-[#0891B2] hover:bg-[#0E7490] text-white rounded-[4px] h-[40px] px-8 font-medium"
            >
              Done
            </Button>
          </div>
        ) : (
          /* ─── Form State ─── */
          <>
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
                              <SelectValue placeholder={isLoadingDepts ? "Loading..." : "Select department"}>
                                {field.value ? departments.find(d => d.id === field.value)?.name : null}
                              </SelectValue>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {departments.filter(d => d.isActive !== false || d.id === field.value).map((dept) => (
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
                    onClick={() => handleClose()}
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
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
