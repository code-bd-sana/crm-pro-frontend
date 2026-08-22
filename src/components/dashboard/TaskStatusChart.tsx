"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const taskStatusData = [
  { name: "To Do", value: 32, color: "#F59E0B" },
  { name: "In Progress", value: 45, color: "#3B82F6" },
  { name: "Done", value: 23, color: "#22C55E" },
];

export function TaskStatusChart() {
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
