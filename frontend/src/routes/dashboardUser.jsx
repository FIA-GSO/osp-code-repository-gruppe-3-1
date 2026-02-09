import { useEffect, useState } from "react";
import { createFileRoute } from '@tanstack/react-router';
import './dashboardUser.css';
import Sidebar from '../components/sidebar';
import Topbar from '../components/topbar';
import StatusCard from '../components/status-card';
import Card from '../components/card';
import { getCurrentUser, getUserId } from "../api/authApi";
import { getUserRegistrations } from "../api/registrationsApi";


export const Route = createFileRoute('/dashboardUser')({
    component: RouteComponent,
});


function RouteComponent() {
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
        <div className="dashboard-layout">
            <Sidebar />

            <main>
                <Topbar />

                <div className="dashboard-content">
                    <h1>Willkommen, {user.company_name}!</h1>

                    {/* STATUS */}
                    <div className="status-grid">
                        <StatusCard label="Bestätigt" count={registrationsData.CountBestaetigt} type="success" />
                        <StatusCard label="Eingereicht" count={registrationsData.CountEingereicht} type="warning" />
                        <StatusCard label="Abgelehnt" count={registrationsData.CountAbgelehnt} type="danger" />
                    </div>

                    {/* HAUPTGRID */}
                    <div className="dashboard-main-grid">
                        {/* LINKS */}
                        <div className="left-column">
                            <Card title="Meine Registrierungen">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Veranstaltung</th>
                                            <th>Vortrag</th>
                                            <th>Status</th>
                                            <th>Aktionen</th>
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
                                                        <button>Details</button>
                                                        <button>Bearbeiten</button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </Card>
                        </div>

                        {/* RECHTS */}
                        <div className="right-column">
                            <Card title="Bevorstehende Veranstaltungen" className="full-height">
                                <p className="link">Tag der Ausbildung 2026</p>
                                <small>15. März 2026</small>
                                <p className="info">Anmeldung offen</p>

                                <hr />

                                <p className="link">Karrieretag IT 2026</p>
                                <small>10. Juni 2026</small>
                                <p className="info locked">Anmeldung geschlossen</p>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
