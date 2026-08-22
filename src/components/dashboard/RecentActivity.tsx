import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const recentActivityData = [
  { initials: "SC", name: "Sarah Chen", action: "completed task in Project Phoenix", time: "5 min ago" },
  { initials: "MR", name: "Marcus Rodriguez", action: "added new client Meridian Logistics", time: "12 min ago" },
  { initials: "EF", name: "Emily Foster", action: "updated invoice INV-2024-0047", time: "1 hour ago" },
  { initials: "DK", name: "David Kim", action: "commented on Design System Overhaul", time: "2 hours ago" },
  { initials: "LA", name: "Lisa Anderson", action: "marked project as completed", time: "3 hours ago" },
  { initials: "RC", name: "Ryan Cooper", action: "created new task in Mobile App", time: "4 hours ago" },
];

export function RecentActivity() {
  return (
    <Card className="bg-[#FFFFFF] border-[#E5E5E5] shadow-none rounded-[10px] h-[416px] xl:col-span-2">
      <CardHeader className="h-[46px] p-6 pb-0 flex justify-center">
        <CardTitle className="text-[16px] leading-[16px] font-medium text-[#111111]">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="px-6 pt-[25px]">
        <div className="flex flex-col gap-4 h-[320px] overflow-y-auto pr-2">
          {recentActivityData.map((activity, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#0891B2]/10 flex flex-shrink-0 items-center justify-center">
                <span className="text-[#0891B2] font-medium text-[14px]">{activity.initials}</span>
              </div>
              <div className="flex flex-col flex-1 min-w-0 pt-0.5">
                <p className="text-[14px] leading-[20px] text-[#111111] truncate">
                  <span className="font-medium">{activity.name}</span> <span className="font-normal">{activity.action}</span>
                </p>
                <p className="text-[12px] leading-[16px] text-[#737373] mt-0.5">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
