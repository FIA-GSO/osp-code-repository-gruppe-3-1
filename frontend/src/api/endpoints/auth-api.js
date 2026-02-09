import { apiClient } from '../client';

export const authApi = {
    login: (credentials) => apiClient.post('/auth/login', credentials),
    register: (userData) => apiClient.post('/auth/register', userData),
    forgotPassword: (email) => apiClient.post('/auth/forgot-password', { email }),
};
