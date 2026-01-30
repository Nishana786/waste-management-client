import { useEffect, useState } from "react";
import api from "../../services/api";
import AddDriver from "./AddDriver";
import DriverList from "./DriverList";

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔁 FETCH ALL DRIVERS
  const fetchDrivers = async () => {
    try {
      const res = await api.get("/admin/drivers");
      setDrivers(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // 🟡 MARK AS ASSIGNED (NOT COMPLETED)
  const markDriverAssigned = async (id) => {
    try {
      await api.put(`/admin/drivers/${id}/assign`);
      fetchDrivers();
    } catch (err) {
      console.log(err);
    }
  };

  // 🟢 MARK AS COMPLETED
  const markDriverCompleted = async (id) => {
    try {
      await api.put(`/admin/drivers/${id}/complete`);
      fetchDrivers();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
         Driver Management
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT – ADD DRIVER */}
        <div className="lg:col-span-1">
          <AddDriver onDriverAdded={fetchDrivers} />
        </div>

        {/* RIGHT – DRIVER LIST */}
        <div className="lg:col-span-2">
          <DriverList
            drivers={drivers}
            loading={loading}
            onAssign={markDriverAssigned}
            onComplete={markDriverCompleted}
          />
        </div>
      </div>
    </div>
  );
};

export default Drivers;
