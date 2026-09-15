import { api } from '@/lib/axios';

const BASE_PATH = '/notifications';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  resourceType?: string | null;
  resourceId?: string | null;
  createdAt: string;
}

export const getNotifications = async (page = 1, limit = 20) => {
  const response = await api.get<{ success: boolean; data: AppNotification[] }>(BASE_PATH, {
    params: { page, limit },
  });
  return response.data.data;
};

/**
 * Backend has no /notifications/unread-count endpoint yet.
 * Unread count is derived client-side from the notification list.
 */
export const getUnreadCount = async (): Promise<number> => {
  const notifications = await getNotifications(1, 100);
  return notifications.filter((notification) => !notification.isRead).length;
};

export const markAsRead = async (id: string) => {
  const response = await api.patch<{ success: boolean; data: AppNotification }>(`${BASE_PATH}/${id}/read`);
  return response.data.data;
};

export const markAllAsRead = async () => {
  const response = await api.patch<{ success: boolean; message: string }>(`${BASE_PATH}/mark-all-read`);
  return response.data;
};
