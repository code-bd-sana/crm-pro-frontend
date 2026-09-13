import { api } from '@/lib/axios';

const BASE_PATH = '/analytics';

export const getDashboardMetrics = async () => {
  const response = await api.get<{ success: boolean; data: any }>(`${BASE_PATH}/dashboard`);
  return response.data.data;
};

export const getRevenueReport = async (startDate: string, endDate: string) => {
  const response = await api.get<{ success: boolean; data: any }>(`${BASE_PATH}/revenue`, {
    params: { startDate, endDate },
  });
  return response.data.data;
};

export const getProjectPerformance = async () => {
  const response = await api.get<{ success: boolean; data: any }>(`${BASE_PATH}/projects-performance`);
  return response.data.data;
};
