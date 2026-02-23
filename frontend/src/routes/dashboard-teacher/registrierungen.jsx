import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/layout/sidebar';
import Topbar from '@/components/layout/topbar';
import StatusCard from '@/components/ui/status-card';
import Card from '@/components/ui/card';
import { getRegistrations, changeStatus } from "../../api/registrationsApi";
import backgroundImage from '@/assets/Background.png';
import StatusIcon from "@/components/ui/StatusIcon";

export const Route = createFileRoute('/dashboard-teacher/registrierungen')({
  component: RouteComponent,
});

function RouteComponent() {
  const [registrations, setRegistrations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  // -------------------------------------
  // Load all registrations
  // -------------------------------------
  useEffect(() => {
    async function load() {
      try {
        const res = await getRegistrations();
        setRegistrations(res);
      } catch (err) {
        console.error("Failed to load registrations:", err);
      } finally {
        setIsLoading(false);
      }
function RouteComponent() {
  /* =====================================================
     1️⃣ TESTDATEN (exakt eure bisherigen Tabellenzeilen)
     ===================================================== */
    const registrations = [
    {
      id: 1,
      event: 'Tag der Ausbildung 2026',
      company: 'TechSolutions AG',
      status: 'angenommen',
      email: 'kontakt@techsolutions.de',
    },
    {
      id: 2,
      event: 'Tag der Ausbildung 2026',
      company: 'FutureIT GmbH',
      status: 'offen',
      email: 'pravingnanasooriyan@gmail.com',
    },
    {
      id: 3,
      event: 'Karrieretag IT 2026',
      company: 'NetSystems AG',
      status: 'abgelehnt',
      email: 'kontakt@netsystems.de',
    },
  ];

  /* =====================================================
     2️⃣ FILTER-STATE (gleiches Pattern wie Lecture)
     ===================================================== */const [statusFilter, setStatusFilter] = useState('');
  const [eventFilter, setEventFilter] = useState('');

  const filteredRegistrations = registrations.filter((reg) => {
    return (
      (statusFilter === '' || reg.status === statusFilter) &&
      (eventFilter === '' || reg.event === eventFilter)
    );
  });

  /* =====================================================
     3️⃣ AKTIONEN (✔ / ✖ bleiben voll funktionsfähig)
     ===================================================== */
    const handleAccept = async (registration) => {
    try {
      await fetch('http://127.0.0.1:5000/mail/registration/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: registration.email,
          status: 'accepted',
          event_name: registration.event,
        }),
      });
      console.log('Registrierung angenommen:', registration.id);
    } catch (error) {
      console.error('Fehler beim Annehmen:', error);
    }

    load();
  }, []);


  // -------------------------------------
  // Update registration status
  // -------------------------------------
  async function updateStatus(id, newStatus) {
    try {
      await changeStatus(id, newStatus);
    } catch (err) {
      console.error("Status update failed:", err);
      alert("Konnte Status nicht aktualisieren.");
      await fetch('http://127.0.0.1:5000/mail/registration/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: registration.email,
          status: 'rejected',
          event_name: registration.event,
        }),
      });
      console.log('Registrierung abgelehnt:', registration.id);
    } catch (error) {
      console.error('Fehler beim Ablehnen:', error);
    }
  }


  // -------------------------------------
  // Status counters
  // -------------------------------------
  const countAccepted = registrations.filter(r => r.status_id === 2).length;
  const countRejected = registrations.filter(r => r.status_id === 3).length;
  const countPending = registrations.filter(r => r.status_id === 1).length;


  // -------------------------------------
  // Loading screen
  // -------------------------------------
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Lade Registrierungen…
      </div>
    );
  }


  // -------------------------------------
  // UI
  // -------------------------------------
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
          <h1 className="mb-6">Lehrer – Registrierungen</h1>

          {/* STATUS CARDS */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <StatusCard label="Angenommen" count={countAccepted} type="success" />
            <StatusCard label="Offen" count={countPending} type="warning" />
            <StatusCard label="Abgelehnt" count={countRejected} type="danger" />
          </div>

          {/* TABLE */}
          <Card title="Alle Registrierungen">
            <p>Filterung für Tag + Status machen</p>

            <div className="block overflow-x-auto md:table md:w-full">
              <table
                className="w-full border-separate"
                style={{ borderSpacing: '0 8px' }}
              >
                <thead>
                  <tr>
                    <th className="p-3 text-left text-[13px] text-muted">Veranstaltung</th>
                    <th className="p-3 text-left text-[13px] text-muted">Firma</th>
                    <th className="p-3 text-left text-[13px] text-muted">Status</th>
                    <th className="p-3 text-left text-[13px] text-muted">Aktionen</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredRegistrations.map((registration) => (
                    <tr key={registration.id} className="bg-[#fafbfc]">
                      <td className="cursor-pointer p-3 text-primary">
                        {registration.event}
                      </td>

                      <td className="p-3">
                        {registration.company}
                      </td>

                      <td className="p-3">
                        {registration.status === 'offen' && (
                          <span className="text-warning-text">
                          <button>
  <StatusIcon type="pending" />
</button>
                          </span>
                        )}
                        {registration.status === 'angenommen' && (
                          <span className="text-success-text">
                           <button>
  <StatusIcon type="accepted" />
</button>
                          </span>
                        )}
                        {registration.status === 'abgelehnt' && (
                          <span className="text-error-text">
                         <button>
  <StatusIcon type="rejected" />
</button>
                          </span>
                        )}
                      </td>

                      <td className="p-3">
                        {/* ✔ / ✖ NUR BEI OFFEN */}
                        {registration.status === 'offen' && (
                          <><button onClick={() =>
                                handleAccept(registration)
                              }
                              className="mr-2 rounded-md bg-[#f1f3f6] px-3 py-1.5 hover:bg-[#e5e9ef]"
                              title="Annehmen"
                            >
                                <StatusIcon type="accepted" />
                            </button>

                            <button onClick={() =>
                                handleReject(registration)
                              }
                              className="mr-2 rounded-md bg-[#f1f3f6] px-3 py-1.5 hover:bg-[#e5e9ef]"
                              title="Ablehnen"
                            >
                                <StatusIcon type="rejected" />
                            </button>
                          </>                        )}

                        {/* DETAILS IMMER */}
                        <Link to={`/dashboard-teacher/details/registrierung/${registration.id}`}
                          className="rounded-md bg-[#f1f3f6] px-3 py-1.5 hover:bg-[#e5e9ef]"                        >
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
