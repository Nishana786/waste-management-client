import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const AdminCharts = ({ stats }) => {

  // chart data prepare cheyyam
  const data = [
    { name: "Reports", value: stats.totalReports },
    { name: "Requests", value: stats.totalRequests },
    { name: "Pending", value: stats.pendingReports + stats.pendingPickups },
    { name: "Completed", value: stats.completedReports + stats.completedPickups },
  ];

  return (
    <div className="bg-white p-6 rounded shadow mt-10">
      <h2 className="text-xl font-semibold mb-4">
        Overall System Overview
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdminCharts;
