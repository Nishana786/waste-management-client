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

const AdminReports = () => {
  const [reports, setReports] = useState([]);   // ✅ SAFE DEFAULT
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔢 Pagination state
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchReports = async (pageNo = 1) => {
    try {
      const res = await api.get(
        `/admin/reports?page=${pageNo}&limit=8`
      );

      setReports(res.data.data || []);   // ✅ IMPORTANT
      setTotalPages(res.data.pages || 1);
      setPage(res.data.page || 1);
    } catch (err) {
      console.error(err);
      setReports([]);                    
    } finally {
      setLoading(false);
    }
  };

  const fetchDrivers = async () => {
    try {
      const res = await api.get("/admin/drivers");
      setDrivers(res.data.filter((d) => d.status === "available"));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchReports(page);
    fetchDrivers();
  }, [page]);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full">
          <thead className="bg-gray-100 text-sm text-gray-600">
            <tr>
              <th className="p-4 text-left">Issue</th>
              <th className="p-4 text-left">Location</th>
              <th className="p-4 text-center">Status</th>
                 <th className="p-4 text-left">Driver</th>
                <th className="p-4 text-center">Photo</th> 
            
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {Array.isArray(reports) && reports.length > 0 ? (
              reports.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="p-4">{r.issueType}</td>
                  <td className="p-4">{r.location}</td>

                  <td className="p-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${statusStyle[r.status]}`}
                    >
                      {r.status}
                    </span>
                  </td>

                  <td className="p-4 text-sm text-gray-700">
                    {r.driver || "-"}
                  </td>

                  
                  <td className="p-4 text-center">
  {r.photo ? (
    <img
      src={`${import.meta.env.VITE_API_URL}/uploads/${r.photo}`}
      alt="report"
      className="w-16 h-16 object-cover rounded mx-auto"
    />
  ) : (
    "-"
  )}
</td>
 <td className="p-4 text-center">
                    <AdminTaskActions
                      id={r.id}
                      type="report"
                      status={r.status}
                      drivers={drivers}
                      refresh={() => fetchReports(page)}
                    />
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  No reports found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🔢 PAGINATION */}
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

export default AdminReports;
