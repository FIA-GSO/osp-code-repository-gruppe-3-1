import { Link } from '@tanstack/react-router';

import logo from '@/assets/Logo-GSO3.png'
import { useTranslation } from 'react-i18next';
import { getUserRole } from '@/api/authApi';

/**

* Zentrale Sidebar

* – eine Sidebar für alle Rollen

* – Navigation wird rollenabhängig angezeigt

*/

export default function Sidebar() {


    return (
        <aside className="w-[230px] bg-primary text-white"
            style={{
                justifyItems:
                    `center`
                ,
            }}>

            {/* Logo */}
            < div className="p-6 text-center" >
                <img src={logo} alt="GSO Köln Marketplace" className="mx-auto w-[100%]" />
            </div >

            {/* Navigation */}
            < nav className="flex flex-col" >

                {/* ================= USER ================= */}

                {
                   getUserRole() === 'user' || getUserRole() === 'admin' &&
                    (
                        <SidebarLink

                            to="/dashboard-user"

                            label="Dashboard"

                        />

                    )
                }

                {/* ================= LEHRER ================= */}

                {
                   getUserRole() === 'teacher' || getUserRole() === 'admin' && 
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
                   getUserRole() === 'helper' || getUserRole() === 'admin' && 
                    (
                        <SidebarLink

                            to="/dashboardHelper"

                            label="Helfer Dashboard"

                        />

                    )
                }
            </nav >
        </aside >

    );

}

/**

* Einheitlicher Sidebar-Link

* – Active-State über TanStack Router

* – vermeidet doppeltes Styling

*/

function SidebarLink({ to, label }) {
    return (
        <Link to={to} className={({ isActive }) => `px-6 py-3 text-white no-underline${isActive ? 'bg-white/20' : 'hover:bg-white/10'}`}>
            {label}
        </Link>

    );

}
