import { api } from '@/src/shared/services/api';

export type WorkerStatus = 'on_site' | 'off_site';

export type Worker = {
  id: string;
  name: string;
  email: string;
  role: string;
  siteId?: string;
  status: WorkerStatus;
  avatar?: string;
};

export const workforceApi = {
  list:   (token: string)                         => api.get<Worker[]>('/workers', token),
  invite: (email: string, role: string, token: string) =>
    api.post<Worker>('/workers/invite', { email, role }, token),
  update: (id: string, data: Partial<Worker>, token: string) =>
    api.patch<Worker>(`/workers/${id}`, data, token),
  remove: (id: string, token: string)             => api.delete<void>(`/workers/${id}`, token),
};
