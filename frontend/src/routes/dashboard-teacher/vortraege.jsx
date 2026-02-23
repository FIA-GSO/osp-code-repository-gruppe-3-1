import { createFileRoute } from '@tanstack/react-router'; 
import Sidebar from '@/components/layout/sidebar'; 
import Topbar from '@/components/layout/topbar'; 
import StatusCard from '@/components/ui/status-card'; 
import Card from '@/components/ui/card'; 
import backgroundImage from '@/assets/Background.png'
import { useState } from 'react';
import { Link } from '@tanstack/react-router';
export const Route = createFileRoute('/dashboard-teacher/vortraege')({
  // beforeLoad: () => {
  //   const role = useAuthStore.getState().user?.role;
  //   if (role !== 'teacher') {
  //     throw new Error('Unauthorized');
  //   }
  // },
  component: RouteComponent,
})




function RouteComponent() {
      const lecture ={id: 1}
      const lectures = [
  {
    id: 1,
    title: 'KI in der Ausbildung',
    event: 'Tag der Ausbildung 2026',
    status: 'offen',
  },
  {
    id: 2,
    title: 'Cloud Basics',
    event: 'Karrieretag IT 2026',
    status: 'angenommen',
  },
  {
    id: 3,
    title: 'IT-Security',
    event: 'Tag der Ausbildung 2026',
    status: 'abgelehnt',
  },
];

const handleAccept = async (lecture) => {
  // Status lokal ändern (oder API)
  await fetch('/api/smtp/lecture/status', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: lecture.email,
      status: 'angenommen',
      event: lecture.event,
    }),
  });
};

const handleReject = async (lecture) => {
  try {
    // TODO (Backend):// PUT /api/lecture/{id}/status -> abgelehnt
    await fetch('/api/smtp/lecture/status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: lecture.email,
        status: 'abgelehnt',
        event_name: lecture.event,

        // optional später:// reason: 'Alle Standplätze sind vergeben'  
            }),
    });

    console.log('Infostand abgelehnt:', lecture.id);
  } catch (error) {
    console.error('Fehler beim Ablehnen (Infostand):', error);
  }
};

const [statusFilter, setStatusFilter] = useState('');const [eventFilter, setEventFilter] = useState('');const [search, setSearch] = useState('');
const filteredLectures = lectures.filter((lecture) => {
  return (
    (statusFilter === '' || lecture.status === statusFilter) &&
    (eventFilter === '' || lecture.event === eventFilter) &&
    lecture.title.toLowerCase().includes(search.toLowerCase())
  );
});

  return (
    <div className="flex min-h-screen bg-cover bg-center" style={{
      backgroundImage: `linear-gradient(rgba(255,255,255,.75),rgba(255,255,255,.75)),   url(${backgroundImage})   `
    }}
    >
      <Sidebar />
      <main className="flex-1">
        <Topbar />
        <div className="max-w-[1100px] p-8">
          <h1 className="mb-6">Lehrer – Vorträge</h1>
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <StatusCard label="Angenommen" count={1} type="success" />
            <StatusCard label="Offen" count={1} type="warning" />
            <StatusCard label="Abgelehnt" count={1} type="danger" />
          </div>
          <Card title="Alle Vorträge">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
    <select value={statusFilter}onChange={(e) => setStatusFilter(e.target.value)}
      className="rounded-md border p-2"
    >
      <option value="">Alle Status</option>
      <option value="offen">Offen</option>
      <option value="angenommen">Angenommen</option>
      <option value="abgelehnt">Abgelehnt</option>
    </select>

    <select value={eventFilter}onChange={(e) => setEventFilter(e.target.value)}
      className="rounded-md border p-2"
    >
      <option value="">Alle Veranstaltungen</option>
      <option value="Tag der Ausbildung 2026">
        Tag der Ausbildung 2026
      </option>
      <option value="Karrieretag IT 2026">
        Karrieretag IT 2026
      </option>
    </select>
  </div>
       
       
            <div className="block overflow-x-auto md:table md:w-full">
              <table
                className="w-full border-separate"
                style={{ borderSpacing: '0 8px' }}
              >
                <thead>
                  <tr>
                    <th className="p-3 text-left text-[13px] text-muted">
                      Titel
                    </th>
                    <th className="p-3 text-left text-[13px] text-muted">
                      Veranstaltung
                    </th>
                    <th className="p-3 text-left text-[13px] text-muted">
                      Status
                    </th>
                    <th className="p-3 text-left text-[13px] text-muted">
                      Aktionen
                    </th>
                  </tr>
                </thead>

               <tbody>
  {filteredLectures.map((lecture) => (
    <tr key={lecture.id} className="bg-[#fafbfc]">
      {/* TITEL */}
      <td className="cursor-pointer p-3 text-primary">
        {lecture.title}
      </td>

      {/* EVENT */}
      <td className="p-3">
        {lecture.event}
      </td>

      {/* STATUS */}
      <td className="p-3">
        {lecture.status === 'offen' && (
          <span className="text-warning-text">⏳ Offen</span>
        )}
        {lecture.status === 'angenommen' && (
          <span className="text-success-text">✔ Angenommen</span>
        )}
        {lecture.status === 'abgelehnt' && (
          <span className="text-error-text">✖ Abgelehnt</span>
        )}
      </td>

      {/* AKTIONEN */}
      <td className="p-3">
        {/* Nur wenn OFFEN */}
        {lecture.status === 'offen' && (
  <><button onClick={() => handleAccept(lecture)}
      className="mr-2 rounded-md bg-[#f1f3f6] px-3 py-1.5 hover:bg-[#e5e9ef]"
    >
      ✔
    </button>

    <button onClick={() => handleReject(lecture)}
      className="mr-2 rounded-md bg-[#f1f3f6] px-3 py-1.5 hover:bg-[#e5e9ef]"
    >
      ✖
    </button>
  </>)}

        {/* Details immer */}
        <Link to={`/dashboard-teacher/details/lecture/${lecture.id}`}
          className="rounded-md bg-[#f1f3f6] px-3 py-1.5 hover:bg-[#e5e9ef]"        >
          Details
        </Link>
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
