import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { useAuthStore } from '../stores/auth';

export const Route = createFileRoute('/_authenticated')({
    beforeLoad: async ({ location }) => {
        if (!useAuthStore.getState().isAuthenticated) {
            throw redirect({
                to: '/',
                search: {
                    redirect: location.href,
                },
            });
        }
    },
    component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
    return <Outlet />;
}
