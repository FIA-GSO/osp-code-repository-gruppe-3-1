import { createFileRoute } from '@tanstack/react-router'
import Sidebar from '@/components/layout/sidebar'; 
import Topbar from '@/components/layout/topbar'; 
import Card from '@/components/ui/card';
import backgroundImage from '@/assets/Background.png'



export const Route = createFileRoute('/dashboardHelper')({

    component: RouteComponent,
})

function RouteComponent() {
    const handleExport = () => {
        console.log('Listenexport gestartet');
    };

    return (
        <div
            className="flex min-h-screen bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.75),rgba(255,255,255,0.75)),url(${backgroundImage})`,
            }}
        >
            <Sidebar />

            <main className="flex-1">
                <Topbar />

                <div className="max-w-[1100px] p-8">
                    <div className="mb-4 flex items-center justify-between">
                        <h1 className="text-text">Helfer Dashboard</h1>
                        <button onClick={handleExport} className="rounded-md bg-[#f1f3f6] px-4 py-2 hover:bg-[#e5e9ef]"                        >
                            📄 Listen exportieren
                        </button>
                    </div>

                    <Card title="Material- & Ressourcenübersicht">
                        <div className="block overflow-x-auto md:table md:w-full">
                            <table className="w-full border-separate" style={{ borderSpacing: '0 8px' }}
                            >
                                <thead>
                                    <tr>
                                        <th className="text-[13px] text-muted">Veranstaltung</th>
                                        <th className="text-[13px] text-muted">Stühle</th>
                                        <th className="text-[13px] text-muted">Tische</th>
                                        <th className="text-[13px] text-muted">Weiteres</th>
                                        <th>Hallenanzahl benutzen</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-[#fafbfc]">
                                        <td className="p-3 text-primary">
                                            Tag der Ausbildung 2026
                                        </td>
                                        <td className="p-3">60</td>
                                        <td className="p-3">30</td>
                                        <td className="p-3">Beamer</td>
                                    </tr>
                                    <tr className="bg-[#fafbfc]">
                                        <td className="p-3 text-primary">
                                            Karrieretag IT 2026
                                        </td>
                                        <td className="p-3">45</td>
                                        <td className="p-3">20</td>
                                        <td className="p-3">Stellwand</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
            </main>
        </div>
    );
}