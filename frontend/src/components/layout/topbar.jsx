import { useNavigate } from '@tanstack/react-router';
import avatarIconImage from '@/assets/avatar.jpg'
import { useTranslation } from 'react-i18next';
import { getCurrentUser } from '../../api/authApi';
import { useEffect, useState } from 'react';

export default function Topbar() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    

    useEffect(() => {
        getCurrentUser()
            .then(setUser)
            .catch(err => console.error("Failed to fetch current user:", err));
    }, []);

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


                <div className="flex items-center gap-2.5">
                    <img src={avatarIconImage} alt="User" className="h-8 w-8 rounded-full" />
                    <span>{user === null ? "loading..." : user.company_name}</span>
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
