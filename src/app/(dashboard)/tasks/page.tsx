"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Plus, Filter, MoreHorizontal, LayoutGrid, List } from "lucide-react";
import { KanbanBoard } from "@/components/tasks/KanbanBoard";
import { AddTaskModal } from "@/components/tasks/AddTaskModal";
import { TaskDetailsPanel } from "@/components/tasks/TaskDetailsPanel";

const tasks = [
  {
    id: "1",
    name: "Create homepage design",
    assignee: { name: "Sarah Chen", initials: "SC", avatar: "" },
    project: "Website Redesign",
    dueDate: "Mar 15, 2026",
    priority: "High",
    status: "Completed",
  },
  {
    id: "2",
    name: "Implement responsive navigation",
    assignee: { name: "Marcus Rodriguez", initials: "MR", avatar: "" },
    project: "Mobile App V2",
    dueDate: "Mar 25, 2026",
    priority: "High",
    status: "Completed",
  },
  {
    id: "3",
    name: "Build product catalog",
    assignee: { name: "Emily Foster", initials: "EF", avatar: "" },
    project: "E-commerce Platform",
    dueDate: "Apr 10, 2026",
    priority: "Medium",
    status: "In Progress",
  },
  {
    id: "4",
    name: "Add contact form",
    assignee: { name: "David Kim", initials: "DK", avatar: "" },
    project: "Website Redesign",
    dueDate: "Apr 12, 2026",
    priority: "Low",
    status: "Pending",
  },
  {
    id: "5",
    name: "Setup analytics",
    assignee: { name: "Lisa Adams", initials: "LA", avatar: "" },
    project: "Marketing Dashboard",
    dueDate: "Apr 15, 2026",
    priority: "Medium",
    status: "Pending",
  },
];

