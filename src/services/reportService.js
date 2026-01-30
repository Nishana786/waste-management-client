import { API_URL } from "./config";

export const createReport = async (formData) => {
  const token = localStorage.getItem("access_token");

  const response = await fetch(`${API_URL}/report`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
   
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to submit report");
  }

  return data;
};
