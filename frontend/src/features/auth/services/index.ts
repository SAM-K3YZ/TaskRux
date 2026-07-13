// Auth API calls — all routes hit /api/auth/*
// TODO: replace with real calls once backend is live

import { api } from '@/src/shared/services/api';

export type LoginPayload  = { email: string; password: string };
export type SignupPayload = { email: string; password: string; companyName: string };
export type AuthResponse  = { token: string; user: { id: string; name: string; email: string } };

export const authApi = {
  login:  (payload: LoginPayload)  => api.post<AuthResponse>('/auth/login', payload),
  signup: (payload: SignupPayload) => api.post<AuthResponse>('/auth/signup', payload),
  logout: (token: string)          => api.post<void>('/auth/logout', {}, token),
  forgotPassword: (email: string)  => api.post<void>('/auth/forgot-password', { email }),
};
