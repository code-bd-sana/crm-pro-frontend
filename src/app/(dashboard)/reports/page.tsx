import React from "react";
import { Calendar, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReportsSummaryCards } from "@/components/reports/ReportsSummaryCards";
import { RevenueChart } from "@/components/reports/RevenueChart";
import { TopClientsChart } from "@/components/reports/TopClientsChart";
import { TaskCompletionChart } from "@/components/reports/TaskCompletionChart";
import { ProjectStatusChart } from "@/components/reports/ProjectStatusChart";

export default function ReportsAnalyticsPage() {
  return (
    <div className="flex flex-col flex-1 px-6 pt-6 pb-6 gap-6 h-full w-full bg-[#FAFAFA] overflow-y-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex flex-col gap-1">
          <h1 className="text-[#111111] font-semibold text-[24px] leading-[32px]">Reports & Analytics</h1>
          <p className="text-[#737373] text-[14px]">Last 30 days</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-[#E5E5E5] bg-white text-[#111111] font-medium h-[36px] px-4 hover:bg-[#F8FAFC] rounded-[3px]">
            <Calendar className="w-4 h-4 mr-2" />
            Last 30 days
          </Button>
          <Button variant="outline" className="border-[#E5E5E5] bg-white text-[#111111] font-medium h-[36px] px-4 hover:bg-[#F8FAFC] rounded-[3px]">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <ReportsSummaryCards />

      {/* Charts Grid (2x2) */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <RevenueChart />
        <TopClientsChart />
        <TaskCompletionChart />
        <ProjectStatusChart />
      </div>

    </div>
  );
}
