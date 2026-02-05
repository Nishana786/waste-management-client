import { useEffect, useState } from "react";
import api from "../../services/api";
import AdminTaskActions from "../../components/Admin/AdminTaskActions";

const statusStyle = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-blue-100 text-blue-800",
  assigned: "bg-purple-100 text-purple-800",
  completed: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

const AdminRequests = () => {
  const [requests, setRequests] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchRequests = async (pageNo = 1) => {
    setLoading(true);
    try {
      const res = await api.get(
        `/admin/requests?page=${pageNo}&limit=8`
      );
      setRequests(res.data.data || []);
      setTotalPages(res.data.pages || 1);
      setPage(res.data.page || 1);
    } catch (err) {
      console.error(err);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchDrivers = async () => {
    try {
      const res = await api.get("/admin/drivers");
      setDrivers(res.data.filter(d => d.status === "available"));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests(page);
    fetchDrivers();
  }, [page]);

  if (loading) {
    return <p className="p-6 text-gray-500">Loading...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full">
          <thead className="bg-gray-100 text-sm text-gray-600">
            <tr>
              <th className="p-4 text-left">Waste</th>
              <th className="p-4 text-left">Address</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Time</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Driver</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.length > 0 ? (
              requests.map((r) => (
                <tr key={r.id} className="border-t hover:bg-gray-50">
                  <td className="p-4">{r.wasteType}</td>
                  <td className="p-4">{r.address}</td>
                  <td className="p-4">{r.date}</td>
                  <td className="p-4">{r.timeSlot}</td>
                  <td className="p-4">{r.phone}</td>

                  {/* ✅ DRIVER NAME */}
                  <td className="p-4 text-sm text-gray-700">
                    {r.driver || "-"}
                  </td>

                  {/* STATUS */}
                  <td className="p-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyle[r.status]}`}
                    >
                      {r.status}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="p-4 text-center">
                    <div className="flex justify-center gap-2 flex-wrap">
                      <AdminTaskActions
                        id={r.id}
                        type="request"
                        status={r.status}
                        drivers={drivers}
                        refresh={() => fetchRequests(page)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="p-6 text-center text-gray-500">
                  No requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="text-sm">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminRequests;
