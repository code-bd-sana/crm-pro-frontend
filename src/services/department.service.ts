import { api } from '@/lib/axios';
import type { Department, ApiResponse } from '@/types/models.types';

export const getDepartments = (): Promise<Department[]> =>
  api.get<ApiResponse<Department[]>>('/departments').then((res) => res.data.data);
