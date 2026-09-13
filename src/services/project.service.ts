import { api } from '@/lib/axios';
import type {
  Project,
  CreateProjectDto,
  UpdateProjectDto,
  PaginatedResponse,
} from '@/types/models.types';

const BASE_PATH = '/projects';

export interface QueryProjectDto {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  clientId?: string;
}

export const getProjects = async (query?: QueryProjectDto): Promise<PaginatedResponse<Project>> => {
  const response = await api.get<PaginatedResponse<Project> & { success: boolean; message?: string }>(BASE_PATH, {
    params: query,
  });
  return {
    data: response.data.data,
    meta: response.data.meta,
  };
};

export const getProjectById = async (id: string): Promise<Project> => {
  const response = await api.get<{ success: boolean; data: Project }>(`${BASE_PATH}/${id}`);
  return response.data.data;
};

export const createProject = async (data: CreateProjectDto): Promise<Project> => {
  const response = await api.post<{ success: boolean; data: Project }>(BASE_PATH, data);
  return response.data.data;
};

export const updateProject = async (id: string, data: UpdateProjectDto): Promise<Project> => {
  const response = await api.patch<{ success: boolean; data: Project }>(`${BASE_PATH}/${id}`, data);
  return response.data.data;
};

export const deleteProject = async (id: string): Promise<void> => {
  await api.delete(`${BASE_PATH}/${id}`);
};
