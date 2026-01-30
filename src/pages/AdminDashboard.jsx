import { useEffect, useState } from "react";
import {
  Users,
  FileText,
  CheckCircle,
  ClipboardList,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import { API_URL } from "../services/config";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    fetch(`${API_URL}/admin/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, [token]);

  if (!stats) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Reports" value={stats.totalReports} icon={<FileText />} />
        <StatCard title="Pending Reports" value={stats.pendingReports} icon={<Users />} />
        <StatCard title="Total Requests" value={stats.totalRequests} icon={<ClipboardList />} />
        <StatCard title="Pending Pickups" value={stats.pendingPickups} icon={<CheckCircle />} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ActionCard title="Reports" path="/admin/reports" />
        <ActionCard title="Requests" path="/admin/requests" />
        <ActionCard title="Stats" path="/admin/stats" />
      </div>
    </div>
  );
};

export default AdminDashboard;

/* ===== Components ===== */

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded shadow flex items-center gap-4">
    <div className="text-green-600">{icon}</div>
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-xl font-bold">{value}</h2>
    </div>
    <TrendingUp className="ml-auto text-green-600" />
  </div>
);

const ActionCard = ({ title, path }) => (
  <Link to={path} className="bg-white p-6 rounded shadow hover:shadow-lg">
    <h3 className="font-semibold">{title}</h3>
  </Link>
);
