import { createFileRoute } from '@tanstack/react-router';
import Card from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { getAllEventSummaries } from '@/api/eventsApi';
import { getUserRole } from '@/api/authApi';
import { redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboardHelper')({
      beforeLoad: () => {
    if (getUserRole() !== "helper" && getUserRole() !== "admin") {
      throw redirect({ to: '/notFound' });
    }
  },
    component: RouteComponent,
})

function RouteComponent() {
    
    const [summaries, setSummaries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getAllEventSummaries()
            .then(data => {
                setSummaries(data);
            })
            .catch(err => console.error("Failed to load event summaries:", err))
            .finally(() => setIsLoading(false));
    }, []);

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                Lade Eventübersicht…
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-cover bg-center bg-no-repeat">
            <main className="flex-1">
                <div className="max-w-[1100px] p-8">
                    <div className="mb-4 flex items-center justify-between">
                        <h1 className="text-text">Helfer Dashboard</h1>
                    </div>

                    <Card title="Material- & Ressourcenübersicht">
                        <div className="block overflow-x-auto md:table md:w-full">
                            <table className="w-full border-separate text-center" style={{ borderSpacing: '0 8px' }}>
                                <thead>
                                    <tr>
                                        <th className="text-[13px]" style={{ textAlign: 'center', }}>Veranstaltung</th>
                                        <th className="text-[13px]" style={{ textAlign: 'center', }}>Stühle</th>
                                        <th className="text-[13px]" style={{ textAlign: 'center', }}>Tische</th>
                                        <th className="text-[13px]" style={{ textAlign: 'center', }}>Weiteres</th>
                                        <th>Hallenanzahl benutzen</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {summaries.map(event => (
                                        <tr key={event[0].event_id} className="bg-[#fafbfc]">
                                            <td className="p-3 text-primary">{event[0].event_name}</td>
                                            <td className="p-3">{event[0].total_chairs}</td>
                                            <td className="p-3">{event[0].total_tables}</td>
                                            <td className="p-3">{event[0].combined_required_tech || '-'}</td>
                                            <td className="p-3">{event[0].halls_needed}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
            </main>
        </div>
    );
}