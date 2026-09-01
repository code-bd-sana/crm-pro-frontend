"use client";

import React, { useEffect, useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { createRole, updateRole } from "@/services/role.service";
import { api } from "@/lib/axios";
import type { Role } from "@/types/auth.types";
import type { Permission } from "@/types/auth.types";

const roleSchema = z.object({
  name: z.string().min(2, "Role name is required"),
  description: z.string().optional(),
  permissionIds: z.array(z.string()).min(1, "At least one permission is required"),
});

type RoleFormValues = z.infer<typeof roleSchema>;

interface RoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  roleToEdit?: any; // If null, it's create mode
}

export function RoleModal({ isOpen, onClose, roleToEdit }: RoleModalProps) {
  const queryClient = useQueryClient();
  const isEditing = !!roleToEdit;

  // Fetch all available permissions to build the checklist
  const { data: allPermissions = [], isLoading: isLoadingPerms } = useQuery({
    queryKey: ["permissions"],
    queryFn: () => api.get('/permissions').then(res => res.data.data as Permission[]),
    enabled: isOpen,
    retry: false, // Don't retry if endpoint doesn't exist yet
  });

  const form = useForm<RoleFormValues>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: "",
      description: "",
      permissionIds: [],
    },
  });

  // Reset form when modal opens/closes or roleToEdit changes
  useEffect(() => {
    if (isOpen) {
      if (isEditing && roleToEdit) {
        form.reset({
          name: roleToEdit.name,
          description: roleToEdit.description || "",
          permissionIds: roleToEdit.permissions?.map((p: Permission) => p.id) || [],
        });
      } else {
        form.reset({
          name: "",
          description: "",
          permissionIds: [],
        });
      }
    }
  }, [isOpen, isEditing, roleToEdit, form]);

  const { mutate: saveRole, isPending } = useMutation({
    mutationFn: (values: RoleFormValues) => {
      if (isEditing) {
        return updateRole(roleToEdit.id, values);
      }
      return createRole(values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      toast.success(`Role ${isEditing ? 'updated' : 'created'} successfully`);
      onClose();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || `Failed to ${isEditing ? 'update' : 'create'} role`);
    },
  });

  const onSubmit = (values: RoleFormValues) => {
    saveRole(values);
  };

  // Group permissions by module for cleaner UI
  const groupedPermissions = allPermissions.reduce((acc, perm) => {
    if (!acc[perm.module]) {
      acc[perm.module] = [];
    }
    acc[perm.module].push(perm);
    return acc;
  }, {} as Record<string, Permission[]>);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[700px] sm:max-w-[700px] p-0 overflow-hidden bg-[#FAFAFA] border-[#E5E5E5] shadow-md rounded-[6px]">
        <div className="px-6 pt-6 pb-4 border-b border-[#E5E5E5]">
          <DialogHeader>
            <DialogTitle className="text-[#111111] font-semibold text-[18px]">
              {isEditing ? "Edit Role" : "Create New Role"}
            </DialogTitle>
          </DialogHeader>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 max-h-[75vh] overflow-y-auto px-6 py-6">

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14px] font-medium text-[#111111]">Role Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., HR Manager"
                        className="bg-[#FFFFFF] border-[#E5E5E5] h-[36px]"
                        disabled={isEditing && roleToEdit?.isSystem}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14px] font-medium text-[#111111]">Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Brief description of this role" className="bg-[#FFFFFF] border-[#E5E5E5] h-[36px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <h3 className="text-[16px] font-semibold text-[#111111] mb-4">Permissions</h3>

              {isLoadingPerms ? (
                <div className="flex items-center justify-center p-8">
                  <Loader2 className="w-6 h-6 animate-spin text-[#0891B2]" />
                </div>
              ) : allPermissions.length === 0 ? (
                <div className="p-4 bg-yellow-50 text-yellow-800 rounded-md text-sm border border-yellow-200">
                  Could not fetch permissions from the server. Please ensure the GET /permissions API exists.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  {Object.entries(groupedPermissions).map(([module, perms]) => (
                    <div key={module} className="bg-white p-4 border border-[#E5E5E5] rounded-[8px]">
                      <h4 className="text-[14px] font-bold text-[#111111] capitalize mb-3 border-b border-[#E5E5E5] pb-2">
                        {module}
                      </h4>
                      <div className="flex flex-col gap-3">
                        {perms.map((perm) => (
                          <FormField
                            key={perm.id}
                            control={form.control}
                            name="permissionIds"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={perm.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(perm.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, perm.id])
                                          : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== perm.id
                                            )
                                          )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-[13px] font-medium text-[#525252] cursor-pointer">
                                    {perm.description || perm.slug}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {form.formState.errors.permissionIds && (
                <p className="text-sm font-medium text-red-500 mt-2">
                  {form.formState.errors.permissionIds.message}
                </p>
              )}
            </div>

            {/* Footer */}
            <div className="mt-4 -mx-6 -mb-6 px-6 py-4 bg-[#FAFAFA] flex justify-end gap-2 border-t border-[#E5E5E5]">
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
                disabled={isPending || isLoadingPerms}
                className="bg-[#0891B2] hover:bg-[#0E7490] text-white rounded-[4px] h-[36px] px-4 font-medium transition-colors"
              >
                {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {isEditing ? "Update Role" : "Create Role"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
