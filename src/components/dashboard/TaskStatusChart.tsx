"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

interface TasksByStatus {
  todo: number;
  inProgress: number;
  done: number;
}

interface TaskStatusChartProps {
  tasksByStatus?: TasksByStatus;
  isLoading?: boolean;
}

export function TaskStatusChart({ tasksByStatus, isLoading }: TaskStatusChartProps) {
  if (isLoading) {
    return (
      <Card className="bg-[#FFFFFF] border-[#E5E5E5] shadow-none rounded-[10px] h-[432px]">
        <CardHeader className="h-[46px] p-6 pb-0 flex justify-center">
          <CardTitle className="text-[16px] leading-[16px] font-medium text-[#111111]">Task Status</CardTitle>
        </CardHeader>
        <CardContent className="px-6 pt-[25px]">
          <Skeleton className="h-[300px] w-full rounded-[10px]" />
        </CardContent>
      </Card>
    );
  }

  const todo = tasksByStatus?.todo ?? 0;
  const inProgress = tasksByStatus?.inProgress ?? 0;
  const done = tasksByStatus?.done ?? 0;
  const total = todo + inProgress + done;

  const taskStatusData = [
    { name: "To Do", value: total > 0 ? Math.round((todo / total) * 100) : 0, raw: todo, color: "#F59E0B" },
    { name: "In Progress", value: total > 0 ? Math.round((inProgress / total) * 100) : 0, raw: inProgress, color: "#3B82F6" },
    { name: "Done", value: total > 0 ? Math.round((done / total) * 100) : 0, raw: done, color: "#22C55E" },
  ];

  return (
    <Card className="bg-[#FFFFFF] border-[#E5E5E5] shadow-none rounded-[10px] h-[432px]">
      <CardHeader className="h-[46px] p-6 pb-0 flex justify-center">
        <CardTitle className="text-[16px] leading-[16px] font-medium text-[#111111]">Task Status</CardTitle>
      </CardHeader>
      <CardContent className="px-6 pt-[25px]">
        <div className="flex flex-col items-center justify-center h-[300px] w-full">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={taskStatusData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={110}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {taskStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ borderRadius: '8px', border: '1px solid #E5E5E5', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                formatter={(_value, _name, props) => [`${(props as any)?.payload?.raw} tasks`, (props as any)?.payload?.name]}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Custom Legend */}
          <div className="flex items-center justify-center gap-6 mt-6 w-full">
            {taskStatusData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-[#737373] text-[14px] leading-[20px] font-normal">
                  {item.name} <span className="font-medium text-[#737373]">{item.value}%</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
