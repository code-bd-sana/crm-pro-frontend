import { api } from '@/lib/axios';
import type { RoleDetails, ApiResponse } from '@/types/models.types';

export const getRoles = (): Promise<RoleDetails[]> =>
  api.get<ApiResponse<RoleDetails[]>>('/roles').then((res) => res.data.data);
