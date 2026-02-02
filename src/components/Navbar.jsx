import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-green-700 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to={user?.role === "admin" ? "/admin" : "/dashboard"}
          className="text-xl font-bold"
        >
          ♻ WasteMgmt
        </Link>

        <ul className="hidden md:flex gap-6 text-sm">
          <li><Link to="/">Home</Link></li>

          {user?.role !== "admin" && user && (
            <>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/report">Report</Link></li>
              <li><Link to="/requests">Requests</Link></li>
            </>
          )}

          {user?.role === "admin" && (
            <>
              <li><Link to="/admin">Admin</Link></li>
              <li><Link to="/admin/reports">Reports</Link></li>
              <li><Link to="/admin/requests">Requests</Link></li>
              <li><Link to="/admin/drivers">Drivers</Link></li>
            </>
          )}
        </ul>

        {user ? (
          <button
            onClick={handleLogout}
            className="hidden md:block bg-red-600 px-4 py-2 rounded"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="hidden md:block bg-white text-green-700 px-4 py-2 rounded"
          >
            Login
          </Link>
        )}

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
