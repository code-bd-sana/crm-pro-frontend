"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  FolderKanban, 
  CheckSquare, 
  BarChart2, 
  TrendingUp, 
  TrendingDown,
  UserPlus,
  FolderPlus,
  PlusSquare,
  FilePlus
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell
} from "recharts";

const quickActionsData = [
  { title: "Add Client", description: "Create a new client", icon: UserPlus, color: "text-[#3B82F6]", bgColor: "bg-[#EFF6FF]" },
  { title: "Create Project", description: "Start a new project", icon: FolderPlus, color: "text-[#8B5CF6]", bgColor: "bg-[#F5F3FF]" },
  { title: "Create Task", description: "Add a new task", icon: PlusSquare, color: "text-[#22C55E]", bgColor: "bg-[#DCFCE7]" },
  { title: "New Invoice", description: "Generate an invoice", icon: FilePlus, color: "text-[#F97316]", bgColor: "bg-[#FFEDD4]" },
];

const recentActivityData = [
  { initials: "SC", name: "Sarah Chen", action: "completed task in Project Phoenix", time: "5 min ago" },
  { initials: "MR", name: "Marcus Rodriguez", action: "added new client Meridian Logistics", time: "12 min ago" },
  { initials: "EF", name: "Emily Foster", action: "updated invoice INV-2024-0047", time: "1 hour ago" },
  { initials: "DK", name: "David Kim", action: "commented on Design System Overhaul", time: "2 hours ago" },
  { initials: "LA", name: "Lisa Anderson", action: "marked project as completed", time: "3 hours ago" },
  { initials: "RC", name: "Ryan Cooper", action: "created new task in Mobile App", time: "4 hours ago" },
];

const upcomingDeadlinesData = [
  { title: "Website Redesign", due: "Due Apr 12, 2026", progress: 75, assignees: ["SC", "MR", "EF"] },
  { title: "Mobile App Launch", due: "Due Apr 15, 2026", progress: 60, assignees: ["LA", "DK"] },
  { title: "Q2 Marketing Campaign", due: "Due Apr 18, 2026", progress: 40, assignees: ["RC", "SC"] },
  { title: "Data Migration", due: "Due Apr 20, 2026", progress: 85, assignees: ["MR", "DK", "EF"] },
];

const summaryData = [
  {
    title: "Total Clients",
    value: "248",
    change: "+12%",
    icon: Users,
    isPositive: true,
  },
  {
    title: "Active Projects",
    value: "12",
    change: "+3",
    icon: FolderKanban,
    isPositive: true,
  },
  {
    title: "Tasks Due Today",
    value: "7",
    change: "-2",
    icon: CheckSquare,
    isPositive: false,
  },
  {
    title: "Revenue This Month",
    value: "$24,800",
    change: "+18%",
    icon: BarChart2,
    isPositive: true,
  },
];

const revenueData = [
  { name: "Sep", value: 12000 },
  { name: "Oct", value: 15000 },
  { name: "Nov", value: 11000 },
  { name: "Dec", value: 20000 },
  { name: "Jan", value: 18000 },
  { name: "Feb", value: 24800 },
];

