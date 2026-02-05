import { useState } from "react";
import { createRequest } from "../../services/requestService"

const Request = () => {
  const [data, setData] = useState({
    address: "",
    wasteType: "",
    date: "",
    timeSlot: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createRequest(data); 
      alert("Pickup request submitted ");

      setData({
        address: "",
        wasteType: "",
        date: "",
        timeSlot: "",
        phone: "",
      });
    } catch (err) {
      alert("Something went wrong ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-100 p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-blue-700">
            Request Pickup
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Schedule a waste pickup at your convenience
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Address */}
          <textarea
            name="address"
            placeholder="Pickup Address (Area, street, landmark)"
            value={data.address}
            onChange={handleChange}
            required
            disabled={loading}
            rows={3}
            className="w-full border rounded-lg px-4 py-2 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Waste Type */}
          <select
            name="wasteType"
            value={data.wasteType}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full border rounded-lg px-4 py-2 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Waste Type</option>
            <option>Plastic</option>
            <option>Organic</option>
            <option>E-waste</option>
          </select>

          {/* Date */}
          <input
            type="date"
            name="date"
            value={data.date}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full border rounded-lg px-4 py-2 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Time Slot */}
          <select
            name="timeSlot"
            value={data.timeSlot}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full border rounded-lg px-4 py-2 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Time Slot</option>
            <option>Morning (8 AM – 11 AM)</option>
            <option>Afternoon (12 PM – 4 PM)</option>
            <option>Evening (4 PM – 7 PM)</option>
          </select>

          {/* Phone */}
          <input
            type="tel"
            name="phone"
            placeholder="Contact Number"
            value={data.phone}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full border rounded-lg px-4 py-2 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-blue-700 shadow hover:shadow-lg"
            }`}
          >
            {loading ? "Submitting..." : "Submit Pickup Request"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Request;
