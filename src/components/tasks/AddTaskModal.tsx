import { X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddTaskModal({ isOpen, onClose }: AddTaskModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent showCloseButton={false} className="sm:max-w-[576px] p-0 border-[#E5E5E5] gap-0 !bg-[#FFFFFF] rounded-[6px] shadow-lg">

        {/* Header */}
        <DialogHeader className="px-[25px] pt-[25px] pb-4">
          <DialogTitle className="text-[#111111] font-semibold text-[18px] leading-[18px]">
            Create New Task
          </DialogTitle>
          <DialogClose className="absolute right-[25px] top-[25px] text-[#A3A3A3] hover:text-[#111111] transition-colors">
            <X className="w-4 h-4" />
          </DialogClose>
        </DialogHeader>

        {/* Form Body */}
        <div className="px-[25px] py-4 flex flex-col gap-4 overflow-y-auto max-h-[70vh]">

          <div className="flex flex-col gap-2">
            <label className="text-[#111111] font-medium text-[14px] leading-[14px]">Task Name</label>
            <Input placeholder="Design homepage mockups" className="h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] focus-visible:ring-[#0891B2]" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[#111111] font-medium text-[14px] leading-[14px]">Description</label>
            <Textarea
              placeholder="Describe what needs to be done..."
              className="min-h-[64px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] placeholder:text-[#737373] resize-none focus-visible:ring-[#0891B2]"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[#111111] font-medium text-[14px] leading-[14px]">Project</label>
              <Select>
                <SelectTrigger className="w-full h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] [&>span]:text-[#737373] data-[state=open]:ring-[#0891B2]">
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="website-redesign">Website Redesign</SelectItem>
                  <SelectItem value="mobile-app">Mobile App V2</SelectItem>
                  <SelectItem value="marketing">Marketing Dashboard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[#111111] font-medium text-[14px] leading-[14px]">Assign To</label>
              <Select>
                <SelectTrigger className="w-full h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] [&>span]:text-[#737373] data-[state=open]:ring-[#0891B2]">
                  <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sarah">Sarah Chen</SelectItem>
                  <SelectItem value="marcus">Marcus Rodriguez</SelectItem>
                  <SelectItem value="emily">Emily Foster</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[#111111] font-medium text-[14px] leading-[14px]">Priority</label>
              <Select>
                <SelectTrigger className="w-full h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] [&>span]:text-[#737373] data-[state=open]:ring-[#0891B2]">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[#111111] font-medium text-[14px] leading-[14px]">Status</label>
              <Select defaultValue="todo">
                <SelectTrigger className="w-full h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] data-[state=open]:ring-[#0891B2]">
                  <SelectValue placeholder="To Do" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[#111111] font-medium text-[14px] leading-[14px]">Due Date</label>
            <Input type="date" className="h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] focus-visible:ring-[#0891B2]" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[#111111] font-medium text-[14px] leading-[14px]">Tags (Optional)</label>
            <Input placeholder="design, frontend, urgent" className="h-[36px] border-[#E5E5E5] !bg-[#FFFFFF] text-[#111111] focus-visible:ring-[#0891B2]" />
            <p className="text-[12px] text-[#737373] leading-[12px]">Separate tags with commas</p>
          </div>

        </div>

        {/* Footer */}
        <div className="px-[25px] py-4 flex items-center justify-end gap-2 border-t border-[#E5E5E5] mt-2">
          <DialogClose className="inline-flex items-center justify-center h-[36px] px-4 bg-[#FAFAFA] border border-[#E5E5E5] hover:bg-gray-50 rounded-[4px] text-[#111111] font-medium text-[14px] transition-colors">
            Cancel
          </DialogClose>
          <Button className="h-[36px] px-4 bg-[#0891B2] hover:bg-[#0891B2]/90 rounded-[4px] text-white font-medium text-[14px] transition-colors">
            Create Task
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  );
}
