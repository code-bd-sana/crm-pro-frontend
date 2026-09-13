import { api } from '@/lib/axios';
import type { Client, CreateClientDto, UpdateClientDto, ApiResponse } from '@/types/models.types';

interface GetClientsParams {
  page?: number;
  limit?: number;
  search?: string;
}

export const getClients = (params?: GetClientsParams): Promise<ApiResponse<Client[]>> =>
  api.get<ApiResponse<Client[]>>('/clients', { params }).then((res) => res.data);

export const getClientById = (id: string): Promise<Client> =>
  api.get<ApiResponse<Client>>(`/clients/${id}`).then((res) => res.data.data);

export const createClient = (payload: CreateClientDto): Promise<Client> =>
  api.post<ApiResponse<Client>>('/clients', payload).then((res) => res.data.data);

export const updateClient = (id: string, payload: UpdateClientDto): Promise<Client> =>
  api.patch<ApiResponse<Client>>(`/clients/${id}`, payload).then((res) => res.data.data);

export const deleteClient = (id: string): Promise<void> =>
  api.delete(`/clients/${id}`).then(() => undefined);
