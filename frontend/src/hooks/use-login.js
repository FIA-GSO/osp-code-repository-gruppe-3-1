import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/api/endpoints/auth-api';
import { useAuthStore } from '@/stores/auth';

export const useLogin = () => {
    const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
    const setAccessToken = useAuthStore((state) => state.setAccessToken);

    return useMutation({
        mutationFn: (credentials) => authApi.login(credentials).then((res) => res.data),
        onSuccess: (data) => {
            if (data.token) {
                setAccessToken(data.token);
                setIsAuthenticated(true);
            }
        },
        onError: (error) => {
            console.error('Login failed:', error);
        },
    });
};
