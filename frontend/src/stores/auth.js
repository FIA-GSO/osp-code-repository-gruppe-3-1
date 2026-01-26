import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,

    setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
    setAccessToken: (accessToken) => set({ accessToken }),
    setRefreshToken: (refreshToken) => set({ refreshToken }),
}));
