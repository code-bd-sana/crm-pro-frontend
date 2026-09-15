import { api } from '@/lib/axios';

const BASE_PATH = '/analytics';

export interface GlobalMetrics {
  teamProductivity: number;
  averageScore: number;
  taskCompletionRate: number;
  teamSatisfaction: number;
}

export interface TeamAnalytics {
  globalMetrics: GlobalMetrics;
  taskCompletionByMember: { name: string; completed: number }[];
  departmentPerformance: { name: string; membersCount: number; productivity: number }[];
  topPerformers: { id: string; name: string; score: number; avatar: string | null }[];
}

export interface UserStats {
  completionRate: number;
  activeTasks: number;
  activeProjects: number;
}

export interface DashboardSummary {
  totalClients: number;
  activeProjects: number;
  tasksDueToday: number;
  totalTasks: number;
  completedTasks: number;
  revenueThisMonth: number;
  tasksByStatus: {
    todo: number;
    inProgress: number;
    done: number;
  };
}

export interface DashboardActivity {
  id: string;
  description: string;
  userName: string;
  initials: string;
  taskTitle?: string;
  projectTitle?: string;
  createdAt: string;
}

export interface DashboardDeadline {
  id: string;
  title: string;
  dueDate: string;
  priority: string;
  projectTitle?: string;
  assigneeName: string | null;
}

export interface DashboardData {
  summary: DashboardSummary;
  recentActivity: DashboardActivity[];
  upcomingDeadlines: DashboardDeadline[];
}

export interface RevenueMonth {
  name: string;
  value: number;
}

export interface ProjectPerformance {
  totalProjects: number;
  projectStatus: { status: string; count: number }[];
  topClients: { name: string; value: number }[];
}

export const getTeamAnalytics = async (): Promise<TeamAnalytics> => {
  const response = await api.get<{ success: boolean; data: TeamAnalytics }>(`${BASE_PATH}/team`);
  return response.data.data;
};

export const getUserStats = async (userId: string): Promise<UserStats> => {
  const response = await api.get<{ success: boolean; data: UserStats }>(`${BASE_PATH}/users/${userId}/stats`);
  return response.data.data;
};

export const getDashboardAnalytics = async (): Promise<DashboardData> => {
  const response = await api.get<{ success: boolean; data: DashboardData }>(`${BASE_PATH}/dashboard`);
  return response.data.data;
};

export const getRevenueAnalytics = async (): Promise<RevenueMonth[]> => {
  const response = await api.get<{ success: boolean; data: RevenueMonth[] }>(`${BASE_PATH}/revenue`);
  return response.data.data;
};

export const getProjectsPerformance = async (): Promise<ProjectPerformance> => {
  const response = await api.get<{ success: boolean; data: ProjectPerformance }>(`${BASE_PATH}/projects-performance`);
  return response.data.data;
};
