import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

import Sidebar from '@/components/layout/sidebar';
import Topbar from '@/components/layout/topbar';
import Card from '@/components/ui/card';
import backgroundImage from '@/assets/background.png';

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

  // Load registration
  useEffect(() => {
    async function loadRegistration() {
      try {
        const data = await getRegistrationById(registrationID);
        setRegistration(data);
      } catch (err) {
        console.error("Failed to load registration:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadRegistration();
  }, [registrationID]);

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateRegistration(registrationID, registration);
      navigate({ to: '/dashboard-user' });
    } catch (err) {
      console.error("Update failed:", err);
      alert("Beim Speichern ist ein Fehler aufgetreten.");
    }
  };

  // Loading state
  if (isLoading || !registration) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Lade Daten…
      </div>
    );
  }

  return (
    <PageWrapper>
      <h1 className="mb-6 text-xl font-semibold">Infostand bearbeiten</h1>

      <Card title="Infostand-Antrag">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Tische"
            type="number"
            value={registration.tables_needed}
            onChange={(e) =>
              setRegistration({ ...registration, tables_needed: Number(e.target.value) })
            }
          />

          <Input
            label="Stühle"
            type="number"
            value={registration.chairs_needed}
            onChange={(e) =>
              setRegistration({ ...registration, chairs_needed: Number(e.target.value) })
            }
          />

          <Textarea
            label="Bemerkungen"
            value={registration.remarks}
            onChange={(e) =>
              setRegistration({ ...registration, remarks: e.target.value })
            }
          />

          <ActionButtons />
        </form>
      </Card>
    </PageWrapper>
  );
}

// Layout + Input components
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
      <Sidebar />
      <main className="flex-1">
        <Topbar />
        <div className="max-w-[800px] p-8">{children}</div>
      </main>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm text-muted">{label}</label>
      <input
        {...props}
        className="w-full rounded-md border p-2"
      />
    </div>
  );
}

function Textarea({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm text-muted">{label}</label>
      <textarea
        {...props}
        rows={3}
        className="w-full rounded-md border p-2"
      />
    </div>
  );
}

function ActionButtons() {
  return (
    <div className="flex gap-3 pt-4">
      <button
        type="submit"
        className="rounded-md bg-primary px-4 py-2 text-white"
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