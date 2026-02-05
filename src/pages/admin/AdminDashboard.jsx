import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  FileText,
  ClipboardList,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import api from "../../services/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/admin/dashboard")
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  /* 🔄 Loading Skeleton */
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-28 rounded-xl bg-gray-200 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
          Overview of reports, requests & pickups
        </p>
      </div>

      {/* 📊 STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Stat
          title="Total Reports"
          value={stats.totalReports}
          icon={<FileText />}
          color="from-indigo-500 to-indigo-700"
        />
        <Stat
          title="Pending Reports"
          value={stats.pendingReports}
          icon={<Users />}
          color="from-yellow-500 to-yellow-700"
        />
        <Stat
          title="Total Requests"
          value={stats.totalRequests}
          icon={<ClipboardList />}
          color="from-blue-500 to-blue-700"
        />
        <Stat
          title="Pending Pickups"
          value={stats.pendingPickups}
          icon={<CheckCircle />}
          color="from-green-500 to-green-700"
        />
      </div>

      {/* 🚀 QUICK ACTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <LinkCard
          title="Manage Reports"
          description="View & process waste reports"
          to="/admin/reports"
        />
        <LinkCard
          title="Pickup Requests"
          description="Approve or reject requests"
          to="/admin/requests"
        />
        <LinkCard
          title="Statistics"
          description="System analytics & insights"
          to="/admin/stats"
        />
      </div>
    </div>
  );
};

/* ---------------- COMPONENTS ---------------- */

const Stat = ({ title, value, icon, color }) => (
  <div className="relative bg-white rounded-2xl shadow hover:shadow-xl transition p-6 overflow-hidden">
    <div
      className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${color}`}
    />
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-100 text-gray-700">
        {icon}
      </div>
      <div>
        <p className="text-gray-500 text-sm">
          {title}
        </p>
        <h2 className="text-2xl font-bold text-gray-800">
          {value}
        </h2>
      </div>
    </div>
  </div>
);

const LinkCard = ({ title, description, to }) => (
  <Link
    to={to}
    className="group bg-white rounded-2xl shadow p-6 hover:shadow-xl transition flex flex-col justify-between"
  >
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-1">
        {title}
      </h3>
      <p className="text-sm text-gray-500">
        {description}
      </p>
    </div>

    <div className="flex items-center gap-2 mt-6 text-blue-600 font-medium group-hover:translate-x-1 transition">
      View
      <ArrowRight size={18} />
    </div>
  </Link>
);

export default AdminDashboard;
