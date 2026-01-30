import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminOrders = ({ token, currency }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:4000/api/order/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) setOrders(res.data.orders);
    } catch (error) {
      console.log("Order fetch error", error);
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      await axios.post(
        `https://foodexpress-3.onrender.com/api/order/status`,
        { orderId, status: e.target.value },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchOrders();
    } catch (error) {
      console.log("Status update error", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <p className="mt-24 text-center text-lg">Loading orders...</p>;
  }

  if (orders.length === 0) {
    return <p className="mt-24 text-center text-lg">No orders found</p>;
  }

  return (
     <div className="p-3 sm:p-6 max-w-7xl mx-auto">
    <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
      All Orders
    </h2>

    <div className="flex flex-col gap-4">
      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white shadow rounded-xl p-4 flex flex-col lg:grid lg:grid-cols-3 gap-4"
        >
          {/* LEFT - User & Address */}
          <div className="text-sm text-gray-700 space-y-1">
            <p>
              <b>User:</b> {order.userId?.name}
            </p>
            <p className="break-all">{order.userId?.email}</p>

            <p className="mt-2">
              <b>Address:</b> {order.address.city},{" "}
              {order.address.state}, {order.address.country}
            </p>
            <p>
              <b>Phone:</b> {order.address.phone}
            </p>
          </div>

          {/* MIDDLE - Items */}
          <div className="text-sm text-gray-700">
            <p className="font-semibold mb-1">Items</p>
            <div className="space-y-1">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between">
                  <span>
                    {item.productId?.name || item.name}
                  </span>
                  <span>x {item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="mt-3 space-y-1">
              <p>
                <b>Total Items:</b> {order.items.length}
              </p>
              <p>
                <b>Method:</b> {order.paymentMethod}
              </p>
              <p>
                <b>Payment:</b>{" "}
                {order.paymentStatus === "Paid" ? (
                  <span className="text-green-600 font-semibold">
                    Done
                  </span>
                ) : (
                  <span className="text-red-600 font-semibold">
                    Pending
                  </span>
                )}
              </p>
              <p>
                <b>Date:</b>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* RIGHT - Price & Status */}
          <div className="flex flex-col justify-between gap-3">
            <p className="text-lg font-semibold">
              {currency}
              {order.amount}
            </p>

            <select
              value={order.status}
              onChange={(e) => statusHandler(e, order._id)}
              className="border p-2 rounded-md w-full"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default AdminOrders;
