"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Flag, Users, CheckSquare2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";

export default function ProjectDetailsPage() {
  return (
    <div className="flex flex-col gap-6 p-6 min-h-full">
      {/* Back Button */}
      <div>
        <Link href="/projects">
          <Button variant="ghost" className="h-8 px-2 text-[#111111] font-medium hover:bg-[#E5E5E5]/50">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
        </Link>
      </div>

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-[24px] leading-[32px] font-semibold text-[#111111]">
            Website Redesign
          </h1>
          <Link href="/clients/meridian" className="text-[14px] leading-[20px] font-medium text-[#0891B2] hover:underline mt-1 block">
            Meridian Logistics
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-[#EFF6FF] text-[#0891B2] hover:bg-[#EFF6FF] border-[#BDE0FE] px-2 py-1 rounded-[4px] font-medium text-[12px]">
            In Progress
          </Badge>
          <Button className="h-9 px-4 bg-[#0891B2] hover:bg-[#0891B2]/90 text-white font-medium text-[14px] rounded-[4px]">
            Edit Project
          </Button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <Card className="h-[86px] shadow-none border-[#E5E5E5] rounded-[10px]">
          <CardContent className="h-full p-0 pl-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-[6px] bg-[#0891B2]/10 flex items-center justify-center shrink-0">
              <Calendar className="w-[18px] h-[18px] text-[#0891B2]" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[12px] leading-[16px] text-[#737373]">Deadline</span>
              <span className="text-[14px] leading-[20px] font-medium text-[#111111]">Apr 12, 2026</span>
            </div>
          </CardContent>
        </Card>

        <Card className="h-[86px] shadow-none border-[#E5E5E5] rounded-[10px]">
          <CardContent className="h-full p-0 pl-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-[6px] bg-[#FFEDD4] flex items-center justify-center shrink-0">
              <Flag className="w-[18px] h-[18px] text-[#F97316]" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[12px] leading-[16px] text-[#737373]">Priority</span>
              <span className="text-[14px] leading-[20px] font-medium text-[#111111]">High</span>
            </div>
          </CardContent>
        </Card>

        <Card className="h-[86px] shadow-none border-[#E5E5E5] rounded-[10px]">
          <CardContent className="h-full p-0 pl-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-[6px] bg-[#DBEAFE] flex items-center justify-center shrink-0">
              <Users className="w-[18px] h-[18px] text-[#3B82F6]" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[12px] leading-[16px] text-[#737373]">Team Size</span>
              <span className="text-[14px] leading-[20px] font-medium text-[#111111]">3 members</span>
            </div>
          </CardContent>
        </Card>

        <Card className="h-[86px] shadow-none border-[#E5E5E5] rounded-[10px]">
          <CardContent className="h-full px-4 pt-4 pb-0 flex flex-col gap-2">
            <span className="text-[12px] leading-[16px] text-[#737373]">Progress</span>
            <div className="flex items-center gap-2">
              <Progress value={75} className="flex-1" />
              <span className="text-[14px] leading-[20px] font-medium text-[#111111]">75%</span>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="overview" className="w-full mt-2 flex flex-col gap-6">
        <div className="flex w-full">
          <TabsList className="bg-[#F1F5F9] gap-1 h-9 p-1 rounded-[10px]">
            <TabsTrigger
              value="overview"
              className="px-4 py-1 text-[14px] font-medium rounded-[8px] data-[state=active]:bg-white data-[state=active]:text-[#111111] data-[state=active]:shadow-sm data-[state=inactive]:bg-transparent data-[state=inactive]:text-[#737373] hover:text-[#111111]"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="tasks"
              className="px-4 py-1 text-[14px] font-medium rounded-[8px] data-[state=active]:bg-white data-[state=active]:text-[#111111] data-[state=active]:shadow-sm data-[state=inactive]:bg-transparent data-[state=inactive]:text-[#737373] hover:text-[#111111]"
            >
              Tasks
            </TabsTrigger>
            <TabsTrigger
              value="files"
              className="px-4 py-1 text-[14px] font-medium rounded-[8px] data-[state=active]:bg-white data-[state=active]:text-[#111111] data-[state=active]:shadow-sm data-[state=inactive]:bg-transparent data-[state=inactive]:text-[#737373] hover:text-[#111111]"
            >
              Files
            </TabsTrigger>
            <TabsTrigger
              value="team"
              className="px-4 py-1 text-[14px] font-medium rounded-[8px] data-[state=active]:bg-white data-[state=active]:text-[#111111] data-[state=active]:shadow-sm data-[state=inactive]:bg-transparent data-[state=inactive]:text-[#737373] hover:text-[#111111]"
            >
              Team
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="px-4 py-1 text-[14px] font-medium rounded-[8px] data-[state=active]:bg-white data-[state=active]:text-[#111111] data-[state=active]:shadow-sm data-[state=inactive]:bg-transparent data-[state=inactive]:text-[#737373] hover:text-[#111111]"
            >
              Settings
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="mt-0 outline-none flex flex-col gap-6">
          
          {/* Description */}
          <Card className="h-[116px] shadow-none border-[#E5E5E5] rounded-[10px] p-6 flex flex-col gap-4">
            <h3 className="text-[16px] font-semibold text-[#111111]">Description</h3>
            <p className="text-[14px] leading-[20px] text-[#737373]">
              Complete overhaul of the company website with modern design, improved UX, and mobile optimization.
            </p>
          </Card>

          {/* Milestones */}
          <Card className="h-[340px] shadow-none border-[#E5E5E5] rounded-[10px] p-6 flex flex-col gap-4">
            <h3 className="text-[16px] font-semibold text-[#111111]">Milestones</h3>
            
            <div className="flex flex-col gap-4 mt-2">
              {/* Milestone 1 */}
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 shrink-0 rounded-full border-2 border-[#10B981] text-white flex items-center justify-center font-bold text-[14px] bg-[#10B981]">
                  ✓
                </div>
                <div className="flex-1 flex justify-between items-center">
                  <div className="flex flex-col gap-1">
                    <h4 className="text-[14px] leading-[20px] font-medium text-[#111111]">Discovery & Research</h4>
                    <p className="text-[12px] leading-[16px] text-[#737373]">Due Mar 15</p>
                  </div>
                  <Badge className="bg-[#ECFDF5] text-[#10B981] hover:bg-[#ECFDF5] border-transparent font-medium rounded-[4px] shadow-none">
                    Completed
                  </Badge>
                </div>
              </div>

              {/* Milestone 2 */}
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 shrink-0 rounded-full border-2 border-[#10B981] text-white flex items-center justify-center font-bold text-[14px] bg-[#10B981]">
                  ✓
                </div>
                <div className="flex-1 flex justify-between items-center">
                  <div className="flex flex-col gap-1">
                    <h4 className="text-[14px] leading-[20px] font-medium text-[#111111]">Design Mockups</h4>
                    <p className="text-[12px] leading-[16px] text-[#737373]">Due Mar 25</p>
                  </div>
                  <Badge className="bg-[#ECFDF5] text-[#10B981] hover:bg-[#ECFDF5] border-transparent font-medium rounded-[4px] shadow-none">
                    Completed
                  </Badge>
                </div>
              </div>

              {/* Milestone 3 */}
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 shrink-0 rounded-full border-2 border-[#0891B2] text-[#0891B2] flex items-center justify-center font-semibold text-[14px] bg-white">
                  3
                </div>
                <div className="flex-1 flex justify-between items-center">
                  <div className="flex flex-col gap-1">
                    <h4 className="text-[14px] leading-[20px] font-medium text-[#111111]">Development</h4>
                    <p className="text-[12px] leading-[16px] text-[#737373]">Due Apr 10</p>
                  </div>
                  <Badge className="bg-[#EFF6FF] text-[#3B82F6] hover:bg-[#EFF6FF] border-[#BFDBFE] font-medium rounded-[4px] shadow-none">
                    in progress
                  </Badge>
                </div>
              </div>

              {/* Milestone 4 */}
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 shrink-0 rounded-full border border-[#E5E5E5] text-[#A3A3A3] flex items-center justify-center font-semibold text-[14px] bg-white">
                  4
                </div>
                <div className="flex-1 flex justify-between items-center">
                  <div className="flex flex-col gap-1">
                    <h4 className="text-[14px] leading-[20px] font-medium text-[#111111]">Testing & QA</h4>
                    <p className="text-[12px] leading-[16px] text-[#737373]">Due Apr 12</p>
                  </div>
                  <Badge className="bg-[#FAFAFA] text-[#737373] hover:bg-[#FAFAFA] border-[#E5E5E5] font-medium rounded-[4px] shadow-none">
                    Pending
                  </Badge>
                </div>
              </div>

              {/* Milestone 5 */}
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 shrink-0 rounded-full border border-[#E5E5E5] text-[#A3A3A3] flex items-center justify-center font-semibold text-[14px] bg-white">
                  5
                </div>
                <div className="flex-1 flex justify-between items-center">
                  <div className="flex flex-col gap-1">
                    <h4 className="text-[14px] leading-[20px] font-medium text-[#111111]">Launch</h4>
                    <p className="text-[12px] leading-[16px] text-[#737373]">Due Apr 15</p>
                  </div>
                  <Badge className="bg-[#FAFAFA] text-[#737373] hover:bg-[#FAFAFA] border-[#E5E5E5] font-medium rounded-[4px] shadow-none">
                    Pending
                  </Badge>
                </div>
              </div>
            </div>
          </Card>

          {/* Recent Tasks */}
          <Card className="h-[244px] shadow-none border-[#E5E5E5] rounded-[10px] p-6 flex flex-col justify-between">
            <h3 className="text-[16px] font-semibold text-[#111111]">Recent Tasks</h3>
            
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Checkbox id="task-1" defaultChecked className="w-5 h-5 border-[#E5E5E5] data-checked:bg-[#0891B2] data-checked:border-[#0891B2] data-checked:text-white rounded-[4px]" />
                <label htmlFor="task-1" className="text-[14px] leading-[20px] font-medium text-[#737373] line-through cursor-pointer">
                  Create homepage design
                </label>
              </div>

              <div className="flex items-center gap-3">
                <Checkbox id="task-2" defaultChecked className="w-5 h-5 border-[#E5E5E5] data-checked:bg-[#0891B2] data-checked:border-[#0891B2] data-checked:text-white rounded-[4px]" />
                <label htmlFor="task-2" className="text-[14px] leading-[20px] font-medium text-[#737373] line-through cursor-pointer">
                  Implement responsive navigation
                </label>
              </div>

              <div className="flex items-center gap-3">
                <Checkbox id="task-3" className="w-5 h-5 border-[#E5E5E5] data-checked:bg-[#0891B2] data-checked:border-[#0891B2] data-checked:text-white rounded-[4px]" />
                <label htmlFor="task-3" className="text-[14px] leading-[20px] font-medium text-[#111111] cursor-pointer">
                  Build product catalog
                </label>
              </div>

              <div className="flex items-center gap-3">
                <Checkbox id="task-4" className="w-5 h-5 border-[#E5E5E5] data-checked:bg-[#0891B2] data-checked:border-[#0891B2] data-checked:text-white rounded-[4px]" />
                <label htmlFor="task-4" className="text-[14px] leading-[20px] font-medium text-[#111111] cursor-pointer">
                  Add contact form
                </label>
              </div>

              <div className="flex items-center gap-3">
                <Checkbox id="task-5" className="w-5 h-5 border-[#E5E5E5] data-checked:bg-[#0891B2] data-checked:border-[#0891B2] data-checked:text-white rounded-[4px]" />
                <label htmlFor="task-5" className="text-[14px] leading-[20px] font-medium text-[#111111] cursor-pointer">
                  Setup analytics
                </label>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

    </div>
  );
}
