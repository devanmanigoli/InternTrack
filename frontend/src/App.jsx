import { useEffect, useState } from "react";
import {
  BarChart3,
  BriefcaseBusiness,
  CalendarDays,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Sparkles,
  X
} from "lucide-react";

import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Navigate,
  useNavigate
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import Interviews from "./pages/Interviews";
import Resumes from "./pages/Resumes";
import JobMatch from "./pages/JobMatch";

import "./App.css";

function ProtectedLayout({ onLogout }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard
    },
    {
      name: "Applications",
      path: "/applications",
      icon: BriefcaseBusiness
    },
    {
      name: "Interviews",
      path: "/interviews",
      icon: CalendarDays
    },
    {
      name: "Resumes",
      path: "/resumes",
      icon: FileText
    },
    {
      name: "Job Match",
      path: "/job-match",
      icon: Sparkles
    }
  ];

  const handleLogout = () => {
    onLogout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="app-shell">
      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-header">
          <div className="brand">
            <div className="brand-icon">
              <BarChart3 size={21} />
            </div>

            <div>
              <h1>InternTrack</h1>
              <span>Career Command Center</span>
            </div>
          </div>

          <button
            className="mobile-close"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={21} />
          </button>
        </div>

        <nav className="navigation">
          <p className="nav-label">WORKSPACE</p>

          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `nav-item ${isActive ? "active" : ""}`
                }
              >
                <Icon size={19} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-user">
            <div className="avatar">
              {user?.name?.charAt(0)?.toUpperCase() || "D"}
            </div>

            <div className="sidebar-user-info">
              <strong>{user?.name || "Devanmani"}</strong>
              <span>{user?.email || "Student account"}</span>
            </div>
          </div>

          <button
            className="logout-button"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="main-content">
        <header className="topbar">
          <button
            className="mobile-menu"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={22} />
          </button>

          <div className="topbar-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search applications, companies..."
            />
          </div>

          <div className="topbar-right">
            <div className="status-indicator">
              <span className="status-dot" />
              <span>System Online</span>
            </div>

            <div className="topbar-avatar">
              {user?.name?.charAt(0)?.toUpperCase() || "D"}
            </div>
          </div>
        </header>

        <Routes>
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/applications"
            element={<Applications />}
          />

          <Route
            path="/interviews"
            element={<Interviews />}
          />

          <Route
            path="/resumes"
            element={<Resumes />}
          />

          <Route
            path="/job-match"
            element={<JobMatch />}
          />

          <Route
            path="*"
            element={
              <Navigate
                to="/dashboard"
                replace
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

function PublicLayout({ onAuthenticated }) {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    onAuthenticated();
    navigate("/dashboard", { replace: true });
  };

  const handleRegister = () => {
    onAuthenticated();
    navigate("/dashboard", { replace: true });
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <Login
            onLoginSuccess={handleLoginSuccess}
            onSwitchToRegister={() => navigate("/register")}
          />
        }
      />

      <Route
        path="/register"
        element={
          <Register
            onRegister={handleRegister}
            onSwitch={() => navigate("/login")}
          />
        }
      />

      <Route
        path="*"
        element={
          <Navigate
            to="/login"
            replace
          />
        }
      />
    </Routes>
  );
}

function App() {
  const [authenticated, setAuthenticated] = useState(
    Boolean(localStorage.getItem("token"))
  );

  useEffect(() => {
    document.title = authenticated
      ? "InternTrack"
      : "InternTrack | Sign In";
  }, [authenticated]);

  const handleAuthenticated = () => {
    setAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setAuthenticated(false);
  };

  return (
    <BrowserRouter>
      {authenticated ? (
        <Routes>
          <Route
            path="/*"
            element={
              <ProtectedLayout
                onLogout={handleLogout}
              />
            }
          />
        </Routes>
      ) : (
        <PublicLayout
          onAuthenticated={handleAuthenticated}
        />
      )}
    </BrowserRouter>
  );
}

export default App;