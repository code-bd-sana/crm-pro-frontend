"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Ryan Cooper", tasks: 25 },
  { name: "Lisa Anderson", tasks: 28 },
  { name: "Emily Foster", tasks: 32 },
  { name: "Marcus Rodriguez", tasks: 34 },
  { name: "David Kim", tasks: 38 },
  { name: "Sarah Chen", tasks: 41 },
];

export function TaskCompletionChart() {
  return (
    <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-6 shadow-sm flex flex-col h-full">
      <h2 className="text-[14px] font-bold text-[#111111] mb-6">Task Completion by Member</h2>
      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{
              top: 5,
              right: 10,
              left: 35,
              bottom: 0,
            }}
            barSize={20}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E5E5" />
            <XAxis 
              type="number"
              axisLine={true} 
              tickLine={true} 
              tick={{ fontSize: 11, fill: "#737373" }} 
              ticks={[0, 15, 30, 45, 60]}
              domain={[0, 60]}
              stroke="#E5E5E5"
            />
            <YAxis 
              dataKey="name" 
              type="category"
              axisLine={true} 
              tickLine={true} 
              tick={{ fontSize: 11, fill: "#737373" }} 
              stroke="#E5E5E5"
            />
            <Tooltip 
              cursor={{ fill: "#F5F5F5" }}
              contentStyle={{ borderRadius: "8px", border: "1px solid #E5E5E5", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}
            />
            <Bar dataKey="tasks" fill="#65A34E" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
