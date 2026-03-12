import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function RevenueChart({ orders }) {
  const data = orders.map((order) => ({
    date: new Date(order.createdAt).toLocaleDateString(),
    revenue: Number(order.price),
  }));

  return (
    <div className="bg-base-100 p-5 rounded-2xl shadow-md h-75">
      <h2 className="font-semibold mb-4">Revenue Over Time</h2>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" hide />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="revenue" stroke="#3b82f6" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RevenueChart;
