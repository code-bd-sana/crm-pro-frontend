"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Filter, Plus, MoreHorizontal, Mail, Phone, BarChart2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AddTeamMemberModal } from "@/components/team/AddTeamMemberModal";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/services/user.service";
import { useRBAC } from "@/hooks/useRBAC";
import { Skeleton } from "@/components/ui/skeleton";

export default function TeamPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  
  const { canManageUsers } = useRBAC();

  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  const filteredTeam = users?.filter((member) => {
    const matchesSearch = 
      (member.profile?.firstName + " " + member.profile?.lastName).toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.roles?.some(role => role.name.toLowerCase().includes(searchQuery.toLowerCase()));
      
    const matchesTab = activeTab === "All" || member.roles?.some(role => role.name === activeTab.toUpperCase());
    
    return matchesSearch && matchesTab;
  }) || [];

  const getInitials = (firstName?: string, lastName?: string) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase() || 'U';
  };

  return (
    <div className="flex flex-col flex-1 px-6 pt-6 pb-6 gap-6 h-full w-full bg-[#FAFAFA] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-[#111111] font-semibold text-[24px] leading-[32px]">Team</h1>
          <p className="text-[#737373] text-[14px]">{users?.length || 0} team members</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/team/analytics">
            <Button variant="outline" className="border-[#E5E5E5] bg-white text-[#111111] font-medium h-[36px] px-4 hover:bg-[#F8FAFC] rounded-[3px]">
              <BarChart2 className="w-4 h-4 mr-2" />
              Analytics
            </Button>
          </Link>
          {canManageUsers && (
            <Button 
              onClick={() => setIsAddMemberOpen(true)}
              className="bg-[#0891B2] hover:bg-[#0E7490] text-white rounded-[3px] h-[36px] px-4 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              <span className="font-medium text-[14px]">Add Team Member</span>
            </Button>
          )}
        </div>
      </div>

      {/* Controls Container (Search & Filter) */}
      <div className="flex items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]" />
          <Input
            placeholder="Search team members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 h-9 border-[#E5E5E5] focus-visible:ring-[#0891B2] bg-[#FFFFFF] text-[#111111] placeholder:text-[#737373] rounded-[3px]"
          />
        </div>

        {/* Filter Button */}
        <Button variant="outline" className="bg-[#FAFAFA] border-[#E5E5E5] hover:bg-[#F5F5F5] text-[#111111] rounded-[3px] h-[36px] px-4 transition-colors shrink-0">
          <Filter className="w-4 h-4 mr-2 text-[#737373]" />
          <span className="font-medium text-[14px]">Filter</span>
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-[#E5E5E5] pb-[1px]">
        {["All", "Managers", "Staff"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-[14px] font-medium transition-colors relative ${
              activeTab === tab
                ? "text-[#111111]"
                : "text-[#737373] hover:text-[#111111]"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#111111]" />
            )}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white border border-[#E5E5E5] rounded-[10px] p-6 flex flex-col shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-[42px] h-[42px] rounded-full" />
                  <div className="flex flex-col gap-2">
                    <Skeleton className="w-24 h-4" />
                    <Skeleton className="w-16 h-3" />
                  </div>
                </div>
              </div>
              <Skeleton className="w-full h-10 mt-4" />
            </div>
          ))
        ) : error ? (
          <div className="col-span-full py-10 text-center text-red-500">
            Failed to load team members.
          </div>
        ) : filteredTeam.length === 0 ? (
          <div className="col-span-full py-10 text-center text-[#737373]">
            No team members found matching "{searchQuery}"
          </div>
        ) : (
          filteredTeam.map((member) => (
            <div
              key={member.id}
              className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-[10px] p-6 flex flex-col shadow-sm hover:border-[#0891B2] transition-colors group"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-[42px] h-[42px] rounded-full bg-[#E0F2FE] text-[#0369A1] flex items-center justify-center font-medium text-[16px]">
                    {getInitials(member.profile?.firstName, member.profile?.lastName)}
                  </div>
                  <div className="flex flex-col">
                    <Link 
                      href={`/team/${member.id}`} 
                      className="text-[16px] font-bold text-[#111111] hover:text-[#0891B2] hover:underline transition-colors"
                    >
                      {member.profile?.firstName} {member.profile?.lastName}
                    </Link>
                    <div className="flex items-center gap-2 text-[13px] text-[#737373] mt-0.5">
                      <span>{member.department?.name || 'No Department'}</span>
                      <span className="w-1 h-1 rounded-full bg-[#D4D4D8]"></span>
                      <span>{member.roles?.map(r => r.name).join(', ') || 'No Role'}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {canManageUsers && (
                    <button className="text-[#A3A3A3] hover:text-[#111111] transition-colors focus:outline-none focus:ring-1 focus:ring-[#0891B2] rounded-[3px] p-0.5">
                      <MoreHorizontal className="w-[18px] h-[18px]" />
                    </button>
                  )}
                  <Badge
                    variant="outline"
                    className={`font-medium px-2 py-0.5 rounded-[4px] text-[11px] border ${
                      member.isActive
                        ? "bg-[#F0FDF4] text-[#166534] border-[#BBF7D0]"
                        : "bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]"
                    }`}
                  >
                    {member.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>

              {/* Contact Info */}
              <div className="flex flex-col gap-2 mt-2 pt-4 border-t border-[#FAFAFA]">
                <div className="flex items-center gap-2.5 text-[13px] text-[#525252]">
                  <Mail className="w-4 h-4 text-[#A3A3A3]" />
                  <a href={`mailto:${member.email}`} className="hover:text-[#0891B2] hover:underline transition-colors truncate">
                    {member.email}
                  </a>
                </div>
                {member.phone && (
                  <div className="flex items-center gap-2.5 text-[13px] text-[#525252]">
                    <Phone className="w-4 h-4 text-[#A3A3A3]" />
                    <a href={`tel:${member.phone}`} className="hover:text-[#0891B2] hover:underline transition-colors">
                      {member.phone}
                    </a>
                  </div>
                )}
              </div>

              <div className="flex gap-2 mt-5">
                <Link href={`/team/${member.id}`} className="flex-1">
                  <Button variant="outline" className="w-full bg-[#FFFFFF] border-[#E5E5E5] text-[#111111] hover:bg-[#FAFAFA] hover:text-[#0891B2] hover:border-[#0891B2] transition-colors rounded-[4px] h-[36px]">
                    View Profile
                  </Button>
                </Link>
                {canManageUsers && (
                  <Button variant="outline" className="flex-1 bg-[#FFFFFF] border-[#E5E5E5] text-[#111111] hover:bg-[#FAFAFA] rounded-[4px] h-[36px]">
                    Message
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <AddTeamMemberModal 
        isOpen={isAddMemberOpen} 
        onClose={() => setIsAddMemberOpen(false)} 
      />
    </div>
  );
}
