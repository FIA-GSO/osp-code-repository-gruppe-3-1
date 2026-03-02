import { useEffect, useState } from "react";
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import StatusCard from '@/components/ui/status-card';
import Card from '@/components/ui/card';
import { Link } from '@tanstack/react-router';
import { getCurrentUser, getUserId } from "../../api/authApi";
import { getUserRegistrations } from "../../api/registrationsApi";
import { getAllEvents } from "../../api/eventsApi";
import StatusIcon from "@/components/ui/StatusIcon";
import { getUserRole } from '@/api/authApi';
import { redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard-user/')({
          beforeLoad: () => {
    if (getUserRole() !== "user" && getUserRole() !== "admin") {
      throw redirect({ to: '/notFound' });
    }
  },
    component: RouteComponent,
});

function RouteComponent() {
    const { t } = useTranslation();

    const [user, setUser] = useState(null);
    const [registrationsData, setRegistrationsData] = useState(null);
    const [events, setEvents] = useState(null);

    useEffect(() => {
        getCurrentUser()
            .then(setUser)
            .catch(err => console.error("Failed to fetch current user:", err));

        getUserRegistrations(getUserId())
            .then(setRegistrationsData)
            .catch(err => console.error("Failed to fetch registrations:", err));

        getAllEvents()
            .then(setEvents)
            .catch(err => console.error("Failed to fetch events:", err));
    }, []);

    const getStatusLabel = (statusId) => {
        switch (statusId) {
            case 1: return (<StatusIcon type="pendingFull"></StatusIcon>)
            case 2: return (<StatusIcon type="acceptedFull"></StatusIcon>)
            case 3: return (<StatusIcon type="rejectedFull"></StatusIcon>)
            default: return { label: "Unbekannt", icon: null, type: "info" };
        }
    };

    if (!user || !registrationsData || !events) return <div>Laden...</div>;


    return (
        <div className="flex min-h-screen bg-cover bg-center bg-no-repeat">
            <main className="flex-1">
                <div className="max-w-[1100px] p-8">
                    <h1 className="mb-[22px] text-text">Willkommen { user.company_name }</h1>
                
                    {/* STATUS */}
                    <div className="mb-[26px] grid grid-cols-1 gap-4 md:grid-cols-3">
                        <StatusCard label="Bestätigt" count={registrationsData.CountBestaetigt} type="success" />
                        <StatusCard label="Eingereicht" count={registrationsData.CountEingereicht} type="warning" />
                        <StatusCard label="Abgelehnt" count={registrationsData.CountAbgelehnt} type="danger" />
                    </div>

                    {/* HAUPTGRID */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]"
                        style={{height:`55vh`,}}
                    >
                        {/* LINKS */}
                        <div className="flex flex-col gap-[22px] w-[101.5%]">
                            <Card title="Meine Registrierungen">
                                <div className="block overflow-x-auto md:table md:w-full" style={{height:`55vh`,}}>
                                    <table className="w-full border-separate text-center" style={{ borderSpacing: '0 8px' }}>
                                        <thead>
                                            <tr>
                                                <th className="text-[13px]">{t('dashboard.event')}</th>
                                                <th className="text-[13px]">{t('dashboard.type')}</th>
                                                <th className="text-[13px]">{t('status.status')}</th>
                                                <th className="text-[13px]">{t('dashboard.actions')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {registrationsData.registrations.map((reg) => {
                                                const status = getStatusLabel(reg.status_id);
                                                return (
                                                    <tr className="h-11" key={reg.id}>
                                                        <td className="link">{reg.event?.name}</td>
                                                        <td >
                                                            {reg.with_lecture ? "Ja" : "Nein"}
                                                        </td>
                                                        <td>{status}</td>
                                                        <td>
                                                            <Link to={`/dashboard-user/bearbeiten/infostand/${reg.id}`} className="rounded-md bg-[#f1f3f6] px-3 py-1.5 hover:bg-[#e5e9ef]">
                                                                   {reg.status_id === 1 ? 'Bearbeiten' : 'Anzeigen'}</Link>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </Card>
                        </div>
                        {/* RECHTS */}
                        <div className="flex" >
                           <Card title="Bevorstehende Veranstaltungen" className="full-height w-[100%]">
                        {events.map((event) => (
                            <div key={event.id} className="mb-4">
                                {/* Veranstaltungsname */}
                            <p className="link font-medium">{event.name}</p>
                                {/* Datum */}
                            <small className="text-muted">{event.event_date}</small>
                                {/* ANMELDEN BUTTON */}
                            <div className="mt-2">
                            <Link
                                    to={`/dashboard-user/anmelden/${event.id}`}
                                    className={`
                                        block w-full rounded-md px-4 py-2 text-center text-sm font-medium
                                        ${
                                        event.registration_locked
                                            ? 'pointer-events-none cursor-not-allowed bg-gray-200 text-gray-400'
                                            : 'bg-primary text-white hover:bg-primary/90'
                                        }
                                    `}
                            >
                                    {event.registration_locked
                                        ? 'Anmeldung geschlossen'
                                        : 'Jetzt anmelden'}
                            </Link>
                            </div>
                                <hr className="mt-4" />
                            </div>
                            ))}
                        </Card>
                            </div>
                        </div>
                    </div >
                </main >
            </div >
        );
    }
