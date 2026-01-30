const DriverList = ({
  drivers = [],
  loading,
  onAssign,
  onComplete,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Driver List
      </h2>

      {loading ? (
        <p className="text-gray-500">Loading drivers...</p>
      ) : drivers.length === 0 ? (
        <p className="text-gray-500">No drivers found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Vehicle</th>
                <th className="p-3 text-left">Area</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {drivers.map((d) => (
                <tr
                  key={d.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3">{d.name}</td>
                  <td className="p-3">{d.phone}</td>
                  <td className="p-3">{d.vehicle_number}</td>
                  <td className="p-3">{d.area}</td>

                  {/* STATUS */}
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        d.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : d.status === "assigned"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {d.status}
                    </span>
                  </td>

                  {/* ACTION BUTTONS */}
                  <td className="p-3 flex gap-2">
                    {d.status === "available" && (
                      <button
                        onClick={() => onAssign(d.id)}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded"
                      >
                        Assign
                      </button>
                    )}

                    {d.status === "assigned" && (
                      <button
                        onClick={() => onComplete(d.id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                      >
                        Complete
                      </button>
                    )}

                    {d.status === "completed" && (
                      <span className="text-green-700 font-semibold">
                        Done
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DriverList;
