"use client";

import Link from "next/link";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import type { Project, ProjectStatus } from "@/types/models.types";

const STATUS_CONFIG: Record<ProjectStatus, { label: string; color: string; badge: string }> = {
  ACTIVE: { label: "Active", color: "#10B981", badge: "bg-[#ECFDF5] text-[#10B981]" },
  ON_HOLD: { label: "On Hold", color: "#F59E0B", badge: "bg-[#FFFBEB] text-[#D97706]" },
  COMPLETED: { label: "Completed", color: "#3B82F6", badge: "bg-[#EFF6FF] text-[#3B82F6]" },
  CANCELLED: { label: "Cancelled", color: "#EF4444", badge: "bg-[#FEF2F2] text-[#EF4444]" },
};

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const status = STATUS_CONFIG[project.status] ?? STATUS_CONFIG.ACTIVE;

  const memberInitials = (project.members ?? []).slice(0, 4).map((member) =>
    `${member.profile?.firstName?.charAt(0) ?? ""}${member.profile?.lastName?.charAt(0) ?? ""}`.toUpperCase() || "U"
  );

  return (
    <Link href={`/projects/${project.id}`} className="block group">
      <Card className="bg-[#FFFFFF] border-[#E5E5E5] shadow-none rounded-[10px] transition-colors group-hover:border-[#0891B2]/40">
        <CardContent className="p-6 pt-6 flex flex-col gap-4">

          {/* Title, Client & Status Dot */}
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-1">
              <h3 className="text-[#111111] font-semibold text-[18px] leading-[27px] group-hover:text-[#0891B2] transition-colors">
                {project.title}
              </h3>
              <p className="text-[#737373] font-normal text-[14px] leading-[20px]">
                {project.client?.companyName ?? "—"}
              </p>
            </div>
            <div
              className="w-2 h-2 rounded-full mt-2.5 flex-shrink-0"
              style={{ backgroundColor: status.color }}
            />
          </div>

          {/* Progress */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[#737373] font-normal text-[14px] leading-[20px]">Progress</span>
              <span className="text-[#111111] font-medium text-[14px] leading-[20px]">
                {project.progress}%
              </span>
            </div>
            <div className="w-full h-2 bg-[#0891B2]/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#0891B2] rounded-full transition-all duration-300"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>

          {/* Status Badge & Due Date */}
          <div className="flex items-center justify-between">
            <span className={`inline-flex items-center px-2 py-0.5 rounded-[4px] font-medium text-[12px] leading-[16px] ${status.badge}`}>
              {status.label}
            </span>
            <span className="text-[#737373] font-normal text-[12px] leading-[16px]">
              {project.dueDate ? `Due ${format(new Date(project.dueDate), "MMM d, yyyy")}` : "No due date"}
            </span>
          </div>

          {/* Team Avatars */}
          {memberInitials.length > 0 && (
            <div className="flex items-center">
              {memberInitials.map((initials, index) => (
                <div
                  key={index}
                  className="w-7 h-7 rounded-full bg-[#0891B2]/10 flex items-center justify-center border-2 border-white"
                  style={{ marginLeft: index > 0 ? "-8px" : "0" }}
                >
                  <span className="text-[#0891B2] font-normal text-[10px] leading-[15px]">
                    {initials}
                  </span>
                </div>
              ))}
              {(project.members?.length ?? 0) > 4 && (
                <div
                  className="w-7 h-7 rounded-full bg-[#F1F5F9] flex items-center justify-center border-2 border-white"
                  style={{ marginLeft: "-8px" }}
                >
                  <span className="text-[#737373] font-normal text-[10px] leading-[15px]">
                    +{(project.members?.length ?? 0) - 4}
                  </span>
                </div>
              )}
            </div>
          )}

        </CardContent>
      </Card>
    </Link>
  );
}
