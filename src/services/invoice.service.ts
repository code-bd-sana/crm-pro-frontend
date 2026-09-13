import { api } from '@/lib/axios';
import type {
  Invoice,
  CreateInvoiceDto,
  UpdateInvoiceDto,
  PaginatedResponse,
} from '@/types/models.types';

const BASE_PATH = '/invoices';

export interface QueryInvoiceDto {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  clientId?: string;
}

export const getInvoices = async (query?: QueryInvoiceDto): Promise<PaginatedResponse<Invoice>> => {
  const response = await api.get<PaginatedResponse<Invoice> & { success: boolean; message?: string }>(BASE_PATH, {
    params: query,
  });
  return {
    data: response.data.data,
    meta: response.data.meta,
  };
};

export const getInvoiceById = async (id: string): Promise<Invoice> => {
  const response = await api.get<{ success: boolean; data: Invoice }>(`${BASE_PATH}/${id}`);
  return response.data.data;
};

export const createInvoice = async (data: CreateInvoiceDto): Promise<Invoice> => {
  const response = await api.post<{ success: boolean; data: Invoice }>(BASE_PATH, data);
  return response.data.data;
};

export const updateInvoice = async (id: string, data: UpdateInvoiceDto): Promise<Invoice> => {
  const response = await api.patch<{ success: boolean; data: Invoice }>(`${BASE_PATH}/${id}`, data);
  return response.data.data;
};

export const deleteInvoice = async (id: string): Promise<void> => {
  await api.delete(`${BASE_PATH}/${id}`);
};
