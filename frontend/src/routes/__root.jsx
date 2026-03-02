import { createRootRoute, Outlet } from "@tanstack/react-router";
import { useState } from "react"
import Sidebar from '@/components/layout/sidebar';
import Topbar from '@/components/layout/topbar';
import { getUserId } from "../api/authApi";

function RootLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="app-layout">
      {getUserId() !== 0 && (
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      )}

      <div className="main-content">
        {getUserId() !== 0 && (
          <Topbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        )}

        <Outlet />
      </div>
    </div>
  );
}

export const Route = createRootRoute({ component: RootLayout });
