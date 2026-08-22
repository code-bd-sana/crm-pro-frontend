import axios from 'axios';
import { useAuthStore } from '@/store/useAuthStore';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Assume refreshToken is securely stored in HttpOnly cookies, 
        // so the browser automatically sends it, or we handle it if it was in Zustand
        const res = await axios.post(`${api.defaults.baseURL}/auth/refresh`, {}, {
          withCredentials: true // send cookies
        });

        const newAccessToken = res.data.accessToken;
        
        // Update store with new token
        const currentUser = useAuthStore.getState().user;
        if (currentUser) {
          useAuthStore.getState().setAuth(currentUser, newAccessToken);
        }

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, logout user
        useAuthStore.getState().logout();
        
        // Only redirect if we are on the client side
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
