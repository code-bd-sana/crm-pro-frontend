"use client";

import { useState } from "react";
import { Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ProjectCard } from "@/components/projects/ProjectCard";

type Tab = "All" | "Active" | "On Hold" | "Completed";

const projectsData = [
  {
    id: 1,
    title: "Website Redesign",
    client: "Meridian Logistics",
    statusColor: "#FF6900",
    progress: 75,
    status: "Active" as const,
    dueDate: "Due Apr 12, 2026",
    team: ["SC", "MR", "EF"],
  },
  {
    id: 2,
    title: "Mobile App Launch",
    client: "Tectonic Studio",
    statusColor: "#FB2C36",
    progress: 60,
    status: "Active" as const,
    dueDate: "Due Apr 15, 2026",
    team: ["DK", "LA"],
  },
  {
    id: 3,
    title: "Q2 Marketing Campaign",
    client: "Pinnacle Marketing",
    statusColor: "#F0B100",
    progress: 40,
    status: "Active" as const,
    dueDate: "Due Apr 18, 2026",
    team: ["RC", "SC"],
  },
  {
    id: 4,
    title: "Data Migration",
    client: "Vaultline Finance",
    statusColor: "#FF6900",
    progress: 85,
    status: "Active" as const,
    dueDate: "Due Apr 20, 2026",
    team: ["MR", "DK", "EF"],
  },
  {
    id: 5,
    title: "Brand Guidelines",
    client: "Tectonic Studio",
    statusColor: "#99A1AF",
    progress: 30,
    status: "On Hold" as const,
    dueDate: "Due Apr 25, 2026",
    team: ["SC", "LA"],
  },
  {
    id: 6,
    title: "API Integration",
    client: "Apex Technologies",
    statusColor: "#F0B100",
    progress: 55,
    status: "Active" as const,
    dueDate: "Due Apr 30, 2026",
    team: ["SC", "MR", "EF"],
  },
];

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const tabs: Tab[] = ["All", "Active", "On Hold", "Completed"];

  const filteredProjects = activeTab === "All"
    ? projectsData
    : projectsData.filter((p) => p.status === activeTab);

  return (
    <div className="flex flex-col px-6 pt-6 gap-6 w-full pb-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-[#111111] font-semibold text-[24px] leading-[32px]">Projects</h1>
          <p className="text-[#737373] font-normal text-[14px] leading-[20px]">
            {filteredProjects.length} projects
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-[#0891B2] hover:bg-[#0891B2]/90 text-white rounded-[4px] h-[36px] px-4 transition-colors">
          <Plus className="w-4 h-4" />
          <span className="font-medium text-[14px]">New Project</span>
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex items-center justify-between">
        <div className="relative w-[320px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]" />
          <Input
            placeholder="Search projects..."
            className="w-full pl-9 h-9 border-[#E5E5E5] focus-visible:ring-[#0891B2] bg-[#FFFFFF] text-[#111111] placeholder:text-[#737373]"
          />
        </div>
        <button className="flex items-center justify-center gap-2 bg-[#FAFAFA] border border-[#E5E5E5] hover:bg-gray-100 text-[#111111] rounded-[4px] h-[36px] px-4 transition-colors">
          <Filter className="w-4 h-4 text-[#737373]" />
          <span className="font-medium text-[14px]">Filter</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="inline-flex items-center p-1 bg-[#F5F5F5] rounded-[10px] w-fit">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-[8px] font-medium text-[14px] transition-colors ${
              activeTab === tab
                ? "bg-[#FFFFFF] text-[#111111] shadow-sm"
                : "text-[#727272] hover:text-[#111111]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

    </div>
  );
}
