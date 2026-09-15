import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { DashboardSummary } from "@/services/analytics.service";

interface ReportsSummaryCardsProps {
  summary?: DashboardSummary;
}

function formatCurrency(value: number): string {
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(1)}k`;
  }
  return `$${value.toFixed(0)}`;
}

export function ReportsSummaryCards({ summary }: ReportsSummaryCardsProps) {
  const totalRevenue = summary?.revenueThisMonth ?? 0;
  const newClients = summary?.totalClients ?? 0;
  const tasksCompleted = summary?.completedTasks ?? 0;
  const projectsDelivered = summary?.activeProjects ?? 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

      {/* Total Revenue */}
      <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-5 shadow-sm flex flex-col">
        <p className="text-[13px] text-[#737373] font-medium mb-1">Total Revenue</p>
        <p className="text-[28px] font-bold text-[#111111] mb-2">{formatCurrency(totalRevenue)}</p>
        <div className="flex items-center text-[12px] font-medium text-[#111111]">
          <TrendingUp className="w-3.5 h-3.5 mr-1" />
          <span>+0%</span>
        </div>
      </div>

      {/* New Clients */}
      <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-5 shadow-sm flex flex-col">
        <p className="text-[13px] text-[#737373] font-medium mb-1">Total Clients</p>
        <p className="text-[28px] font-bold text-[#111111] mb-2">{newClients}</p>
        <div className="flex items-center text-[12px] font-medium text-[#111111]">
          <TrendingUp className="w-3.5 h-3.5 mr-1" />
          <span>+0%</span>
        </div>
      </div>

      {/* Tasks Completed */}
      <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-5 shadow-sm flex flex-col">
        <p className="text-[13px] text-[#737373] font-medium mb-1">Tasks Completed</p>
        <p className="text-[28px] font-bold text-[#111111] mb-2">{tasksCompleted}</p>
        <div className="flex items-center text-[12px] font-medium text-[#111111]">
          <TrendingDown className="w-3.5 h-3.5 mr-1" />
          <span>-0%</span>
        </div>
      </div>

      {/* Projects Delivered */}
      <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-5 shadow-sm flex flex-col">
        <p className="text-[13px] text-[#737373] font-medium mb-1">Active Projects</p>
        <p className="text-[28px] font-bold text-[#111111] mb-2">{projectsDelivered}</p>
        <div className="flex items-center text-[12px] font-medium text-[#111111]">
          <TrendingUp className="w-3.5 h-3.5 mr-1" />
          <span>+0%</span>
        </div>
      </div>

    </div>
  );
}
