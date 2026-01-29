import React, { useContext, useEffect, useState } from "react";
import { shopcontext } from "../context/Shopcontext";
import { toast } from "react-toastify";
import Title from "../Components/Title";

export default function Order() {
  const { backendurl, token, currency } = useContext(shopcontext);
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadorderData = async () => {
    try {
      if (!token) {
        setLoading(false);
        return;
      }

      const res = await fetch(`${backendurl}/api/order/userorders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        let allOrdersItem = [];

        data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrdersItem.push({
              ...item,
              status: order.status,
              paymentMethod: order.paymentMethod,
              date: order.createdAt,
            });
          });
        });

        setOrderItems(allOrdersItem);
      } else {
        setOrderItems([]);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadorderData();
  }, [token]);

  if (loading) {
    return <p className="mt-24 text-center">Loading orders...</p>;
  }

  return (
    <section className="max-padd-container mt-24 pb-20">
      <Title title1="Orders" title2="List" titlestyles="text-center sm:text-left" />

      {orderItems.length === 0 ? (
        <p className="mt-6 text-center sm:text-left">No orders found</p>
      ) : (
        <div className="flex flex-col gap-6 mt-6">
          {orderItems.map((item, i) => (
            <div
              key={i}
              className="bg-deep p-4 sm:p-6 rounded-xl shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              {/* LEFT */}
              <div className="flex gap-4">
                <img
                  src={item.productId?.image}
                  alt={item.productId?.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />

                <div className="flex flex-col text-sm gap-1">
                  <h5 className="font-semibold text-base">
                    {item.productId?.name}
                  </h5>

                  <p>
                    Price: {currency}
                    {item.productId?.price?.[item.size]}
                  </p>

                  <p>
                    Qty: {item.quantity} | Size: {item.size}
                  </p>

                  <p className="text-gray-500 text-xs">
                    {new Date(item.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </p>

                  <p className="text-xs">Payment: {item.paymentMethod}</p>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex sm:flex-col justify-between sm:justify-center items-center gap-3 w-full sm:w-auto">
                <div className="flex items-center gap-2 text-sm font-medium text-green-700">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  {item.status}
                </div>

                <button
                  onClick={loadorderData}
                  className="bg-green-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-800 transition w-full sm:w-36"
                >
                  Track Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
