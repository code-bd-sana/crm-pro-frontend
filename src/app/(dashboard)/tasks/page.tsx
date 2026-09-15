"use client";

import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Plus, Filter, LayoutGrid, List } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { KanbanBoard } from "@/components/tasks/KanbanBoard";
import { AddTaskModal } from "@/components/tasks/AddTaskModal";
import { TaskDetailsPanel } from "@/components/tasks/TaskDetailsPanel";
import { getTasks, updateTask } from "@/services/task.service";
import { getProjects } from "@/services/project.service";
import { getUsers } from "@/services/user.service";
import { getErrorMessage } from "@/lib/utils";
import { useDebounce } from "@/hooks/useDebounce";
import { PermissionGuard } from "@/components/shared/PermissionGuard";
import { PermissionEnum } from "@/types/auth.types";
import { TaskPriority, TaskStatus } from "@/types/models.types";
import type { Task } from "@/types/models.types";

type Tab = "All" | "To Do" | "In Progress" | "Done";

const TAB_STATUS: Record<Exclude<Tab, "All">, TaskStatus> = {
  "To Do": TaskStatus.TODO,
  "In Progress": TaskStatus.IN_PROGRESS,
  "Done": TaskStatus.DONE,
};

const PRIORITY_BADGES: Record<TaskPriority, string> = {
  LOW: "bg-[#F0FDF4] text-[#10B981]",
  MEDIUM: "bg-[#FFFBEB] text-[#F59E0B]",
  HIGH: "bg-[#FEF2F2] text-[#EF4444]",
  CRITICAL: "bg-[#FEF2F2] text-[#B91C1C]",
};

const STATUS_BADGES: Record<string, string> = {
  TODO: "bg-[#FAFAFA] text-[#737373] border-[#E5E5E5]",
  IN_PROGRESS: "bg-[#EFF6FF] text-[#3B82F6] border-[#BFDBFE]",
  DONE: "bg-[#ECFDF5] text-[#10B981] border-transparent",
};

