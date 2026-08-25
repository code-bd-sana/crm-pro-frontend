"use client";

import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Oct", score: 85 },
  { name: "Nov", score: 87 },
  { name: "Dec", score: 92 },
  { name: "Jan", score: 86 },
  { name: "Feb", score: 91 },
  { name: "Mar", score: 95 },
];

export function PerformanceTrendChart() {
  return (
    <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-6 shadow-sm flex flex-col h-full">
      <h2 className="text-[14px] font-bold text-[#111111] mb-6">Performance Trend</h2>
      <div className="flex-1 w-full min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E5E5" />
            <XAxis 
              dataKey="name" 
              axisLine={true} 
              tickLine={true} 
              tick={{ fontSize: 12, fill: "#737373" }} 
              stroke="#E5E5E5"
            />
            <YAxis 
              axisLine={true} 
              tickLine={true} 
              tick={{ fontSize: 12, fill: "#737373" }} 
              ticks={[0, 25, 50, 75, 100]}
              domain={[0, 100]}
              stroke="#E5E5E5"
            />
            <Tooltip 
              contentStyle={{ borderRadius: "8px", border: "1px solid #E5E5E5", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}
              itemStyle={{ color: "#0284C7", fontWeight: 600 }}
            />
            <Line
              type="linear"
              dataKey="score"
              stroke="#0284C7"
              strokeWidth={2}
              dot={{ r: 4, fill: "#FFFFFF", stroke: "#0284C7", strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
