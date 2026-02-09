import { createFileRoute } from '@tanstack/react-router';import { useEffect, useState } from 'react';
import Sidebar from '@/components/layout/sidebar';import Topbar from '@/components/layout/topbar';import Card from '@/components/ui/card';import backgroundImage from '@/assets/background.png';
import { useNavigate } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
export const Route = createFileRoute(
  '/dashboard-teacher/details/registration/$registration',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate();
 const { registrationID } = Route.useParams();

  const [registration, setRegistration] = useState(null);

  useEffect(() => {
    setRegistration({
      id: Number(registrationID),
      event_name: 'Tag der Ausbildung 2026',
      company: 'TechSolutions AG',
      tables_needed: 2,
      chairs_needed: 4,
      remarks: 'Stromanschluss benötigt',
      status: 'offen',
    });
  }, [registrationID]);

  if (!registration) {
    return <div className="p-8">Lade Details…</div>;
  }

  return (
    <PageWrapper>
      <h1 className="mb-6 text-xl font-semibold">
        Registrierung – Details
      </h1>
<button
  onClick={() =>navigate({ to: '/dashboard-teacher/registrierungen' })
  }
  className="mb-4 inline-flex items-center gap-2 rounded-md bg-[#f1f3f6] px-4 py-2 text-sm hover:bg-[#e5e9ef]">
  ← Zurück zu den Registrierungen</button>
      <Card title="Infostand-Anmeldung">
        <Detail label="Veranstaltung" value={registration.event_name} />
        <Detail label="Firma" value={registration.company} />
        <Detail label="Tische" value={registration.tables_needed} />
        <Detail label="Stühle" value={registration.chairs_needed} />
        <Detail label="Bemerkungen" value={registration.remarks} />
        <Detail label="Status" value={registration.status} />
      </Card>
    </PageWrapper>
  );
}
function PageWrapper({ children }) {
  return (
    <div className="flex min-h-screen bg-cover bg-center"style={{backgroundImage: `
          linear-gradient(
            rgba(255,255,255,0.75),
            rgba(255,255,255,0.75)
          ),
          url(${backgroundImage})
        `,
      }}
    >
      <Sidebar />
      <main className="flex-1">
        <Topbar />
        <div className="max-w-[800px] p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
function Detail({ label, value }) {
  return (
    <div className="mb-3">
      <span className="block text-sm text-muted">
        {label}
      </span>
      <span className="font-medium">
        {value}
      </span>
    </div>
  );
}