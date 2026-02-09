import { useTranslation } from 'react-i18next';

export default function Sidebar() {
    const { t } = useTranslation();

    return (
        <aside className="hidden w-[230px] bg-primary text-white md:block">
            <div className="p-[22px] text-center">
                <img src="/logo-gso3.png" alt={t('common.logoAlt')} className="w-[120px]" />
            </div>

            <nav>
                <a className="block cursor-pointer px-[22px] py-[14px] text-white no-underline opacity-90 hover:bg-white/15">
                    {t('navigation.dashboard')}
                </a>
            </nav>
        </aside>
    );
}
