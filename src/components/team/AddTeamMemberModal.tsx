"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddTeamMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddTeamMemberModal({ isOpen, onClose }: AddTeamMemberModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[526px] sm:max-w-[526px] p-0 overflow-hidden bg-[#FAFAFA] border-[#E5E5E5] shadow-md rounded-[6px]">
        
        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <DialogHeader>
            <DialogTitle className="text-[#111111] font-semibold text-[18px]">
              Add Team Member
            </DialogTitle>
          </DialogHeader>
        </div>

        {/* Body */}
        <div className="px-6 flex flex-col gap-4 max-h-[70vh] overflow-y-auto pb-4">
          
          {/* Row 1: First Name & Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-medium text-[#111111]">
                First Name
              </label>
              <Input
                placeholder="John"
                className="bg-[#FFFFFF] border-[#E5E5E5] text-[#111111] h-[36px] rounded-[4px] px-3 placeholder:text-[#737373]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-medium text-[#111111]">
                Last Name
              </label>
              <Input
                placeholder="Doe"
                className="bg-[#FFFFFF] border-[#E5E5E5] text-[#111111] h-[36px] rounded-[4px] px-3 placeholder:text-[#737373]"
              />
            </div>
          </div>

          {/* Row 2: Email */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-medium text-[#111111]">
              Email
            </label>
            <Input
              type="email"
              placeholder="john.doe@crmpro.com"
              className="bg-[#FFFFFF] border-[#E5E5E5] text-[#111111] h-[36px] rounded-[4px] px-3 placeholder:text-[#737373]"
            />
          </div>

          {/* Row 3: Phone & Department */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-medium text-[#111111]">
                Phone
              </label>
              <Input
                type="tel"
                placeholder="+1 (555) 123-4567"
                className="bg-[#FFFFFF] border-[#E5E5E5] text-[#111111] h-[36px] rounded-[4px] px-3 placeholder:text-[#737373]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-medium text-[#111111]">
                Department
              </label>
              <Select>
                <SelectTrigger className="w-full bg-[#FFFFFF] border-[#E5E5E5] h-[36px] rounded-[4px] text-[#737373] px-3">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row 4: Role & Start Date */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-medium text-[#111111]">
                Role
              </label>
              <Select defaultValue="staff">
                <SelectTrigger className="w-full bg-[#FFFFFF] border-[#E5E5E5] h-[36px] rounded-[4px] text-[#111111] px-3">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                  <SelectItem value="contractor">Contractor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-medium text-[#111111]">
                Start Date
              </label>
              <Input
                type="date"
                className="bg-[#FFFFFF] border-[#E5E5E5] text-[#111111] h-[36px] rounded-[4px] px-3 block [color-scheme:light]"
              />
            </div>
          </div>

          {/* Row 5: Permissions */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-medium text-[#111111]">
              Permissions
            </label>
            <Select defaultValue="view_edit_assigned">
              <SelectTrigger className="w-full bg-[#FFFFFF] border-[#E5E5E5] h-[36px] rounded-[4px] text-[#111111] px-3">
                <SelectValue placeholder="Select permissions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full_access">Full Access (Admin)</SelectItem>
                <SelectItem value="view_edit_team">View & Edit Team Tasks (Manager)</SelectItem>
                <SelectItem value="view_edit_assigned">View & Edit Assigned Tasks (Staff)</SelectItem>
                <SelectItem value="view_only">View Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#FAFAFA] flex justify-end gap-2 border-t border-[#E5E5E5]">
          <Button
            variant="outline"
            onClick={onClose}
            className="bg-[#FAFAFA] hover:bg-[#F5F5F5] border-[#E5E5E5] text-[#111111] rounded-[4px] h-[36px]"
          >
            Cancel
          </Button>
          <Button className="bg-[#0891B2] hover:bg-[#0E7490] text-white rounded-[4px] h-[36px] px-4 font-medium transition-colors">
            Send Invitation
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  );
}
