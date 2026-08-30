import { api } from '@/lib/axios';
import type { RoleDetails, CreateRoleDto, UpdateRoleDto, ApiResponse } from '@/types/models.types';

export const getRoles = (): Promise<RoleDetails[]> =>
  api.get<ApiResponse<RoleDetails[]>>('/roles').then((res) => res.data.data);

export const createRole = (payload: CreateRoleDto): Promise<RoleDetails> =>
  api.post<ApiResponse<RoleDetails>>('/roles', payload).then((res) => res.data.data);

export const updateRole = (id: string, payload: UpdateRoleDto): Promise<RoleDetails> =>
  api.patch<ApiResponse<RoleDetails>>(`/roles/${id}`, payload).then((res) => res.data.data);

export const deleteRole = (id: string): Promise<void> =>
  api.delete(`/roles/${id}`).then(() => undefined);
