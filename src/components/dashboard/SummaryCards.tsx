import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  FolderKanban,
  CheckSquare,
  BarChart2,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import type { DashboardSummary } from "@/services/analytics.service";

interface SummaryCardsProps {
  summary?: DashboardSummary;
}

function formatCurrency(value: number): string {
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(1)}k`;
  }
  return `$${value.toFixed(0)}`;
}

export function SummaryCards({ summary }: SummaryCardsProps) {
  const data = [
    {
      title: "Total Clients",
      value: String(summary?.totalClients ?? 0),
      change: "+0",
      icon: Users,
      isPositive: true,
    },
    {
      title: "Active Projects",
      value: String(summary?.activeProjects ?? 0),
      change: "+0",
      icon: FolderKanban,
      isPositive: true,
    },
    {
      title: "Tasks Due Today",
      value: String(summary?.tasksDueToday ?? 0),
      change: "-0",
      icon: CheckSquare,
      isPositive: false,
    },
    {
      title: "Revenue This Month",
      value: formatCurrency(summary?.revenueThisMonth ?? 0),
      change: "+0%",
      icon: BarChart2,
      isPositive: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {data.map((item) => {
        const Icon = item.icon;
        const TrendIcon = item.isPositive ? TrendingUp : TrendingDown;
        return (
          <Card key={item.title} className="bg-[#FFFFFF] border-[#E5E5E5] shadow-none rounded-[10px] h-[142px]">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-2">
                  <p className="text-[#737373] text-[14px] leading-[20px] font-normal">{item.title}</p>
                  <h3 className="text-[#111111] text-[30px] leading-[36px] font-semibold">{item.value}</h3>
                  <div className="flex items-center gap-1">
                    <TrendIcon className={`w-4 h-4 ${item.isPositive ? 'text-green-500' : 'text-red-500'}`} />
                    <span className="text-[14px] leading-[20px] font-normal text-[#111111]">
                      {item.change}
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 flex items-center justify-center bg-[#0891B2]/10 rounded-md">
                  <Icon className="w-6 h-6 text-[#0891B2]" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
