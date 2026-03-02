import { Link } from '@tanstack/react-router';
import logo from '@/assets/Logo-GSO3.png'
import { getUserRole } from '@/api/authApi';

import { useEffect, useRef } from "react";
 
export default function Sidebar({ open, setOpen }) {
  const sidebarRef = useRef(null);
 
  useEffect(() => {
    function handleClickOutside(event) {
      const isMobile = window.innerWidth <= 768;
 
      if (
        isMobile &&
        open &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }
 
    document.addEventListener("mousedown", handleClickOutside);
 
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, setOpen]);
 
  return (
<div
      ref={sidebarRef}
      className={`sidebar ${open ? "open" : ""}`}
>
                    <button className="mobile-close" onClick={() => setOpen(false)}>✕</button>
        <aside className="w-[250px] bg-primary text-white"
            style={{
                justifyItems:
                    `center`
                ,
                height: "stretch",
            }}>

            {/* Logo */}
            < div className="p-6 text-center" >
                <img src={logo} alt="GSO Köln Marketplace" className="mx-auto w-[100%]" />
            </div >

            {/* Navigation */}
            < nav className="flex flex-col" >

                {/* ================= USER ================= */}
                {
                  (getUserRole() === 'user' || getUserRole() === 'admin') &&
                    (
                        <SidebarLink
                            to="/dashboard-user"
                            label="Dashboard"
                        />
                    )
                }

                {/* ================= LEHRER ================= */}
                {
                   (getUserRole() === 'teacher' || getUserRole() === 'admin') && 
                    (
                        <>
                            <SidebarLink
                                to="/dashboard-teacher/registrierungen"
                                label="Registrierungen"
                            />
                            <SidebarLink
                                to="/dashboard-teacher/veranstaltungen"
                                label="Veranstaltungen"
                            />
                        </>

                    )
                }

                {/* ================= HELFER ================= */}
                {
                   (getUserRole() === 'helper' || getUserRole() === 'admin') && 
                    (
                        <SidebarLink
                            to="/dashboardHelper"
                            label="Helfer Dashboard"
                        />
                    )
                }
            </nav >
        </aside >
</div>
    );
}

function SidebarLink({ to, label }) {
    return (
        <Link to={to} className={({ isActive }) => `px-6 py-3 text-white no-underline${isActive ? 'bg-white/20' : 'hover:bg-white/10'}`}>
            {label}
        </Link>

    );

}
