import { api } from '@/src/shared/services/api';
import { ProjectStatus } from '@/src/types';

export type Project = {
  id: string;
  name: string;
  address: string;
  status: ProjectStatus;
  createdAt: string;
};

export const projectsApi = {
  list:   (token: string)                       => api.get<Project[]>('/projects', token),
  get:    (id: string, token: string)           => api.get<Project>(`/projects/${id}`, token),
  create: (data: Omit<Project, 'id' | 'createdAt'>, token: string) =>
    api.post<Project>('/projects', data, token),
  update: (id: string, data: Partial<Project>, token: string) =>
    api.patch<Project>(`/projects/${id}`, data, token),
  remove: (id: string, token: string)           => api.delete<void>(`/projects/${id}`, token),
};
