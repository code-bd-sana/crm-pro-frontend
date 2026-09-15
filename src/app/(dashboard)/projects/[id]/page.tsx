"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Calendar, Flag, Users, Plus, Trash2, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { getProjectById, getProjectMilestones, createProjectMilestone, updateProjectMilestone, deleteProjectMilestone } from "@/services/project.service";
import { getErrorMessage } from "@/lib/utils";
import { ProjectMilestone, MilestoneStatus } from "@/types/models.types";
import { PermissionGuard } from "@/components/shared/PermissionGuard";
import { PermissionEnum } from "@/types/auth.types";
import { ProjectTasks } from "@/components/projects/ProjectTasks";
import { ProjectFiles } from "@/components/projects/ProjectFiles";
import { ProjectTeam } from "@/components/projects/ProjectTeam";
import { EditProjectForm } from "@/components/projects/EditProjectForm";

const PRIORITY_LABELS: Record<string, string> = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  URGENT: "Urgent",
};

const STATUS_BADGES: Record<string, string> = {
  ACTIVE: "bg-[#EFF6FF] text-[#0891B2] border-[#BDE0FE]",
  ON_HOLD: "bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]",
  COMPLETED: "bg-[#ECFDF5] text-[#10B981] border-[#A7F3D0]",
  CANCELLED: "bg-[#FEF2F2] text-[#EF4444] border-[#FECACA]",
};

const MILESTONE_BADGES: Record<string, string> = {
  PENDING: "bg-[#FAFAFA] text-[#737373] border-[#E5E5E5]",
  IN_PROGRESS: "bg-[#EFF6FF] text-[#3B82F6] border-[#BFDBFE]",
  COMPLETED: "bg-[#ECFDF5] text-[#10B981] border-transparent",
};

