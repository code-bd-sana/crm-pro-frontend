"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { createDepartment, updateDepartment } from "@/services/department.service";
import type { Department } from "@/types/models.types";

const departmentSchema = z.object({
  name: z.string().min(2, "Department name is required"),
  description: z.string().optional(),
  isActive: z.boolean(),
});

type DepartmentFormValues = z.infer<typeof departmentSchema>;

interface DepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  departmentToEdit?: Department | null;
}

export function DepartmentModal({ isOpen, onClose, departmentToEdit }: DepartmentModalProps) {
  const queryClient = useQueryClient();
  const isEditing = !!departmentToEdit;

  const form = useForm<DepartmentFormValues>({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      name: "",
      description: "",
      isActive: true,
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (isEditing && departmentToEdit) {
        form.reset({
          name: departmentToEdit.name,
          description: departmentToEdit.description || "",
          isActive: departmentToEdit.isActive !== false,
        });
      } else {
        form.reset({
          name: "",
          description: "",
          isActive: true,
        });
      }
    }
  }, [isOpen, isEditing, departmentToEdit, form]);

  const { mutate: saveDepartment, isPending } = useMutation({
    mutationFn: (values: DepartmentFormValues) => {
      if (isEditing && departmentToEdit) {
        return updateDepartment(departmentToEdit.id, values);
      }
      return createDepartment(values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      toast.success(`Department ${isEditing ? 'updated' : 'created'} successfully`);
      onClose();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || `Failed to ${isEditing ? 'update' : 'create'} department`);
    },
  });

  const onSubmit = (values: DepartmentFormValues) => {
    saveDepartment(values);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[500px] p-0 overflow-hidden bg-[#FAFAFA] border-[#E5E5E5] shadow-md rounded-[6px]">
        <div className="px-6 pt-6 pb-4 border-b border-[#E5E5E5]">
          <DialogHeader>
            <DialogTitle className="text-[#111111] font-semibold text-[18px]">
              {isEditing ? "Edit Department" : "Create New Department"}
            </DialogTitle>
          </DialogHeader>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 max-h-[75vh] overflow-y-auto px-6 py-6">
            
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[14px] font-medium text-[#111111]">Department Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Human Resources" className="bg-[#FFFFFF] border-[#E5E5E5] h-[36px]" {...field} />
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
                    <Textarea 
                      placeholder="Brief description of this department" 
                      className="bg-[#FFFFFF] border-[#E5E5E5] resize-none" 
                      rows={3}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border border-[#E5E5E5] bg-white p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-[14px] font-medium text-[#111111]">Active Status</FormLabel>
                    <p className="text-[13px] text-[#737373]">
                      Activate or deactivate this department
                    </p>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Footer */}
            <div className="mt-2 -mx-6 -mb-6 px-6 py-4 bg-[#FAFAFA] flex justify-end gap-2 border-t border-[#E5E5E5]">
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
                {isEditing ? "Update Department" : "Create Department"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
