"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface ProjectStatusItem {
  status: string;
  count: number;
}

interface ProjectStatusChartProps {
  projectStatus?: ProjectStatusItem[];
  totalProjects?: number;
}

const STATUS_COLORS: Record<string, string> = {
  ACTIVE: "#0891B2",
  ON_HOLD: "#D97706",
  COMPLETED: "#65A34E",
  CANCELLED: "#EF4444",
};

const STATUS_LABELS: Record<string, string> = {
  ACTIVE: "Active",
  ON_HOLD: "On Hold",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export function ProjectStatusChart({ projectStatus, totalProjects = 0 }: ProjectStatusChartProps) {
  const data = (projectStatus ?? [])
    .filter((item) => item.count > 0)
    .map((item) => ({
      name: STATUS_LABELS[item.status] ?? item.status,
      value: totalProjects > 0 ? Math.round((item.count / totalProjects) * 100) : 0,
      raw: item.count,
      color: STATUS_COLORS[item.status] ?? "#737373",
    }));

  return (
    <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-6 shadow-sm flex flex-col h-full">
      <h2 className="text-[14px] font-bold text-[#111111] mb-6">Project Status Distribution</h2>

      <div className="flex-1 w-full min-h-[250px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ borderRadius: "8px", border: "1px solid #E5E5E5", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}
              formatter={(_value, _name, props) => [`${(props as any)?.payload?.raw} projects`, (props as any)?.payload?.name]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Custom Legend */}
      <div className="flex justify-center items-center gap-6 mt-4 pt-4 flex-wrap">
        {data.map((entry, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
            <span className="text-[12px] text-[#737373] font-medium">
              <span className="text-[#111111]">{entry.name}</span> {entry.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
