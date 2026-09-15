"use client";

import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import type { RevenueMonth } from "@/services/analytics.service";

interface ReportsRevenueChartProps {
  data?: RevenueMonth[];
}

export function RevenueChart({ data = [] }: ReportsRevenueChartProps) {
  const chartData = data.length > 0 ? data : [];

  const maxValue = chartData.length > 0 ? Math.max(...chartData.map((d) => d.value)) : 0;
  const yMax = maxValue > 0 ? Math.ceil(maxValue * 1.2 / 5000) * 5000 : 1000;

  return (
    <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-6 shadow-sm flex flex-col h-full">
      <h2 className="text-[14px] font-bold text-[#111111] mb-6">Revenue Over Time</h2>
      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
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
              domain={[0, yMax]}
              tickFormatter={(value: number) =>
                value >= 1000 ? `$${(value / 1000).toFixed(0)}k` : `$${value}`
              }
              stroke="#E5E5E5"
            />
            <Tooltip
              contentStyle={{ borderRadius: "8px", border: "1px solid #E5E5E5", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}
              itemStyle={{ color: "#0284C7", fontWeight: 600 }}
              formatter={(value: any) => [`$${Number(value).toLocaleString()}`, "Revenue"]}
            />
            <Line
              type="monotone"
              dataKey="value"
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
