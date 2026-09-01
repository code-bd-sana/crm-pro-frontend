import { api } from '@/lib/axios';
import type { Department, CreateDepartmentDto, UpdateDepartmentDto, ApiResponse } from '@/types/models.types';

export const getDepartments = (): Promise<Department[]> =>
  api.get<ApiResponse<Department[]>>('/departments').then((res) => res.data.data);

export const getDepartmentById = (id: string): Promise<Department> =>
  api.get<ApiResponse<Department>>(`/departments/${id}`).then((res) => res.data.data);

export const createDepartment = (payload: CreateDepartmentDto): Promise<Department> =>
  api.post<ApiResponse<Department>>('/departments', payload).then((res) => res.data.data);

export const updateDepartment = (id: string, payload: UpdateDepartmentDto): Promise<Department> =>
  api.patch<ApiResponse<Department>>(`/departments/${id}`, payload).then((res) => res.data.data);

export const deleteDepartment = (id: string): Promise<void> =>
  api.delete(`/departments/${id}`).then(() => undefined);
