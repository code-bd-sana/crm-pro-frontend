import { api } from '@/lib/axios';
import type {
  Client,
  CreateClientDto,
  UpdateClientDto,
  QueryClientDto,
  PaginatedResponse,
  ClientCommunication
} from '@/types/models.types';

const BASE_PATH = '/clients';

export const getClients = async (query?: QueryClientDto): Promise<PaginatedResponse<Client>> => {
  const response = await api.get<{ success: boolean; data: PaginatedResponse<Client> }>(BASE_PATH, {
    params: query
  });
  return response.data.data;
};

export const getClientById = async (id: string): Promise<Client> => {
  const response = await api.get<{ success: boolean; data: Client }>(`${BASE_PATH}/${id}`);
  return response.data.data;
};

export const createClient = async (data: CreateClientDto): Promise<Client> => {
  const response = await api.post<{ success: boolean; data: Client }>(BASE_PATH, data);
  return response.data.data;
};

export const updateClient = async (id: string, data: UpdateClientDto): Promise<Client> => {
  const response = await api.patch<{ success: boolean; data: Client }>(`${BASE_PATH}/${id}`, data);
  return response.data.data;
};

export const deleteClient = async (id: string): Promise<void> => {
  await api.delete(`${BASE_PATH}/${id}`);
};

export const getClientCommunications = async (id: string): Promise<ClientCommunication[]> => {
  const response = await api.get<{ success: boolean; data: ClientCommunication[] }>(`${BASE_PATH}/${id}/communications`);
  return response.data.data;
};

export const addClientCommunication = async (id: string, data: any): Promise<ClientCommunication> => {
  const response = await api.post<{ success: boolean; data: ClientCommunication }>(`${BASE_PATH}/${id}/communications`, data);
  return response.data.data;
};
