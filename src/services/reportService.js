
export const createReport = async (formData) => {
  const token = localStorage.getItem("access_token");
  console.log("TOKEN:", token);

  const response = await fetch("http://127.0.0.1:5000/report", {
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
