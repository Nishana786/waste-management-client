import { useEffect, useState } from "react";
import {
  CheckCircle,
  XCircle,
  Trash2,
  Clock,
  MapPin,
  Recycle,
} from "lucide-react";
import api from "../services/api";

/* 🎨 STATUS BADGE STYLES */
const statusStyle = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

const AdminRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await api.get("/admin/requests");
      setRequests(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const action = async (id, type) => {
    await api.put(`/admin/requests/${id}/${type}`);
    fetchRequests();
  };

  const remove = async (id) => {
    if (!window.confirm("Are you sure you want to delete this request?")) return;
    await api.delete(`/admin/requests/${id}`);
    fetchRequests();
  };

  /* 🦴 SKELETON LOADER */
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-16 mb-4 rounded-xl bg-gray-200 animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Pickup Requests
        </h1>
        <p className="text-gray-500 mt-2">
          Manage waste pickup requests and status updates
        </p>
      </div>

      {/* 📋 TABLE */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr className="text-gray-600 text-sm uppercase">
              <th className="p-4 text-left">Waste</th>
              <th className="p-4 text-left">Address</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((r) => (
              <tr
                key={r.id}
                className="border-t hover:bg-gray-50 transition"
              >
                {/* WASTE TYPE */}
                <td className="p-4 flex items-center gap-2">
                  <Recycle size={18} className="text-gray-400" />
                  {r.wasteType}
                </td>

                {/* ADDRESS */}
                <td className="p-4 flex items-center gap-2 text-gray-600">
                  <MapPin size={16} />
                  {r.address}
                </td>

                {/* STATUS */}
                <td className="p-4 text-center">
                  <span
                    className={`px-3 py-1 text-sm rounded-full font-medium ${statusStyle[r.status]}`}
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
              </tr>
            ))}

            {requests.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="p-6 text-center text-gray-500"
                >
                  No pickup requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* ---------------- BUTTON ---------------- */

const ActionBtn = ({ onClick, color, icon, label }) => (
  <button
    onClick={onClick}
    className={`${color} text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1 shadow hover:shadow-lg transition`}
  >
    {icon}
    {label}
  </button>
);

export default AdminRequests;
