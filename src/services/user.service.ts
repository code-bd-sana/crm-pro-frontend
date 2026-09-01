import { api } from '@/lib/axios';
import type { UserDetails, CreateUserDto, UpdateUserDto, ApiResponse } from '@/types/models.types';

export const getUsers = (): Promise<UserDetails[]> =>
  api.get<ApiResponse<UserDetails[]>>('/users').then((res) => res.data.data);

export const getUserById = (id: string): Promise<UserDetails> =>
  api.get<ApiResponse<UserDetails>>(`/users/${id}`).then((res) => res.data.data);

export const createUser = (payload: CreateUserDto): Promise<UserDetails> =>
  api.post<ApiResponse<UserDetails>>('/users', payload).then((res) => res.data.data);

export const updateUser = (id: string, payload: UpdateUserDto): Promise<UserDetails> =>
  api.patch<ApiResponse<UserDetails>>(`/users/${id}`, payload).then((res) => res.data.data);

export const deleteUser = (id: string): Promise<void> =>
  api.delete(`/users/${id}`).then(() => undefined);
