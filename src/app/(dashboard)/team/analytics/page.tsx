import React from "react";
import { SummaryCards } from "@/components/team/analytics/SummaryCards";
import { PerformanceTrendChart } from "@/components/team/analytics/PerformanceTrendChart";
import { TaskCompletionChart } from "@/components/team/analytics/TaskCompletionChart";
import { SkillsAssessmentChart } from "@/components/team/analytics/SkillsAssessmentChart";
import { DepartmentPerformance } from "@/components/team/analytics/DepartmentPerformance";
import { TopPerformers } from "@/components/team/analytics/TopPerformers";

export default function TeamAnalyticsPage() {
  return (
    <div className="flex flex-col flex-1 px-6 pt-6 pb-6 gap-6 h-full w-full bg-[#FAFAFA] overflow-y-auto">
      
      {/* Header */}
      <div className="flex flex-col gap-1 mb-2">
        <h1 className="text-[#111111] font-semibold text-[24px] leading-[32px]">Team Analytics</h1>
        <p className="text-[#737373] text-[14px]">Performance insights and team metrics</p>
      </div>

      {/* Summary Cards */}
      <SummaryCards />

      {/* Charts Grid (2x2) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <PerformanceTrendChart />
        <TaskCompletionChart />
        <SkillsAssessmentChart />
        <DepartmentPerformance />
      </div>

      {/* Top Performers Section */}
      <TopPerformers />

    </div>
  );
}
