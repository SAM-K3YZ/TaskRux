import { api } from '@/src/shared/services/api';
import { ReportStatus } from '@/src/types';

export type Report = {
  id: string;
  title: string;
  siteId: string;
  submittedBy: string;
  status: ReportStatus;
  createdAt: string;
};

export const reportsApi = {
  list:   (siteId: string, token: string)                        => api.get<Report[]>(`/sites/${siteId}/reports`, token),
  submit: (data: Omit<Report, 'id' | 'createdAt'>, token: string) => api.post<Report>('/reports', data, token),
};
