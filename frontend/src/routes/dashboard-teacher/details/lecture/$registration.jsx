import { createFileRoute } from '@tanstack/react-router';import { useEffect, useState } from 'react';
import Sidebar from '@/components/layout/sidebar';import Topbar from '@/components/layout/topbar';import Card from '@/components/ui/card';import backgroundImage from '@/assets/background.png';
import { useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/dashboard-teacher/details/lecture/$registration',
)({
  component: RouteComponent,
})

function RouteComponent() {
 const { registrationID } = Route.useParams();
const navigate = useNavigate();
  const [lecture, setLecture] = useState(null);

  useEffect(() => {
    // 🔹 Testdaten – DB-konformset
    setLecture({
      registration_id: Number(registrationID),
      title: 'KI in der Ausbildung',
      description: 'Einführung in den Einsatz von KI im Ausbildungsalltag',
      speaker: 'Max Müller',
      required_tech: 'Beamer',
      preferred_time: '15.03.2026 – 10:00',
      status: 'offen',
    });
  }, [registrationID]);

  if (!lecture) {
    return <div className="p-8">Lade Details…</div>;
  }

  return (
    <PageWrapper>
      <h1 className="mb-6 text-xl font-semibold">
        Vortrag – Details
      </h1>
<button
  onClick={() =>navigate({ to: '/dashboard-teacher/vortraege' })
  }
  className="mb-4 inline-flex items-center gap-2 rounded-md bg-[#f1f3f6] px-4 py-2 text-sm hover:bg-[#e5e9ef]">
  ← Zurück zu den Vorträgen
</button>
      <Card title="Vortragsdetails">
        <Detail label="Titel" value={lecture.title} />
        <Detail label="Beschreibung" value={lecture.description} />
        <Detail label="Referent" value={lecture.speaker} />
        <Detail label="Technik" value={lecture.required_tech} />
        <Detail label="Zeit" value={lecture.preferred_time} />
        <Detail label="Status" value={lecture.status} />
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
      <main className="flex-1">
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