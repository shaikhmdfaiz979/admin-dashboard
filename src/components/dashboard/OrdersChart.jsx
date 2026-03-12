import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

function OrdersChart({ orders }) {
  const statusCount = {
    Completed: 0,
    Pending: 0,
    Cancelled: 0,
  };

  orders.forEach((order) => {
    statusCount[order.status] = (statusCount[order.status] || 0) + 1;
  });

  const data = Object.keys(statusCount).map((key) => ({
    name: key,
    value: statusCount[key],
  }));

  const COLORS = ["#22c55e", "#facc15", "#ef4444"];

  return (
    <div className="bg-base-100 p-5 rounded-2xl shadow-md h-[300px]">
      <h2 className="font-semibold mb-4">Orders Status</h2>

      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie data={data} dataKey="value" outerRadius={90} label>
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % 3]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default OrdersChart;
