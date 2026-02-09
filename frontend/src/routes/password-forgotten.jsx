import { createFileRoute, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import logo from '@/assets/logo-gso3.png';
import backgroundImage from '@/assets/Background.png'

export const Route = createFileRoute('/password-forgotten')({
    component: RouteComponent,
});

function RouteComponent() {
    const { t } = useTranslation();

    return (
        <div
            className="flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat p-5"
            style={{
                backgroundImage:
                    `linear-gradient(rgba(255,255,255,0.65), rgba(255,255,255,0.65)), url(${backgroundImage})`,
            }}
        >
            <div className="w-full max-w-[420px] overflow-hidden rounded-[10px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
                {/* Header */}
                <div className="bg-primary px-5 py-[25px] text-center text-white">
                    <img src={logo} alt={t('common.logoAlt')} className="mx-auto mb-2 w-1/2" />
                    <hr className="my-[10px]" />
                    <span className="block text-sm tracking-[2px]">{t('common.marketplace')}</span>
                </div>

                {/* Content */}
                <div className="p-[30px] text-center">
                    <h1 className="mb-[10px] text-text">{t('auth.forgotPasswordTitle')}</h1>
                    <p className="mb-[25px] text-[15px] leading-normal text-[#7a7a7a]">
                        {t('auth.forgotPasswordDescription')}
                    </p>

                    <form>
                        <div className="relative mb-5">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base opacity-60">📧</span>
                            <input
                                type="email"
                                placeholder={t('common.email')}
                                required
                                className="w-full rounded-md border border-[#dcdcdc] py-3 pl-[42px] pr-[14px] text-[15px] focus:border-primary focus:outline-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full cursor-pointer rounded-md border-none bg-primary px-4 py-[14px] text-base text-white hover:bg-primary-dark"
                        >
                            {t('auth.resetPassword')}
                        </button>
                    </form>

                    <div className="mt-[25px] text-sm">
                        <Link to="/login" className="font-semibold text-primary no-underline hover:underline">
                            {t('auth.backToLogin')}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
