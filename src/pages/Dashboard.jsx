import { useEffect, useState } from "react";
import axios from "axios";
import { FaBox, FaShoppingCart, FaDollarSign } from "react-icons/fa";

import StatsCard from "../components/dashboard/StatCard";
import RevenueChart from "../components/dashboard/RevenueChart";
import OrdersChart from "../components/dashboard/OrdersChart";
import RecentOrders from "../components/dashboard/RecentOrders";
import { fetchData } from "../store/features/product/productThunk";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrder } from "../store/features/order/orderThunk";

function Dashboard() {
  const orders = useSelector((state) => state.order.orders);
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
    dispatch(fetchOrder());
  }, []);

  const totalRevenue = orders.reduce(
    (acc, order) => acc + Number(order.totalAmount || 0),
    0,
  );

  return (
    <div className="p-1 md:p-6 space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">Dashboard Overview</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatsCard
          title="Total Products"
          value={products.length}
          path={"/products"}
          icon={FaBox}
          color="bg-primary"
        />

        <StatsCard
          title="Total Orders"
          value={orders.length}
          icon={FaShoppingCart}
          path={"/orders"}
          color="bg-secondary"
        />

        <StatsCard
          title="Total Revenue"
          value={`₹ ${totalRevenue}`}
          path={"/"}
          icon={FaDollarSign}
          color="bg-success"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart orders={orders} />
        <OrdersChart orders={orders} />
      </div>

      {/* Recent Orders */}
      <RecentOrders orders={orders} />
    </div>
  );
}

export default Dashboard;
