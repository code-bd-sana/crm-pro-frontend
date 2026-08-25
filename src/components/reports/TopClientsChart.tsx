"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Tectonic Studio", revenue: 32000 },
  { name: "Pinnacle Marketing", revenue: 41000 },
  { name: "Meridian Logistics", revenue: 48000 },
  { name: "Silverstone Corp", revenue: 55000 },
  { name: "Vaultline Finance", revenue: 67000 },
];

export function TopClientsChart() {
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
              ticks={[0, 20000, 40000, 60000, 80000]}
              domain={[0, 80000]}
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
              formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
            />
            <Bar dataKey="revenue" fill="#4477A1" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
