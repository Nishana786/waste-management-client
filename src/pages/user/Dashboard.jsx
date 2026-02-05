import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import {Bell,FileText,ClipboardList,Loader2,X,Activity,} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    pendingReports: 0,
    pendingRequests: 0,
    
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/dashboard/stats")
      .then((res) => setStats(res.data))
      .catch(() => navigate("/login"))
      .finally(() => setLoading(false));
  }, [navigate]);


  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-10 h-10 animate-spin text-emerald-600" />
          <p className="text-sm text-gray-500 animate-pulse">
            Loading ...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-10">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Real-time system overview
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Activity className="w-4 h-4 text-emerald-600 animate-pulse" />
          System running normally
        </div>
      </div>

      
      

      {/* 📊 STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pending Reports */}
        <div
          className="relative overflow-hidden
                     rounded-3xl p-6
                     bg-gradient-to-br from-blue-50 to-blue-100
                     shadow-lg hover:shadow-2xl transition"
        >
          <div className="absolute -right-6 -top-6 opacity-10">
            <FileText size={120} />
          </div>

          <div className="flex items-center gap-5">
            <div className="p-4 rounded-2xl bg-blue-600 text-white shadow">
              <FileText />
            </div>

            <div>
              <p className="text-sm text-blue-700">
                Pending Reports
              </p>
              <h2 className="text-4xl font-bold text-blue-900">
                {stats.pendingReports}
              </h2>

              <div className="mt-2 h-2 w-40 bg-blue-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all"
                  style={{
                    width: `${Math.min(
                      stats.pendingReports * 10,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pending Requests */}
        <div
          className="relative overflow-hidden
                     rounded-3xl p-6
                     bg-gradient-to-br from-yellow-50 to-yellow-100
                     shadow-lg hover:shadow-2xl transition"
        >
          <div className="absolute -right-6 -top-6 opacity-10">
            <ClipboardList size={120} />
          </div>

          <div className="flex items-center gap-5">
            <div className="p-4 rounded-2xl bg-yellow-500 text-white shadow">
              <ClipboardList />
            </div>

            <div>
              <p className="text-sm text-yellow-700">
                Pending Requests
              </p>
              <h2 className="text-4xl font-bold text-yellow-900">
                {stats.pendingRequests}
              </h2>

              <div className="mt-2 h-2 w-40 bg-yellow-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-500 transition-all"
                  style={{
                    width: `${Math.min(
                      stats.pendingRequests * 10,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
