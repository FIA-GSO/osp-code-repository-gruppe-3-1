import { createFileRoute } from '@tanstack/react-router'
import "./dashboardUser.css";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import StatusCard from "./components/StatusCard";
import Card from "./components/Card";

export const Route = createFileRoute('/dashboardUser')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div className="dashboard-layout">
            <Sidebar />

            <main>
                <Topbar />

                <div className="dashboard-content">
                    <h1>Willkommen, Müller GmbH!</h1>

                    {/* STATUS */}
                    <div className="status-grid">
                        <StatusCard label="Bestätigt" count={1} type="success" />
                        <StatusCard label="Eingereicht" count={1} type="warning" />
                        <StatusCard label="Abgelehnt" count={0} type="danger" />
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
                                            <th>Art</th>
                                            <th>Status</th>
                                            <th>Aktionen</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="link">Tag der Ausbildung 2026</td>
                                            <td>Infostand</td>
                                            <td className="status success">✔ Bestätigt</td>
                                            <td>
                                                <button>Details</button>
                                                <button>Bearbeiten</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="link">Tag der Ausbildung 2026</td>
                                            <td>Vortrag</td>
                                            <td className="status warning">⏳ Eingereicht</td>
                                            <td>
                                                <button>Details</button>
                                                <button>Bearbeiten</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Card>

                            <Card title="Meine Vorträge">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Titel</th>
                                            <th>Beschreibung</th>
                                            <th>Status</th>
                                            <th>Aktionen</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="link">KI in der Ausbildung</td>
                                            <td>Einführung in den Einsatz von KI</td>
                                            <td className="status warning">⏳ Eingereicht</td>
                                            <td>
                                                <button>Details</button>
                                                <button>Bearbeiten</button>
                                            </td>
                                        </tr>
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