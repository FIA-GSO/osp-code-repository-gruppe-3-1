import { useNavigate } from "@tanstack/react-router";
import logo from '../assets/avatar.jpg'
export default function Topbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate({ to: "/login" });
  };

  return (
    <header className="topbar">
      <div className="topbar-right">
        <div className="notification">
          🔔 <span className="badge">2</span>
        </div>

        <div className="user-menu">
          <img src={logo} alt="User" />
          <span>Max Müller</span>
          <button className="logout-btn" onClick={handleLogout}>
            Abmelden
          </button>
        </div>
      </div>
    </header>
  );
}