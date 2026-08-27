"use client";

import { Bell, Search, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import NotificationPanel from "./NotificationPanel";
import { useUIStore } from "@/store/useUIStore";

export default function Topbar() {
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);

  return (
    <div className="h-16 bg-[#FFFFFF] border-b border-[#E5E5E5] flex items-center justify-between px-6 flex-shrink-0">

      {/* Left Section (Menu Toggle + Search) */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="text-[#737373] hover:text-[#111111] transition-colors p-1 -ml-1 rounded hover:bg-gray-100"
        >
          <Menu className="w-7 h-7" />
        </button>

        <div className="w-[300px] md:w-[448px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]" />
          <Input
            placeholder="Search..."
            className="w-full pl-9 h-9 border-[#E5E5E5] focus-visible:ring-[#0891B2] bg-[#FFFFFF] text-[#111111] placeholder:text-[#737373]"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <Popover>
          <PopoverTrigger className="relative text-[#737373] hover:text-[#111111] transition-colors w-5 h-5 flex items-center justify-center outline-none">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#EF4444] rounded flex items-center justify-center text-[10px] font-medium text-white leading-[15px]">
              3
            </span>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 border-none shadow-none rounded-[10px]" align="end" sideOffset={12}>
            <NotificationPanel />
          </PopoverContent>
        </Popover>

        <div className="w-10 h-10 rounded-full bg-[#0891B2] flex items-center justify-center text-white font-normal text-base cursor-pointer">
          SC
        </div>
      </div>

    </div>
  );
}
