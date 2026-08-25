"use client";

import React from "react";

const data = [
  { 
    name: "Engineering", 
    members: 3, 
    productivity: 88, 
    satisfaction: 92 
  },
  { 
    name: "Design", 
    members: 2, 
    productivity: 92, 
    satisfaction: 95 
  },
  { 
    name: "Sales", 
    members: 2, 
    productivity: 85, 
    satisfaction: 88 
  },
  { 
    name: "Marketing", 
    members: 2, 
    productivity: 90, 
    satisfaction: 91 
  },
];

export function DepartmentPerformance() {
  return (
    <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-6 shadow-sm flex flex-col h-full">
      <h2 className="text-[14px] font-bold text-[#111111] mb-6">Department Performance</h2>
      
      <div className="flex flex-col gap-6">
        {data.map((dept, idx) => (
          <div key={idx} className="flex flex-col gap-3">
            
            <div className="flex justify-between items-center border-b border-[#E5E5E5] pb-2">
              <div className="flex flex-col">
                <span className="text-[14px] font-bold text-[#111111]">{dept.name}</span>
                <span className="text-[12px] text-[#737373]">{dept.members} members</span>
              </div>
              <span className="text-[14px] font-bold text-[#111111]">{dept.productivity}%</span>
            </div>

            {/* Productivity Bar */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center text-[11px] font-medium text-[#737373]">
                <span>Productivity</span>
                <span>{dept.productivity}%</span>
              </div>
              <div className="w-full bg-[#E0F2FE] h-[6px] rounded-full overflow-hidden">
                <div 
                  className="bg-[#0369A1] h-full rounded-full" 
                  style={{ width: `${dept.productivity}%` }}
                />
              </div>
            </div>

            {/* Satisfaction Bar */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center text-[11px] font-medium text-[#737373]">
                <span>Satisfaction</span>
                <span>{dept.satisfaction}%</span>
              </div>
              <div className="w-full bg-[#E0F2FE] h-[6px] rounded-full overflow-hidden">
                <div 
                  className="bg-[#0EA5E9] h-full rounded-full" 
                  style={{ width: `${dept.satisfaction}%` }}
                />
              </div>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}
