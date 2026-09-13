import { api } from '@/lib/axios';
import type {
  Task,
  CreateTaskDto,
  UpdateTaskDto,
  PaginatedResponse,
} from '@/types/models.types';

const BASE_PATH = '/tasks';

export interface QueryTaskDto {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  projectId?: string;
  assigneeId?: string;
}

export const getTasks = async (query?: QueryTaskDto): Promise<PaginatedResponse<Task>> => {
  const response = await api.get<PaginatedResponse<Task> & { success: boolean; message?: string }>(BASE_PATH, {
    params: query,
  });
  return {
    data: response.data.data,
    meta: response.data.meta,
  };
};

export const getTaskById = async (id: string): Promise<Task> => {
  const response = await api.get<{ success: boolean; data: Task }>(`${BASE_PATH}/${id}`);
  return response.data.data;
};

export const createTask = async (data: CreateTaskDto): Promise<Task> => {
  const response = await api.post<{ success: boolean; data: Task }>(BASE_PATH, data);
  return response.data.data;
};

export const updateTask = async (id: string, data: UpdateTaskDto): Promise<Task> => {
  const response = await api.patch<{ success: boolean; data: Task }>(`${BASE_PATH}/${id}`, data);
  return response.data.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`${BASE_PATH}/${id}`);
};
