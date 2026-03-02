import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import Card from '@/components/ui/card';

import { getRegistrationById, updateRegistration } from '@/api/registrationsApi';

export const Route = createFileRoute(
  '/dashboard-user/bearbeiten/infostand/$registrationID'
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { registrationID } = Route.useParams();
  const navigate = useNavigate();
  const [registration, setRegistration] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadRegistration() {
      try {
        const data = await getRegistrationById(registrationID);
        setRegistration({
          ...data,
          lecture: data.lecture || {
            title: '',
            description: '',
            speaker: '',
            required_tech: '',
            preferred_time: '',
          },
        });
        console.log(data)
      } catch (err) {
        console.error("Failed to load registration:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadRegistration();
  }, [registrationID]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (registration.status_id !== 1) {
      return;
    }
    try {
      await updateRegistration(registrationID, registration);
      navigate({ to: '/dashboard-user' });
    } catch (err) {
      console.error("Update failed:", err);
      alert("Beim Speichern ist ein Fehler aufgetreten.");
    }
  };

  if (isLoading || !registration) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Lade Daten…
      </div>
    );
  }
  const isEditable = registration?.status_id === 1;

  return (
    <PageWrapper>
      <h1 className="mb-6 text-xl font-semibold">Infostand bearbeiten</h1>

      <Card title="Infostand-Antrag">
        <form onSubmit={handleSubmit} className="space-y-6">

          <Input
            label="Tische"
            type="number"
            value={registration.tables_needed}
            readOnly={registration?.status_id !== 1}
            onChange={(e) =>
              setRegistration({
                ...registration,
                tables_needed: Number(e.target.value),
              })
            }
          />

          <Input
            label="Stühle"
            type="number"
            value={registration.chairs_needed}
            readOnly={registration?.status_id !== 1}
            onChange={(e) =>
              setRegistration({
                ...registration,
                chairs_needed: Number(e.target.value),
              })
            }
          />

          <Textarea
            label="Bemerkungen"
            value={registration.remarks}
            readOnly={registration?.status_id !== 1}
            onChange={(e) =>
              setRegistration({
                ...registration,
                remarks: e.target.value,
              })
            }
          />

          {/* VORTRAG CHECKBOX */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={registration.with_lecture}
              disabled={registration?.status_id !== 1}
              onChange={(e) =>
                setRegistration({
                  ...registration,
                  with_lecture: e.target.checked,
                })
              }
            />
            <label>Vortrag zusätzlich registrieren (optional)</label>
          </div>

          {/* VORTRAG FELDER */}
          {registration.with_lecture && (
            <Card title="Vortrag (Speaker)">
              <Input
                label="Titel des Vortrags"
                value={registration.lecture?.title || ''}
                readOnly={registration?.status_id !== 1}
                onChange={(e) =>
                  setRegistration({
                    ...registration,
                    lecture: { ...registration.lecture, title: e.target.value },
                  })
                }
              />

              <Textarea
                label="Beschreibung"
                value={registration.lecture?.description || ''}
                readOnly={registration?.status_id !== 1}
                onChange={(e) =>
                  setRegistration({
                    ...registration,
                    lecture: { ...registration.lecture, description: e.target.value },
                  })
                }
              />

              <Input
                label="Referent / Sprecher"
                value={registration.lecture?.speaker || ''}
                readOnly={registration?.status_id !== 1}
                onChange={(e) =>
                  setRegistration({
                    ...registration,
                    lecture: { ...registration.lecture, speaker: e.target.value },
                  })
                }
              />

              <Input
                label="Benötigte Technik"
                value={registration.lecture?.required_tech || ''}
                readOnly={registration?.status_id !== 1}
                onChange={(e) =>
                  setRegistration({
                    ...registration,
                    lecture: { ...registration.lecture, required_tech: e.target.value },
                  })
                }
              />

              <Input
                label="Bevorzugte Uhrzeit"
                value={registration.lecture?.preferred_time || ''}
                readOnly={registration?.status_id !== 1}
                onChange={(e) =>
                  setRegistration({
                    ...registration,
                    lecture: { ...registration.lecture, preferred_time: e.target.value },
                  })
                }
              />
            </Card>
          )}

          <ActionButtons isEditable={isEditable} />
        </form>
      </Card>
    </PageWrapper>
  );
}

function PageWrapper({ children }) {
  return (
    <div className="flex min-h-screen bg-cover bg-center">
      <main className="flex-1">
        <div className="max-w-[800px] p-8">{children}</div>
      </main>
    </div>
  );
}

function Input({ label, readOnly = false, ...props }) {
  return (
    <div>
      <label className="block text-sm text-muted">{label}</label>
      <input
        {...props}
        readOnly={readOnly}
        className={`w-full rounded-md border p-2 ${readOnly ? 'bg-gray-100 cursor-not-allowed' : ''}`}
      />
    </div>
  );
}

function Textarea({ label, readOnly = false, ...props }) {
  return (
    <div>
      <label className="block text-sm text-muted">{label}</label>
      <textarea
        {...props}
        readOnly={readOnly}
        rows={3}
        className={`w-full rounded-md border p-2 ${readOnly ? 'bg-gray-100 cursor-not-allowed' : ''}`}
      />
    </div>
  );
}

function ActionButtons({ isEditable }) {
  return (
    <div className="flex gap-3 pt-4">
      <button
        type="submit"
        disabled={!isEditable}
        className={`rounded-md px-4 py-2 text-white 
          ${!isEditable ? "bg-gray-400 cursor-not-allowed" : "bg-primary cursor-pointer"}`}
      >
        Speichern
      </button>

      <button
        type="button"
        className="rounded-md bg-[#f1f3f6] px-4 py-2"
        onClick={() => history.back()}
      >
        Abbrechen
      </button>
    </div>
  );
}