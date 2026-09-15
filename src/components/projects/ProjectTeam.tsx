"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/types/models.types";

export function ProjectTeam({ project }: { project: Project }) {
  const members = project.members ?? [];

  return (
    <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-[16px] font-semibold text-[#111111]">Team</h3>
        <span className="text-[13px] text-[#737373]">{members.length} member{members.length === 1 ? "" : "s"}</span>
      </div>

      {members.length === 0 ? (
        <p className="text-[14px] text-[#737373] py-4 text-center">
          No team members assigned. Add members from the Settings tab.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {members.map((member) => {
            const initials =
              `${member.profile?.firstName?.charAt(0) ?? ""}${member.profile?.lastName?.charAt(0) ?? ""}`.toUpperCase() || "U";
            return (
              <div
                key={member.id}
                className="flex items-center gap-3 border border-[#E5E5E5] rounded-[6px] px-4 py-3"
              >
                <Avatar className="w-9 h-9 rounded-full border border-[#E5E5E5]">
                  <AvatarImage src={member.profile?.avatarUrl} />
                  <AvatarFallback className="bg-[#0891B2]/10 text-[#0891B2] text-[12px] font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0 flex flex-col">
                  <span className="text-[14px] font-medium text-[#111111] truncate">
                    {member.profile?.firstName} {member.profile?.lastName}
                  </span>
                  <span className="text-[12px] text-[#737373] truncate">{member.email}</span>
                </div>
                <div className="flex gap-1 shrink-0">
                  {(member.roles ?? []).slice(0, 1).map((role) => (
                    <Badge
                      key={role.id}
                      className="bg-[#F1F5F9] text-[#475569] hover:bg-[#F1F5F9] border-transparent font-medium rounded-[4px] shadow-none"
                    >
                      {role.name}
                    </Badge>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
