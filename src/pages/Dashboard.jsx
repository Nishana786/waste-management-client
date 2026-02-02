import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/* ✅ API URL (Vite) */
const API_URL = import.meta.env.VITE_API_URL;

/* 🔧 Notification normalize */
const normalizeNotification = (msg) =>
  msg.toLowerCase().replace(/\s+/g, "");

const Dashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const [stats, setStats] = useState({
    pendingReports: 0,
    pendingRequests: 0,
    notifications: [],
  });

  const [loading, setLoading] = useState(true);

  /* ❌ API_URL missing guard */
  useEffect(() => {
    if (!API_URL) {
      console.error("❌ VITE_API_URL is not defined");
      setLoading(false);
    }
  }, []);

  /* 🗑️ REMOVE NOTIFICATION (PERSISTENT) */
  const removeNotification = (msg) => {
    const key = normalizeNotification(msg);

    const dismissed =
      JSON.parse(localStorage.getItem("dismissed_notifications")) || [];

    localStorage.setItem(
      "dismissed_notifications",
      JSON.stringify([...dismissed, key])
    );

    setStats((prev) => ({
      ...prev,
      notifications: prev.notifications.filter(
        (n) => normalizeNotification(n) !== key
      ),
    }));
  };

  /* 🔄 FETCH DASHBOARD DATA */
  useEffect(() => {
    if (!token || !API_URL) {
      setLoading(false);
      return;
    }

    fetch(`${API_URL}/dashboard/stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.json();
      })
      .then((data) => {
        const dismissed =
          JSON.parse(localStorage.getItem("dismissed_notifications")) || [];

        const filteredNotifications =
          (data.notifications || []).filter(
            (msg) =>
              !dismissed.includes(normalizeNotification(msg))
          );

        setStats({
          pendingReports: data.pendingReports || 0,
          pendingRequests: data.pendingRequests || 0,
          notifications: filteredNotifications,
        });
      })
      .catch((err) => {
        console.error("Dashboard API error:", err);
        setStats({
          pendingReports: 0,
          pendingRequests: 0,
          notifications: [],
        });
      })
      .finally(() => setLoading(false));
  }, [token]);

  /* 🦴 SKELETON LOADER */
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-2 gap-6 mb-10">
          {[1, 2].map((i) => (
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
    <div className="max-w-6xl mx-auto p-6">
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Your activity & pending actions overview
        </p>
      </div>

      {/* 🔔 NOTIFICATIONS */}
      {stats.notifications.length > 0 && (
        <div className="mb-10 space-y-3">
          {stats.notifications.map((msg) => {
            const isError = msg.includes("❌");

            return (
              <div
                key={msg}
                className={`flex justify-between items-start p-4 rounded-xl border shadow-sm ${
                  isError
                    ? "bg-red-50 border-red-300 text-red-700"
                    : "bg-green-50 border-green-300 text-green-700"
                }`}
              >
                <p className="pr-4">{msg}</p>

                <button
                  type="button"
                  onClick={() => removeNotification(msg)}
                  className="w-7 h-7 flex items-center justify-center 
                             rounded-full bg-white border text-gray-700
                             hover:bg-gray-800 hover:text-white transition"
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* 📊 STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        <StatCard
          title="Pending Reports"
          value={stats.pendingReports}
          color="from-green-500 to-green-700"
        />
        <StatCard
          title="Pending Requests"
          value={stats.pendingRequests}
          color="from-blue-500 to-blue-700"
        />
      </div>

      {/* 🚀 ACTION BUTTONS */}
      <div className="flex flex-col sm:flex-row gap-4">
        <ActionButton
          label="Report Waste"
          color="bg-green-600 hover:bg-green-700"
          onClick={() => navigate("/report")}
        />
        <ActionButton
          label="Request Pickup"
          color="bg-blue-600 hover:bg-blue-700"
          onClick={() => navigate("/requests")}
        />
      </div>
    </div>
  );
};

/* ---------------- COMPONENTS ---------------- */

const StatCard = ({ title, value, color }) => (
  <div className="relative bg-white rounded-2xl shadow hover:shadow-lg transition p-6 overflow-hidden">
    <div
      className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${color}`}
    />
    <p className="text-gray-500 text-sm">
      {title}
    </p>
    <h2 className="text-3xl font-bold text-gray-800 mt-1">
      {value}
    </h2>
  </div>
);

const ActionButton = ({ label, color, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`${color} text-white px-6 py-3 rounded-xl font-semibold shadow hover:shadow-lg transition`}
  >
    {label}
  </button>
);

export default Dashboard;
