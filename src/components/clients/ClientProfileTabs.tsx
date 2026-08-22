"use client";

import { useState } from "react";
import { ClientSummaryCards } from "./overview/ClientSummaryCards";
import { RecentCommunications } from "./overview/RecentCommunications";
import { ClientNotes } from "./overview/ClientNotes";

type Tab = "Overview" | "Projects" | "Invoices" | "Activity";

export function ClientProfileTabs() {
  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  const tabs: Tab[] = ["Overview", "Projects", "Invoices", "Activity"];

  return (
    <div className="flex flex-col gap-6 mt-2">
      <div className="inline-flex items-center p-1 bg-[#F5F5F5] rounded-[10px] w-fit">
        {tabs.map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-[8px] font-medium text-[14px] transition-colors ${
              activeTab === tab 
                ? "bg-[#FFFFFF] text-[#111111] shadow-sm" 
                : "text-[#737373] hover:text-[#111111]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex flex-col gap-6">
        {activeTab === "Overview" && (
          <>
            <ClientSummaryCards />
            <RecentCommunications />
            <ClientNotes />
          </>
        )}
        
        {activeTab === "Projects" && (
          <div className="p-6 bg-white border border-[#E5E5E5] rounded-[10px] text-[#737373] text-center">
            Projects coming soon...
          </div>
        )}
        
        {activeTab === "Invoices" && (
          <div className="p-6 bg-white border border-[#E5E5E5] rounded-[10px] text-[#737373] text-center">
            Invoices coming soon...
          </div>
        )}
        
        {activeTab === "Activity" && (
          <div className="p-6 bg-white border border-[#E5E5E5] rounded-[10px] text-[#737373] text-center">
            Activity history coming soon...
          </div>
        )}
      </div>
    </div>
  );
}
