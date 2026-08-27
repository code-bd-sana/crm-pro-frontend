"use client";

import React from "react";
import { Camera, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ProfileSettingsPage() {
  return (
    <div className="flex flex-col gap-6 h-full pb-20">

      {/* Profile Picture Section */}
      <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-6 shadow-sm">
        <h2 className="text-[14px] font-bold text-[#111111] mb-6">Profile Picture</h2>
        <div className="flex items-center gap-6">
          <div className="w-[80px] h-[80px] rounded-full bg-[#0891B2] text-white flex items-center justify-center text-[24px] font-semibold shrink-0">
            SC
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-[12px] text-[#737373]">JPG, GIF or PNG. Max size of 2MB.</p>
            <Button variant="outline" className="bg-[#FAFAFA] border-[#E5E5E5] text-[#111111] hover:bg-[#F5F5F5] h-[36px] px-4 rounded-[4px] w-fit">
              <Camera className="w-4 h-4 mr-2" />
              Upload Photo
            </Button>
          </div>
        </div>
      </div>

      {/* Personal Information Section */}
      <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-6 shadow-sm flex flex-col gap-6">
        <h2 className="text-[14px] font-bold text-[#111111]">Personal Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-medium text-[#111111]">First Name</label>
            <Input
              defaultValue="Sarah"
              className="bg-[#FFFFFF] border-[#E5E5E5] text-[#111111] h-[40px] rounded-[4px] px-3 placeholder:text-[#737373]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-medium text-[#111111]">Last Name</label>
            <Input
              defaultValue="Chen"
              className="bg-[#FFFFFF] border-[#E5E5E5] text-[#111111] h-[40px] rounded-[4px] px-3 placeholder:text-[#737373]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-medium text-[#111111]">Email</label>
            <Input
              type="email"
              defaultValue="manager@crmpro.com"
              className="bg-[#FFFFFF] border-[#E5E5E5] text-[#111111] h-[40px] rounded-[4px] px-3 placeholder:text-[#737373]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-medium text-[#111111]">Phone</label>
            <Input
              type="tel"
              defaultValue="+1 (555) 123-4567"
              className="bg-[#FFFFFF] border-[#E5E5E5] text-[#111111] h-[40px] rounded-[4px] px-3 placeholder:text-[#737373]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-medium text-[#111111]">Job Title</label>
            <Input
              defaultValue="Manager"
              className="bg-[#FFFFFF] border-[#E5E5E5] text-[#111111] h-[40px] rounded-[4px] px-3 placeholder:text-[#737373]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-medium text-[#111111]">Department</label>
            <Input
              defaultValue="Engineering"
              className="bg-[#FFFFFF] border-[#E5E5E5] text-[#111111] h-[40px] rounded-[4px] px-3 placeholder:text-[#737373]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-2">
          <label className="text-[13px] font-medium text-[#111111]">Bio</label>
          <textarea
            className="w-full bg-[#FFFFFF] border border-[#E5E5E5] text-[#111111] min-h-[100px] rounded-[4px] p-3 focus:outline-none focus:ring-1 focus:ring-[#0891B2] resize-y placeholder:text-[#737373] text-sm"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-2">
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-medium text-[#111111]">Location</label>
            <Input
              defaultValue="San Francisco, CA"
              className="bg-[#FFFFFF] border-[#E5E5E5] text-[#111111] h-[40px] rounded-[4px] px-3 placeholder:text-[#737373]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-medium text-[#111111]">Timezone</label>
            <Input
              defaultValue="America/Los_Angeles"
              className="bg-[#FFFFFF] border-[#E5E5E5] text-[#111111] h-[40px] rounded-[4px] px-3 placeholder:text-[#737373]"
            />
          </div>
        </div>
      </div>

      {/* Change Password Section */}
      <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-6 shadow-sm flex flex-col gap-4">
        <h2 className="text-[14px] font-bold text-[#111111] mb-2">Change Password</h2>

        <div className="flex flex-col gap-2 max-w-full">
          <label className="text-[13px] font-medium text-[#111111]">Current Password</label>
          <Input
            type="password"
            className="bg-[#FFFFFF] border-[#E5E5E5] text-[#111111] h-[40px] rounded-[4px] px-3 w-full"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-medium text-[#111111]">New Password</label>
          <Input
            type="password"
            className="bg-[#FFFFFF] border-[#E5E5E5] text-[#111111] h-[40px] rounded-[4px] px-3 w-full"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-medium text-[#111111]">Confirm New Password</label>
          <Input
            type="password"
            className="bg-[#FFFFFF] border-[#E5E5E5] text-[#111111] h-[40px] rounded-[4px] px-3 w-full"
          />
        </div>

        <Button variant="outline" className="bg-[#FAFAFA] border-[#E5E5E5] text-[#111111] hover:bg-[#F5F5F5] h-[36px] px-4 rounded-[4px] w-fit mt-2">
          Update Password
        </Button>
      </div>

      {/* Sticky Bottom Actions */}
      <div className="fixed bottom-0 right-0 left-0 lg:left-[240px] bg-[#FAFAFA] border-t border-[#E5E5E5] p-4 flex justify-end gap-3 z-10 px-6">
        <Button variant="outline" className="bg-white border-[#E5E5E5] text-[#111111] hover:bg-[#F5F5F5] h-[40px] px-6 rounded-[4px]">
          Cancel
        </Button>
        <Button className="bg-[#0891B2] hover:bg-[#366083] text-white h-[40px] px-6 rounded-[4px] font-medium">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

    </div>
  );
}
