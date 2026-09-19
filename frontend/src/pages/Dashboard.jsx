import { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  CalendarDays,
  FileText,
  Sparkles
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { getDashboard } from "../services/dashboardService";

function Dashboard() {
  const [dashboard, setDashboard] = useState({
    totalApplications: 0,
    applied: 0,
    interviewing: 0,
    selected: 0,
    rejected: 0,
    totalInterviews: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await getDashboard();
        setDashboard(data);
      } catch (error) {
        console.error("Failed to load dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const applicationData = [
    {
      status: "Applied",
      count: dashboard.applied
    },
    {
      status: "Interviewing",
      count: dashboard.interviewing
    },
    {
      status: "Selected",
      count: dashboard.selected
    },
    {
      status: "Rejected",
      count: dashboard.rejected
    }
  ];

  return (
    <section className="page-content">
      <div className="welcome-section">
        <div>
          <p className="eyebrow">YOUR CAREER DASHBOARD</p>

          <h2>
            Welcome back, {user?.name?.split(" ")[0] || "Devanmani"}.
          </h2>

          <p className="welcome-text">
            Track applications, manage interviews and optimize your
            internship search from one place.
          </p>
        </div>

        <div className="date-card">
          <CalendarDays size={18} />

          <div>
            <span>Today</span>

            <strong>
              {new Date().toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric"
              })}
            </strong>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">
            <BriefcaseBusiness size={20} />
          </div>

          <div>
            <span>Total Applications</span>
            <strong>
              {loading ? "..." : dashboard.totalApplications}
            </strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple">
            <CalendarDays size={20} />
          </div>

          <div>
            <span>Interviews</span>
            <strong>
              {loading ? "..." : dashboard.totalInterviews}
            </strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">
            <Sparkles size={20} />
          </div>

          <div>
            <span>Selected</span>
            <strong>
              {loading ? "..." : dashboard.selected}
            </strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">
            <FileText size={20} />
          </div>

          <div>
            <span>Rejected</span>
            <strong>
              {loading ? "..." : dashboard.rejected}
            </strong>
          </div>
        </div>
      </div>

      <div className="content-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">APPLICATION ANALYTICS</p>
              <h3>Application Status</h3>
            </div>
          </div>

          <div className="dashboard-chart">
            {loading ? (
              <div className="empty-state">
                Loading analytics...
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart
                  data={applicationData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: -20,
                    bottom: 5
                  }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.08)"
                  />

                  <XAxis
                    dataKey="status"
                    stroke="#8b93a7"
                  />

                  <YAxis
                    allowDecimals={false}
                    stroke="#8b93a7"
                  />

                  <Tooltip
                    cursor={{ fill: "rgba(255,255,255,0.04)" }}
                    contentStyle={{
                      background: "#111827",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "10px",
                      color: "#edf0f7"
                    }}
                  />

                  <Bar
                    dataKey="count"
                    name="Applications"
                    fill="#7c5cff"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">APPLICATION PIPELINE</p>
              <h3>Application Overview</h3>
            </div>
          </div>

          <div className="pipeline-grid">
            <div>
              <span>Applied</span>
              <strong>{dashboard.applied}</strong>
            </div>

            <div>
              <span>Interviewing</span>
              <strong>{dashboard.interviewing}</strong>
            </div>

            <div>
              <span>Selected</span>
              <strong>{dashboard.selected}</strong>
            </div>

            <div>
              <span>Rejected</span>
              <strong>{dashboard.rejected}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="content-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">INTERVIEW ACTIVITY</p>
              <h3>Interview Summary</h3>
            </div>
          </div>

          <div className="dashboard-interview">
            <div className="dashboard-interview-icon">
              <CalendarDays size={22} />
            </div>

            <div>
              <strong>{dashboard.totalInterviews}</strong>
              <span>Total interviews scheduled</span>
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">CAREER PROGRESS</p>
              <h3>Selection Rate</h3>
            </div>
          </div>

          <div className="dashboard-progress">
            <strong>
              {dashboard.totalApplications === 0
                ? 0
                : Math.round(
                    (dashboard.selected /
                      dashboard.totalApplications) *
                      100
                  )}
              %
            </strong>

            <span>
              Applications converted into selections
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;