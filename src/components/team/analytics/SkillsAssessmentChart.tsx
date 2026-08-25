"use client";

import React from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { subject: "Technical", A: 85, fullMark: 100 },
  { subject: "Communication", A: 90, fullMark: 100 },
  { subject: "Problem Solving", A: 80, fullMark: 100 },
  { subject: "Collaboration", A: 95, fullMark: 100 },
  { subject: "Leadership", A: 75, fullMark: 100 },
  { subject: "Time Management", A: 88, fullMark: 100 },
];

export function SkillsAssessmentChart() {
  return (
    <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-6 shadow-sm flex flex-col h-full">
      <h2 className="text-[14px] font-bold text-[#111111] mb-6">Team Skills Assessment</h2>
      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="#E5E5E5" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: "#737373", fontSize: 11 }} />
            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "#A3A3A3", fontSize: 10 }} tickCount={5} />
            <Radar
              name="Team Average"
              dataKey="A"
              stroke="#0284C7"
              strokeWidth={2}
              fill="#0EA5E9"
              fillOpacity={0.2}
            />
            <Tooltip 
              contentStyle={{ borderRadius: "8px", border: "1px solid #E5E5E5", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
