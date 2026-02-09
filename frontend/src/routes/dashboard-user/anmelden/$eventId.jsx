import { createFileRoute } from '@tanstack/react-router'; import { useEffect, useState } from 'react';
import Sidebar from '@/components/layout/sidebar'; import Topbar from '@/components/layout/topbar'; import Card from '@/components/ui/card'; import backgroundImage from '@/assets/background.png'; 

export const Route = createFileRoute('/dashboard-user/anmelden/$eventId')({
    component: RouteComponent,
})

function RouteComponent() {
    const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
const previousRegistrations = [
  {
    id: 5,
    event_name: 'Tag der Ausbildung 2025',
    tables_needed: 2,
    chairs_needed: 4,
    remarks: 'Stromanschluss benötigt',
    lecture: {
      title: 'KI in der Ausbildung',
      description: 'Grundlagen & Praxisbeispiele',
      speaker: 'Max Müller',
      required_tech: 'Beamer',
      preferred_time: '10:00',
    },
  },
  {
    id: 8,
    event_name: 'Karrieretag IT 2025',
    tables_needed: 1,
    chairs_needed: 2,
    remarks: '',
    lecture: null, // kein Vortrag  
    },
];
const [selectedTemplateId, setSelectedTemplateId] = useState('');
const applyTemplate = (templateId) => {
  const template = previousRegistrations.find(
    (r) => r.id === Number(templateId)
  );

  if (!template) return;

  // 🔹 Infostand übernehmen
  setRegistration((prev) => ({
    ...prev,
    tables_needed: template.tables_needed,
    chairs_needed: template.chairs_needed,
    remarks: template.remarks,
    with_lecture: Boolean(template.lecture),
  }));

  // 🔹 Vortrag nur wenn vorhanden
  if (template.lecture) {
    setLecture({
      title: template.lecture.title,
      description: template.lecture.description,
      speaker: template.lecture.speaker,
      required_tech: template.lecture.required_tech,
      preferred_time: template.lecture.preferred_time,
    });
  }
    };
    const { eventId } = Route.useParams();

    // 🔹 Event-Daten (später GET /api/events/:id)
    const [event, setEvent] = useState(null);

    // 🔹 Infostand-Daten (registration)
    const [registration, setRegistration] = useState({
    tables_needed: 1,
            chairs_needed: 1,
                remarks: '',
                    with_lecture: false,
      });

    // // 🔹 Vortragsdaten (lecture)
    const [lecture, setLecture] = useState({
    title: '',
        description: '',
            speaker: '',
                required_tech: '',
                    preferred_time: '',
      });

    useEffect(() => {
        setEvent({
        id: Number(eventId),
            name: 'Tag der Ausbildung 2026',
                date: '15. März 2026',
                    is_locked: false,
        });
      }, [eventId]);

   const handleSubmit = (e) => {
        e.preventDefault();

        if (!acceptedPrivacy) {
            alert('Bitte stimmen Sie der Datenschutzerklärung zu.');
            return;
        }

        /*
            TODO (Backend):
            POST /api/registrations
            payload:
            {
            event_id,
            tables_needed,
            chairs_needed,
            remarks,
            with_lecture,
            lecture,
            privacy_accepted: true
            }
        */console.log('Event Anmeldung', {
            event,
            registration,
            lecture: registration.with_lecture ? lecture : null,
            privacyAccepted: acceptedPrivacy,
        });
        
    };

    if (!event) {
        return <div className="p-8">Lade Event…</div>;
    }

    
/* =========================================================
   Helper Components (lokal, keine Duplikate)
   ========================================================= */
function PageWrapper({ children }) {
    return (
        <div className="flex min-h-screen bg-cover bg-center" style={{
            backgroundImage: `
          linear-gradient(rgba(255,255,255,0.75), rgba(255,255,255,0.75)),
          url(${backgroundImage})
        `,
        }}
        >
            <Sidebar />
            <main className="flex-1">
                <Topbar />
                <div className="max-w-[900px] p-8">
                    {children}
                </div>
            </main>
        </div >
    );
}
function Input({ label, ...props }) {
    return (
        <div className="mb-4">
            <label className="block text-sm text-muted">
                {label}
            </label>
            <input        {...props}
                className="w-full rounded-md border p-2" />
        </div>
    );
}
function Textarea({ label, ...props }) {
    return (
        <div className="mb-4">
            <label className="block text-sm text-muted">
                {label}
            </label>
            <textarea        {...props}
                rows={3} className="w-full rounded-md border p-2" />
        </div>
    );
}
function Checkbox({ label, checked, onChange }) {
    return (
        <label className="mt-4 flex items-center gap-2">
            <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)}
            />
            <span className="text-sm">{label}</span>
        </label>
    );
}
function ActionButtons() {
    
    return (
        <div className="flex gap-3 pt-4">
            <button
  type="submit"  disabled={!acceptedPrivacy}  className={`
    rounded-md px-6 py-2 text-white
    ${
      acceptedPrivacy
        ? 'bg-primary hover:bg-primary/90'        : 'cursor-not-allowed bg-gray-300 text-gray-500'    }
  `}
>
  Registrierung einreichen
</button>

            <button type="button" className="rounded-md bg-[#f1f3f6] px-6 py-2" onClick={() => history.back()
            }
            >
                Abbrechen
            </button >
        </div >
    );
}


    return (
        <PageWrapper>
            {/* ================= HEADER ================= */}
            <h1 className="mb-2 text-xl font-semibold">
                Registrierung – {event.name}
            </h1>
            <p className="mb-6 text-muted">{event.date}</p>

            <form onSubmit={handleSubmit} className="space-y-6">
<Card title="Vorlage">
  <p className="mb-2 text-sm text-muted">
    Frühere Anmeldungen als Vorlage verwenden
  </p>

  <select value={selectedTemplateId}onChange={(e) => {
      setSelectedTemplateId(e.target.value);
      applyTemplate(e.target.value);
    }}
    className="w-full rounded-md border p-2"
  >
    <option value="">Keine Vorlage auswählen</option>

    {previousRegistrations.map((reg) => (
      <option key={reg.id} value={reg.id}>
        {reg.event_name}
      </option>
    ))}
  </select>

  <p className="mt-2 text-xs text-muted">
    Beim Auswählen werden die Felder automatisch ausgefüllt.
  </p>
</Card>
                {/* ================= INFOSTAND ================= */}
                <Card title="Registrierung für Infostand">

                    <Textarea label="Bemerkungen" value={registration.remarks} onChange={(e) =>
                        setRegistration({
                            ...registration,
                            remarks: e.target.value,
                        })
                    }
                    />

                    <div className="mt-4 grid grid-cols-2 gap-4">
                        <Input label="Benötigte Tische" type="number" min={1} value={registration.tables_needed} onChange={(e) =>
                            setRegistration({
                                ...registration,
                                tables_needed: Number(e.target.value),
                            })
                        }
                        />
                        <Input label="Benötigte Stühle" type="number" min={1} value={registration.chairs_needed} onChange={(e) =>
                            setRegistration({
                                ...registration,
                                chairs_needed: Number(e.target.value),
                            })
                        }
                        />
                    </div>

                    <Checkbox label="Vortrag zusätzlich registrieren (optional)" checked={registration.with_lecture} onChange={(checked) =>
                        setRegistration({
                            ...registration,
                            with_lecture: checked,
                        })
                    }
                    />
                </Card>

                {/* ================= VORTRAG (OPTIONAL) ================= */}
                {registration.with_lecture && (
                    <Card title="Vortrag (Speaker)">
                        <p className="mb-4 text-sm text-muted">
                            Einen Vortrag halten
                        </p>

                        <Input label="Titel des Vortrags" value={lecture.title} onChange={(e) =>
                            setLecture({ ...lecture, title: e.target.value })
                        }
                        />

                        <Textarea label="Beschreibung" value={lecture.description} onChange={(e) =>
                            setLecture({
                                ...lecture,
                                description: e.target.value,
                            })
                        }
                        />

                        <Input label="Referent / Sprecher" value={lecture.speaker} onChange={(e) =>
                            setLecture({
                                ...lecture,
                                speaker: e.target.value,
                            })
                        }
                        />

                        <Input label="Benötigte Technik" value={lecture.required_tech} onChange={(e) =>
                            setLecture({
                                ...lecture,
                                required_tech: e.target.value,
                            })
                        }
                        />

                        <Input label="Bevorzugte Uhrzeit" value={lecture.preferred_time} onChange={(e) =>
                            setLecture({
                                ...lecture,
                                preferred_time: e.target.value,
                            })
                        }
                        />
                    </Card>
                )}
<Card title="Datenschutz">
  <label className="flex items-start gap-3">
    <input type="checkbox"checked={acceptedPrivacy}onChange={(e) => setAcceptedPrivacy(e.target.checked)}
      className="mt-1"
    />
    <span className="text-sm">
      Ich habe die{' '}
      <a href="https://www.gso-koeln.de/"target="_blank"rel="noopener noreferrer"className="text-primary underline"      >
        Datenschutzerklärung
      </a>{' '}
      gelesen und stimme der Verarbeitung meiner Daten gemäß DSGVO zu.
    </span>
  </label>
</Card>
                {/* ================= ACTION ================= */}
                <ActionButtons />
            </form>
        </PageWrapper>
    );
}