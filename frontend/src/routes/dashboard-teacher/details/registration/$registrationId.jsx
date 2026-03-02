import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

import Sidebar from '@/components/layout/sidebar';
import Topbar from '@/components/layout/topbar';
import Card from '@/components/ui/card';
import backgroundImage from '@/assets/background.png';

import { getRegistrationById } from '@/api/registrationsApi';

export const Route = createFileRoute('/dashboard-teacher/details/registration/$registrationId')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { registrationId } = Route.useParams();

  const [registration, setRegistration] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRegistration() {
      try {
        const data = await getRegistrationById(registrationId);
        setRegistration({
          id: data.id,
          event_name: data.event?.name || '-',
          company: data.user?.company_name || '-',
          tables_needed: data.tables_needed,
          chairs_needed: data.chairs_needed,
          remarks: data.remarks,
          with_lecture: data.with_lecture,
          lecture: data.lecture || null,
        });
      } catch (err) {
        console.error('Failed to load registration:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRegistration();
  }, [registrationId]);

  if (isLoading || !registration) {
    return <div className="p-8">Lade Details…</div>;
  }

  return (
    <PageWrapper>
      <h1 className="mb-6 text-xl font-semibold">Registrierung - Details</h1>

      <button
        onClick={() => navigate({ to: '/dashboard-teacher/registrierungen' })}
        className="mb-4 inline-flex items-center gap-2 rounded-md bg-[#f1f3f6] px-4 py-2 text-sm hover:bg-[#e5e9ef]"
      >
        ← Zurück zu den Registrierungen
      </button>

      <Card title="Infostand-Anmeldung">
        <Detail label="Veranstaltung" value={registration.event_name} />
        <Detail label="Firma" value={registration.company} />
        <Detail label="Tische" value={registration.tables_needed} />
        <Detail label="Stühle" value={registration.chairs_needed} />
        <Detail label="Bemerkungen" value={registration.remarks} />

        {registration.with_lecture && registration.lecture && (
          <Card title="Vortrag" className="mt-4">
            <Detail label="Titel" value={registration.lecture.title || '-'} />
            <Detail label="Beschreibung" value={registration.lecture.description || '-'} />
            <Detail label="Referent / Sprecher" value={registration.lecture.speaker || '-'} />
            <Detail label="Benötigte Technik" value={registration.lecture.required_tech || '-'} />
            <Detail label="Bevorzugte Uhrzeit" value={registration.lecture.preferred_time || '-'} />
          </Card>
        )}
      </Card>
    </PageWrapper>
  );
}

function PageWrapper({ children }) {
  return (
    <div
      className="flex min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(255,255,255,0.75),
            rgba(255,255,255,0.75)
          ),
          url(${backgroundImage})
        `,
      }}
    >
     
      <main className="flex-1">
        <div className="max-w-[800px] p-8">{children}</div>
      </main>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="mb-3">
      <span className="block text-sm text-muted">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}