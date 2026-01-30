import { useState } from "react";
import api from "../../services/api";

const AddDriver = ({ onDriverAdded }) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    vehicle_number: "",
    area: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      await api.post("/admin/drivers", form);

      setMessage("Driver added successfully");
      setForm({
        name: "",
        phone: "",
        vehicle_number: "",
        area: "",
      });

      onDriverAdded();
    } catch (err) {
      setError(
        err.response?.data?.error || "Driver already exists / error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        ➕ Add Driver
      </h2>

      {message && (
        <p className="mb-3 text-green-600 font-medium">{message}</p>
      )}
      {error && <p className="mb-3 text-red-600 font-medium">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
          name="name"
          placeholder="Driver Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <input
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
          name="vehicle_number"
          placeholder="Vehicle Number"
          value={form.vehicle_number}
          onChange={handleChange}
          required
        />

        <input
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
          name="area"
          placeholder="Area"
          value={form.area}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition"
        >
          {loading ? "Adding..." : "Add Driver"}
        </button>
      </form>
    </div>
  );
};

export default AddDriver;
