import { api } from '@/src/shared/services/api';

export type TaskPriority = 'high' | 'medium' | 'low';
export type TaskStatus   = 'pending' | 'in_progress' | 'done';

export type Task = {
  id: string;
  title: string;
  description?: string;
  projectId: string;
  assigneeId: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate?: string;
  createdAt: string;
};

export const tasksApi = {
  list:   (projectId: string, token: string) => api.get<Task[]>(`/projects/${projectId}/tasks`, token),
  create: (data: Omit<Task, 'id' | 'createdAt'>, token: string) => api.post<Task>('/tasks', data, token),
  update: (id: string, data: Partial<Task>, token: string)       => api.patch<Task>(`/tasks/${id}`, data, token),
  remove: (id: string, token: string)                            => api.delete<void>(`/tasks/${id}`, token),
};
