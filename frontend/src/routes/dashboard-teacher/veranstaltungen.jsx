import { createFileRoute } from '@tanstack/react-router'; import Sidebar from '@/components/layout/sidebar'; import Topbar from '@/components/layout/topbar'; import Card from '@/components/ui/card'; 
import backgroundImage from '@/assets/Background.png'
import { Link } from '@tanstack/react-router';
export const Route = createFileRoute('/dashboard-teacher/veranstaltungen')({
  // beforeLoad: () => {
  //   const role = useAuthStore.getState().user?.role;
  //   if (role !== 'teacher') {
  //     throw new Error('Unauthorized');
  //   }
  // },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex min-h-screen bg-cover bg-center" style={{
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
        <div className="max-w-[1100px] p-8">
          <h1 className="mb-6">Lehrer – Veranstaltungen</h1>
          <Card title="Veranstaltungen verwalten">
            <div className="block overflow-x-auto md:table md:w-full">
              <table
                className="w-full border-separate"
                style={{ borderSpacing: '0 8px' }}
              >
                <thead>
                  <tr>
                    <th className="p-3 text-left text-[13px] text-muted">
                      Veranstaltung
                    </th>
                    <th className="p-3 text-left text-[13px] text-muted">
                      Schule
                    </th>
                    <th className="p-3 text-left text-[13px] text-muted">
                      Status
                    </th>
                    <th className="p-3 text-left text-[13px] text-muted">
                      Aktion
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="bg-[#fafbfc]">
                    <td className="cursor-pointer p-3 text-primary">
                      Tag der Ausbildung 2026
                    </td>
                    <td className="p-3">GSO Köln</td>
                    <td className="p-3">
                      <span className="text-success-text font-medium">
                        Offen
                      </span>
                    </td>
                    <td className="p-3">
                      <button className="rounded-md bg-[#f1f3f6] px-3 py-1.5 hover:bg-[#e5e9ef]">
                        Sperren
                      </button>
                    </td>
                  </tr>

                  <tr className="bg-[#fafbfc]">
                    <td className="cursor-pointer p-3 text-primary">
                      Karrieretag IT 2026
                    </td>
                    <td className="p-3">Berufskolleg Südstadt</td>
                    <td className="p-3">
                      <span className="text-error-text font-medium">
                        Gesperrt
                      </span>
                    </td>
                    <td className="p-3">
                      <button className="rounded-md bg-[#f1f3f6] px-3 py-1.5 hover:bg-[#e5e9ef]">
                        Entsperren
                      </button>
                    </td>
                  </tr>

                  <tr className="bg-[#fafbfc]">
                    <td className="cursor-pointer p-3 text-primary">
                      Jobmesse Südstadt 2025
                    </td>
                    <td className="p-3">BK Südstadt</td>
                    <td className="p-3">
                      <span className="text-success-text font-medium">
                        Offen
                      </span>
                    </td>
                    <td className="p-3">
                      <button className="rounded-md bg-[#f1f3f6] px-3 py-1.5 hover:bg-[#e5e9ef]">
                        Sperren
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
