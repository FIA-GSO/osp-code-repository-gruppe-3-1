import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/layout/sidebar';
import Topbar from '@/components/layout/topbar';
import Card from '@/components/ui/card';
import backgroundImage from '@/assets/background.png';
import { getUserRegistrations, postFormRegistration } from '../../../api/registrationsApi';
import { getEventById } from '../../../api/eventsApi';
import { getUserId } from '../../../api/authApi';

export const Route = createFileRoute('/dashboard-user/anmelden/$eventId')({
    component: RouteComponent,
});

function RouteComponent() {
    const navigate = useNavigate();

    const { eventId } = Route.useParams();

    const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
    const [previousRegistrations, setPreviousRegistrations] = useState(null);
    const [event, setEvent] = useState(null);

    const [selectedTemplateId, setSelectedTemplateId] = useState('');

    const [registration, setRegistration] = useState({
        tables_needed: 1,
        chairs_needed: 1,
        remarks: '',
        with_lecture: false,
    });

    const [lecture, setLecture] = useState({
        title: '',
        description: '',
        speaker: '',
        required_tech: '',
        preferred_time: '',
    });

    // Load templates
    useEffect(() => {
        getUserRegistrations(getUserId())
            .then((data) => {
                setPreviousRegistrations(data);
            })
            .catch((err) => console.error('Failed to fetch registrations:', err));
    }, []);

    // Load event
    useEffect(() => {
        getEventById(eventId)
            .then((data) => {
                setEvent({
                    id: data.id,
                    name: data.name,
                    event_date: data.event_date,
                    registration_locked: data.registration_locked,
                });
            })
            .catch((err) => {
                console.error('Failed to load event:', err);
            });
    }, [eventId]);

    const applyTemplate = (templateId) => {
        if (!previousRegistrations) return;

        const template = previousRegistrations.registrations.find(
            (r) => r.id === Number(templateId)
        );

        if (!template) return;

        setRegistration((prev) => ({
            ...prev,
            tables_needed: template.tables_needed,
            chairs_needed: template.chairs_needed,
            remarks: template.remarks,
            with_lecture: Boolean(template.lecture),
        }));

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        await fetch('http://127.0.0.1:5000/mail/registration/received', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: "pravingnanasooriyan@gmail.com",
                event_name: event !== null ? event.name : "",
                has_Lecture: registration.with_lecture,
            }),
        });

        if (!acceptedPrivacy) {
            alert('Bitte stimmen Sie der Datenschutzerklärung zu.');
            return;
        }

        const payload = {
            user_id: getUserId(),
            event_id: Number(eventId),
            status_id: 1,
            chairs_needed: registration.chairs_needed,
            tables_needed: registration.tables_needed,
            remarks: registration.remarks,
            with_lecture: registration.with_lecture,
            lecture: registration.with_lecture ? lecture : null,
        };

        try {
            await postFormRegistration(payload);
            navigate({ to: '/dashboard-user' });
        } catch (err) {
            console.error('Registration failed:', err);
            alert('Es ist ein Fehler aufgetreten.');
        }
    };

    if (!previousRegistrations || !event) {
        return <div className="p-8">Lade…</div>;
    }

    function PageWrapper({ children }) {
        return (
            <div
                className="flex min-h-screen bg-cover bg-center"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.75), rgba(255,255,255,0.75)),
                        url(${backgroundImage})
                    `,
                }}
            >
                <Sidebar />
                <main className="flex-1">
                    <Topbar />
                    <div className="max-w-[900px] p-8">{children}</div>
                </main>
            </div>
        );
    }

    function Input({ label, ...props }) {
        return (
            <div className="mb-4">
                <label className="block text-sm text-muted">{label}</label>
                <input {...props} className="w-full rounded-md border p-2" />
            </div>
        );
    }

    function Textarea({ label, ...props }) {
        return (
            <div className="mb-4">
                <label className="block text-sm text-muted">{label}</label>
                <textarea {...props} rows={3} className="w-full rounded-md border p-2" />
            </div>
        );
    }

    function Checkbox({ label, checked, onChange }) {
        return (
            <label className="mt-4 flex items-center gap-2">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                />
                <span className="text-sm">{label}</span>
            </label>
        );
    }

    function ActionButtons() {
        return (
            <div className="flex gap-3 pt-4">
                <button
                    type="submit"
                    disabled={!acceptedPrivacy}
                    className={`
                        rounded-md px-6 py-2 text-white
                        ${
                            acceptedPrivacy
                                ? 'bg-primary hover:bg-primary/90'
                                : 'cursor-not-allowed bg-gray-300 text-gray-500'
                        }
                    `}
                >
                    Registrierung einreichen
                </button>

                <button
                    type="button"
                    className="rounded-md bg-[#f1f3f6] px-6 py-2"
                    onClick={() => history.back()}
                >
                    Abbrechen
                </button>
            </div>
        );
    }

    return (
        <PageWrapper>
            <h1 className="mb-2 text-xl font-semibold">
                Registrierung – {event.name}
            </h1>
            <p className="mb-6 text-muted">{event.date}</p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <Card title="Vorlage">
                    <p className="mb-2 text-sm text-muted">
                        Frühere Anmeldungen als Vorlage verwenden
                    </p>

                    <select
                        value={selectedTemplateId}
                        onChange={(e) => {
                            setSelectedTemplateId(e.target.value);
                            applyTemplate(e.target.value);
                        }}
                        className="w-full rounded-md border p-2"
                    >
                        <option value="">Keine Vorlage auswählen</option>

                     {previousRegistrations?.registrations?.length > 0 && previousRegistrations.registrations.map((reg) =>reg.event ? (
                        <option key={reg.id} value={reg.id}>
                            {reg.event.name}
                        </option>
                        ) : null
                    )
                    }
                    </select>

                    <p className="mt-2 text-xs text-muted">
                        Beim Auswählen werden die Felder automatisch ausgefüllt.
                    </p>
                </Card>

                <Card title="Registrierung für Infostand">
                    <Textarea
                        label="Bemerkungen"
                        value={registration.remarks}
                        onChange={(e) =>
                            setRegistration({
                                ...registration,
                                remarks: e.target.value,
                            })
                        }
                    />

                    <div className="mt-4 grid grid-cols-2 gap-4">
                        <Input
                            label="Benötigte Tische"
                            type="number"
                            min={1}
                            value={registration.tables_needed}
                            onChange={(e) =>
                                setRegistration({
                                    ...registration,
                                    tables_needed: Number(e.target.value),
                                })
                            }
                        />

                        <Input
                            label="Benötigte Stühle"
                            type="number"
                            min={1}
                            value={registration.chairs_needed}
                            onChange={(e) =>
                                setRegistration({
                                    ...registration,
                                    chairs_needed: Number(e.target.value),
                                })
                            }
                        />
                    </div>

                    <Checkbox
                        label="Vortrag zusätzlich registrieren (optional)"
                        checked={registration.with_lecture}
                        onChange={(checked) =>
                            setRegistration({
                                ...registration,
                                with_lecture: checked,
                            })
                        }
                    />
                </Card>

                {registration.with_lecture && (
                    <Card title="Vortrag (Speaker)">
                        <p className="mb-4 text-sm text-muted">Einen Vortrag halten</p>

                        <Input
                            label="Titel des Vortrags"
                            value={lecture.title}
                            onChange={(e) =>
                                setLecture({ ...lecture, title: e.target.value })
                            }
                        />

                        <Textarea
                            label="Beschreibung"
                            value={lecture.description}
                            onChange={(e) =>
                                setLecture({ ...lecture, description: e.target.value })
                            }
                        />

                        <Input
                            label="Referent / Sprecher"
                            value={lecture.speaker}
                            onChange={(e) =>
                                setLecture({ ...lecture, speaker: e.target.value })
                            }
                        />

                        <Input
                            label="Benötigte Technik"
                            value={lecture.required_tech}
                            onChange={(e) =>
                                setLecture({
                                    ...lecture,
                                    required_tech: e.target.value,
                                })
                            }
                        />

                        <Input
                            label="Bevorzugte Uhrzeit"
                            value={lecture.preferred_time}
                            onChange={(e) =>
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
                        <input
                            type="checkbox"
                            checked={acceptedPrivacy}
                            onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                            className="mt-1"
                        />
                        <span className="text-sm">
                            Ich habe die{' '}
                            <a
                                href="https://www.gso-koeln.de/datenschutzerklaerung/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary underline"
                            >
                                Datenschutzerklärung
                            </a>{' '}
                            gelesen und stimme der Verarbeitung meiner Daten gemäß DSGVO zu.
                        </span>
                    </label>
                </Card>

                <ActionButtons />
            </form>
        </PageWrapper>
    );
}
