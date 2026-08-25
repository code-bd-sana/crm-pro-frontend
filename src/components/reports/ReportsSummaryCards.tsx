import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

export function ReportsSummaryCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      
      {/* Total Revenue */}
      <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-5 shadow-sm flex flex-col">
        <p className="text-[13px] text-[#737373] font-medium mb-1">Total Revenue</p>
        <p className="text-[28px] font-bold text-[#111111] mb-2">$284,600</p>
        <div className="flex items-center text-[12px] font-medium text-[#111111]">
          <TrendingUp className="w-3.5 h-3.5 mr-1" />
          <span>+18.2%</span>
        </div>
      </div>

      {/* New Clients */}
      <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-5 shadow-sm flex flex-col">
        <p className="text-[13px] text-[#737373] font-medium mb-1">New Clients</p>
        <p className="text-[28px] font-bold text-[#111111] mb-2">14</p>
        <div className="flex items-center text-[12px] font-medium text-[#111111]">
          <TrendingUp className="w-3.5 h-3.5 mr-1" />
          <span>+12.5%</span>
        </div>
      </div>

      {/* Tasks Completed */}
      <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-5 shadow-sm flex flex-col">
        <p className="text-[13px] text-[#737373] font-medium mb-1">Tasks Completed</p>
        <p className="text-[28px] font-bold text-[#111111] mb-2">199</p>
        <div className="flex items-center text-[12px] font-medium text-[#111111]">
          <TrendingDown className="w-3.5 h-3.5 mr-1" />
          <span>-3.1%</span>
        </div>
      </div>

      {/* Projects Delivered */}
      <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-5 shadow-sm flex flex-col">
        <p className="text-[13px] text-[#737373] font-medium mb-1">Projects Delivered</p>
        <p className="text-[28px] font-bold text-[#111111] mb-2">8</p>
        <div className="flex items-center text-[12px] font-medium text-[#111111]">
          <TrendingUp className="w-3.5 h-3.5 mr-1" />
          <span>+33.3%</span>
        </div>
      </div>

    </div>
  );
}
