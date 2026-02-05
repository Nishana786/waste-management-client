import { useEffect, useState, useMemo } from "react";
import api from "../../services/api";

const Drivers = () => {
  // ---------------- STATE ----------------
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    vehicle_number: "",
    area: "",
  });

  const [formLoading, setFormLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  // ---------------- API ----------------
  const fetchDrivers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/drivers");
      setDrivers(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addDriver = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setMessage("");
    setError("");

    try {
      await api.post("/admin/drivers", form);
      setMessage("✅ Driver added successfully");
      setForm({
        name: "",
        phone: "",
        vehicle_number: "",
        area: "",
      });
      fetchDrivers();
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Driver already exists / error occurred"
      );
    } finally {
      setFormLoading(false);
    }
  };

  const deleteDriver = async (driver) => {
    if (driver.status === "assigned") {
      alert("❌ Assigned driver cannot be deleted");
      return;
    }

    const ok = window.confirm(
      `Delete driver "${driver.name}"?`
    );
    if (!ok) return;

    try {
      await api.delete(`/admin/drivers/${driver.id}`);
      fetchDrivers();
    } catch (err) {
      alert(
        err.response?.data?.error ||
          "Driver delete failed"
      );
    }
  };

  // ---------------- EFFECT ----------------
  useEffect(() => {
    fetchDrivers();
  }, []);

  // ---------------- FILTER ----------------
  const filteredDrivers = useMemo(() => {
    return drivers.filter((d) =>
      `${d.name} ${d.phone} ${d.area}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [drivers, search]);

  // ---------------- UI ----------------
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Driver Management
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ADD DRIVER */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            ➕ Add Driver
          </h2>

          {message && (
            <p className="mb-3 text-green-600">{message}</p>
          )}
          {error && (
            <p className="mb-3 text-red-600">{error}</p>
          )}

          <form onSubmit={addDriver} className="space-y-3">
            {["name", "phone", "vehicle_number", "area"].map(
              (field) => (
                <input
                  key={field}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder={field.replace("_", " ")}
                  value={form[field]}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      [field]: e.target.value,
                    })
                  }
                  required
                />
              )
            )}

            <button
              disabled={formLoading}
              className="w-full bg-green-600 text-white py-2 rounded-lg"
            >
              {formLoading ? "Adding..." : "Add Driver"}
            </button>
          </form>
        </div>

        {/* DRIVER LIST */}
        <div className="lg:col-span-2 bg-white shadow-lg rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">
              Driver List
            </h2>

            <input
              className="border rounded px-3 py-2 text-sm"
              placeholder="Search name / phone / area"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {loading ? (
            <p>Loading drivers...</p>
          ) : filteredDrivers.length === 0 ? (
            <p>No drivers found</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Phone</th>
                  <th className="p-3 text-left">Vehicle</th>
                  <th className="p-3 text-left">Area</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredDrivers.map((d) => (
                  <tr key={d.id} className="border-t">
                    <td className="p-3">{d.name}</td>
                    <td className="p-3">{d.phone}</td>
                    <td className="p-3">{d.vehicle_number}</td>
                    <td className="p-3">{d.area}</td>

                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          d.status === "available"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {d.status}
                      </span>
                    </td>

                    <td className="p-3">
                      <button
                        disabled={d.status === "assigned"}
                        onClick={() => deleteDriver(d)}
                        className={`px-3 py-1 rounded text-white ${
                          d.status === "assigned"
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-red-600 hover:bg-red-700"
                        }`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Drivers;
