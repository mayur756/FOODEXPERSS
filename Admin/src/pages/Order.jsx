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
        `http://localhost:4000/api/order/status`,
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
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">All Orders</h2>

      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="flex flex-col md:flex-row justify-between items-start bg-green-50 p-4 rounded-xl gap-4"
          >
            {/* LEFT */}
            <div className="text-sm text-gray-700 space-y-1">
              <p>
                <b>User:</b> {order.userId?.name} ({order.userId?.email})
              </p>
              <p>
                <b>Items:</b>{" "}
                {order.items.map((item, i) => (
                  <span key={i}>
                    {item.productId?.name || item.name} x {item.quantity}
                    {i !== order.items.length - 1 && ", "}
                  </span>
                ))}
              </p>
              <p>
                <b>Address:</b>{" "}
                {order.address.city}, {order.address.state},{" "}
                {order.address.country}
              </p>
              <p>
                <b>Phone:</b> {order.address.phone}
              </p>
            </div>

            {/* MIDDLE */}
            <div className="text-sm text-gray-700 space-y-1">
              <p>
                <b>Total Items:</b> {order.items.length}
              </p>
              <p>
                <b>Method:</b> {order.paymentMethod}
              </p>
              <p>
                <b>Payment:</b>{" "}
                {order.paymentStatus === "Paid" ? (
                  <span className="text-green-600 font-semibold">Done</span>
                ) : (
                  <span className="text-red-600 font-semibold">Pending</span>
                )}
              </p>
              <p>
                <b>Date:</b>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col items-end gap-3">
              <p className="font-semibold">
                Price: {currency}
                {order.amount}
              </p>

              <select
                onChange={(e) => statusHandler(e, order._id)}
                value={order.status}
                className="p-1 border rounded-md text-sm"
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
