"use client";

import React, { useState } from "react";
import { Settings, Check, MessageSquare, CreditCard, Clock, UserPlus, CheckCircle2, AlertCircle, FolderOpen, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getNotifications, markAsRead, markAllAsRead } from "@/services/notification.service";
import type { AppNotification } from "@/services/notification.service";
import { formatDistanceToNow } from "date-fns";

const getIconForType = (type: string) => {
  switch (type) {
    case "TASK_ASSIGNED":
      return { icon: CheckCircle2, bg: "bg-[#DBEAFE]", text: "text-[#0891B2]" };
    case "INVOICE_CREATED":
    case "INVOICE_PAID":
      return { icon: CreditCard, bg: "bg-[#DCFCE7]", text: "text-[#16A34A]" };
    case "PROJECT_MEMBER_ADDED":
      return { icon: FolderOpen, bg: "bg-[#F3E8FF]", text: "text-[#9333EA]" };
    case "SYSTEM_ALERT":
      return { icon: AlertCircle, bg: "bg-[#F5F5F5]", text: "text-[#737373]" };
    default:
      return { icon: MessageSquare, bg: "bg-[#F5F5F5]", text: "text-[#737373]" };
  }
};

export default function NotificationPanel() {
  const [activeTab, setActiveTab] = useState("All");
  const queryClient = useQueryClient();

  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => getNotifications(1, 50),
  });

  const { mutate: markOneAsRead } = useMutation({
    mutationFn: markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications-unread-count"] });
    },
  });

  const { mutate: markAll } = useMutation({
    mutationFn: markAllAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications-unread-count"] });
    },
  });

  const allItems = notifications ?? [];
  const unreadItems = allItems.filter((n) => !n.isRead);

  const filteredItems = activeTab === "All"
    ? allItems
    : activeTab === "Unread"
      ? unreadItems
      : allItems; // Mentions tab - for now show all

  const unreadCount = unreadItems.length;

  return (
    <div className="flex flex-col w-[calc(100vw-32px)] md:w-[401px] max-w-[401px] bg-white rounded-[10px] shadow-lg border border-[#E5E5E5] overflow-hidden max-h-[85vh]">
      {/* Header */}
      <div className="flex flex-col gap-4 p-4 border-b border-[#E5E5E5] shrink-0">
        <div className="flex items-center justify-between">
          <h2 className="text-[18px] font-semibold text-[#111111]">Notifications</h2>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-[#737373] hover:text-[#111111] hover:bg-[#F5F5F5] rounded-[4px]">
            <Settings className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[14px] text-[#737373]">{unreadCount} unread</span>
          <Button
            variant="ghost"
            className="h-8 px-3 text-[12px] font-medium text-[#111111] hover:bg-[#F5F5F5] rounded-[4px]"
            onClick={() => markAll()}
            disabled={unreadCount === 0}
          >
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
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-start gap-3 p-3">
              <Skeleton className="w-8 h-8 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))
        ) : filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-[#737373]">
            <MessageSquare className="w-10 h-10 mb-3 opacity-30" />
            <p className="text-sm">No notifications</p>
          </div>
        ) : (
          filteredItems.map((notification) => {
            const { icon: Icon, bg, text } = getIconForType(notification.type);

            return (
              <div
                key={notification.id}
                onClick={() => {
                  if (!notification.isRead) markOneAsRead(notification.id);
                }}
                className={`flex items-start gap-3 p-3 rounded-[6px] border cursor-pointer transition-colors ${
                  notification.isRead
                    ? "bg-white border-[#E5E5E5]"
                    : "bg-[rgba(8,145,178,0.05)] border-[rgba(8,145,178,0.2)]"
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
                    {!notification.isRead && (
                      <div className="w-2 h-2 rounded-full bg-[#0891B2] shrink-0 mt-1.5" />
                    )}
                  </div>
                  <span className="text-[12px] text-[#737373]">
                    {notification.message}
                  </span>
                  <span className="text-[12px] text-[#737373] mt-1">
                    {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
