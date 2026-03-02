import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/layout/sidebar';
import Topbar from '@/components/layout/topbar';
import StatusCard from '@/components/ui/status-card';
import Card from '@/components/ui/card';
import { getRegistrations, changeStatus } from "../../api/registrationsApi";
import backgroundImage from '@/assets/Background.png';
import StatusIcon from "@/components/ui/StatusIcon";
import { getUserRole } from '@/api/authApi';
import { redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard-teacher/registrierungen')({
        beforeLoad: () => {
    if (getUserRole() !== "teacher" && getUserRole() !== "admin") {
      throw redirect({ to: '/notFound' });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const [registrations, setRegistrations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const loadRegistrations = async () => {
  setIsLoading(true);
  try {
    const res = await getRegistrations();
    setRegistrations(res);
  } catch (err) {
    console.error("Failed to load registrations:", err);
  } finally {
    setIsLoading(false);
  }
};

  // Load all registrations
// -------------------------------------
useEffect(() => {
  loadRegistrations();
}, []); // 👈 💯💯💯💯💯💯


  /* =====================================================
     2️⃣ FILTER-STATE (gleiches Pattern wie Lecture)
     ===================================================== */

const [statusFilter, setStatusFilter] = useState(0);
const [eventFilter, setEventFilter] = useState('');


  const filteredRegistrations = registrations.filter((reg) => {
  return (
    (statusFilter === 0 || reg.status_id === statusFilter) &&
    (eventFilter === '' || reg.event?.name === eventFilter)
  );
});

  // -------------------------------------
  // Update registration status 💯💯💯
  // -------------------------------------
  async function updateStatus(registration, newStatus) {
    try {
      await changeStatus(registration.id, newStatus);

      await fetch('http://127.0.0.1:5000/mail/registration/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: "pravingnanasooriyan@gmail.com",
          status: newStatus === 3 ? 'rejected' : 'accepted',
          event_name: registration.event.name,
        }),
      });
         console.log('Registrierung abgelehnt:', registration.id);
      loadRegistrations();
    } catch (err) {
      console.error("Status update failed:", err);
      console.log(err);
      alert("Konnte Status nicht aktualisieren.");
  }
}

const uniqueEvents = [
  ...new Set(
    registrations
      .map((reg) => reg.event?.name)
      .filter(Boolean)
  ),
];


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
    

      <main className="flex-1">

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

            <div className="block overflow-x-auto md:table md:w-full">
<select
  value={statusFilter}
  onChange={(e) => setStatusFilter(Number(e.target.value))}
  className="rounded-md border p-2 mr-4"
>
  <option value={0}>Alle Status</option>
  <option value={1}>Offen</option>
  <option value={2}>Angenommen</option>
  <option value={3}>Abgelehnt</option>
</select>

 <select
  value={eventFilter}
  onChange={(e) => setEventFilter(e.target.value)}
  className="rounded-md border p-2"
>
  <option value="">Alle Veranstaltungen</option>

  {uniqueEvents.map((eventName) => (
    <option key={eventName} value={eventName}>
      {eventName}
    </option>
  ))}
</select>

              <table
                className="w-full border-separate text-center"
                style={{ borderSpacing: '0 8px', }}
              >
                <thead>
                  <tr>
                    <th className="p-3 text-left text-[13px]" style={{ textAlign: 'center', }}>Veranstaltung</th>
                    <th className="p-3 text-left text-[13px]" style={{ textAlign: 'center', }}>Firma</th>
                    <th className="p-3 text-left text-[13px]" style={{ textAlign: 'center', }}>Status</th>
                    <th className="p-3 text-left text-[13px]" style={{ textAlign: 'center', }}>Aktionen</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredRegistrations.map((registration) => (
                    <tr key={registration.id} className="bg-[#fafbfc]">
                      <td className="cursor-pointer p-3 text-primary">
                       {registration.event?.name || "Unbekanntes Event"}
                      </td>

                      <td className="p-3">
                        {registration.user?.company_name || "Unbekannte Firma"}
                      </td>

                      <td className="p-3">
                        {registration?.status_id ===1 && (
                          <span className="text-warning-text">
                          <button>
  <StatusIcon type="pendingFull" />
</button>
                          </span>
                        )}
                        {registration?.status_id === 2 && (
                          <span className="text-success-text">
                           <button>
  <StatusIcon type="acceptedFull" />
</button>
                          </span>
                        )}
                        {registration?.status_id === 3 && (
                          <span className="text-error-text">
                         <button>
  <StatusIcon type="rejectedFull" />
</button>
                          </span>
                        )}
                      </td>

                      <td className="p-3">
                        {/* ✔ / ✖ NUR BEI OFFEN */}
                        {registration.status_id === 1 && (
                          <><button onClick={() =>
                                updateStatus(registration, 2)
                              }
                              className="mr-2 rounded-md bg-[#f1f3f6] px-3 py-1.5 hover:bg-[#e5e9ef]"
                              title="Annehmen"
                            >
                                <StatusIcon type="accepted" />
                            </button>

                            <button onClick={() =>
                                updateStatus(registration, 3)
                              }
                              className="mr-2 rounded-md bg-[#f1f3f6] px-3 py-1.5 hover:bg-[#e5e9ef]"
                              title="Ablehnen"
                            >
                                <StatusIcon type="rejected" />
                            </button>
                          </>                        )}

                        {/* DETAILS IMMER */}
                       <Link
                        to="/dashboard-teacher/details/registration/$registrationId"
                        params={{ registrationId: registration.id }}
                        className="rounded-md bg-[#f1f3f6] px-3 py-1.5 hover:bg-[#e5e9ef]"
                      >
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
