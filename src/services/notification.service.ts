import { api } from '@/lib/axios';

const BASE_PATH = '/notifications';

export const getNotifications = async (page = 1, limit = 20) => {
  const response = await api.get<{ success: boolean; data: any[], meta: any }>(BASE_PATH, {
    params: { page, limit },
  });
  return {
    data: response.data.data,
    meta: response.data.meta,
  };
};

export const getUnreadCount = async () => {
  const response = await api.get<{ success: boolean; data: { count: number } }>(`${BASE_PATH}/unread-count`);
  return response.data.data.count;
};

export const markAsRead = async (id: string) => {
  const response = await api.patch<{ success: boolean; data: any }>(`${BASE_PATH}/${id}/read`);
  return response.data.data;
};

export const markAllAsRead = async () => {
  const response = await api.patch<{ success: boolean; data: any }>(`${BASE_PATH}/read-all`);
  return response.data.data;
};
