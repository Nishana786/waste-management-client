import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Report from "./pages/Report";
import Request from "./pages/Request";

import AdminDashboard from "./pages/AdminDashboard";
import AdminReports from "./pages/AdminReports";
import AdminRequests from "./pages/AdminRequests";
import SystemStats from "./pages/admin/SystemStats";
import Drivers from "./pages/admin/Drivers";
import AddDriver from "./pages/admin/AddDriver";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 👑 ADMIN ROUTES */}
        <Route element={<AdminRoute />}>
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="requests" element={<AdminRequests />} />
            <Route path="drivers" element={<Drivers />} />
            <Route path="add-driver" element={<AddDriver />} />
            <Route path="stats" element={<SystemStats />} />
          </Route>
        </Route>

        {/* 🌍 USER / PUBLIC */}
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
    </BrowserRouter>
  );
}

export default App;
