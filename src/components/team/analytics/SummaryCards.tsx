import React from "react";
import { TrendingUp, TrendingDown, Target, Award, Disc, Ribbon } from "lucide-react";

export function SummaryCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      
      {/* Team Productivity */}
      <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-5 shadow-sm flex flex-col relative">
        <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#E0F2FE] flex items-center justify-center">
          <Target className="w-5 h-5 text-[#0284C7]" />
        </div>
        <p className="text-[13px] text-[#737373] font-medium mb-1">Team Productivity</p>
        <p className="text-[28px] font-bold text-[#111111] mb-2">92%</p>
        <div className="flex items-center text-[12px] font-medium text-[#111111]">
          <TrendingUp className="w-3.5 h-3.5 mr-1" />
          <span>+8% this month</span>
        </div>
      </div>

      {/* Average Score */}
      <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-5 shadow-sm flex flex-col relative">
        <div className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center">
          <Award className="w-6 h-6 text-[#111111]" />
        </div>
        <p className="text-[13px] text-[#737373] font-medium mb-1">Average Score</p>
        <p className="text-[28px] font-bold text-[#111111] mb-2">89</p>
        <div className="flex items-center text-[12px] font-medium text-[#111111]">
          <TrendingUp className="w-3.5 h-3.5 mr-1" />
          <span>+5 points</span>
        </div>
      </div>

      {/* Task Completion */}
      <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-5 shadow-sm flex flex-col relative">
        <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#E0E7FF] flex items-center justify-center">
          <Disc className="w-5 h-5 text-[#4F46E5]" />
        </div>
        <p className="text-[13px] text-[#737373] font-medium mb-1">Task Completion</p>
        <p className="text-[28px] font-bold text-[#111111] mb-2">84%</p>
        <div className="flex items-center text-[12px] font-medium text-[#111111]">
          <TrendingDown className="w-3.5 h-3.5 mr-1" />
          <span>-2% this week</span>
        </div>
      </div>

      {/* Team Satisfaction */}
      <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-5 shadow-sm flex flex-col relative">
        <div className="absolute top-5 right-5 w-10 h-10 rounded-[8px] bg-[#F3E8FF] flex items-center justify-center">
          <Ribbon className="w-5 h-5 text-[#9333EA]" />
        </div>
        <p className="text-[13px] text-[#737373] font-medium mb-1">Team Satisfaction</p>
        <p className="text-[28px] font-bold text-[#111111] mb-2">91%</p>
        <div className="flex items-center text-[12px] font-medium text-[#111111]">
          <TrendingUp className="w-3.5 h-3.5 mr-1" />
          <span>+3%</span>
        </div>
      </div>

    </div>
  );
}
