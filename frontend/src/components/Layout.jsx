import { LogOut, CheckSquare } from "lucide-react";
import { clearAuth, getUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Layout({ children }) {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    clearAuth();
    navigate("/login", { replace: true });
    window.location.reload();
  };

  return (
    <div className="app-shell">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand">
          <CheckSquare size={28} />
          <div>
            <h1>TaskFlow</h1>
            <p>Smart task workspace</p>
          </div>
        </div>

        <div className="user-box">
          <span className="label">Signed in as</span>
          <strong>{user?.username || "User"}</strong>
          <small>{user?.email || "No email available"}</small>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Topbar with logout */}
        <div className="mobile-topbar">
          <div className="mobile-brand">
            <CheckSquare size={22} />
            <span>TaskFlow</span>
          </div>

          <button
            type="button"
            className="ghost-btn logout-btn mobile-logout"
            onClick={handleLogout}
            title="Logout"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>

        {children}
      </main>
    </div>
  );
}