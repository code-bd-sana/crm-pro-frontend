"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";

interface TopClient {
  name: string;
  value: number;
}

interface TopClientsChartProps {
  topClients?: TopClient[];
}

export function TopClientsChart({ topClients }: TopClientsChartProps) {
  const data = (topClients ?? []).slice(0, 5);
  const maxValue = data.length > 0 ? Math.max(...data.map((d) => d.value)) : 0;
  const xMax = maxValue > 0 ? Math.ceil(maxValue * 1.2 / 10000) * 10000 : 1000;

  return (
    <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-6 shadow-sm flex flex-col h-full">
      <h2 className="text-[14px] font-bold text-[#111111] mb-6">Top 5 Clients by Revenue</h2>
      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{
              top: 5,
              right: 10,
              left: 40,
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
              tickFormatter={(value: number) =>
                value >= 1000 ? `$${(value / 1000).toFixed(0)}k` : `$${value}`
              }
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
              formatter={(value: any) => [`$${Number(value).toLocaleString()}`, "Revenue"]}
            />
            <Bar dataKey="value" fill="#4477A1" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
