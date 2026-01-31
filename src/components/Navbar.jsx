
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // 🔐 Auth data
  const token = localStorage.getItem("access_token");
  const user = JSON.parse(localStorage.getItem("user"));

 
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    
    navigate("/login");
  };

  return (
    <nav className="bg-green-700 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to={user?.role === "admin" ? "/admin" : "/dashboard"}
          className="text-xl font-bold tracking-wide"
        >
          ♻ WasteMgmt
        </Link>

        {/* ================= Desktop Menu ================= */}
        <ul className="hidden md:flex gap-8 text-sm font-medium items-center">
          <li><Link to="/">Home</Link></li>

          {/* 👤 USER MENU */}
          {user?.role !== "admin" && (
            <>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/report">Report</Link></li>
              <li><Link to="/requests">Requests</Link></li>
              
            </>
          )}

          {/* 👑 ADMIN MENU */}
          {user?.role === "admin" && (
            <>
              <li><Link to="/admin">Admin Dashboard</Link></li>
              <li><Link to="/admin/reports">Reports</Link></li>
              <li><Link to="/admin/requests">Requests</Link></li>
                 <li><Link to="/admin/drivers">Drivers</Link></li>
            </>
          )}
        </ul>

        {/* ================= Auth Button ================= */}
        {token ? (
          <button
            onClick={handleLogout}
            className="hidden md:block bg-red-600 px-4 py-2 rounded-md"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="hidden md:block bg-white text-green-700 px-4 py-2 rounded-md"
          >
            Login
          </Link>
        )}

        {/* ================= Mobile Menu Button ================= */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* ================= Mobile Menu ================= */}
      {open && (
        <div className="md:hidden bg-green-800 px-6 py-4 space-y-3 text-sm">

          <Link to="/" onClick={() => setOpen(false)}>Home</Link>

          {/* 👤 USER MENU */}
          {user?.role !== "admin" && (
            <>
              <Link to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
              <Link to="/report" onClick={() => setOpen(false)}>Report</Link>
              <Link to="/requests" onClick={() => setOpen(false)}>Requests</Link>
            
            </>
          )}

          {/* 👑 ADMIN MENU */}
          {user?.role === "admin" && (
            <>
              <Link to="/admin" onClick={() => setOpen(false)}>Admin Dashboard</Link>
              <Link to="/admin/reports" onClick={() => setOpen(false)}>Reports</Link>
              <Link to="/admin/requests" onClick={() => setOpen(false)}>Requests</Link>
                <Link to="/admin/drivers"onClick={() => setOpen(false)}> Drivers</Link>
             
            </>
          )}

          {/* Auth */}
          {token ? (
            <button
              onClick={() => {
                setOpen(false);
                handleLogout();
              }}
              className="block w-full bg-red-600 py-2 rounded-md"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="block w-full bg-white text-green-700 py-2 rounded-md text-center"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
