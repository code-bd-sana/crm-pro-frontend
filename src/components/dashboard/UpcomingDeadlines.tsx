import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const upcomingDeadlinesData = [
  { title: "Website Redesign", due: "Due Apr 12, 2026", progress: 75, assignees: ["SC", "MR", "EF"] },
  { title: "Mobile App Launch", due: "Due Apr 15, 2026", progress: 60, assignees: ["LA", "DK"] },
  { title: "Q2 Marketing Campaign", due: "Due Apr 18, 2026", progress: 40, assignees: ["RC", "SC"] },
  { title: "Data Migration", due: "Due Apr 20, 2026", progress: 85, assignees: ["MR", "DK", "EF"] },
];

export function UpcomingDeadlines() {
  return (
    <Card className="bg-[#FFFFFF] border-[#E5E5E5] shadow-none rounded-[10px] mb-6">
      <CardHeader className="h-[46px] p-6 pb-0 flex justify-center">
        <CardTitle className="text-[16px] leading-[16px] font-medium text-[#111111]">Upcoming Deadlines</CardTitle>
      </CardHeader>
      <CardContent className="px-6 pt-[25px] pb-6">
        <div className="flex flex-col gap-4">
          {upcomingDeadlinesData.map((item, index) => (
            <div key={index} className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[#111111] font-medium text-[14px] leading-[20px]">{item.title}</p>
                  <p className="text-[#737373] font-normal text-[12px] leading-[16px]">{item.due}</p>
                </div>
                <div className="flex -space-x-2">
                  {item.assignees.map((assignee, i) => (
                    <div key={i} className="w-6 h-6 rounded-full bg-[#0891B2]/10 border-2 border-white flex items-center justify-center relative">
                      <span className="text-[#0891B2] text-[10px] font-medium">{assignee}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-[#F5F5F5] rounded-full h-1.5">
                <div className="bg-[#0891B2] h-1.5 rounded-full" style={{ width: `${item.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
