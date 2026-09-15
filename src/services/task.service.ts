import { api } from '@/lib/axios';
import type {
  Task,
  Subtask,
  TaskComment,
  CreateSubtaskDto,
  UpdateSubtaskDto,
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
  priority?: string;
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

export const getSubtasks = async (taskId: string): Promise<Subtask[]> => {
  const response = await api.get<{ success: boolean; data: Subtask[] }>(`${BASE_PATH}/${taskId}/subtasks`);
  return response.data.data;
};

export const createSubtask = async (taskId: string, data: CreateSubtaskDto): Promise<Subtask> => {
  const response = await api.post<{ success: boolean; data: Subtask }>(`${BASE_PATH}/${taskId}/subtasks`, data);
  return response.data.data;
};

export const updateSubtask = async (taskId: string, subtaskId: string, data: UpdateSubtaskDto): Promise<Subtask> => {
  const response = await api.patch<{ success: boolean; data: Subtask }>(`${BASE_PATH}/${taskId}/subtasks/${subtaskId}`, data);
  return response.data.data;
};

export const deleteSubtask = async (taskId: string, subtaskId: string): Promise<void> => {
  await api.delete(`${BASE_PATH}/${taskId}/subtasks/${subtaskId}`);
};

export const getTaskComments = async (taskId: string): Promise<TaskComment[]> => {
  const response = await api.get<{ success: boolean; data: TaskComment[] }>(`${BASE_PATH}/${taskId}/comments`);
  return response.data.data;
};

export const addTaskComment = async (taskId: string, content: string): Promise<TaskComment> => {
  const response = await api.post<{ success: boolean; data: TaskComment }>(`${BASE_PATH}/${taskId}/comments`, { content });
  return response.data.data;
};

export const deleteTaskComment = async (taskId: string, commentId: string): Promise<void> => {
  await api.delete(`${BASE_PATH}/${taskId}/comments/${commentId}`);
};
