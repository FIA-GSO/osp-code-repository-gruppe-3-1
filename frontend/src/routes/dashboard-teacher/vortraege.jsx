import { createFileRoute } from '@tanstack/react-router'; import Sidebar from '@/components/layout/sidebar'; import Topbar from '@/components/layout/topbar'; import StatusCard from '@/components/ui/status-card'; import Card from '@/components/ui/card'; import { useAuthStore } from '@/stores/auth';
import backgroundImage from '@/assets/Background.png'
export const Route = createFileRoute('/dashboard-teacher/vortraege')({
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
      backgroundImage: `linear-gradient(rgba(255,255,255,.75),rgba(255,255,255,.75)),   url(${backgroundImage})   `
    }}
    >
      <Sidebar />
      <main className="flex-1">
        <Topbar />
        <div className="max-w-[1100px] p-8">
          <h1 className="mb-6">Lehrer – Vorträge</h1>
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <StatusCard label="Angenommen" count={1} type="success" />
            <StatusCard label="Offen" count={1} type="warning" />
            <StatusCard label="Abgelehnt" count={1} type="danger" />
          </div>
          <Card title="Alle Vorträge">
            <div className="block overflow-x-auto md:table md:w-full">
              <table
                className="w-full border-separate"
                style={{ borderSpacing: '0 8px' }}
              >
                <thead>
                  <tr>
                    <th className="p-3 text-left text-[13px] text-muted">
                      Titel
                    </th>
                    <th className="p-3 text-left text-[13px] text-muted">
                      Veranstaltung
                    </th>
                    <th className="p-3 text-left text-[13px] text-muted">
                      Status
                    </th>
                    <th className="p-3 text-left text-[13px] text-muted">
                      Aktionen
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="bg-[#fafbfc]">
                    <td className="cursor-pointer p-3 text-primary">
                      KI in der Ausbildung
                    </td>
                    <td className="p-3">Tag der Ausbildung 2026</td>
                    <td className="p-3 text-warning-text">
                      ⏳ Offen
                    </td>
                    <td className="p-3">
                      <button className="mr-2 rounded-md bg-[#f1f3f6] px-3 py-1.5 hover:bg-[#e5e9ef]">
                        ✔
                      </button>
                      <button className="mr-2 rounded-md bg-[#f1f3f6] px-3 py-1.5 hover:bg-[#e5e9ef]">
                        ✖
                      </button>
                      <button className="rounded-md bg-[#f1f3f6] px-3 py-1.5 hover:bg-[#e5e9ef]">
                        Details
                      </button>
                    </td>
                  </tr>

                  <tr className="bg-[#fafbfc]">
                    <td className="cursor-pointer p-3 text-primary">
                      Cloud Basics
                    </td>
                    <td className="p-3">Karrieretag IT 2026</td>
                    <td className="p-3 text-success-text">
                      ✔ Angenommen
                    </td>
                    <td className="p-3">
                      <button className="rounded-md bg-[#f1f3f6] px-3 py-1.5 hover:bg-[#e5e9ef]">
                        Details
                      </button>
                    </td>
                  </tr>

                  <tr className="bg-[#fafbfc]">
                    <td className="cursor-pointer p-3 text-primary">
                      IT-Security Grundlagen
                    </td>
                    <td className="p-3">Jobmesse Südstadt 2025</td>
                    <td className="p-3 text-error-text">
                      ✖ Abgelehnt
                    </td>
                    <td className="p-3">
                      <button className="rounded-md bg-[#f1f3f6] px-3 py-1.5 hover:bg-[#e5e9ef]">
                        Details
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
