import { createFileRoute } from '@tanstack/react-router';
import Sidebar from '@/components/layout/sidebar';
import Topbar from '@/components/layout/topbar';
import StatusCard from '@/components/ui/status-card';
import Card from '@/components/ui/card';

export const Route = createFileRoute('/dashboard-user')({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div
            className="flex min-h-screen bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.75), rgba(255,255,255,0.75)), url('/background.png')",
            }}
        >
            <Sidebar />

            <main className="flex-1">
                <Topbar />

                <div className="max-w-[1100px] p-8">
                    <h1 className="mb-[22px] text-text">Willkommen, Müller GmbH!</h1>

                    {/* STATUS */}
                    <div className="mb-[26px] grid grid-cols-1 gap-4 md:grid-cols-3">
                        <StatusCard label="Bestätigt" count={1} type="success" />
                        <StatusCard label="Eingereicht" count={1} type="warning" />
                        <StatusCard label="Abgelehnt" count={0} type="danger" />
                    </div>

                    {/* HAUPTGRID */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
                        {/* LINKS */}
                        <div className="flex flex-col gap-[22px]">
                            <Card title="Meine Registrierungen">
                                <div className="block overflow-x-auto md:table md:w-full">
                                    <table className="w-full border-separate" style={{ borderSpacing: '0 8px' }}>
                                        <thead>
                                            <tr>
                                                <th className="text-[13px] text-muted">Veranstaltung</th>
                                                <th className="text-[13px] text-muted">Art</th>
                                                <th className="text-[13px] text-muted">Status</th>
                                                <th className="text-[13px] text-muted">Aktionen</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="bg-[#fafbfc]">
                                                <td className="cursor-pointer p-3 text-primary">Tag der Ausbildung 2026</td>
                                                <td className="p-3">Infostand</td>
                                                <td className="p-3 text-success-text">✔ Bestätigt</td>
                                                <td className="p-3">
                                                    <button className="mr-2 cursor-pointer rounded-md border-none bg-[#f1f3f6] px-3 py-1.5 hover:bg-[#e5e9ef]">
                                                        Details
                                                    </button>
                                                    <button className="cursor-pointer rounded-md border-none bg-[#f1f3f6] px-3 py-1.5 hover:bg-[#e5e9ef]">
                                                        Bearbeiten
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr className="bg-[#fafbfc]">
                                                <td className="cursor-pointer p-3 text-primary">Tag der Ausbildung 2026</td>
                                                <td className="p-3">Vortrag</td>
                                                <td className="p-3 text-warning-text">⏳ Eingereicht</td>
                                                <td className="p-3">
                                                    <button className="mr-2 cursor-pointer rounded-md border-none bg-[#f1f3f6] px-3 py-1.5 hover:bg-[#e5e9ef]">
                                                        Details
                                                    </button>
                                                    <button className="cursor-pointer rounded-md border-none bg-[#f1f3f6] px-3 py-1.5 hover:bg-[#e5e9ef]">
                                                        Bearbeiten
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </Card>

                            <Card title="Meine Vorträge">
                                <div className="block overflow-x-auto md:table md:w-full">
                                    <table className="w-full border-separate" style={{ borderSpacing: '0 8px' }}>
                                        <thead>
                                            <tr>
                                                <th className="text-[13px] text-muted">Titel</th>
                                                <th className="text-[13px] text-muted">Beschreibung</th>
                                                <th className="text-[13px] text-muted">Status</th>
                                                <th className="text-[13px] text-muted">Aktionen</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="bg-[#fafbfc]">
                                                <td className="cursor-pointer p-3 text-primary">KI in der Ausbildung</td>
                                                <td className="p-3">Einführung in den Einsatz von KI</td>
                                                <td className="p-3 text-warning-text">⏳ Eingereicht</td>
                                                <td className="p-3">
                                                    <button className="mr-2 cursor-pointer rounded-md border-none bg-[#f1f3f6] px-3 py-1.5 hover:bg-[#e5e9ef]">
                                                        Details
                                                    </button>
                                                    <button className="cursor-pointer rounded-md border-none bg-[#f1f3f6] px-3 py-1.5 hover:bg-[#e5e9ef]">
                                                        Bearbeiten
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
                            <Card title="Bevorstehende Veranstaltungen" className="flex-1">
                                <p className="cursor-pointer text-primary">Tag der Ausbildung 2026</p>
                                <small className="text-muted">15. März 2026</small>
                                <p className="text-sm">Anmeldung offen</p>

                                <hr className="my-3 border-border" />

                                <p className="cursor-pointer text-primary">Karrieretag IT 2026</p>
                                <small className="text-muted">10. Juni 2026</small>
                                <p className="text-sm text-muted">Anmeldung geschlossen</p>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