export default function TasksPage() {
  const [viewMode, setViewMode] = React.useState<"list" | "kanban">("list");
  const [isMounted, setIsMounted] = React.useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = React.useState(false);
  const [selectedTask, setSelectedTask] = React.useState<any | null>(null);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex-1 flex flex-col gap-6 p-6 md:p-8 bg-[#FAFAFA] min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-[24px] font-semibold text-[#111111]">
            {viewMode === "list" ? "Tasks" : "Kanban Board"}
          </h1>
          <p className="text-[14px] text-[#737373] mt-1">
            {viewMode === "list" ? "Manage all tasks for this project." : "Drag and drop tasks across columns."}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {viewMode === "list" ? (
            <Button 
              variant="outline" 
              onClick={() => setViewMode("kanban")}
              className="border-[#E5E5E5] text-[#111111] font-medium h-10 px-4 rounded-[3px]"
            >
              <LayoutGrid className="w-4 h-4 mr-2" />
              Kanban View
            </Button>
          ) : (
            <Button 
              variant="outline" 
              onClick={() => setViewMode("list")}
              className="border-[#E5E5E5] text-[#111111] font-medium h-10 px-4 rounded-[3px]"
            >
              <List className="w-4 h-4 mr-2" />
              Back to List
            </Button>
          )}
          <Button 
            onClick={() => setIsAddTaskOpen(true)}
            className="bg-[#0891B2] hover:bg-[#0891B2]/90 text-white font-medium h-10 px-4 rounded-[3px]"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Button>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex items-center justify-between gap-4 w-full">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]" />
          <Input
            placeholder="Search tasks..."
            className="pl-9 h-10 w-full bg-white border-[#E5E5E5] text-[#111111] placeholder:text-[#A3A3A3] focus-visible:ring-1 focus-visible:ring-[#0891B2]"
          />
        </div>
        <Button variant="outline" className="border-[#E5E5E5] bg-white text-[#111111] font-medium h-10 px-4 shrink-0 rounded-[3px]">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {viewMode === "list" ? (
        <>
          {/* Table */}
          <div className="bg-white rounded-[10px] border border-[#E5E5E5] overflow-hidden flex flex-col">
            <Table>
              <TableHeader className="bg-[#FAFAFA]">
                <TableRow className="border-b border-[#E5E5E5] hover:bg-transparent">
                  <TableHead className="w-[50px] text-center">
                    <Checkbox className="border-[#E5E5E5] data-checked:bg-[#0891B2] data-checked:border-[#0891B2]" />
                  </TableHead>
                  <TableHead className="text-[14px] font-medium text-[#737373] h-[52px]">Task Name</TableHead>
                  <TableHead className="text-[14px] font-medium text-[#737373] h-[52px]">Assignee</TableHead>
                  <TableHead className="text-[14px] font-medium text-[#737373] h-[52px]">Project</TableHead>
                  <TableHead className="text-[14px] font-medium text-[#737373] h-[52px]">Due Date</TableHead>
                  <TableHead className="text-[14px] font-medium text-[#737373] h-[52px]">Priority</TableHead>
                  <TableHead className="text-[14px] font-medium text-[#737373] h-[52px]">Status</TableHead>
                  <TableHead className="w-[50px] text-center h-[52px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow 
                    key={task.id} 
                    className="border-b border-[#E5E5E5] hover:bg-[#F8FAFC] cursor-pointer"
                    onClick={() => setSelectedTask(task)}
                  >
                    <TableCell className="w-[50px] text-center" onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        defaultChecked={task.status === "Completed"}
                        className="border-[#E5E5E5] data-checked:bg-[#0891B2] data-checked:border-[#0891B2] data-checked:text-white"
                      />
                    </TableCell>
                    <TableCell className="py-4">
                      <span className={`text-[14px] font-medium ${task.status === "Completed" ? "text-[#737373] line-through" : "text-[#111111]"}`}>
                        {task.name}
                      </span>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8 rounded-full border border-[#E5E5E5]">
                          <AvatarImage src={task.assignee.avatar} />
                          <AvatarFallback className="bg-[#F1F5F9] text-[#0891B2] text-[12px] font-semibold">
                            {task.assignee.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-[14px] text-[#404040]">{task.assignee.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 text-[14px] text-[#404040]">
                      {task.project}
                    </TableCell>
                    <TableCell className="py-4 text-[14px] text-[#404040]">
                      {task.dueDate}
                    </TableCell>
                    <TableCell className="py-4">
                      {task.priority === "High" && (
                        <Badge className="bg-[#FEF2F2] text-[#EF4444] hover:bg-[#FEF2F2] border-transparent font-medium rounded-[4px] shadow-none">
                          High
                        </Badge>
                      )}
                      {task.priority === "Medium" && (
                        <Badge className="bg-[#FFFBEB] text-[#F59E0B] hover:bg-[#FFFBEB] border-transparent font-medium rounded-[4px] shadow-none">
                          Medium
                        </Badge>
                      )}
                      {task.priority === "Low" && (
                        <Badge className="bg-[#F0FDF4] text-[#10B981] hover:bg-[#F0FDF4] border-transparent font-medium rounded-[4px] shadow-none">
                          Low
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="py-4">
                      {task.status === "Completed" && (
                        <Badge className="bg-[#ECFDF5] text-[#10B981] hover:bg-[#ECFDF5] border-transparent font-medium rounded-[4px] shadow-none">
                          Completed
                        </Badge>
                      )}
                      {task.status === "In Progress" && (
                        <Badge className="bg-[#EFF6FF] text-[#3B82F6] hover:bg-[#EFF6FF] border-[#BFDBFE] font-medium rounded-[4px] shadow-none">
                          In Progress
                        </Badge>
                      )}
                      {task.status === "Pending" && (
                        <Badge className="bg-[#FAFAFA] text-[#737373] hover:bg-[#FAFAFA] border-[#E5E5E5] font-medium rounded-[4px] shadow-none">
                          Pending
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="py-4 text-center">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-[#737373] hover:text-[#111111] rounded-[3px]">
                        <MoreHorizontal className="w-5 h-5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination Footer */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-2">
            <p className="text-[14px] text-[#737373]">
              Showing 1 to 5 of 24 entries
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="border-[#E5E5E5] bg-white text-[#111111] font-medium h-9 px-4 hover:bg-[#F8FAFC] rounded-[3px]">
                Previous
              </Button>
              
              <div className="flex items-center gap-1">
                <Button variant="outline" className="w-9 h-9 p-0 bg-[#0891B2] text-white hover:bg-[#0891B2]/90 hover:text-white border-[#0891B2] rounded-[3px]">
                  1
                </Button>
                <Button variant="outline" className="w-9 h-9 p-0 bg-white border-[#E5E5E5] text-[#111111] hover:bg-[#F8FAFC] rounded-[3px]">
                  2
                </Button>
                <Button variant="outline" className="w-9 h-9 p-0 bg-white border-[#E5E5E5] text-[#111111] hover:bg-[#F8FAFC] rounded-[3px]">
                  3
                </Button>
                <span className="text-[#A3A3A3] px-1">...</span>
                <Button variant="outline" className="w-9 h-9 p-0 bg-white border-[#E5E5E5] text-[#111111] hover:bg-[#F8FAFC] rounded-[3px]">
                  5
                </Button>
              </div>

              <Button variant="outline" className="border-[#E5E5E5] bg-white text-[#111111] font-medium h-9 px-4 hover:bg-[#F8FAFC] rounded-[3px]">
                Next
              </Button>
            </div>
          </div>
        </>
      ) : (
        <KanbanBoard initialTasks={tasks as any} onTaskClick={setSelectedTask} />
      )}

      <AddTaskModal isOpen={isAddTaskOpen} onClose={() => setIsAddTaskOpen(false)} />
      <TaskDetailsPanel task={selectedTask} isOpen={!!selectedTask} onClose={() => setSelectedTask(null)} />
    </div>
  );
}
