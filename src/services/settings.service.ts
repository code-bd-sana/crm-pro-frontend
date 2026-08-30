import { api } from '@/lib/axios';
import type { ApiResponse } from '@/types/models.types';

export const getSettings = (): Promise<Record<string, any>> =>
  api.get<ApiResponse<Record<string, any>>>('/settings').then((res) => res.data.data);

export const updateSettings = (payload: { settings: Record<string, any> }): Promise<Record<string, any>> =>
  api.patch<ApiResponse<Record<string, any>>>('/settings', payload).then((res) => res.data.data);
