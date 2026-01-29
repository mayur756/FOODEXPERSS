import React, { useState, useContext, useEffect } from "react";
import { shopcontext } from "../context/Shopcontext";
import Title from "../Components/Title";
import CartTotal from "./CartTotal";
import Footer from "../Components/Footer";
import { toast } from "react-toastify";

/* Razorpay Loader */
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function Placeorder() {
  const { cartItems, clearCart, getCartAmount, navigate } =
    useContext(shopcontext);

  const cartTotalAmount = getCartAmount();
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [orderSuccess, setOrderSuccess] = useState(false);

  const [address, setAddress] = useState({
    name: "",
    email: "",
    street: "",
    city: "",
    pincode: "",
    phone: "",
    country: "India",
  });

  /* Redirect after success */
  useEffect(() => {
    if (orderSuccess) navigate("/order");
  }, [orderSuccess, navigate]);

  const buildItemsArray = () => {
    const items = [];
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        const qty = cartItems[productId][size];
        if (qty > 0) items.push({ productId, size, quantity: qty });
      }
    }
    return items;
  };

  /* Send order to backend */
  const sendOrderToBackend = async (paymentStatus) => {
    try {
      const itemsArray = buildItemsArray();
      if (itemsArray.length === 0) {
        toast.error("Cart is empty");
        return false;
      }

      const res = await fetch("http://localhost:4000/api/order/place", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          items: itemsArray,
          address,
          amount: cartTotalAmount,
          paymentMethod,
          paymentStatus, // "Paid" or "Pending"
        }),
      });

      const data = await res.json();
      return data.success;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  /* Razorpay Payment */
  const handleOnlinePayment = async () => {
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      toast.error("Razorpay failed to load");
      return;
    }

    const options = {
      key: "rzp_test_S5bXbrAARs4h5m",
      amount: cartTotalAmount * 100,
      currency: "INR",
      name: "Food App",
      description: "Order Payment",
      handler: async () => {
        const success = await sendOrderToBackend("Paid");
        if (success) {
          toast.success("Payment successful");
          clearCart();
          setOrderSuccess(true);
        } else toast.error("Order failed");
      },
    };

    new window.Razorpay(options).open();
  };

  /* COD Payment */
  const handleCOD = async () => {
    const success = await sendOrderToBackend("Pending");
    if (success) {
      toast.success("Order placed");
      clearCart();
      setOrderSuccess(true);
    } else toast.error("Order failed");
  };

  const placeOrder = (e) => {
    e.preventDefault();
    paymentMethod === "online" ? handleOnlinePayment() : handleCOD();
  };

  return (
    <>
      <section className="max-padd-container mt-24 pb-20">
        <form onSubmit={placeOrder}>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">

            {/* ADDRESS */}
            <div className="bg-deep p-6 rounded-xl shadow">
              <Title title1="Delivery" title2="Information" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {["name", "email", "street", "city", "pincode", "phone"].map(
                  (f, i) => (
                    <input
                      key={i}
                      placeholder={f.toUpperCase()}
                      required
                      onChange={(e) =>
                        setAddress({ ...address, [f]: e.target.value })
                      }
                      className="border p-3 rounded w-full"
                    />
                  )
                )}
              </div>
            </div>

            {/* PAYMENT */}
            <div className="bg-deep p-6 rounded-xl shadow flex flex-col">
              <CartTotal />
              <div className="my-6 space-y-3">
                <label className="flex gap-2">
                  <input
                    type="radio"
                    checked={paymentMethod === "online"}
                    onChange={() => setPaymentMethod("online")}
                  />
                  Online Payment
                </label>
                <label className="flex gap-2">
                  <input
                    type="radio"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                  />
                  Cash on Delivery
                </label>
              </div>

              <button className="bg-green-700 hover:bg-green-800 text-white py-3 rounded mt-auto">
                {paymentMethod === "online"
                  ? `Pay ₹${cartTotalAmount}`
                  : `Place Order ₹${cartTotalAmount}`}
              </button>
            </div>
          </div>
        </form>
      </section>
      <Footer />
    </>
  );
}
