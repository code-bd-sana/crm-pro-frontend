import { api } from '@/lib/axios';

const BASE_PATH = '/attachments';

export const uploadAttachment = async (file: File, entityType: string, entityId: string) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('entityType', entityType);
  formData.append('entityId', entityId);

  const response = await api.post<{ success: boolean; data: any }>(BASE_PATH, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.data;
};

export const getAttachments = async (entityType: string, entityId: string) => {
  const response = await api.get<{ success: boolean; data: any[] }>(BASE_PATH, {
    params: { entityType, entityId },
  });
  return response.data.data;
};

export const deleteAttachment = async (id: string) => {
  await api.delete(`${BASE_PATH}/${id}`);
};
