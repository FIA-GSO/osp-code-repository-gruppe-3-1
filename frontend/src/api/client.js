import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    headers: { 'Content-Type': 'application/json' },
});

// Request interceptor for auth token
apiClient.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle common errors here (e.g., 401 unauthorized)
        if (error.response?.status === 401) {
            useAuthStore.getState().setIsAuthenticated(false);
            useAuthStore.getState().setAccessToken(null);
        }
        return Promise.reject(error);
    },
);
