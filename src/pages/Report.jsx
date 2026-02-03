
import { useState } from "react";
import { createReport } from "../services/reportService";

const Report = () => {
  const [formData, setFormData] = useState({
    issueType: "",
    description: "",
    location: "",
    photo: null,
  });

  const [preview, setPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // 🔹 Input handle
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "photo") {
      const file = files?.[0] || null;

      setFormData((prev) => ({
        ...prev,
        photo: file,
      }));

      setPreview(file ? URL.createObjectURL(file) : null);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // 🔹 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.photo) {
      alert("Please select a photo ");
      return;
    }

    setSubmitting(true);

    try {
      const data = new FormData();
      data.append("issueType", formData.issueType);
      data.append("description", formData.description);
      data.append("location", formData.location);
      data.append("photo", formData.photo);

      const res = await createReport(data);

      alert(res.message || "Waste reported successfully ");

      setFormData({
        issueType: "",
        description: "",
        location: "",
        photo: null,
      });
      setPreview(null);
    } catch (error) {
      alert(error.message || "Failed to submit report ");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-green-700">
             Report Waste Issue
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Help us keep your surroundings clean
          </p>
        </div>

        {/* 🔥 encType VERY IMPORTANT */}
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-5"
        >
          {/* Issue Type */}
          <input
            name="issueType"
            placeholder="Issue Type (Plastic, Garbage, E-waste...)"
            value={formData.issueType}
            onChange={handleChange}
            required
            disabled={submitting}
            className="w-full border rounded-lg px-4 py-2 
                       focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Describe the issue in detail"
            value={formData.description}
            onChange={handleChange}
            required
            disabled={submitting}
            rows={4}
            className="w-full border rounded-lg px-4 py-2 
                       focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* Location */}
          <input
            name="location"
            placeholder="Location (Area, Street, Landmark)"
            value={formData.location}
            onChange={handleChange}
            required
            disabled={submitting}
            className="w-full border rounded-lg px-4 py-2 
                       focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* Photo Upload */}
          <div className="border-2 border-dashed rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600 mb-2">
              Upload a photo of the issue 📷
            </p>
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange}
              disabled={submitting}
              className="mx-auto"
            />
          </div>

          {/* Preview */}
          {preview && (
            <div>
              <p className="text-sm text-gray-600 mb-1">
                Preview
              </p>
              <img
                src={preview}
                alt="Preview"
                className="h-44 w-full object-cover rounded-lg border"
              />
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-3 rounded-xl text-white font-semibold transition ${
              submitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 shadow hover:shadow-lg"
            }`}
          >
            {submitting ? "Submitting..." : "Submit Report"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Report;
