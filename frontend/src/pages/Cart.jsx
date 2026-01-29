import React, { useContext, useEffect, useState } from 'react';
import { shopcontext } from '../context/Shopcontext';
import Title from '../Components/Title';
import { FaPlus, FaMinus } from 'react-icons/fa6';
import { FaRegWindowClose } from 'react-icons/fa';
import CartTotal from './CartTotal';
import { toast } from 'react-toastify';
import Footer from '../Components/Footer';

export default function Cart() {
  const {
    foods,
    cartItems,
    currency,
    updatequantity,
    navigate,
    getCartAmount
  } = useContext(shopcontext);

  const cartTotalAmount = getCartAmount();

  const [cartData, setCartData] = useState([]);
  const [quantity, setQuantity] = useState({});

  // Build cart list
  useEffect(() => {
    if (foods.length > 0) {
      const tempData = [];
      const initialQuantity = {};

      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          const qty = cartItems[itemId][size];
          if (qty > 0) {
            tempData.push({
              _id: itemId,
              size,
              quantity: qty
            });

            initialQuantity[`${itemId}-${size}`] = qty;
          }
        }
      }

      setCartData(tempData);
      setQuantity(initialQuantity);
    }
  }, [cartItems, foods]);

  // Redirect if cart empty
  useEffect(() => {
    if (cartTotalAmount <= 0 && cartData.length === 0) {
      toast.warning("Your cart is empty");
      navigate("/");
    }
  }, [cartTotalAmount, cartData, navigate]);

  const increment = (id, size) => {
    const key = `${id}-${size}`;
    const newValue = quantity[key] + 1;

    setQuantity(prev => ({ ...prev, [key]: newValue }));
    updatequantity(id, size, newValue);
  };

  const decrement = (id, size) => {
    const key = `${id}-${size}`;
    if (quantity[key] > 1) {
      const newValue = quantity[key] - 1;
      setQuantity(prev => ({ ...prev, [key]: newValue }));
      updatequantity(id, size, newValue);
    }
  };

  const removeItem = (id, size) => {
    const key = `${id}-${size}`;

    setQuantity(prev => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });

    updatequantity(id, size, 0);
  };

  return (
    <>
      <section className="max-padd-container mt-24">
      <Title title1="Cart" title2="List" titlestyles="h3" />

      <div className="space-y-4 mt-6">
        {cartData.map((item, i) => {
          const productData = foods.find(
            product => product._id === item._id
          );

          if (!productData) return null;

          const key = `${item._id}-${item.size}`;

          return (
            <div
              key={i}
              className="flex items-center justify-between bg-green-100 rounded-xl p-4 hover:shadow-md transition-all"
            >
              {/* LEFT */}
              <div className="flex items-center gap-4">
                <img
                  src={productData.image}
                  className="w-14 h-14 rounded-full object-cover"
                  alt=""
                />

                <div className="flex flex-col">
                  <h5 className="font-semibold text-gray-800">
                    {productData.name}
                  </h5>
                  <p className="text-sm text-gray-600">
                    {item.size}
                  </p>

                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => decrement(item._id, item.size)}
                      className="w-6 h-6 flex items-center justify-center bg-green-600 text-white rounded-full"
                    >
                      <FaMinus className="text-xs" />
                    </button>

                    <span className="font-medium">
                      {quantity[key]}
                    </span>

                    <button
                      onClick={() => increment(item._id, item.size)}
                      className="w-6 h-6 flex items-center justify-center bg-green-600 text-white rounded-full"
                    >
                      <FaPlus className="text-xs" />
                    </button>
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex flex-col items-end gap-2">
                <FaRegWindowClose
                  onClick={() => removeItem(item._id, item.size)}
                  className="cursor-pointer text-gray-500 hover:text-red-500"
                />

                <p className="font-semibold text-gray-800">
                  {currency}
                  {productData.price[item.size] * quantity[key]}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* CART TOTAL */}
      <div className="flex my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <button
            onClick={() => navigate('/Placeorder')}
            className="btn-secondary mt-7"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
}
