import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

/* 🔹 Status badge styles */
const statusStyle = {
  pending:
    "bg-yellow-100 text-yellow-800 border-yellow-300",
  approved:
    "bg-blue-100 text-blue-800 border-blue-300",
  completed:
    "bg-green-100 text-green-800 border-green-300",
  rejected:
    "bg-red-100 text-red-800 border-red-300",
};

const AdminRequests = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ---------------- FETCH ----------------
  const fetchRequests = useCallback(async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_URL}/admin/requests`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        localStorage.clear();
        navigate("/login");
        return;
      }

      const data = await res.json();
      setRequests(data || []);
    } catch {
      setError("Pickup requests load cheyyan pattiyilla");
    } finally {
      setLoading(false);
    }
  }, [navigate, token]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  // ---------------- ACTIONS ----------------
  const handleAction = async (id, action) => {
    try {
      await fetch(
        `${API_URL}/admin/requests/${id}/${action}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRequests((prev) =>
        prev.map((r) =>
          r.id === id
            ? {
                ...r,
                status:
                  action === "approve"
                    ? "approved"
                    : action === "complete"
                    ? "completed"
                    : "rejected",
              }
            : r
        )
      );
    } catch {
      alert("Action failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this request?")) return;

    try {
      await fetch(`${API_URL}/admin/requests/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRequests((prev) =>
        prev.filter((r) => r.id !== id)
      );
    } catch {
      alert("Delete failed");
    }
  };

  // ---------------- UI ----------------
  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-red-600 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Pickup Requests
      </h1>

      <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Waste</th>
              <th className="p-3 text-left">Address</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Slot</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.length === 0 && (
              <tr>
                <td
                  colSpan="8"
                  className="text-center py-6 text-gray-500"
                >
                  No pickup requests found
                </td>
              </tr>
            )}

            {requests.map((r) => {
              const status = r.status.toLowerCase();

              return (
                <tr
                  key={r.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3">{r.id}</td>
                  <td className="p-3 font-medium">
                    {r.wasteType}
                  </td>
                  <td className="p-3 max-w-xs truncate">
                    {r.address}
                  </td>
                  <td className="p-3">{r.date}</td>
                  <td className="p-3">{r.timeSlot}</td>
                  <td className="p-3">{r.phone}</td>

                  <td className="p-3 text-center">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full border ${statusStyle[status]}`}
                    >
                      {status}
                    </span>
                  </td>

                  <td className="p-3 text-center space-x-2">
                    {status === "pending" && (
                      <>
                        <button
                          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                          onClick={() =>
                            handleAction(
                              r.id,
                              "approve"
                            )
                          }
                        >
                          Approve
                        </button>
                        <button
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                          onClick={() =>
                            handleAction(
                              r.id,
                              "reject"
                            )
                          }
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {status === "approved" && (
                      <button
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                        onClick={() =>
                          handleAction(
                            r.id,
                            "complete"
                          )
                        }
                      >
                        Complete
                      </button>
                    )}

                    {(status === "completed" ||
                      status === "rejected") && (
                      <button
                        className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-800"
                        onClick={() =>
                          handleDelete(r.id)
                        }
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRequests;
