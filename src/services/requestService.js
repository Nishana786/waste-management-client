import { API_URL } from "./config";

export const createRequest = async (requestData) => {
  const token = localStorage.getItem("access_token");

  const response = await fetch(`${API_URL}/request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(requestData),
  });

  if (!response.ok) {
    throw new Error("Request failed");
  }

  return response.json();
};
