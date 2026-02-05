import api from "../../services/api";

const AdminTaskActions = ({
  id,
  type,
  status,
  drivers = [],
  refresh,
}) => {

  const baseUrl =
    type === "request"
      ? `/admin/requests/${id}`
      : `/admin/reports/${id}`;

  const action = async (name) => {
    await api.put(`${baseUrl}/${name}`);
    refresh();
  };

  const assignDriver = async (driverId) => {
    if (!driverId) return;

    await api.put(`${baseUrl}/assign-driver`, {
      driver_id: driverId,
    });
    refresh();
  };

  const remove = async () => {
    if (!window.confirm("Delete ?")) return;
    await api.delete(baseUrl);
    refresh();
  };

  return (
    <>
      {/* PENDING */}
      {status === "pending" && (
        <>
          <Btn onClick={() => action("approve")} color="bg-green-600">
            Approve
          </Btn>
          <Btn onClick={() => action("reject")} color="bg-red-600">
            Reject
          </Btn>
        </>
      )}

      {/* APPROVED */}
      {status === "approved" && (
        <select
          onChange={(e) => assignDriver(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="">Assign Driver</option>
          {drivers.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
      )}

      {/* ASSIGNED */}
      {status === "assigned" && (
        <Btn onClick={() => action("complete")} color="bg-purple-600">
          Complete
        </Btn>
      )}

      {/* COMPLETED / REJECTED */}
      {(status === "completed" || status === "rejected") && (
        <Btn onClick={remove} color="bg-gray-800">
          Delete
        </Btn>
      )}
    </>
  );
};

const Btn = ({ onClick, color, children }) => (
  <button
    onClick={onClick}
    className={`${color} text-white px-3 py-2 rounded-lg text-sm mx-1`}
  >
    {children}
  </button>
);

export default AdminTaskActions;
