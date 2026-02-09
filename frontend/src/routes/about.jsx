import { createFileRoute, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/about')({
    component: RouteComponent,
});

function RouteComponent() {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col gap-2">
            {t('term.hello')} "/about"!
            <Link to="/" className="font-semibold text-blue-500">
                {t('navigation.goToIndex')}
            </Link>
        </div>
    );
}
