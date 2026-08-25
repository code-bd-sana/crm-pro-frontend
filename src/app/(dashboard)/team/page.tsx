"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Filter, Plus, MoreHorizontal, Mail, Phone, BarChart2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AddTeamMemberModal } from "@/components/team/AddTeamMemberModal";

const teamData = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "Design",
    type: "Manager",
    status: "Active",
    email: "sarah.chen@crmpro.com",
    phone: "+1 (555) 123-4567",
    stats: { active: 8, done: 42, projects: 3 },
    initials: "SC",
  },
  {
    id: "2",
    name: "David Kim",
    role: "Engineering",
    type: "Staff",
    status: "Active",
    email: "david.kim@crmpro.com",
    phone: "+1 (555) 234-5678",
    stats: { active: 6, done: 38, projects: 2 },
    initials: "DK",
  },
  {
    id: "3",
    name: "Marcus Rodriguez",
    role: "Sales",
    type: "Manager",
    status: "Active",
    email: "marcus.r@crmpro.com",
    phone: "+1 (555) 345-6789",
    stats: { active: 5, done: 35, projects: 4 },
    initials: "MR",
  },
  {
    id: "4",
    name: "Emily Foster",
    role: "Marketing",
    type: "Staff",
    status: "Active",
    email: "emily.foster@crmpro.com",
    phone: "+1 (555) 456-7890",
    stats: { active: 7, done: 32, projects: 2 },
    initials: "EF",
  },
  {
    id: "5",
    name: "Lisa Anderson",
    role: "Design",
    type: "Staff",
    status: "Active",
    email: "lisa.anderson@crmpro.com",
    phone: "+1 (555) 567-8901",
    stats: { active: 4, done: 28, projects: 2 },
    initials: "LA",
  },
  {
    id: "6",
    name: "Ryan Cooper",
    role: "Engineering",
    type: "Staff",
    status: "Active",
    email: "ryan.cooper@crmpro.com",
    phone: "+1 (555) 678-9012",
    stats: { active: 6, done: 24, projects: 3 },
    initials: "RC",
  },
  {
    id: "7",
    name: "Jessica Walsh",
    role: "Marketing",
    type: "Manager",
    status: "Active",
    email: "jessica.w@crmpro.com",
    phone: "+1 (555) 789-0123",
    stats: { active: 3, done: 29, projects: 2 },
    initials: "JW",
  },
  {
    id: "8",
    name: "Michael Torres",
    role: "Sales",
    type: "Staff",
    status: "Away",
    email: "michael.t@crmpro.com",
    phone: "+1 (555) 890-1234",
    stats: { active: 2, done: 31, projects: 1 },
    initials: "MT",
  },
  {
    id: "9",
    name: "Amanda Brooks",
    role: "Engineering",
    type: "Staff",
    status: "Active",
    email: "amanda.b@crmpro.com",
    phone: "+1 (555) 901-2345",
    stats: { active: 5, done: 27, projects: 2 },
    initials: "AB",
  },
];

export default function TeamPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="flex flex-col flex-1 px-6 pt-6 pb-6 gap-6 h-full w-full bg-[#FAFAFA] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-[#111111] font-semibold text-[24px] leading-[32px]">Team</h1>
          <p className="text-[#737373] text-[14px]">9 team members</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-[#E5E5E5] bg-white text-[#111111] font-medium h-[36px] px-4 hover:bg-[#F8FAFC] rounded-[3px]">
            <BarChart2 className="w-4 h-4 mr-2" />
            Analytics
          </Button>
          <Button 
            onClick={() => setIsAddMemberOpen(true)}
            className="bg-[#0891B2] hover:bg-[#0E7490] text-white rounded-[3px] h-[36px] px-4 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            <span className="font-medium text-[14px]">Add Team Member</span>
          </Button>
        </div>
      </div>

      {/* Controls Container (Search & Filter) */}
      <div className="flex items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]" />
          <Input
            placeholder="Search team members..."
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
        {teamData.map((member) => (
          <div
            key={member.id}
            className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-[10px] p-6 flex flex-col shadow-sm"
          >
            {/* Card Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-[42px] h-[42px] rounded-full bg-[#E0F2FE] text-[#0369A1] flex items-center justify-center font-medium text-[16px]">
                  {member.initials}
                </div>
                <div className="flex flex-col">
                  <Link 
                    href={`/team/${member.id}`} 
                    className="text-[16px] font-bold text-[#111111] hover:text-[#0891B2] hover:underline transition-colors"
                  >
                    {member.name}
                  </Link>
                  <span className="text-[14px] text-[#737373]">
                    {member.role}
                  </span>
                </div>
              </div>
              <button className="text-[#A3A3A3] hover:text-[#111111] transition-colors mt-1">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            {/* Badges */}
            <div className="flex items-center justify-between mb-5">
              {member.type === "Manager" ? (
                <Badge className="bg-[#E0F2FE] text-[#0369A1] hover:bg-[#E0F2FE] border-transparent font-medium rounded-[3px] shadow-none h-6 px-2">
                  Manager
                </Badge>
              ) : (
                <Badge className="bg-[#F1F5F9] text-[#475569] hover:bg-[#F1F5F9] border-transparent font-medium rounded-[3px] shadow-none h-6 px-2">
                  Staff
                </Badge>
              )}
              <span className="text-[14px] font-medium text-[#111111]">
                {member.status}
              </span>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col gap-3 mb-6">
              <div className="flex items-center gap-2 text-[#737373]">
                <Mail className="w-4 h-4" />
                <span className="text-[14px]">{member.email}</span>
              </div>
              <div className="flex items-center gap-2 text-[#737373]">
                <Phone className="w-4 h-4" />
                <span className="text-[14px]">{member.phone}</span>
              </div>
            </div>

            <div className="border-t border-[#E5E5E5] -mx-6 mb-4"></div>

            {/* Stats */}
            <div className="flex items-center justify-between text-center px-4">
              <div className="flex flex-col">
                <span className="text-[18px] font-bold text-[#111111]">
                  {member.stats.active}
                </span>
                <span className="text-[12px] text-[#737373]">Active</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[18px] font-bold text-[#111111]">
                  {member.stats.done}
                </span>
                <span className="text-[12px] text-[#737373]">Done</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[18px] font-bold text-[#111111]">
                  {member.stats.projects}
                </span>
                <span className="text-[12px] text-[#737373]">Projects</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <AddTeamMemberModal isOpen={isAddMemberOpen} onClose={() => setIsAddMemberOpen(false)} />
    </div>
  );
}
