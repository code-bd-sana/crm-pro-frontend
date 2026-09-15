import { api } from '@/lib/axios';

const BASE_PATH = '/attachments';

export type AttachmentResourceType = 'TASK' | 'PROJECT';

export interface Attachment {
  id: string;
  resourceType: AttachmentResourceType;
  resourceId: string;
  fileUrl: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  createdAt: string;
}

export const uploadAttachment = async (file: File, resourceType: AttachmentResourceType, resourceId: string) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('resourceType', resourceType);
  formData.append('resourceId', resourceId);

  const response = await api.post<{ success: boolean; data: Attachment }>(BASE_PATH, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.data;
};

export const getAttachments = async (resourceType: AttachmentResourceType, resourceId: string) => {
  const response = await api.get<{ success: boolean; data: Attachment[] }>(BASE_PATH, {
    params: { resourceType, resourceId },
  });
  return response.data.data;
};

export const deleteAttachment = async (id: string) => {
  await api.delete(`${BASE_PATH}/${id}`);
};
