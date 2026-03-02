import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/layout/sidebar';
import Topbar from '@/components/layout/topbar';
import Card from '@/components/ui/card';
import { getAllEvents, toggleEventLock } from '../../api/eventsApi';
import backgroundImage from '@/assets/Background.png'
import { Link } from '@tanstack/react-router';
import StatusIcon from "@/components/ui/StatusIcon";
import { getUserRole } from '@/api/authApi';
import { redirect } from '@tanstack/react-router';


export const Route = createFileRoute('/dashboard-teacher/veranstaltungen')({
        beforeLoad: () => {
    if (getUserRole() !== "teacher" && getUserRole() !== "admin") {
      throw redirect({ to: '/notFound' });
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllEvents()
      .then((data) => setEvents(data))
      .catch((err) => console.error("Failed to fetch events:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleToggleLock = async (eventId, currentState) => {
    try {
      const updated = await toggleEventLock(eventId, !currentState);
      setEvents(prev =>
        prev.map(e => e.id === eventId ? { ...e, registration_locked: updated.registration_locked } : e)
      );
    } catch (err) {
      console.error("Failed to toggle lock:", err);
      alert("Fehler beim Aktualisieren des Events");
    }
  };

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Lade Events…</div>;
  }

  return (
    <div className="flex min-h-screen bg-cover bg-center" style={{
      backgroundImage: `
        linear-gradient(rgba(255,255,255,0.75), rgba(255,255,255,0.75)),
        url(${backgroundImage})
      `
    }}>
      <main className="flex-1">
        <div className="max-w-[1100px] p-8">
          <h1 className="mb-6">Lehrer – Veranstaltungen</h1>
          <Card title="Veranstaltungen verwalten">
            <div className="block overflow-x-auto md:table md:w-full">
              <table className="w-full border-separate text-center" style={{ borderSpacing: '0 8px' }}>
                <thead>
                  <tr>
                    <th className="p-3 text-left text-[13px]" style={{ textAlign: 'center', }}>Veranstaltung</th>
                    <th className="p-3 text-left text-[13px]" style={{ textAlign: 'center', }}>Status</th>
                    <th className="p-3 text-left text-[13px]" style={{ textAlign: 'center', }}>Aktion</th>
                  </tr>
                </thead>
                <tbody>
                   {events.map(event => (
                    <tr key={event.id} className="bg-[#fafbfc]">
                      <td className="cursor-pointer p-3 text-primary">{event.name}</td>
                      <td className="p-3">
   
                          {event.registration_locked ? <StatusIcon type="closedFull" /> : <StatusIcon type="openFull" />}
                      
                      </td>
                      <td className="p-3">
                        <button
                          className="rounded-md bg-[#f1f3f6] px-3 py-1.5 hover:bg-[#e5e9ef]"
                          onClick={() => handleToggleLock(event.id, event.registration_locked)}
                        >
                          {event.registration_locked ? "Entsperren" : "Sperren"}
                        </button>
                      </td>
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