import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminCharts from "../../components/Admin/AdminCharts";

/* ✅ ENV BASED API URL */
const API_URL = import.meta.env.VITE_API_URL;

const SystemStats = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetch(`${API_URL}/admin/stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          navigate("/login");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) setStats(data);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        navigate("/login");
      });
  }, [token, navigate]);

  /* 🔄 LOADING */
  if (!stats) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-green-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-800">
          📊 System Statistics
        </h1>
        <p className="text-gray-500 mt-1">
          Overall system performance & analytics
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
        <Stat title="Total Reports" value={stats.totalReports} color="green" />
        <Stat title="Pending Reports" value={stats.pendingReports} color="yellow" />
        <Stat title="Approved Reports" value={stats.approvedReports} color="blue" />
        <Stat title="Rejected Reports" value={stats.rejectedReports} color="red" />
        <Stat title="Completed Reports" value={stats.completedReports} color="emerald" />

        <Stat title="Total Requests" value={stats.totalRequests} color="purple" />
        <Stat title="Pending Pickups" value={stats.pendingPickups} color="yellow" />
        <Stat title="Approved Requests" value={stats.approvedPickups} color="blue" />
        <Stat title="Rejected Requests" value={stats.rejectedPickups} color="red" />
        <Stat title="Completed Pickups" value={stats.completedPickups} color="emerald" />
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          📈 Visual Analytics
        </h2>
        <AdminCharts stats={stats} />
      </div>
    </div>
  );
};

/* ---------- STAT CARD ---------- */

const colorMap = {
  green: "bg-green-100 text-green-700",
  yellow: "bg-yellow-100 text-yellow-700",
  blue: "bg-blue-100 text-blue-700",
  red: "bg-red-100 text-red-700",
  purple: "bg-purple-100 text-purple-700",
  emerald: "bg-emerald-100 text-emerald-700",
};

const Stat = ({ title, value, color }) => (
  <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
    <div
      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${colorMap[color]}`}
    >
      {title}
    </div>
    <h2 className="text-3xl font-bold text-gray-800">
      {value ?? 0}
    </h2>
  </div>
);

export default SystemStats;
