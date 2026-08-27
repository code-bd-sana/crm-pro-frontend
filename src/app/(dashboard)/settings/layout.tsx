"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Building2, Bell, Shield, CreditCard, Plug } from "lucide-react";
import { cn } from "@/lib/utils";

const settingsNav = [
  { name: "Profile", href: "/settings", icon: User },
  { name: "Company", href: "/settings/company", icon: Building2 },
  { name: "Notifications", href: "/settings/notifications", icon: Bell },
  { name: "Security", href: "/settings/security", icon: Shield },
  { name: "Billing", href: "/settings/billing", icon: CreditCard },
  { name: "Integrations", href: "/settings/integrations", icon: Plug },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col flex-1 px-6 pt-6 pb-6 gap-6 h-full w-full bg-[#FAFAFA] overflow-y-auto">
      
      {/* Header */}
      <div className="flex flex-col gap-1 mb-2">
        <h1 className="text-[#111111] font-semibold text-[24px] leading-[32px]">Settings</h1>
        <p className="text-[#737373] text-[14px]">Manage your account settings and preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
        
        {/* Left Sidebar Menu */}
        <div className="w-full lg:w-[240px] shrink-0 bg-white border border-[#E5E5E5] rounded-[10px] p-2 flex flex-col gap-1">
          {settingsNav.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-[6px] transition-colors text-[14px] font-medium h-[40px]",
                  isActive
                    ? "bg-[#4477A1] text-white"
                    : "text-[#111111] hover:bg-[#F5F5F5]"
                )}
              >
                <Icon className={cn("w-4 h-4", isActive ? "text-white" : "text-[#737373]")} />
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Right Content Area */}
        <div className="flex-1 w-full min-w-0">
          {children}
        </div>
      </div>
    </div>
  );
}
