"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, Calendar, Edit3, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const activeTasks = [
  { id: 1, task: "Update homepage banner", project: "Website Redesign", priority: "High", priorityColor: "bg-[#FFEDD5] text-[#C2410C]", dueDate: "Apr 11" },
  { id: 2, task: "Design mobile mockups", project: "Mobile App Launch", priority: "Critical", priorityColor: "bg-[#FEE2E2] text-[#B91C1C]", dueDate: "Apr 10" },
  { id: 3, task: "Create presentation deck", project: "Q2 Marketing", priority: "Medium", priorityColor: "bg-[#FEF9C3] text-[#A16207]", dueDate: "Apr 14" },
  { id: 4, task: "Review brand guidelines", project: "Brand Guidelines", priority: "Low", priorityColor: "bg-[#F1F5F9] text-[#475569]", dueDate: "Apr 16" },
];

const projects = [
  { id: 1, name: "Website Redesign", role: "Lead Designer", progress: 75 },
  { id: 2, name: "Mobile App Launch", role: "UI Designer", progress: 60 },
  { id: 3, name: "Brand Guidelines", role: "Design Lead", progress: 30 },
];

export default function TeamMemberDetailsPage({ params }: { params: { id: string } }) {
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="flex flex-col flex-1 px-6 pt-6 pb-6 gap-6 h-full w-full bg-[#FAFAFA] overflow-y-auto">

      {/* Back Link */}
      <div>
        <Link
          href="/team"
          className="inline-flex items-center gap-2 text-[#111111] hover:text-[#0891B2] text-[14px] font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Team
        </Link>
      </div>

      {/* Main Content Layout */}
      <div className="flex flex-col xl:flex-row gap-6 items-start">

        {/* Left Sidebar: Profile Card */}
        <div className="w-full xl:w-[320px] shrink-0 bg-white border border-[#E5E5E5] rounded-[10px] p-6 shadow-sm flex flex-col">

          {/* Avatar & Header */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-[80px] h-[80px] rounded-full bg-[#E0F2FE] flex items-center justify-center mb-4">
              <span className="text-[#0369A1] font-semibold text-[24px]">SC</span>
            </div>
            <h1 className="text-[20px] font-bold text-[#111111] mb-1">Sarah Chen</h1>
            <p className="text-[14px] text-[#737373] mb-2">Manager • Design</p>
            <span className="text-[12px] font-semibold text-[#111111]">Active</span>
          </div>

          <div className="border-t border-[#E5E5E5] -mx-6 mb-6"></div>

          {/* Contact Info */}
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex items-center gap-3 text-[#737373]">
              <Mail className="w-4 h-4" />
              <span className="text-[14px]">sarah.chen@crmpro.com</span>
            </div>
            <div className="flex items-center gap-3 text-[#737373]">
              <Phone className="w-4 h-4" />
              <span className="text-[14px]">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-3 text-[#737373]">
              <Calendar className="w-4 h-4" />
              <span className="text-[14px]">Joined Jan 15, 2024</span>
            </div>
          </div>

          <div className="border-t border-[#E5E5E5] -mx-6 mb-6"></div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 mt-auto">
            <Button className="w-full bg-[#0891B2] hover:bg-[#366083] text-white rounded-[4px] h-9">
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
            <Button variant="outline" className="w-full bg-[#FAFAFA] border-[#E5E5E5] text-[#111111] hover:bg-[#F5F5F5] rounded-[4px] h-9">
              <MessageSquare className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex flex-col flex-1 gap-6 w-full min-w-0">

          {/* Tabs */}
          <div className="flex items-center gap-2">
            {["Overview", "Tasks", "Projects", "Activity"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-[6px] text-[14px] font-semibold transition-colors ${activeTab === tab
                    ? "bg-[#F1F5F9] text-[#111111]"
                    : "text-[#737373] hover:bg-[#F1F5F9]/50 hover:text-[#111111]"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "Overview" && (
            <>
              {/* Summary Metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-5 shadow-sm">
                  <p className="text-[13px] text-[#737373] font-medium mb-1">Active Tasks</p>
                  <p className="text-[28px] font-bold text-[#111111]">8</p>
                </div>
                <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-5 shadow-sm">
                  <p className="text-[13px] text-[#737373] font-medium mb-1">Completed Tasks</p>
                  <p className="text-[28px] font-bold text-[#111111]">42</p>
                </div>
                <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-5 shadow-sm">
                  <p className="text-[13px] text-[#737373] font-medium mb-1">Active Projects</p>
                  <p className="text-[28px] font-bold text-[#111111]">3</p>
                </div>
                <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-5 shadow-sm">
                  <p className="text-[13px] text-[#737373] font-medium mb-1">Task Completion Rate</p>
                  <p className="text-[28px] font-bold text-[#111111]">84%</p>
                </div>
              </div>

              {/* Active Tasks Table */}
              <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-6 shadow-sm">
                <h2 className="text-[16px] font-bold text-[#111111] mb-4">Active Tasks</h2>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b border-[#E5E5E5] hover:bg-transparent">
                        <TableHead className="py-3 h-auto px-0 text-[13px] font-semibold text-[#111111] w-[40%]">Task</TableHead>
                        <TableHead className="py-3 h-auto px-0 text-[13px] font-semibold text-[#111111]">Project</TableHead>
                        <TableHead className="py-3 h-auto px-0 text-[13px] font-semibold text-[#111111]">Priority</TableHead>
                        <TableHead className="py-3 h-auto px-0 text-[13px] font-semibold text-[#111111]">Due Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {activeTasks.map((task) => (
                        <TableRow key={task.id} className="border-b border-[#E5E5E5]/50 last:border-0 hover:bg-[#F8FAFC]">
                          <TableCell className="py-3 px-0 text-[14px] font-medium text-[#111111]">{task.task}</TableCell>
                          <TableCell className="py-3 px-0 text-[14px] text-[#737373]">{task.project}</TableCell>
                          <TableCell className="py-3 px-0">
                            <Badge className={`border-transparent font-medium rounded-xs shadow-none px-2 h-5 ${task.priorityColor}`}>
                              {task.priority}
                            </Badge>
                          </TableCell>
                          <TableCell className="py-3 px-0 text-[14px] text-[#737373]">{task.dueDate}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Projects List */}
              <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-6 shadow-sm">
                <h2 className="text-[16px] font-bold text-[#111111] mb-6">Projects</h2>
                <div className="flex flex-col gap-6">
                  {projects.map((project) => (
                    <div key={project.id} className="flex flex-col gap-2">
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                          <span className="text-[14px] font-bold text-[#111111]">{project.name}</span>
                          <span className="text-[12px] text-[#737373]">{project.role}</span>
                        </div>
                        <span className="text-[14px] font-bold text-[#111111]">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-[#E0F2FE] h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-[#0891B2] h-full rounded-full"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab !== "Overview" && (
            <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-12 shadow-sm flex flex-col items-center justify-center text-center">
              <h2 className="text-[18px] font-bold text-[#111111] mb-2">{activeTab}</h2>
              <p className="text-[14px] text-[#737373]">Content for {activeTab} will be displayed here.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
