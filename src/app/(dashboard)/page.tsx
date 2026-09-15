"use client";

import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { TaskStatusChart } from "@/components/dashboard/TaskStatusChart";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { UpcomingDeadlines } from "@/components/dashboard/UpcomingDeadlines";
import { useAuthStore } from "@/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { getDashboardAnalytics } from "@/services/analytics.service";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const firstName = user?.profile?.firstName || "User";

  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardAnalytics,
  });

  return (
    <div className="flex flex-col flex-1 px-6 pt-6 pb-6 gap-6 w-full">

      {/* Header */}
      <div className="flex flex-col gap-1 h-[56px]">
        <h1 className="text-[#111111] font-semibold text-[24px] leading-[32px]">
          {getGreeting()}, {firstName}
        </h1>
        <p className="text-[#737373] font-normal text-[14px] leading-[20px]">
          {format(new Date(), "EEEE, MMMM d, yyyy")}
        </p>
      </div>

      {/* Summary Cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-[142px] rounded-[10px]" />
          ))}
        </div>
      ) : (
        <SummaryCards summary={dashboardData?.summary} />
      )}

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-6">
        <RevenueChart />
        <TaskStatusChart tasksByStatus={dashboardData?.summary?.tasksByStatus} isLoading={isLoading} />
      </div>

      {/* Bottom Section: Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <QuickActions />
        {isLoading ? (
          <Skeleton className="h-[416px] xl:col-span-2 rounded-[10px]" />
        ) : (
          <RecentActivity activities={dashboardData?.recentActivity} />
        )}
      </div>

      {/* Upcoming Deadlines */}
      {isLoading ? (
        <Skeleton className="h-[200px] rounded-[10px]" />
      ) : (
        <UpcomingDeadlines deadlines={dashboardData?.upcomingDeadlines} />
      )}

    </div>
  );
}