export default function ProjectDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const projectId = params.id as string;

  const [activeTab, setActiveTab] = useState("overview");
  const [milestoneTitle, setMilestoneTitle] = useState("");
  const [milestoneDueDate, setMilestoneDueDate] = useState("");
  const [milestoneToDelete, setMilestoneToDelete] = useState<ProjectMilestone | null>(null);

  const { data: project, isLoading } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProjectById(projectId),
    enabled: !!projectId,
  });

  const { data: milestones } = useQuery({
    queryKey: ["project", projectId, "milestones"],
    queryFn: () => getProjectMilestones(projectId),
    enabled: !!projectId,
  });

  const invalidateMilestones = () => {
    queryClient.invalidateQueries({ queryKey: ["project", projectId, "milestones"] });
    queryClient.invalidateQueries({ queryKey: ["project", projectId] });
  };

  const { mutate: addMilestone, isPending: isAddingMilestone } = useMutation({
    mutationFn: () =>
      createProjectMilestone(projectId, {
        title: milestoneTitle,
        dueDate: milestoneDueDate || undefined,
      }),
    onSuccess: () => {
      invalidateMilestones();
      setMilestoneTitle("");
      setMilestoneDueDate("");
      toast.success("Milestone added");
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, "Failed to add milestone"));
    },
  });

  const { mutate: changeMilestoneStatus } = useMutation({
    mutationFn: ({ milestoneId, status }: { milestoneId: string; status: MilestoneStatus }) =>
      updateProjectMilestone(projectId, milestoneId, { status }),
    onSuccess: () => {
      invalidateMilestones();
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, "Failed to update milestone"));
    },
  });

  const { mutate: removeMilestone } = useMutation({
    mutationFn: (milestoneId: string) => deleteProjectMilestone(projectId, milestoneId),
    onSuccess: () => {
      invalidateMilestones();
      toast.success("Milestone deleted");
      setMilestoneToDelete(null);
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, "Failed to delete milestone"));
    },
  });

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 p-6 min-h-full">
        <Skeleton className="h-8 w-[240px]" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-[86px] rounded-[10px]" />
          ))}
        </div>
        <Skeleton className="h-[400px] rounded-[10px]" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-[#FAFAFA]">
        <h2 className="text-xl font-semibold text-[#111111]">Project Not Found</h2>
        <Button variant="link" onClick={() => router.push("/projects")} className="mt-4 text-[#0891B2]">
          Back to Projects
        </Button>
      </div>
    );
  }

  const milestoneList = milestones ?? [];

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
            {project.title}
          </h1>
          {project.client && (
            <Link href={`/clients/${project.client.id}`} className="text-[14px] leading-[20px] font-medium text-[#0891B2] hover:underline mt-1 block">
              {project.client.companyName}
            </Link>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Badge className={`px-2 py-1 rounded-[4px] font-medium text-[12px] ${STATUS_BADGES[project.status] ?? STATUS_BADGES.ACTIVE}`}>
            {project.status.replace("_", " ")}
          </Badge>
          <PermissionGuard permission={PermissionEnum.PROJECTS_UPDATE}>
            <Button
              onClick={() => setActiveTab("settings")}
              className="h-9 px-4 bg-[#0891B2] hover:bg-[#0891B2]/90 text-white font-medium text-[14px] rounded-[4px]"
            >
              Edit Project
            </Button>
          </PermissionGuard>
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
              <span className="text-[14px] leading-[20px] font-medium text-[#111111]">
                {project.dueDate ? format(new Date(project.dueDate), "MMM d, yyyy") : "—"}
              </span>
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
              <span className="text-[14px] leading-[20px] font-medium text-[#111111]">
                {PRIORITY_LABELS[project.priority] ?? project.priority}
              </span>
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
              <span className="text-[14px] leading-[20px] font-medium text-[#111111]">
                {(project.members ?? []).length} member{(project.members ?? []).length === 1 ? "" : "s"}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="h-[86px] shadow-none border-[#E5E5E5] rounded-[10px]">
          <CardContent className="h-full px-4 pt-4 pb-0 flex flex-col gap-2">
            <span className="text-[12px] leading-[16px] text-[#737373]">Progress</span>
            <div className="flex items-center gap-2">
              <Progress value={project.progress} className="flex-1" />
              <span className="text-[14px] leading-[20px] font-medium text-[#111111]">{project.progress}%</span>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Tabs Section */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-2 flex flex-col gap-6">
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
          <Card className="shadow-none border-[#E5E5E5] rounded-[10px] p-6 flex flex-col gap-4">
            <h3 className="text-[16px] font-semibold text-[#111111]">Description</h3>
            <p className="text-[14px] leading-[20px] text-[#737373]">
              {project.description || "No description provided."}
            </p>
          </Card>

          {/* Milestones */}
          <Card className="shadow-none border-[#E5E5E5] rounded-[10px] p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[16px] font-semibold text-[#111111]">Milestones</h3>
              <span className="text-[13px] text-[#737373]">{milestoneList.length} total</span>
            </div>

            <PermissionGuard permission={PermissionEnum.PROJECTS_UPDATE}>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  placeholder="New milestone title"
                  value={milestoneTitle}
                  onChange={(e) => setMilestoneTitle(e.target.value)}
                  className="flex-1 h-9 border-[#E5E5E5] focus-visible:ring-[#0891B2] bg-[#FFFFFF] text-[#111111] placeholder:text-[#737373]"
                />
                <Input
                  type="date"
                  value={milestoneDueDate}
                  onChange={(e) => setMilestoneDueDate(e.target.value)}
                  className="sm:w-[160px] h-9 border-[#E5E5E5] focus-visible:ring-[#0891B2] bg-[#FFFFFF] text-[#111111]"
                />
                <Button
                  onClick={() => addMilestone()}
                  disabled={!milestoneTitle.trim() || isAddingMilestone}
                  className="h-9 px-4 bg-[#0891B2] hover:bg-[#0891B2]/90 text-white rounded-[4px] font-medium shrink-0"
                >
                  {isAddingMilestone ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4 mr-1" />}
                  Add
                </Button>
              </div>
            </PermissionGuard>

            <div className="flex flex-col gap-4 mt-2">
              {milestoneList.length === 0 ? (
                <p className="text-[14px] text-[#737373] py-4 text-center">No milestones yet.</p>
              ) : (
                milestoneList.map((milestone, index) => (
                  <div key={milestone.id} className="flex items-center gap-4">
                    <div
                      className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center font-semibold text-[14px] ${
                        milestone.status === MilestoneStatus.COMPLETED
                          ? "border-2 border-[#10B981] text-white bg-[#10B981]"
                          : milestone.status === MilestoneStatus.IN_PROGRESS
                            ? "border-2 border-[#0891B2] text-[#0891B2] bg-white"
                            : "border border-[#E5E5E5] text-[#A3A3A3] bg-white"
                      }`}
                    >
                      {milestone.status === MilestoneStatus.COMPLETED ? "✓" : index + 1}
                    </div>
                    <div className="flex-1 flex justify-between items-center gap-2">
                      <div className="flex flex-col gap-1 min-w-0">
                        <h4 className="text-[14px] leading-[20px] font-medium text-[#111111] truncate">{milestone.title}</h4>
                        {milestone.dueDate && (
                          <p className="text-[12px] leading-[16px] text-[#737373]">
                            Due {format(new Date(milestone.dueDate), "MMM d")}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <PermissionGuard
                          fallback={
                            <Badge className={`${MILESTONE_BADGES[milestone.status] ?? MILESTONE_BADGES.PENDING} hover:bg-inherit font-medium rounded-[4px] shadow-none`}>
                              {milestone.status.replace("_", " ")}
                            </Badge>
                          }
                          permission={PermissionEnum.PROJECTS_UPDATE}
                        >
                          <Select
                            value={milestone.status}
                            onValueChange={(status) =>
                              changeMilestoneStatus({ milestoneId: milestone.id, status: status as MilestoneStatus })
                            }
                            items={[
                              { value: MilestoneStatus.PENDING, label: "Pending" },
                              { value: MilestoneStatus.IN_PROGRESS, label: "In Progress" },
                              { value: MilestoneStatus.COMPLETED, label: "Completed" },
                            ]}
                          >
                            <SelectTrigger className="h-8 w-[150px] border-[#E5E5E5] !bg-[#FFFFFF] text-[12px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value={MilestoneStatus.PENDING}>Pending</SelectItem>
                              <SelectItem value={MilestoneStatus.IN_PROGRESS}>In Progress</SelectItem>
                              <SelectItem value={MilestoneStatus.COMPLETED}>Completed</SelectItem>
                            </SelectContent>
                          </Select>
                          <button
                            onClick={() => setMilestoneToDelete(milestone)}
                            className="text-[#737373] hover:text-[#EF4444] transition-colors p-1"
                            aria-label="Delete milestone"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </PermissionGuard>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* Tasks Preview */}
          <ProjectTasks projectId={projectId} />
        </TabsContent>

        <TabsContent value="tasks" className="mt-0 outline-none">
          <ProjectTasks projectId={projectId} />
        </TabsContent>

        <TabsContent value="files" className="mt-0 outline-none">
          <ProjectFiles projectId={projectId} />
        </TabsContent>

        <TabsContent value="team" className="mt-0 outline-none">
          <ProjectTeam project={project} />
        </TabsContent>

        <TabsContent value="settings" className="mt-0 outline-none">
          <EditProjectForm project={project} />
        </TabsContent>
      </Tabs>

      {/* Delete Milestone Confirmation */}
      <AlertDialog open={!!milestoneToDelete} onOpenChange={(open) => !open && setMilestoneToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete milestone?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the milestone{" "}
              <span className="font-semibold text-black">{milestoneToDelete?.title}</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => milestoneToDelete && removeMilestone(milestoneToDelete.id)}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}
