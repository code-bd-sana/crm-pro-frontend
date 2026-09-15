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

export const getTeamAnalytics = async (): Promise<TeamAnalytics> => {
  const response = await api.get<{ success: boolean; data: TeamAnalytics }>(`${BASE_PATH}/team`);
  return response.data.data;
};

export const getUserStats = async (userId: string): Promise<UserStats> => {
  const response = await api.get<{ success: boolean; data: UserStats }>(`${BASE_PATH}/users/${userId}/stats`);
  return response.data.data;
};

// TODO(backend): /analytics/dashboard, /analytics/revenue, and /analytics/projects-performance
// are not implemented in the backend yet. Dashboard and Reports pages must compose data
// from existing endpoints (/clients, /projects, /tasks, /invoices, /analytics/team) until added.
