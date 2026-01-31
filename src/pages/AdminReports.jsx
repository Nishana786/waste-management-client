import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;


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

const AdminReports = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const [reports, setReports] = useState(() => {
    const cached = sessionStorage.getItem("admin_reports");
    return cached ? JSON.parse(cached) : [];
  });

  const [loading, setLoading] = useState(
    !sessionStorage.getItem("admin_reports")
  );
  const [error, setError] = useState(null);

  // ---------------- FETCH ----------------
  const fetchReports = useCallback(async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/admin/reports`, {
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
      setReports(data);
      sessionStorage.setItem(
        "admin_reports",
        JSON.stringify(data)
      );
    } catch {
      setError("Reports load cheyyan pattiyilla");
    } finally {
      setLoading(false);
    }
  }, [navigate, token]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  // ---------------- ACTION ----------------
  const handleAction = async (id, action) => {
    try {
      await fetch(
        `${API_URL}/admin/reports/${id}/${action}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReports((prev) =>
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
    if (!window.confirm("Delete this report?")) return;

    try {
      await fetch(`${API_URL}/admin/reports/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setReports((prev) =>
        prev.filter((r) => r.id !== id)
      );
    } catch {
      alert("Delete failed");
    }
  };

  // ---------------- UI ----------------
  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <div className="animate-spin h-10 w-10 border-4 border-green-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-600 mt-10 font-semibold">
        {error}
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
         Admin Reports
      </h1>

      <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Issue</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-center">Actions</th>
                <th className="p-3 text-center">Photo</th> 
            </tr>
          </thead>

          <tbody>
            {reports.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-500"
                >
                  No reports found
                </td>
              </tr>
            )}

            {reports.map((r) => {
              const status = r.status.toLowerCase();

              return (
                <tr
                  key={r.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3">{r.id}</td>
                  <td className="p-3 font-medium">
                    {r.issueType}
                  </td>
                  <td className="p-3">
                    {r.location}
                  </td>

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
              <td className="p-3 text-center">
  {r.photo ? (
    <img
      src={`${API_URL}/uploads/${r.photo}`}
      alt="Waste"
      className="h-16 w-20 object-cover rounded border mx-auto"
    />
  ) : (
    <span className="text-xs text-gray-400">
      No image
    </span>
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

export default AdminReports;