const taskStatusData = [
  { name: "To Do", value: 32, color: "#F59E0B" },
  { name: "In Progress", value: 45, color: "#3B82F6" },
  { name: "Done", value: 23, color: "#22C55E" },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col flex-1 px-6 pt-6 pb-0 gap-6">
      
      {/* Header */}
      <div className="flex flex-col gap-1 h-[56px]">
        <h1 className="text-[#111111] font-semibold text-[24px] leading-[32px]">Good morning, John</h1>
        <p className="text-[#737373] font-normal text-[14px] leading-[20px]">Friday, April 10, 2026</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {summaryData.map((item) => {
          const Icon = item.icon;
          const TrendIcon = item.isPositive ? TrendingUp : TrendingDown;
          return (
            <Card key={item.title} className="bg-[#FFFFFF] border-[#E5E5E5] shadow-none rounded-[10px] h-[142px]">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-2">
                    <p className="text-[#737373] text-[14px] leading-[20px] font-normal">{item.title}</p>
                    <h3 className="text-[#111111] text-[30px] leading-[36px] font-semibold">{item.value}</h3>
                    <div className="flex items-center gap-1">
                      <TrendIcon className={`w-4 h-4 ${item.isPositive ? 'text-green-500' : 'text-red-500'}`} />
                      <span className="text-[14px] leading-[20px] font-normal text-[#111111]">
                        {item.change}
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 flex items-center justify-center bg-[#0891B2]/10 rounded-md">
                    <Icon className="w-6 h-6 text-[#0891B2]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-6">
        {/* Monthly Revenue Chart */}
        <Card className="bg-[#FFFFFF] border-[#E5E5E5] shadow-none rounded-[10px] h-[432px]">
          <CardHeader className="h-[46px] p-6 pb-0 flex justify-center">
            <CardTitle className="text-[16px] leading-[16px] font-medium text-[#111111]">Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent className="px-6 pt-[25px]">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke="#E5E5E5" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={true} 
                    tickLine={true} 
                    tick={{ fill: '#737373', fontSize: 12 }}
                    dy={10}
                    stroke="#737373"
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#737373', fontSize: 12 }}
                    dx={-10}
                  />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #E5E5E5', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="value" fill="#0891B2" radius={[4, 4, 0, 0]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Task Status Chart */}
        <Card className="bg-[#FFFFFF] border-[#E5E5E5] shadow-none rounded-[10px] h-[432px]">
          <CardHeader className="h-[46px] p-6 pb-0 flex justify-center">
            <CardTitle className="text-[16px] leading-[16px] font-medium text-[#111111]">Task Status</CardTitle>
          </CardHeader>
          <CardContent className="px-6 pt-[25px]">
            <div className="flex flex-col items-center justify-center h-[300px] w-full">
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={taskStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={110}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {taskStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: '1px solid #E5E5E5', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              
              {/* Custom Legend */}
              <div className="flex items-center justify-center gap-6 mt-6 w-full">
                {taskStatusData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-[#737373] text-[14px] leading-[20px] font-normal">
                      {item.name} <span className="font-medium text-[#737373]">{item.value}%</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section: Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Quick Actions */}
        <Card className="bg-[#FFFFFF] border-[#E5E5E5] shadow-none rounded-[10px] h-[416px] xl:col-span-1">
          <CardHeader className="h-[46px] p-6 pb-0 flex justify-center">
            <CardTitle className="text-[16px] leading-[16px] font-medium text-[#111111]">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="px-6 pt-[25px]">
            <div className="grid grid-cols-2 gap-4 h-[320px]">
              {quickActionsData.map((action, index) => {
                const ActionIcon = action.icon;
                return (
                  <button 
                    key={index}
                    className="flex flex-col items-start justify-center p-4 border border-[#E5E5E5] rounded-md hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className={`w-8 h-8 rounded-md flex items-center justify-center mb-4 ${action.bgColor}`}>
                      <ActionIcon className={`w-4 h-4 ${action.color}`} />
                    </div>
                    <span className="text-[#111111] font-medium text-[14px] leading-[20px]">{action.title}</span>
                    <span className="text-[#737373] font-normal text-[12px] leading-[16px] mt-1">{action.description}</span>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-[#FFFFFF] border-[#E5E5E5] shadow-none rounded-[10px] h-[416px] xl:col-span-2">
          <CardHeader className="h-[46px] p-6 pb-0 flex justify-center">
            <CardTitle className="text-[16px] leading-[16px] font-medium text-[#111111]">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="px-6 pt-[25px]">
            <div className="flex flex-col gap-4 h-[320px] overflow-y-auto pr-2">
              {recentActivityData.map((activity, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#0891B2]/10 flex flex-shrink-0 items-center justify-center">
                    <span className="text-[#0891B2] font-medium text-[14px]">{activity.initials}</span>
                  </div>
                  <div className="flex flex-col flex-1 min-w-0 pt-0.5">
                    <p className="text-[14px] leading-[20px] text-[#111111] truncate">
                      <span className="font-medium">{activity.name}</span> <span className="font-normal">{activity.action}</span>
                    </p>
                    <p className="text-[12px] leading-[16px] text-[#737373] mt-0.5">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Upcoming Deadlines */}
      <Card className="bg-[#FFFFFF] border-[#E5E5E5] shadow-none rounded-[10px] mb-6">
        <CardHeader className="h-[46px] p-6 pb-0 flex justify-center">
          <CardTitle className="text-[16px] leading-[16px] font-medium text-[#111111]">Upcoming Deadlines</CardTitle>
        </CardHeader>
        <CardContent className="px-6 pt-[25px] pb-6">
          <div className="flex flex-col gap-4">
            {upcomingDeadlinesData.map((item, index) => (
              <div key={index} className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[#111111] font-medium text-[14px] leading-[20px]">{item.title}</p>
                    <p className="text-[#737373] font-normal text-[12px] leading-[16px]">{item.due}</p>
                  </div>
                  <div className="flex -space-x-2">
                    {item.assignees.map((assignee, i) => (
                      <div key={i} className="w-6 h-6 rounded-full bg-[#0891B2]/10 border-2 border-white flex items-center justify-center relative">
                        <span className="text-[#0891B2] text-[10px] font-medium">{assignee}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Progress Bar */}
                <div className="w-full bg-[#F5F5F5] rounded-full h-1.5">
                  <div className="bg-[#0891B2] h-1.5 rounded-full" style={{ width: `${item.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
