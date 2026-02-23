import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

import Sidebar from '@/components/layout/sidebar';
import Topbar from '@/components/layout/topbar';
import StatusCard from '@/components/ui/status-card';
import Card from '@/components/ui/card';
import { getRegistrations, changeStatus } from "../../api/registrationsApi";
import backgroundImage from '@/assets/Background.png';


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
                  {registrations.map((reg) => {
                    let statusLabel = "";
                    let statusClass = "";

                    switch (reg.status_id) {
                      case 2:
                        statusLabel = "✔ Bestätigt";
                        statusClass = "text-success-text";
                        break;
                      case 3:
                        statusLabel = "✖ Abgelehnt";
                        statusClass = "text-error-text";
                        break;
                      default:
                        statusLabel = "⏳ Eingereicht";
                        statusClass = "text-warning-text";
                    }

                    return (
                      <tr key={reg.id} className="bg-[#fafbfc]">
                        <td className="cursor-pointer p-3 text-primary">
                          {reg.event?.name || "Unbekannt"}
                        </td>

                        <td className="p-3">
                          {reg.user?.company_name || "Firma unbekannt"}
                        </td>

                        <td className={`p-3 ${statusClass}`}>
                          {statusLabel}
                        </td>

                        <td className="p-3 flex gap-2">
                          {/* ACCEPT / REJECT only when status = eingereicht */}
                          {reg.status_id === 1 && (
                            <>
                              <button
                                className="rounded-md bg-[#f1f3f6] px-3 py-1.5 hover:bg-[#e5e9ef]"
                                onClick={() => updateStatus(reg.id, 2)}
                              >
                                ✔
                              </button>

                              <button
                                className="rounded-md bg-[#f1f3f6] px-3 py-1.5 hover:bg-[#e5e9ef]"
                                onClick={() => updateStatus(reg.id, 3)}
                              >
                                ✖
                              </button>
                            </>
                          )}

                          <Link
                            to={`/dashboard-teacher/details/registration/${reg.id}`}
                            className="rounded-md bg-[#f1f3f6] px-3 py-1.5 hover:bg-[#e5e9ef]"
                          >
                            Details
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>

              </table>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
