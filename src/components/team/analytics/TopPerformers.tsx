"use client";

import React from "react";

const performers = [
  { id: 1, name: "Sarah Chen", role: "Design", tasks: 42, score: 95, initials: "SC" },
  { id: 2, name: "David Kim", role: "Engineering", tasks: 38, score: 92, initials: "DK" },
  { id: 3, name: "Marcus Rodriguez", role: "Sales", tasks: 35, score: 89, initials: "MR" },
];

export function TopPerformers() {
  return (
    <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-6 shadow-sm mt-4">
      <h2 className="text-[14px] font-bold text-[#111111] mb-6">Top Performers This Month</h2>
      
      <div className="flex flex-col gap-4">
        {performers.map((person, index) => (
          <div key={person.id} className="flex items-center justify-between border border-[#E5E5E5] rounded-[8px] p-4">
            
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-[#F1F5F9] text-[#0369A1] font-bold flex items-center justify-center text-[14px]">
                {index + 1}
              </div>
              <div className="w-[42px] h-[42px] rounded-full bg-[#E0F2FE] text-[#0369A1] flex items-center justify-center font-medium text-[16px]">
                {person.initials}
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-bold text-[#111111]">{person.name}</span>
                <span className="text-[12px] text-[#737373]">{person.role}</span>
              </div>
            </div>

            <div className="flex items-center gap-6 text-center">
              <div className="flex flex-col">
                <span className="text-[18px] font-bold text-[#111111]">{person.tasks}</span>
                <span className="text-[11px] text-[#737373]">Tasks</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[18px] font-bold text-[#111111]">{person.score}</span>
                <span className="text-[11px] text-[#737373]">Score</span>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
