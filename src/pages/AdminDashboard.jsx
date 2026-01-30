import { useEffect, useState } from "react";
import {
  Users,
  FileText,
  CheckCircle,
  ClipboardList,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    fetch(`${API_URL}/admin/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(() =>
        alert("Failed to load admin dashboard")
      );
  }, [token]);

  /* 🦴 SKELETON LOADER */
  if (!stats) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-28 bg-gray-200 animate-pulse rounded-xl"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            System overview & real-time controls
          </p>
        </div>

        <p className="text-xs text-gray-400 mt-2 sm:mt-0">
          Last updated: {new Date().toLocaleTimeString()}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
        <StatCard
          title="Total Reports"
          value={stats.totalReports}
          subtitle="All submitted issues"
          icon={<FileText size={26} />}
          color="from-green-500 to-green-700"
        />

        <StatCard
          title="Pending Reports"
          value={stats.pendingReports}
          subtitle="Needs admin action"
          icon={<Users size={26} />}
          color="from-yellow-400 to-yellow-600"
        />

        <StatCard
          title="Total Requests"
          value={stats.totalRequests}
          subtitle="Pickup requests"
          icon={<ClipboardList size={26} />}
          color="from-purple-500 to-purple-700"
        />

        <StatCard
          title="Pending Pickups"
          value={stats.pendingPickups}
          subtitle="To be scheduled"
          icon={<CheckCircle size={26} />}
          color="from-blue-500 to-blue-700"
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-5">
          ⚡ Quick Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ActionCard
            title="Manage Reports"
            desc="Review, approve or reject reports"
            path="/admin/reports"
          />
          <ActionCard
            title="Pickup Requests"
            desc="Assign & complete pickups"
            path="/admin/requests"
          />
          <ActionCard
            title="System Analytics"
            desc="Charts, trends & performance"
            path="/admin/stats"
          />
        </div>
      </div>
    </div>
  );
}

/* ---------------- Components ---------------- */

const StatCard = ({
  title,
  value,
  subtitle,
  icon,
  color,
}) => (
  <div className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 overflow-hidden">
    <div
      className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${color}`}
    />

    <div className="flex items-center gap-4">
      <div
        className={`bg-gradient-to-br ${color} text-white p-4 rounded-xl`}
      >
        {icon}
      </div>

      <div className="flex-1">
        <p className="text-gray-500 text-sm">
          {title}
        </p>
        <h2 className="text-3xl font-bold text-gray-800">
          {value}
        </h2>
        <p className="text-xs text-gray-400">
          {subtitle}
        </p>
      </div>

      <TrendingUp className="text-green-500" />
    </div>
  </div>
);

const ActionCard = ({ title, desc, path }) => (
  <Link
    to={path}
    className="group bg-white rounded-2xl shadow p-6 hover:shadow-xl hover:-translate-y-1 transition block"
  >
    <h3 className="text-lg font-semibold mb-1 text-gray-800 group-hover:text-blue-600">
      {title}
    </h3>
    <p className="text-sm text-gray-500">
      {desc}
    </p>
  </Link>
);
