import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/api/endpoints/auth-api';

export const useRegister = () => {
    return useMutation({
        mutationFn: (userData) => authApi.register(userData).then((res) => res.data),
        onError: (error) => {
            console.error('Registration failed:', error);
        },
    });
};
