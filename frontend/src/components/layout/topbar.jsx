import { useNavigate } from '@tanstack/react-router';
import avatarIconImage from '@/assets/avatar.jpg'
import { useTranslation } from 'react-i18next';
import { getCurrentUser, logout } from '../../api/authApi';
import { useEffect, useState } from 'react';

export default function Topbar({ toggleSidebar }) {
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
          await logout();
        } catch (err) {
          console.error("Logout failed:", err);
        } finally {
          localStorage.removeItem("name");
          localStorage.removeItem("userId");
          localStorage.removeItem("userRole")
          navigate({ to: "/login" });
          setTimeout(() => {
                    window.location.reload();
                }, 50);
        }
    };
    return (
        <header className="flex h-[60px] items-center  border-b border-border bg-white/85 px-7 backdrop-blur-sm topbar">
            <button className="burger justify-start" onClick={toggleSidebar}>
            ☰
            </button>
            <div className="flex items-center gap-[18px] justify-end topbar-right">
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