export default function TasksPage() {
  const queryClient = useQueryClient();

  const [viewMode, setViewMode] = useState<"list" | "kanban">("kanban");
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [projectFilter, setProjectFilter] = useState<string>("");
  const [assigneeFilter, setAssigneeFilter] = useState<string>("");

  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const status = activeTab === "All" ? undefined : TAB_STATUS[activeTab];

  const { data: tasksData, isLoading } = useQuery({
    queryKey: ["tasks", page, limit, debouncedSearch, status, projectFilter, assigneeFilter],
    queryFn: () =>
      getTasks({
        page,
        limit,
        search: debouncedSearch || undefined,
        status,
        projectId: projectFilter && projectFilter !== "all" ? projectFilter : undefined,
        assigneeId: assigneeFilter && assigneeFilter !== "all" ? assigneeFilter : undefined,
      }),
  });

  const { data: projectsData } = useQuery({
    queryKey: ["projects", "options"],
    queryFn: () => getProjects({ page: 1, limit: 100 }),
  });

  const { data: users } = useQuery({
    queryKey: ["users", "options"],
    queryFn: getUsers,
  });

  const { mutate: changeStatus } = useMutation({
    mutationFn: ({ taskId, status }: { taskId: string; status: TaskStatus }) =>
      updateTask(taskId, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, "Failed to update task status"));
    },
  });

  const tasks = tasksData?.data ?? [];
  const total = tasksData?.meta?.total ?? 0;
  const totalPages = tasksData?.meta?.totalPages ?? 1;
  const projects = projectsData?.data ?? [];

  const renderPriority = (priority: TaskPriority) => (
    <Badge className={`${PRIORITY_BADGES[priority] ?? PRIORITY_BADGES.MEDIUM} hover:bg-inherit border-transparent font-medium rounded-[4px] shadow-none`}>
      {priority.toLowerCase()}
    </Badge>
  );

  const renderStatus = (taskStatus: string) => (
    <Badge className={`${STATUS_BADGES[taskStatus] ?? STATUS_BADGES.TODO} hover:bg-inherit font-medium rounded-[4px] shadow-none`}>
      {taskStatus === "TODO" ? "To Do" : taskStatus === "IN_PROGRESS" ? "In Progress" : "Done"}
    </Badge>
  );

  return (
    <div className="flex-1 flex flex-col gap-6 p-6 md:p-8 bg-[#FAFAFA] min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-[24px] font-semibold text-[#111111]">
            {viewMode === "list" ? "Tasks" : "Kanban Board"}
          </h1>
          <p className="text-[14px] text-[#737373] mt-1">
            {viewMode === "list"
              ? `${total} task${total === 1 ? "" : "s"} total`
              : "Drag and drop tasks across columns."}
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
          <PermissionGuard permission={PermissionEnum.TASKS_CREATE}>
            <Button
              onClick={() => setIsAddTaskOpen(true)}
              className="bg-[#0891B2] hover:bg-[#0891B2]/90 text-white font-medium h-10 px-4 rounded-[3px]"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Task
            </Button>
          </PermissionGuard>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 w-full">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]" />
          <Input
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="pl-9 h-10 w-full bg-white border-[#E5E5E5] text-[#111111] placeholder:text-[#A3A3A3] focus-visible:ring-1 focus-visible:ring-[#0891B2]"
          />
        </div>
        <div className="flex items-center gap-3">
          <Select
            value={projectFilter}
            onValueChange={(value) => {
              setProjectFilter(value ?? "");
              setPage(1);
            }}
            items={projects.map((project) => ({ value: project.id, label: project.title }))}
          >
            <SelectTrigger className="w-full md:w-[200px] h-10 bg-white border-[#E5E5E5] text-[#111111] text-[14px] [&>span]:text-[#737373]">
              <SelectValue placeholder="All Projects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={assigneeFilter}
            onValueChange={(value) => {
              setAssigneeFilter(value ?? "");
              setPage(1);
            }}
            items={(users ?? []).map((user) => ({
              value: user.id,
              label: `${user.profile?.firstName ?? ""} ${user.profile?.lastName ?? ""}`.trim(),
            }))}
          >
            <SelectTrigger className="w-full md:w-[180px] h-10 bg-white border-[#E5E5E5] text-[#111111] text-[14px] [&>span]:text-[#737373]">
              <SelectValue placeholder="All Assignees" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Assignees</SelectItem>
              {(users ?? []).map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  {user.profile?.firstName} {user.profile?.lastName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" className="border-[#E5E5E5] bg-white text-[#111111] font-medium h-10 px-4 shrink-0 rounded-[3px]">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="inline-flex items-center p-1 bg-[#F5F5F5] rounded-[10px] w-fit">
        {(["All", "To Do", "In Progress", "Done"] as Tab[]).map((tab) => (
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i} className="border-b border-[#E5E5E5]">
                      <TableCell className="py-4"><Skeleton className="w-4 h-4" /></TableCell>
                      <TableCell className="py-4"><Skeleton className="h-4 w-[180px]" /></TableCell>
                      <TableCell className="py-4"><Skeleton className="h-8 w-[140px] rounded-full" /></TableCell>
                      <TableCell className="py-4"><Skeleton className="h-4 w-[120px]" /></TableCell>
                      <TableCell className="py-4"><Skeleton className="h-4 w-[80px]" /></TableCell>
                      <TableCell className="py-4"><Skeleton className="h-5 w-[60px] rounded" /></TableCell>
                      <TableCell className="py-4"><Skeleton className="h-5 w-[80px] rounded" /></TableCell>
                    </TableRow>
                  ))
                ) : tasks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="py-12 text-center text-[14px] text-[#737373]">
                      No tasks found.
                    </TableCell>
                  </TableRow>
                ) : (
                  tasks.map((task: Task) => (
                    <TableRow
                      key={task.id}
                      className="border-b border-[#E5E5E5] hover:bg-[#F8FAFC] cursor-pointer"
                      onClick={() => setSelectedTaskId(task.id)}
                    >
                      <TableCell className="w-[50px] text-center" onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={task.status === "DONE"}
                          onCheckedChange={() =>
                            changeStatus({
                              taskId: task.id,
                              status: task.status === "DONE" ? TaskStatus.TODO : TaskStatus.DONE,
                            })
                          }
                          className="border-[#E5E5E5] data-checked:bg-[#0891B2] data-checked:border-[#0891B2] data-checked:text-white"
                        />
                      </TableCell>
                      <TableCell className="py-4">
                        <span className={`text-[14px] font-medium ${task.status === "DONE" ? "text-[#737373] line-through" : "text-[#111111]"}`}>
                          {task.title}
                        </span>
                      </TableCell>
                      <TableCell className="py-4">
                        {task.assignee ? (
                          <div className="flex items-center gap-2">
                            <Avatar className="w-8 h-8 rounded-full border border-[#E5E5E5]">
                              <AvatarImage src={task.assignee.profile?.avatarUrl} />
                              <AvatarFallback className="bg-[#F1F5F9] text-[#0891B2] text-[12px] font-semibold">
                                {`${task.assignee.profile?.firstName?.charAt(0) ?? ""}${task.assignee.profile?.lastName?.charAt(0) ?? ""}`.toUpperCase() || "U"}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-[14px] text-[#404040]">
                              {`${task.assignee.profile?.firstName ?? ""} ${task.assignee.profile?.lastName ?? ""}`.trim() || task.assignee.email}
                            </span>
                          </div>
                        ) : (
                          <span className="text-[14px] text-[#A3A3A3]">Unassigned</span>
                        )}
                      </TableCell>
                      <TableCell className="py-4 text-[14px] text-[#404040]">
                        {task.project?.title ?? "—"}
                      </TableCell>
                      <TableCell className="py-4 text-[14px] text-[#404040]">
                        {task.dueDate ? format(new Date(task.dueDate), "MMM d, yyyy") : "—"}
                      </TableCell>
                      <TableCell className="py-4">
                        {renderPriority(task.priority)}
                      </TableCell>
                      <TableCell className="py-4">
                        {renderStatus(task.status)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination Footer */}
          {total > 0 && (
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-2">
              <p className="text-[14px] text-[#737373]">
                Showing <span className="font-medium text-[#111111]">{(page - 1) * limit + 1}</span> to{" "}
                <span className="font-medium text-[#111111]">{Math.min(page * limit, total)}</span> of{" "}
                <span className="font-medium text-[#111111]">{total}</span> entries
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="h-8 text-[13px] text-[#111111] border-[#E5E5E5] hover:bg-[#F8FAFC] rounded-[4px] px-3 font-medium"
                >
                  Previous
                </Button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.max(1, totalPages) }, (_, i) => i + 1).map((p) => (
                    <Button
                      key={p}
                      variant={p === page ? "default" : "outline"}
                      className={p === page
                        ? "w-8 h-8 p-0 bg-[#0891B2] text-white hover:bg-[#0891B2]/90 border-[#0891B2] rounded-[4px] text-[13px] font-medium"
                        : "w-8 h-8 p-0 bg-white border-[#E5E5E5] text-[#111111] hover:bg-[#F8FAFC] rounded-[4px] text-[13px] font-medium"
                      }
                      onClick={() => setPage(p)}
                    >
                      {p}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages || totalPages === 0}
                  className="h-8 text-[13px] text-[#111111] border-[#E5E5E5] hover:bg-[#F8FAFC] rounded-[4px] px-3 font-medium"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      ) : isLoading ? (
        <div className="flex gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-4 w-[320px]">
              <Skeleton className="h-6 w-[120px]" />
              <Skeleton className="h-[120px] rounded-xl" />
              <Skeleton className="h-[120px] rounded-xl" />
            </div>
          ))}
        </div>
      ) : (
        <KanbanBoard
          tasks={tasks}
          onTaskClick={(task) => setSelectedTaskId(task.id)}
          onStatusChange={(taskId, newStatus) => changeStatus({ taskId, status: newStatus })}
        />
      )}

      <AddTaskModal isOpen={isAddTaskOpen} onClose={() => setIsAddTaskOpen(false)} />
      <TaskDetailsPanel
        taskId={selectedTaskId}
        isOpen={!!selectedTaskId}
        onClose={() => setSelectedTaskId(null)}
      />
    </div>
  );
}
