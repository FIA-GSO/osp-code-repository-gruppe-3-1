import { createFileRoute } from '@tanstack/react-router';

import { useEffect, useState } from 'react';
 
import Sidebar from '@/components/layout/sidebar';

import Topbar from '@/components/layout/topbar';

import Card from '@/components/ui/card';

import backgroundImage from '@/assets/background.png';
 
/**

* Route: Infostand bearbeiten

* DB-Grundlage: registration

*/

export const Route = createFileRoute(

  '/dashboard-user/bearbeiten/infostand/$registrationID',

)({


//   beforeLoad: () => {

//     const role = useAuthStore.getState().user?.role;

//     if (role !== 'user') {

//       throw new Error('Unauthorized');

//     }

//   },

  component: RouteComponent,

});
 
function RouteComponent() {

  const { registrationID } = Route.useParams();
 
  const [registration, setRegistration] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
 


  useEffect(() => {

    const fetchedRegistration = {

      id: Number(registrationID),

      event_id: 2,

      status_id: 1,

      with_lecture: false,

      tables_needed: 2,

      chairs_needed: 4,

      remarks: 'Stromanschluss benötigt',

    };
 
    setRegistration(fetchedRegistration);

    setIsLoading(false);

  }, [registrationID]);


  const handleSubmit = (e) => {

    e.preventDefault();

    console.log('Infostand gespeichert', registration);

  };
 
  if (isLoading || !registration) {

    return (
<div className="flex min-h-screen items-center justify-center">

        Lade Daten…
</div>

    );

  }
 
  return (
<PageWrapper>
<h1 className="mb-6 text-xl font-semibold">

        Infostand bearbeiten
</h1>
 
      <Card title="Infostand-Antrag">
<form onSubmit={handleSubmit} className="space-y-4">
<Input

            label="Tische"

            type="number"

            defaultValue={registration.tables_needed}

          />
 
          <Input

            label="Stühle"

            type="number"

            defaultValue={registration.chairs_needed}

          />
 
          <Textarea

            label="Bemerkungen"

            defaultValue={registration.remarks}

          />
 
          <ActionButtons />
</form>
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
 
function Input({ label, ...props }) {

  return (
<div>
<label className="block text-sm text-muted">

        {label}
</label>
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
<label className="block text-sm text-muted">

        {label}
</label>
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
 