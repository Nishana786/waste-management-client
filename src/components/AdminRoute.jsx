import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const token = localStorage.getItem("access_token");
  const user = JSON.parse(localStorage.getItem("user"));

  // 🔍 DEBUG
  console.log("ADMIN USER:", user);

  // 🔒 Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 👑 Not admin
  if (!user || user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  // ✅ Admin allowed
  return <Outlet />;
};

export default AdminRoute;
