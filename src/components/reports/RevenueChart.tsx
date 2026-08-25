"use client";

import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Mar 12", revenue: 18500 },
  { name: "Mar 16", revenue: 21000 },
  { name: "Mar 20", revenue: 20000 },
  { name: "Mar 24", revenue: 23500 },
  { name: "Mar 28", revenue: 23000 },
  { name: "Apr 1",  revenue: 26000 },
  { name: "Apr 5",  revenue: 25500 },
  { name: "Apr 9",  revenue: 28000 },
];

export function RevenueChart() {
  return (
    <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-6 shadow-sm flex flex-col h-full">
      <h2 className="text-[14px] font-bold text-[#111111] mb-6">Revenue Over Time</h2>
      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={true} stroke="#E5E5E5" />
            <XAxis 
              dataKey="name" 
              axisLine={true} 
              tickLine={true} 
              tick={{ fontSize: 11, fill: "#737373" }} 
              stroke="#E5E5E5"
            />
            <YAxis 
              axisLine={true} 
              tickLine={true} 
              tick={{ fontSize: 11, fill: "#737373" }} 
              ticks={[0, 7000, 14000, 21000, 28000]}
              domain={[0, 28000]}
              stroke="#E5E5E5"
            />
            <Tooltip 
              contentStyle={{ borderRadius: "8px", border: "1px solid #E5E5E5", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}
              itemStyle={{ color: "#0284C7", fontWeight: 600 }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#0284C7"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
