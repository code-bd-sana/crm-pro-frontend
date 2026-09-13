import { X, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createClient } from "@/services/client.service";
import { ClientStatus } from "@/types/models.types";

const formSchema = z.object({
  companyName: z.string().min(1, "Company Name is required"),
  industry: z.string().optional(),
  contactPerson: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  website: z.string().optional(),
  status: z.nativeEnum(ClientStatus).default(ClientStatus.LEAD),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddClientModal({ isOpen, onClose }: AddClientModalProps) {
  const queryClient = useQueryClient();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      industry: "",
      contactPerson: "",
      email: "",
      phone: "",
      website: "",
      status: ClientStatus.LEAD,
      notes: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: createClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast.success("Client added successfully");
      form.reset();
      onClose();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to add client");
    },
  });

  const onSubmit = (values: FormValues) => {
    createMutation.mutate(values);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      form.reset();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent showCloseButton={false} className="sm:max-w-[576px] p-0 border-[#E5E5E5] gap-0 !bg-[#FFFFFF] rounded-[6px] shadow-lg">
        {/* Header */}
        <DialogHeader className="px-[25px] pt-[25px] pb-4">
          <DialogTitle className="text-[#111111] font-semibold text-[18px] leading-[18px]">
            Add New Client
          </DialogTitle>
          <DialogClose className="absolute right-[25px] top-[25px] text-[#A3A3A3] hover:text-[#111111] transition-colors">
            <X className="w-4 h-4" />
          </DialogClose>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
            {/* Form Body */}
            <div className="px-[25px] py-4 flex flex-col gap-4 overflow-y-auto max-h-[70vh]">
              
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2 flex-1">
                      <FormLabel className="text-[#111111] font-medium text-[14px] leading-[14px]">Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Acme Corp" className="h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] focus-visible:ring-[#0891B2]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2 flex-1">
                      <FormLabel className="text-[#111111] font-medium text-[14px] leading-[14px]">Industry</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] [&>span]:text-[#737373] data-[state=open]:ring-[#0891B2]">
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Technology">Technology</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Consulting">Consulting</SelectItem>
                          <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="contactPerson"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2 flex-1">
                      <FormLabel className="text-[#111111] font-medium text-[14px] leading-[14px]">Contact Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" className="h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] focus-visible:ring-[#0891B2]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2 flex-1">
                      <FormLabel className="text-[#111111] font-medium text-[14px] leading-[14px]">Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@acme.com" className="h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] focus-visible:ring-[#0891B2]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2 flex-1">
                      <FormLabel className="text-[#111111] font-medium text-[14px] leading-[14px]">Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 123-4567" className="h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] focus-visible:ring-[#0891B2]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2 flex-1">
                      <FormLabel className="text-[#111111] font-medium text-[14px] leading-[14px]">Website</FormLabel>
                      <FormControl>
                        <Input placeholder="https://acme.com" className="h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] focus-visible:ring-[#0891B2]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-[#111111] font-medium text-[14px] leading-[14px]">Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] data-[state=open]:ring-[#0891B2]">
                          <SelectValue placeholder="Status" />
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

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="text-[#111111] font-medium text-[14px] leading-[14px]">Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Additional information about the client..."
                        className="min-h-[64px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] placeholder:text-[#737373] resize-none focus-visible:ring-[#0891B2]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </div>

            {/* Footer */}
            <div className="px-[25px] py-4 flex items-center justify-end gap-2 border-t border-[#E5E5E5] mt-2">
              <Button 
                type="button" 
                onClick={handleOpenChange.bind(null, false)}
                variant="outline"
                className="inline-flex items-center justify-center h-[36px] px-4 bg-[#FAFAFA] border border-[#E5E5E5] hover:bg-gray-50 rounded-[4px] text-[#111111] font-medium text-[14px] transition-colors"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={createMutation.isPending}
                className="h-[36px] px-4 bg-[#0891B2] hover:bg-[#0891B2]/90 rounded-[4px] text-white font-medium text-[14px] transition-colors"
              >
                {createMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Client
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
