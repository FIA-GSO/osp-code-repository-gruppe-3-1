import { useEffect, useState } from "react";
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import Sidebar from '@/components/layout/sidebar';
import Topbar from '@/components/layout/topbar';
import StatusCard from '@/components/ui/status-card';
import Card from '@/components/ui/card';
import backgroundImage from '@/assets/Background.png'
import { Link } from '@tanstack/react-router';
import { getCurrentUser, getUserId } from "../api/authApi";
import { getUserRegistrations } from "../api/registrationsApi";


export const Route = createFileRoute('/dashboard-user/')({
    component: RouteComponent,
});

function RouteComponent() {
    const { t } = useTranslation();

        const [user, setUser] = useState(null);
    const [registrationsData, setRegistrationsData] = useState(null);

    useEffect(() => {
        getCurrentUser()
            .then(setUser)
            .catch((err) => console.error("Failed to fetch current user:", err));
        
        getUserRegistrations(getUserId())
            .then(setRegistrationsData)
            .catch((err) => console.error("Failed to fetch registrations for user:", err));
    }, []);

    const getStatusLabel = (statusId) => {
        switch (statusId) {
            case 1: return { label: "⏳ Eingereicht", type: "warning" };
            case 2: return { label: "✔ Bestätigt", type: "success" };
            case 3: return { label: "✖ Abgelehnt", type: "danger" };
            default: return { label: "Unbekannt", type: "info" };
        }
    };

    if (!user || !registrationsData) return <div>Laden...</div>; // Loading state


    return (
        <div
            className="flex min-h-screen bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage:
                    `linear-gradient(rgba(255,255,255,0.75), rgba(255,255,255,0.75)),   url(${backgroundImage})`
                ,
            }}
        >
            <Sidebar />

            <main className="flex-1">
                <Topbar />

                <div className="max-w-[1100px] p-8">
                    <h1 className="mb-[22px] text-text">{t('dashboard.welcome', { company: user.company_name })}</h1>

                    {/* STATUS */}
                    <div className="mb-[26px] grid grid-cols-1 gap-4 md:grid-cols-3">
                         <StatusCard label="Bestätigt" count={registrationsData.CountBestaetigt} type="success" />
                        <StatusCard label="Eingereicht" count={registrationsData.CountEingereicht} type="warning" />
                        <StatusCard label="Abgelehnt" count={registrationsData.CountAbgelehnt} type="danger" />
                    </div>

                    {/* HAUPTGRID */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]"
                        style={{
                            height:
                                `55vh`
                            ,
                        }}>
                        {/* LINKS */}
                        <div className="flex flex-col gap-[22px]">
                            <Card title={t('dashboard.myRegistrations')}>
                                <div className="block overflow-x-auto md:table md:w-full" style={{
                                    height:
                                        `55vh`
                                    ,
                                }}>
                                    <table className="w-full border-separate" style={{ borderSpacing: '0 8px' }}>
                                        <thead>
                                            <tr>
                                                <th className="text-[13px] text-muted">{t('dashboard.event')}</th>
                                                <th className="text-[13px] text-muted">{t('dashboard.type')}</th>
                                                <th className="text-[13px] text-muted">{t('status.status')}</th>
                                                <th className="text-[13px] text-muted">{t('dashboard.actions')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {registrationsData.registrations.map((reg) => {
                                                const status = getStatusLabel(reg.status_id);
                                                return (
                                                    <tr key={reg.id}>
                                                        <td className="link">{reg.event?.name}</td>
                                                        <td>
                                                            {reg.with_lecture ? "Ja" : "Nein"}
                                                        </td>
                                                        <td className={`status ${status.type}`}>{status.label}</td>
                                                        <td>
                                                            <Link to="/dashboard-user/bearbeiten/infostand/1" className="rounded-md bg-[#f1f3f6] px-3 py-1.5 hover:bg-[#e5e9ef]">
                                                        Bearbeiten</Link>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </Card>

                            <Card title={t('dashboard.myPresentations')}>
                                <div className="block overflow-x-auto md:table md:w-full">
                                    <table className="w-full border-separate" style={{ borderSpacing: '0 8px' }}>
                                        <thead>
                                            <tr>
                                                <th className="text-[13px] text-muted">{t('dashboard.title')}</th>
                                                <th className="text-[13px] text-muted">{t('dashboard.description')}</th>
                                                <th className="text-[13px] text-muted">{t('status.status')}</th>
                                                <th className="text-[13px] text-muted">{t('dashboard.actions')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="bg-[#fafbfc]">
                                                <td className="cursor-pointer p-3 text-primary">KI in der Ausbildung</td>
                                                <td className="p-3">Einführung in den Einsatz von KI</td>
                                                <td className="p-3 text-warning-text">{t('status.submittedIcon')}</td>
                                                <td className="p-3">
                                                    <button className="mr-2 cursor-pointer rounded-md border-none bg-[#f1f3f6] px-3 py-1.5 hover:bg-[#e5e9ef]">
                                                        {t('common.details')}
                                                    </button>
                                                    <button className="cursor-pointer rounded-md border-none bg-[#f1f3f6] px-3 py-1.5 hover:bg-[#e5e9ef]">
                                                        {t('common.edit')}
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </Card>
                        </div>

                        {/* RECHTS */}
                        <div className="flex">
                            <Card title={t('dashboard.upcomingEvents')} className="flex-1">
                                <p className="cursor-pointer text-primary">Tag der Ausbildung 2026</p>
                                <small className="text-muted">15. März 2026</small>
                                <p className="text-sm">{t('dashboard.registrationOpen')}</p>

                                <hr className="my-3 border-border" />

                                <p className="cursor-pointer text-primary">Karrieretag IT 2026</p>
                                <small className="text-muted">10. Juni 2026</small>
                                <p className="text-sm text-muted">{t('dashboard.registrationClosed')}</p>
                            </Card>
                        </div>
                    </div>
                </div>
            </main >
        </div >
    );
}
