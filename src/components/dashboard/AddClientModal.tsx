import { X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddClientModal({ isOpen, onClose }: AddClientModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
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

        {/* Form Body */}
        <div className="px-[25px] py-4 flex flex-col gap-4 overflow-y-auto max-h-[70vh]">

          <div className="flex gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[#111111] font-medium text-[14px] leading-[14px]">Company Name</label>
              <Input placeholder="Acme Corp" className="h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] focus-visible:ring-[#0891B2]" />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[#111111] font-medium text-[14px] leading-[14px]">Industry</label>
              <Select>
                <SelectTrigger className="w-full h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] [&>span]:text-[#737373] data-[state=open]:ring-[#0891B2]">
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tech">Technology</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[#111111] font-medium text-[14px] leading-[14px]">Contact Name</label>
              <Input placeholder="John Doe" className="h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] focus-visible:ring-[#0891B2]" />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[#111111] font-medium text-[14px] leading-[14px]">Email</label>
              <Input type="email" placeholder="john@acme.com" className="h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] focus-visible:ring-[#0891B2]" />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[#111111] font-medium text-[14px] leading-[14px]">Phone</label>
              <Input placeholder="+1 (555) 123-4567" className="h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] focus-visible:ring-[#0891B2]" />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[#111111] font-medium text-[14px] leading-[14px]">Website</label>
              <Input placeholder="https://acme.com" className="h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] focus-visible:ring-[#0891B2]" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[#111111] font-medium text-[14px] leading-[14px]">Status</label>
            <Select defaultValue="lead">
              <SelectTrigger className="w-full h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] data-[state=open]:ring-[#0891B2]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lead">Lead</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[#111111] font-medium text-[14px] leading-[14px]">Notes</label>
            <Textarea
              placeholder="Additional information about the client..."
              className="min-h-[64px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] placeholder:text-[#737373] resize-none focus-visible:ring-[#0891B2]"
            />
          </div>

        </div>

        {/* Footer */}
        <div className="px-[25px] py-4 flex items-center justify-end gap-2 border-t border-[#E5E5E5] mt-2">
          <DialogClose className="inline-flex items-center justify-center h-[36px] px-4 bg-[#FAFAFA] border border-[#E5E5E5] hover:bg-gray-50 rounded-[4px] text-[#111111] font-medium text-[14px] transition-colors">
            Cancel
          </DialogClose>
          <Button className="h-[36px] px-4 bg-[#0891B2] hover:bg-[#0891B2]/90 rounded-[4px] text-white font-medium text-[14px] transition-colors">
            Save Client
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  );
}
