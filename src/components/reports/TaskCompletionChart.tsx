"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";

interface TaskCompletionMember {
  name: string;
  completed: number;
}

interface TaskCompletionChartProps {
  taskCompletionByMember?: TaskCompletionMember[];
}

export function TaskCompletionChart({ taskCompletionByMember }: TaskCompletionChartProps) {
  const data = (taskCompletionByMember ?? []).slice(0, 6);
  const maxValue = data.length > 0 ? Math.max(...data.map((d) => d.completed)) : 0;
  const xMax = maxValue > 0 ? Math.ceil(maxValue * 1.2 / 5) * 5 : 10;

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
              domain={[0, xMax]}
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
            <Bar dataKey="completed" fill="#65A34E" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
