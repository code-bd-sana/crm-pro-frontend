import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { TaskStatusChart } from "@/components/dashboard/TaskStatusChart";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { UpcomingDeadlines } from "@/components/dashboard/UpcomingDeadlines";

export default function DashboardPage() {
  return (
    <div className="flex flex-col flex-1 px-6 pt-6 pb-0 gap-6">
      
      {/* Header */}
      <div className="flex flex-col gap-1 h-[56px]">
        <h1 className="text-[#111111] font-semibold text-[24px] leading-[32px]">Good morning, John</h1>
        <p className="text-[#737373] font-normal text-[14px] leading-[20px]">Friday, April 10, 2026</p>
      </div>

      {/* Summary Cards */}
      <SummaryCards />

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-6">
        <RevenueChart />
        <TaskStatusChart />
      </div>

      {/* Bottom Section: Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <QuickActions />
        <RecentActivity />
      </div>

      {/* Upcoming Deadlines */}
      <UpcomingDeadlines />

    </div>
  );
}
