"use client";

import { X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface NewProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewProjectDialog({ open, onOpenChange }: NewProjectDialogProps) {
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
        <div className="px-[25px] py-4 flex flex-col gap-4 overflow-y-auto max-h-[70vh]">
          
          {/* Project Name */}
          <div className="flex flex-col gap-2">
            <label className="text-[#111111] font-medium text-[14px] leading-[14px]">Project Name</label>
            <Input 
              placeholder="Website Redesign" 
              className="h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] placeholder:text-[#737373] focus-visible:ring-[#0891B2]" 
            />
          </div>

          {/* Client & Status */}
          <div className="flex gap-4">
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-[#111111] font-medium text-[14px] leading-[14px]">Client</label>
              <Select>
                <SelectTrigger className="w-full h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] [&>span]:text-[#737373] data-[state=open]:ring-[#0891B2]">
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="meridian">Meridian Logistics</SelectItem>
                  <SelectItem value="tectonic">Tectonic Studio</SelectItem>
                  <SelectItem value="pinnacle">Pinnacle Marketing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-[#111111] font-medium text-[14px] leading-[14px]">Status</label>
              <Select defaultValue="active">
                <SelectTrigger className="w-full h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] data-[state=open]:ring-[#0891B2]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="on-hold">On Hold</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Priority & Deadline */}
          <div className="flex gap-4">
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-[#111111] font-medium text-[14px] leading-[14px]">Priority</label>
              <Select defaultValue="medium">
                <SelectTrigger className="w-full h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] data-[state=open]:ring-[#0891B2]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-[#111111] font-medium text-[14px] leading-[14px]">Deadline</label>
              <Input 
                type="date"
                className="h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] focus-visible:ring-[#0891B2]" 
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className="text-[#111111] font-medium text-[14px] leading-[14px]">Description</label>
            <Textarea 
              placeholder="Describe the project goals and scope..." 
              className="min-h-[64px] resize-none border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] placeholder:text-[#737373] focus-visible:ring-[#0891B2]" 
            />
          </div>

          {/* Assign Team Members */}
          <div className="flex flex-col gap-2">
            <label className="text-[#111111] font-medium text-[14px] leading-[14px]">Assign Team Members</label>
            <Select>
              <SelectTrigger className="w-full h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] [&>span]:text-[#737373] data-[state=open]:ring-[#0891B2]">
                <SelectValue placeholder="Select team members" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sarah">Sarah Chen</SelectItem>
                <SelectItem value="marcus">Marcus Rodriguez</SelectItem>
                <SelectItem value="david">David Kim</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-[#737373] font-normal text-[12px] leading-[16px]">
              You can assign more members after creating the project
            </p>
          </div>

          {/* Budget */}
          <div className="flex flex-col gap-2">
            <label className="text-[#111111] font-medium text-[14px] leading-[14px]">Budget (Optional)</label>
            <Input 
              placeholder="25000" 
              type="number"
              className="h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] placeholder:text-[#737373] focus-visible:ring-[#0891B2]" 
            />
          </div>

        </div>

        {/* Footer */}
        <div className="px-[25px] py-4 flex items-center justify-end gap-2 border-t border-[#E5E5E5] mt-2">
          <DialogClose className="inline-flex items-center justify-center h-[36px] px-4 bg-[#FAFAFA] border border-[#E5E5E5] hover:bg-gray-50 rounded-[4px] text-[#111111] font-medium text-[14px] transition-colors">
            Cancel
          </DialogClose>
          <Button className="h-[36px] px-4 bg-[#0891B2] hover:bg-[#0891B2]/90 rounded-[4px] text-white font-medium text-[14px] transition-colors">
            Create Project
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  );
}
