import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import type { DashboardDeadline } from "@/services/analytics.service";

interface UpcomingDeadlinesProps {
  deadlines?: DashboardDeadline[];
}

const priorityConfig: Record<string, { label: string; color: string; bg: string }> = {
  LOW: { label: "Low", color: "text-[#475569]", bg: "bg-[#F1F5F9]" },
  MEDIUM: { label: "Medium", color: "text-[#A16207]", bg: "bg-[#FEF9C3]" },
  HIGH: { label: "High", color: "text-[#C2410C]", bg: "bg-[#FFEDD5]" },
  CRITICAL: { label: "Critical", color: "text-[#B91C1C]", bg: "bg-[#FEE2E2]" },
};

export function UpcomingDeadlines({ deadlines }: UpcomingDeadlinesProps) {
  const items = deadlines ?? [];

  return (
    <Card className="bg-[#FFFFFF] border-[#E5E5E5] shadow-none rounded-[10px] mb-6">
      <CardHeader className="h-[46px] p-6 pb-0 flex justify-center">
        <CardTitle className="text-[16px] leading-[16px] font-medium text-[#111111]">Upcoming Deadlines</CardTitle>
      </CardHeader>
      <CardContent className="px-6 pt-[25px] pb-6">
        <div className="flex flex-col gap-4">
          {items.length === 0 ? (
            <div className="text-center text-[#737373] text-sm py-6">
              No upcoming deadlines in the next 7 days.
            </div>
          ) : (
            items.map((item) => {
              const priority = priorityConfig[item.priority] ?? priorityConfig.MEDIUM;
              return (
                <div key={item.id} className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="text-[#111111] font-medium text-[14px] leading-[20px]">{item.title}</p>
                        <p className="text-[#737373] font-normal text-[12px] leading-[16px]">
                          {item.projectTitle ? `${item.projectTitle} · ` : ""}
                          Due {format(new Date(item.dueDate), "MMM d, yyyy")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-[11px] font-medium px-2 py-0.5 rounded-[4px] ${priority.bg} ${priority.color}`}>
                        {priority.label}
                      </span>
                      {item.assigneeName && (
                        <div className="w-6 h-6 rounded-full bg-[#0891B2]/10 border border-white flex items-center justify-center">
                          <span className="text-[#0891B2] text-[10px] font-medium">
                            {item.assigneeName.split(" ").map((n) => n[0]).join("").toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="w-full bg-[#F5F5F5] rounded-full h-1.5" />
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
