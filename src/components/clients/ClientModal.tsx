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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { createClient, updateClient } from "@/services/client.service";
import { ClientStatus } from "@/types/models.types";
import type { Client } from "@/types/models.types";

const clientSchema = z.object({
  companyName: z.string().min(2, "Company name is required").max(255),
  email: z.string().email("Invalid email address"),
  contactPerson: z.string().max(150).optional(),
  phone: z.string().max(50).optional(),
  website: z.string().max(255).optional(),
  industry: z.string().max(100).optional(),
  address: z.string().optional(),
  status: z.nativeEnum(ClientStatus),
  notes: z.string().optional(),
});

type ClientFormValues = z.infer<typeof clientSchema>;

interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientToEdit?: Client | null;
}

export function ClientModal({ isOpen, onClose, clientToEdit }: ClientModalProps) {
  const queryClient = useQueryClient();
  const isEditing = !!clientToEdit;

  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      companyName: "",
      email: "",
      contactPerson: "",
      phone: "",
      website: "",
      industry: "",
      address: "",
      status: ClientStatus.LEAD,
      notes: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (isEditing && clientToEdit) {
        form.reset({
          companyName: clientToEdit.companyName,
          email: clientToEdit.email,
          contactPerson: clientToEdit.contactPerson || "",
          phone: clientToEdit.phone || "",
          website: clientToEdit.website || "",
          industry: clientToEdit.industry || "",
          address: clientToEdit.address || "",
          status: clientToEdit.status,
          notes: clientToEdit.notes || "",
        });
      } else {
        form.reset({
          companyName: "",
          email: "",
          contactPerson: "",
          phone: "",
          website: "",
          industry: "",
          address: "",
          status: ClientStatus.LEAD,
          notes: "",
        });
      }
    }
  }, [isOpen, isEditing, clientToEdit, form]);

  const { mutate: saveClient, isPending } = useMutation({
    mutationFn: (values: ClientFormValues) => {
      if (isEditing && clientToEdit) {
        return updateClient(clientToEdit.id, values);
      }
      return createClient(values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      toast.success(`Client ${isEditing ? 'updated' : 'created'} successfully`);
      onClose();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || `Failed to ${isEditing ? 'update' : 'create'} client`);
    },
  });

  const onSubmit = (values: ClientFormValues) => {
    saveClient(values);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[850px] max-w-[95vw] p-0 overflow-hidden bg-[#FAFAFA] border-[#E5E5E5] shadow-md rounded-[6px]">
        <div className="px-6 pt-6 pb-4 border-b border-[#E5E5E5]">
          <DialogHeader>
            <DialogTitle className="text-[#111111] font-semibold text-[18px]">
              {isEditing ? "Edit Client Profile" : "Create New Client"}
            </DialogTitle>
          </DialogHeader>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 max-h-[75vh] overflow-y-auto px-6 py-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14px] font-medium text-[#111111]">Company Name <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Acme Corp" className="bg-[#FFFFFF] border-[#E5E5E5] h-[36px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14px] font-medium text-[#111111]">Industry</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Technology" className="bg-[#FFFFFF] border-[#E5E5E5] h-[36px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="contactPerson"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14px] font-medium text-[#111111]">Contact Person</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., John Doe" className="bg-[#FFFFFF] border-[#E5E5E5] h-[36px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14px] font-medium text-[#111111]">Email Address <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@example.com" className="bg-[#FFFFFF] border-[#E5E5E5] h-[36px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14px] font-medium text-[#111111]">Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 234 567 890" className="bg-[#FFFFFF] border-[#E5E5E5] h-[36px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14px] font-medium text-[#111111]">Website</FormLabel>
                    <FormControl>
                      <Input placeholder="https://acme.com" className="bg-[#FFFFFF] border-[#E5E5E5] h-[36px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14px] font-medium text-[#111111]">Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-[#FFFFFF] border-[#E5E5E5] h-[36px]">
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={ClientStatus.LEAD}>Lead</SelectItem>
                        <SelectItem value={ClientStatus.ACTIVE}>Active</SelectItem>
                        <SelectItem value={ClientStatus.INACTIVE}>Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[14px] font-medium text-[#111111]">Address</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Full business address"
                      className="bg-[#FFFFFF] border-[#E5E5E5] resize-none"
                      rows={2}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[14px] font-medium text-[#111111]">Internal Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any additional information about this client"
                      className="bg-[#FFFFFF] border-[#E5E5E5] resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
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
                {isEditing ? "Update Client" : "Create Client"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
