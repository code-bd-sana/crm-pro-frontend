"use client";

import React, { useState } from "react";
import { Settings, Check, MessageSquare, CreditCard, Clock, UserPlus, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const notifications = [
  {
    id: 1,
    title: "New task assigned: Update homepage banner",
    description: "Sarah Chen assigned you a task",
    time: "5 min ago",
    unread: true,
    type: "task", // blue
  },
  {
    id: 2,
    title: "New comment on Mobile App Launch",
    description: "David Kim mentioned you in a comment",
    time: "1 hour ago",
    unread: true,
    type: "comment", // purple
  },
  {
    id: 3,
    title: "Invoice INV-2024-0046 paid",
    description: "Payment received from Tectonic Studio",
    time: "3 hours ago",
    unread: true,
    type: "invoice", // green
  },
  {
    id: 4,
    title: "Task due soon: QA testing round 2",
    description: "Due tomorrow at 5:00 PM",
    time: "5 hours ago",
    unread: false,
    type: "task", // blue
  },
  {
    id: 5,
    title: "New client added",
    description: "Marcus Rodriguez added Apex Technologies",
    time: "1 day ago",
    unread: false,
    type: "client", // orange
  },
  {
    id: 6,
    title: "Task completed: Design mobile mockups",
    description: "Sarah Chen marked the task as complete",
    time: "2 days ago",
    unread: false,
    type: "task_completed", // blue
  },
  {
    id: 7,
    title: "New comment on Website Redesign",
    description: "Emily Foster replied to your comment",
    time: "2 days ago",
    unread: false,
    type: "comment", // purple
  },
  {
    id: 8,
    title: "Invoice overdue: INV-2024-0044",
    description: "Pinnacle Marketing payment is overdue",
    time: "3 days ago",
    unread: false,
    type: "invoice_overdue", // green (or red? the design says DCFCE7 which is green, but let's use a standard color)
  }
];

const getIconForType = (type: string) => {
  switch (type) {
    case "task":
    case "task_completed":
      return { icon: CheckCircle2, bg: "bg-[#DBEAFE]", text: "text-[#0891B2]" };
    case "comment":
      return { icon: MessageSquare, bg: "bg-[#F3E8FF]", text: "text-[#9333EA]" };
    case "invoice":
    case "invoice_overdue":
      return { icon: CreditCard, bg: "bg-[#DCFCE7]", text: "text-[#16A34A]" };
    case "client":
      return { icon: UserPlus, bg: "bg-[#FFEDD4]", text: "text-[#EA580C]" };
    default:
      return { icon: AlertCircle, bg: "bg-[#F5F5F5]", text: "text-[#737373]" };
  }
};

export default function NotificationPanel() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="flex flex-col w-[401px] bg-white rounded-[10px] shadow-lg border border-[#E5E5E5] overflow-hidden max-h-[85vh]">
      {/* Header */}
      <div className="flex flex-col gap-4 p-4 border-b border-[#E5E5E5] shrink-0">
        <div className="flex items-center justify-between">
          <h2 className="text-[18px] font-semibold text-[#111111]">Notifications</h2>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-[#737373] hover:text-[#111111] hover:bg-[#F5F5F5] rounded-[4px]">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-[14px] text-[#737373]">3 unread</span>
          <Button variant="ghost" className="h-8 px-3 text-[12px] font-medium text-[#111111] hover:bg-[#F5F5F5] rounded-[4px]">
            Mark all read
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 pt-4 shrink-0">
        <div className="flex items-center bg-[#F5F5F5] p-[3px] rounded-[10px] w-fit">
          {["All", "Unread", "Mentions"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 text-[14px] font-medium rounded-[8px] transition-all ${
                activeTab === tab 
                  ? "bg-white text-[#111111] shadow-sm border border-transparent" 
                  : "text-[#737373] hover:text-[#111111] border border-transparent"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Notification List */}
      <div className="flex flex-col p-4 gap-3 overflow-y-auto">
        {notifications.map((notification) => {
          const { icon: Icon, bg, text } = getIconForType(notification.type);
          
          return (
            <div 
              key={notification.id} 
              className={`flex items-start gap-3 p-3 rounded-[6px] border ${
                notification.unread 
                  ? "bg-[rgba(8,145,178,0.05)] border-[rgba(8,145,178,0.2)]" 
                  : "bg-white border-[#E5E5E5]"
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${bg}`}>
                <Icon className={`w-4 h-4 ${text}`} />
              </div>
              
              <div className="flex flex-col flex-1 gap-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[14px] font-medium text-[#111111] leading-tight">
                    {notification.title}
                  </span>
                  {notification.unread && (
                    <div className="w-2 h-2 rounded-full bg-[#0891B2] shrink-0 mt-1.5" />
                  )}
                </div>
                <span className="text-[12px] text-[#737373]">
                  {notification.description}
                </span>
                <span className="text-[12px] text-[#737373] mt-1">
                  {notification.time}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
