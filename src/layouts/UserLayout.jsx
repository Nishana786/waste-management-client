import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const UserLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow p-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
