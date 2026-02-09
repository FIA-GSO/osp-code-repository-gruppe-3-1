import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/api/endpoints/auth-api';

export const useForgotPassword = () => {
    return useMutation({
        mutationFn: (email) => authApi.forgotPassword(email).then((res) => res.data),
        onError: (error) => {
            console.error('Forgot password request failed:', error);
        },
    });
};
