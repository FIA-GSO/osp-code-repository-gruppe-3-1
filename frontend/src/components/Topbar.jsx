import { useNavigate } from "@tanstack/react-router";
import { logout as logoutApi } from "../api/authApi"; 
import logo from '../assets/avatar.jpg'
export default function Topbar() {
  const navigate = useNavigate();

const handleLogout = async () => {
    try {
      await logoutApi();
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      localStorage.removeItem("name");
      localStorage.removeItem("userId");
      navigate({ to: "/login" });
    }
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