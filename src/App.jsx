import { Routes, Route } from "react-router-dom";

// 🌍 PUBLIC / USER PAGES
import Home from "./pages/user/Home"
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/user/Dashboard"
import Report from "./pages/user/Report"
import Request from "./pages/user/Request";

// 👑 ADMIN PAGES
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminReports from "./pages/admin/AdminReports";
import AdminRequests from "./pages/admin/AdminRequests";
import SystemStats from "./pages/admin/SystemStats";
import Drivers from "./pages/admin/Drivers";

// 🔐 ROUTE GUARDS & LAYOUTS
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

function App() {
  return (
    <Routes>
      {/* 👑 ADMIN ROUTES */}
      <Route element={<AdminRoute />}>
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="requests" element={<AdminRequests />} />
          <Route path="drivers" element={<Drivers />} />
          <Route path="stats" element={<SystemStats />} />
        </Route>
      </Route>

      {/* 🌍 USER / PUBLIC ROUTES */}
      <Route element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="report"
          element={
            <ProtectedRoute>
              <Report />
            </ProtectedRoute>
          }
        />

        <Route
          path="requests"
          element={
            <ProtectedRoute>
              <Request />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
