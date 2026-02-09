import { useNavigate } from '@tanstack/react-router';
import avatarIconImage from '@/assets/avatar.jpg'
import { useTranslation } from 'react-i18next';

export default function Topbar() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
          await logoutApi();
        } catch (err) {
          console.error("Logout failed:", err);
        } finally {
          localStorage.removeItem("name");
          localStorage.removeItem("userId");
          navigate({ to: "/login" });
        }
    };
    return (
        <header className="flex h-[60px] items-center justify-end border-b border-border bg-white/85 px-7 backdrop-blur-sm">
            <div className="flex items-center gap-[18px]">
                <div className="relative">
                    🔔{' '}
                    <span className="absolute -right-2 -top-1.5 rounded-full bg-[#e53935] px-1.5 py-0.5 text-[11px] text-white">
                        2
                    </span>
                </div>

                <div className="flex items-center gap-2.5">
                    <img src={avatarIconImage} alt="User" className="h-8 w-8 rounded-full" />
                    <span>Max Müller</span>
                    <button
                        className="cursor-pointer border-none bg-transparent text-[13px] text-[#6b7280] hover:underline"
                        onClick={handleLogout}
                    >
                        {t('auth.logout')}
                    </button>
                </div>
            </div>
        </header>
    );
}
