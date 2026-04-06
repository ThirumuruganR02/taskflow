import { LogOut, CheckSquare } from "lucide-react";
import { clearAuth, getUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Layout({ children }) {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  return (
    <div className="app-shell">
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
          <small>{user?.email || ""}</small>
        </div>

        <button className="ghost-btn logout-btn" onClick={handleLogout}>
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      <main className="main-content">{children}</main>
    </div>
  );
}