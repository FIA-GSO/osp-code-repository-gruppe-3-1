import { createFileRoute } from '@tanstack/react-router';

import { useEffect, useState } from 'react';

import Sidebar from '@/components/layout/sidebar';

import Topbar from '@/components/layout/topbar';

import Card from '@/components/ui/card';

import { useAuthStore } from '@/stores/auth';

import backgroundImage from '@/assets/background.png';


export const Route = createFileRoute(

    '/dashboard-user/bearbeiten/vortrag/$registrationID',

)({


    // beforeLoad: () => {

    //   const role = useAuthStore.getState().user?.role;

    //   if (role !== 'user') {

    //     throw new Error('Unauthorized');

    //   }

    // },

    component: RouteComponent,

});

function RouteComponent() {


    const { registrationID } = Route.useParams();

    const [lecture, setLecture] = useState(null);

    const [isLoading, setIsLoading] = useState(true);



    useEffect(() => {

        const fetchedLecture = {

            id: 3,

            registration_id: Number(registrationID),

            title: 'KI in der Ausbildung',

            description: 'Einführung in den Einsatz von KI im Ausbildungsalltag',

            speaker: 'Max Müller',

            required_tech: 'Beamer',

            preferred_time: '2026-03-15 10:00',

        };

        setLecture(fetchedLecture);

        setIsLoading(false);

    }, [registrationID]);



    const handleSubmit = (e) => {

        e.preventDefault();

        console.log('Vortrag gespeichert', lecture);

    };

    if (isLoading || !lecture) {

        return (
            <div className="flex min-h-screen items-center justify-center">

                Lade Daten…
            </div>

        );

    }

    return (
        <PageWrapper>
            <h1 className="mb-6 text-xl font-semibold">

                Vortrag bearbeiten
            </h1>

            <Card title="Vortragsdaten">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input

                        label="Titel"

                        defaultValue={lecture.title}

                    />

                    <Textarea

                        label="Beschreibung"

                        defaultValue={lecture.description}

                    />

                    <Input

                        label="Referent"

                        defaultValue={lecture.speaker}

                    />

                    <Input

                        label="Benötigte Technik"

                        defaultValue={lecture.required_tech}

                    />

                    <Input

                        label="Wunschzeitpunkt"

                        defaultValue={lecture.preferred_time}

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
