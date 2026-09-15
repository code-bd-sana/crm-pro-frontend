"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { NewProjectDialog } from "@/components/projects/NewProjectDialog";
import { PermissionGuard } from "@/components/shared/PermissionGuard";
import { PermissionEnum } from "@/types/auth.types";
import { getProjects } from "@/services/project.service";
import { ProjectStatus } from "@/types/models.types";
import { useDebounce } from "@/hooks/useDebounce";

type Tab = "All" | "Active" | "On Hold" | "Completed";

const TAB_STATUS: Record<Exclude<Tab, "All">, ProjectStatus> = {
  "Active": ProjectStatus.ACTIVE,
  "On Hold": ProjectStatus.ON_HOLD,
  "Completed": ProjectStatus.COMPLETED,
};

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const tabs: Tab[] = ["All", "Active", "On Hold", "Completed"];
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const [page, setPage] = useState(1);
  const [limit] = useState(12);

  const status = activeTab === "All" ? undefined : TAB_STATUS[activeTab];

  const { data: projectsData, isLoading } = useQuery({
    queryKey: ["projects", page, limit, debouncedSearch, status],
    queryFn: () => getProjects({ page, limit, search: debouncedSearch || undefined, status }),
  });

  const projects = projectsData?.data ?? [];
  const total = projectsData?.meta?.total ?? 0;
  const totalPages = projectsData?.meta?.totalPages ?? 1;

  return (
    <div className="flex flex-col px-6 pt-6 gap-6 w-full pb-6">

      <NewProjectDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-[#111111] font-semibold text-[24px] leading-[32px]">Projects</h1>
          <p className="text-[#737373] font-normal text-[14px] leading-[20px]">
            {total} project{total === 1 ? "" : "s"}
          </p>
        </div>
        <PermissionGuard permission={PermissionEnum.PROJECTS_CREATE}>
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="flex items-center justify-center gap-2 bg-[#0891B2] hover:bg-[#0891B2]/90 text-white rounded-[4px] h-9 px-4 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className="font-medium text-[14px]">New Project</span>
          </Button>
        </PermissionGuard>
      </div>

      {/* Search & Filter */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
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
            onClick={() => {
              setActiveTab(tab);
              setPage(1);
            }}
            className={`px-4 py-1.5 rounded-[8px] font-medium text-[14px] transition-colors ${activeTab === tab
              ? "bg-[#FFFFFF] text-[#111111] shadow-sm"
              : "text-[#727272] hover:text-[#111111]"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Project Cards Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-[260px] rounded-[10px]" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <h3 className="text-[16px] font-medium text-[#111111]">No projects found</h3>
          <p className="text-[14px] text-[#737373] mt-1">
            {searchTerm ? "Try adjusting your search." : "Create your first project to get started."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}

      {/* Pagination Footer */}
      {total > limit && (
        <div className="flex items-center justify-between">
          <p className="text-[14px] text-[#737373]">
            Page {page} of {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="h-8 text-[13px] text-[#111111] border-[#E5E5E5] hover:bg-[#F8FAFC]"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= totalPages}
              className="h-8 text-[13px] text-[#111111] border-[#E5E5E5] hover:bg-[#F8FAFC]"
            >
              Next
            </Button>
          </div>
        </div>
      )}

    </div>
  );
}
