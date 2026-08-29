import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/store/useAuthStore';

// ─── Extend AxiosRequestConfig to track retry attempts ──────────────────────
interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// ─── Create the main API instance ───────────────────────────────────────────
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ─── Request Interceptor — Attach Bearer Token ───────────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// ─── Response Interceptor — Handle 401 with Token Refresh ───────────────────
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as ExtendedAxiosRequestConfig;

    // Only attempt refresh once per request
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Skip 401 interceptor for auth endpoints to allow them to handle their own errors (e.g. invalid credentials)
      if (
        originalRequest.url?.includes('/auth/login') ||
        originalRequest.url?.includes('/auth/register')
      ) {
        return Promise.reject(error);
      }

      const storedRefreshToken = useAuthStore.getState().refreshToken;

      if (!storedRefreshToken) {
        // No refresh token available — force logout
        useAuthStore.getState().logout();
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }

      try {
        // Use a plain axios call (not the intercepted `api`) to avoid loops
        const response = await axios.post<{
          accessToken: string;
          refreshToken: string;
        }>(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          { refreshToken: storedRefreshToken },
        );

        const { accessToken, refreshToken } = response.data;
        useAuthStore.getState().setTokens(accessToken, refreshToken);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch {
        // Refresh also failed — full logout
        useAuthStore.getState().logout();
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);
