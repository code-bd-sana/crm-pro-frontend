"use client";

import React from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface NotificationRowProps {
  title: string;
  description: string;
  defaultChecked?: boolean;
  showDivider?: boolean;
}

const NotificationRow = ({ title, description, defaultChecked = false, showDivider = true }: NotificationRowProps) => (
  <div className="flex flex-col gap-6 w-full">
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-[2px]">
        <span className="text-[16px] font-medium text-[#111111] leading-[24px]">{title}</span>
        <span className="text-[14px] text-[#737373] leading-[20px]">{description}</span>
      </div>
      <Switch
        defaultChecked={defaultChecked}
        className="data-checked:bg-[#0891B2] data-unchecked:bg-[#E5E5E5]"
      />
    </div>
    {showDivider && <div className="h-[1px] w-full bg-[#E5E5E5]" />}
  </div>
);

export default function NotificationSettingsPage() {
  return (
    <div className="flex flex-col gap-6 h-full pb-20">

      {/* Email Notifications Section */}
      <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-6 shadow-sm flex flex-col gap-6">
        <h2 className="text-[16px] font-medium text-[#111111] leading-[16px]">Email Notifications</h2>

        <div className="flex flex-col gap-6">
          <NotificationRow
            title="Task assigned to me"
            description="Get notified when a task is assigned to you"
            defaultChecked={true}
          />
          <NotificationRow
            title="Task due soon"
            description="Reminders for tasks due within 24 hours"
            defaultChecked={true}
          />
          <NotificationRow
            title="Invoice paid"
            description="Receive notifications when invoices are paid"
            defaultChecked={true}
          />
          <NotificationRow
            title="New comment"
            description="Get notified about new comments on your tasks"
            defaultChecked={false}
          />
          <NotificationRow
            title="Project status change"
            description="Notifications when project status is updated"
            defaultChecked={true}
          />
          <NotificationRow
            title="New client added"
            description="Get notified when a new client is added to the system"
            defaultChecked={false}
            showDivider={false}
          />
        </div>
      </div>

      {/* In-App Notifications Section */}
      <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-6 shadow-sm flex flex-col gap-6">
        <h2 className="text-[16px] font-medium text-[#111111] leading-[16px]">In-App Notifications</h2>

        <div className="flex flex-col gap-6">
          <NotificationRow
            title="Desktop notifications"
            description="Show browser notifications for important events"
            defaultChecked={true}
          />
          <NotificationRow
            title="Sound alerts"
            description="Play sound for new notifications"
            defaultChecked={false}
            showDivider={false}
          />
        </div>
      </div>

      {/* Sticky Bottom Actions */}
      <div className="fixed bottom-0 right-0 left-0 lg:left-[240px] bg-[#FAFAFA] border-t border-[#E5E5E5] p-4 flex justify-end gap-3 z-10 px-6">
        <Button variant="outline" className="bg-white border-[#E5E5E5] text-[#111111] hover:bg-gray-100 h-[40px] px-6 rounded-[4px]">
          Cancel
        </Button>
        <Button className="bg-[#0891B2] hover:bg-[#0E7490] text-white h-[40px] px-6 rounded-[4px] font-medium">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

    </div>
  );
}
