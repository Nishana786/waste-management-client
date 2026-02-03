import { useEffect, useState } from "react";
import {
  CheckCircle,
  XCircle,
  Trash2,
  Clock,
  MapPin,
  FileText,
} from "lucide-react";
import api from "../services/api";

/* STATUS STYLES */
const statusStyle = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

const AdminReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const res = await api.get("/admin/reports");
      setReports(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const action = async (id, type) => {
    await api.put(`/admin/reports/${id}/${type}`);
    fetchReports();
  };

  const remove = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    await api.delete(`/admin/reports/${id}`);
    fetchReports();
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-16 mb-4 bg-gray-200 rounded-xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="overflow-x-auto bg-white rounded-2xl shadow">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr className="text-sm uppercase text-gray-600">
              <th className="p-4 text-left">Issue</th>
              <th className="p-4 text-left">Location</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Actions</th>
              <th className="p-4 text-left">Photo</th>

            </tr>
          </thead>

          <tbody>
            {reports.map((r) => (
              <tr key={r.id} className="border-t hover:bg-gray-50">
                {/* ISSUE */}
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <FileText size={16} className="text-gray-400" />
                    {r.issueType}
                  </div>
                </td>

                {/* LOCATION */}
                <td className="p-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={16} />
                    {r.location}
                  </div>
                </td>

                {/* STATUS */}
                <td className="p-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${statusStyle[r.status]}`}
                  >
                    {r.status}
                  </span>
                </td>

                {/* ACTIONS */}
                <td className="p-4 text-center">
                  <div className="flex justify-center gap-2">
                    {r.status === "pending" && (
                      <>
                        <ActionBtn
                          onClick={() => action(r.id, "approve")}
                          color="bg-green-600 hover:bg-green-700"
                          icon={<CheckCircle size={16} />}
                          label="Approve"
                        />
                        <ActionBtn
                          onClick={() => action(r.id, "reject")}
                          color="bg-red-600 hover:bg-red-700"
                          icon={<XCircle size={16} />}
                          label="Reject"
                        />
                      </>
                    )}

                    {r.status === "approved" && (
                      <ActionBtn
                        onClick={() => action(r.id, "complete")}
                        color="bg-blue-600 hover:bg-blue-700"
                        icon={<Clock size={16} />}
                        label="Complete"
                      />
                    )}

                    {(r.status === "completed" ||
                      r.status === "rejected") && (
                      <ActionBtn
                        onClick={() => remove(r.id)}
                        color="bg-gray-800 hover:bg-black"
                        icon={<Trash2 size={16} />}
                        label="Delete"
                      />
                    )}
                  </div>
                </td>
                <td className="p-4">
  {r.photo ? (
    <img
    src={r.photo} 
      alt="report"
      className="w-16 h-16 object-cover rounded-lg border"
    />
  ) : (
    <span className="text-gray-400 text-sm">No Image</span>
  )}
</td>

              </tr>
            ))}

            {reports.length === 0 && (
              <tr>
                <td colSpan="4" className="p-6 text-center text-gray-500">
                  No reports found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ActionBtn = ({ onClick, color, icon, label }) => (
  <button
    onClick={onClick}
    className={`${color} text-white px-3 py-2 rounded-lg text-sm flex items-center gap-1`}
  >
    {icon}
    {label}
  </button>
);

export default AdminReports;
