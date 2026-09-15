import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import type { DashboardActivity } from "@/services/analytics.service";

interface RecentActivityProps {
  activities?: DashboardActivity[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const items = activities ?? [];

  return (
    <Card className="bg-[#FFFFFF] border-[#E5E5E5] shadow-none rounded-[10px] h-[416px] xl:col-span-2">
      <CardHeader className="h-[46px] p-6 pb-0 flex justify-center">
        <CardTitle className="text-[16px] leading-[16px] font-medium text-[#111111]">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="px-6 pt-[25px]">
        <div className="flex flex-col gap-4 h-[320px] overflow-y-auto pr-2">
          {items.length === 0 ? (
            <div className="flex items-center justify-center h-full text-[#737373] text-sm">
              No recent activity yet.
            </div>
          ) : (
            items.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#0891B2]/10 flex flex-shrink-0 items-center justify-center">
                  <span className="text-[#0891B2] font-medium text-[14px]">{activity.initials}</span>
                </div>
                <div className="flex flex-col flex-1 min-w-0 pt-0.5">
                  <p className="text-[14px] leading-[20px] text-[#111111] truncate">
                    <span className="font-medium">{activity.userName}</span>{" "}
                    <span className="font-normal">{activity.description}</span>
                    {activity.taskTitle && (
                      <span className="font-normal text-[#0891B2]"> in {activity.taskTitle}</span>
                    )}
                  </p>
                  <p className="text-[12px] leading-[16px] text-[#737373] mt-0.5">
                    {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
