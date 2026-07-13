// Central API client — swap BASE_URL and add auth headers here once backend is live

// TODO: pull from env config (e.g. expo-constants or react-native-dotenv)
const BASE_URL = 'https://api.taskrux.com/v1';

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: object;
  token?: string;
};

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, token } = options;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(error.message ?? `HTTP ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const api = {
  get:    <T>(url: string, token?: string) => request<T>(url, { method: 'GET', token }),
  post:   <T>(url: string, body: object, token?: string) => request<T>(url, { method: 'POST', body, token }),
  put:    <T>(url: string, body: object, token?: string) => request<T>(url, { method: 'PUT', body, token }),
  patch:  <T>(url: string, body: object, token?: string) => request<T>(url, { method: 'PATCH', body, token }),
  delete: <T>(url: string, token?: string) => request<T>(url, { method: 'DELETE', token }),
};
