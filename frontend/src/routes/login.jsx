import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import logo from '@/assets/logo-gso3.png';
import { useLogin } from '@/hooks/use-login';

export const Route = createFileRoute('/login')({
    component: RouteComponent,
});

function RouteComponent() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const login = useLogin();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        login.mutate(
            { email, password },
            {
                onSuccess: () => {
                    navigate({ to: '/dashboard-user' });
                },
                onError: (err) => {
                    if (err.response) {
                        setError(err.response.data.message || t('errors.loginFailed'));
                    } else {
                        setError(t('errors.serverUnreachable'));
                    }
                },
            },
        );
    };

    return (
        <div
            className="flex min-h-screen w-full items-center justify-center bg-cover bg-center bg-no-repeat p-5"
            style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.6), rgba(255,255,255,0.6)), url('/background.png')",
            }}
        >
            <div className="w-full max-w-[420px] overflow-hidden rounded-[10px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
                <div className="bg-primary px-5 py-[25px] text-center text-white">
                    <img src={logo} alt={t('common.logoAlt')} className="mx-auto mb-2 w-1/2" />
                    <hr className="my-[10px]" />
                    <span className="block text-sm uppercase tracking-[2px]">{t('common.marketplace')}</span>
                </div>

                <div className="p-[30px] text-center">
                    <h1 className="mb-2 text-text">{t('auth.login')}</h1>
                    <p className="mb-[25px] text-muted">{t('auth.loginDescription')}</p>

                    <form onSubmit={handleSubmit}>
                        {error && <div className="mb-4 text-red-500">{error}</div>}

                        <div className="relative mb-[15px]">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base opacity-60">📧</span>
                            <input
                                type="email"
                                placeholder={t('common.email')}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full rounded-md border border-[#dcdcdc] py-3 pl-[42px] pr-[14px] text-[15px] focus:border-primary focus:outline-none"
                            />
                        </div>

                        <div className="relative mb-[15px]">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base opacity-60">🔒</span>
                            <input
                                type="password"
                                placeholder={t('common.password')}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full rounded-md border border-[#dcdcdc] py-3 pl-[42px] pr-[14px] text-[15px] focus:border-primary focus:outline-none"
                            />
                        </div>

                        <div className="mb-5 text-right">
                            <Link to="/password-forgotten" className="text-sm font-semibold text-primary no-underline hover:underline">
                                {t('auth.forgotPassword')}
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="w-full cursor-pointer rounded-md border-none bg-primary px-4 py-[14px] text-base text-white hover:bg-primary-dark"
                            disabled={login.isPending}
                        >
                            {login.isPending ? t('auth.loginPending') : t('auth.login')}
                        </button>
                    </form>

                    <div className="mt-[25px] text-sm text-muted">
                        {t('auth.noAccount')}
                        <br />
                        <Link to="/register" className="font-semibold text-primary no-underline hover:underline">
                            {t('auth.registerNow')}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
