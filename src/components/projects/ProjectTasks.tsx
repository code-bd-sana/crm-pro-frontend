"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { getTasks, updateTask } from "@/services/task.service";
import { getErrorMessage } from "@/lib/utils";
import type { Task, TaskPriority } from "@/types/models.types";
import { TaskStatus } from "@/types/models.types";

const PRIORITY_BADGES: Record<TaskPriority, string> = {
  LOW: "bg-[#F0FDF4] text-[#10B981]",
  MEDIUM: "bg-[#FFFBEB] text-[#F59E0B]",
  HIGH: "bg-[#FEF2F2] text-[#EF4444]",
  CRITICAL: "bg-[#FEF2F2] text-[#B91C1C]",
};

export function ProjectTasks({ projectId }: { projectId: string }) {
  const queryClient = useQueryClient();

  const { data: tasksData, isLoading } = useQuery({
    queryKey: ["tasks", "project", projectId],
    queryFn: () => getTasks({ projectId, page: 1, limit: 50 }),
  });

  const { mutate: toggleTask, isPending } = useMutation({
    mutationFn: ({ id, status }: { id: string; status: TaskStatus }) => updateTask(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", "project", projectId] });
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, "Failed to update task"));
    },
  });

  const tasks = tasksData?.data ?? [];

  return (
    <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-[16px] font-semibold text-[#111111]">Tasks</h3>
        <span className="text-[13px] text-[#737373]">{tasks.length} task{tasks.length === 1 ? "" : "s"}</span>
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-full" />
          ))}
        </div>
      ) : tasks.length === 0 ? (
        <p className="text-[14px] text-[#737373] py-4 text-center">No tasks in this project yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {tasks.map((task: Task) => (
            <div key={task.id} className="flex items-center gap-3">
              <Checkbox
                checked={task.status === "DONE"}
                disabled={isPending}
                onCheckedChange={() =>
                  toggleTask({ id: task.id, status: task.status === "DONE" ? TaskStatus.TODO : TaskStatus.DONE })
                }
                className="w-5 h-5 border-[#E5E5E5] data-checked:bg-[#0891B2] data-checked:border-[#0891B2] data-checked:text-white rounded-[4px]"
              />
              <div className="flex-1 flex flex-col min-w-0">
                <span
                  className={`text-[14px] leading-[20px] font-medium ${
                    task.status === "DONE" ? "text-[#737373] line-through" : "text-[#111111]"
                  }`}
                >
                  {task.title}
                </span>
                {task.assignee?.profile && (
                  <span className="text-[12px] text-[#737373]">
                    {task.assignee.profile.firstName} {task.assignee.profile.lastName}
                  </span>
                )}
              </div>
              {task.dueDate && (
                <span className="text-[12px] text-[#737373] shrink-0">
                  {format(new Date(task.dueDate), "MMM d")}
                </span>
              )}
              <Badge
                className={`${PRIORITY_BADGES[task.priority] ?? PRIORITY_BADGES.MEDIUM} hover:bg-inherit border-transparent font-medium rounded-[4px] shadow-none shrink-0`}
              >
                {task.priority.toLowerCase()}
              </Badge>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
