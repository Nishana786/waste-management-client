import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const AdminLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
     <main className="flex-grow min-h-[70vh] p-6 bg-gray-50">

        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AdminLayout;
