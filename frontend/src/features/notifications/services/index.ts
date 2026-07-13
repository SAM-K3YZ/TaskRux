import { api } from '@/src/shared/services/api';

export type Notification = {
  id: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
};

export const notificationsApi = {
  list:    (token: string)       => api.get<Notification[]>('/notifications', token),
  markRead: (id: string, token: string) => api.patch<void>(`/notifications/${id}/read`, {}, token),
  markAllRead: (token: string)   => api.post<void>('/notifications/read-all', {}, token),
};
