import { api } from '@/src/shared/services/api';

export type DashboardStats = {
  activeProjects: number;
  openIssues: number;
  pendingTasks: number;
  workersOnSite: number;
};

export const dashboardApi = {
  getStats: (token: string) => api.get<DashboardStats>('/dashboard/stats', token),
};
