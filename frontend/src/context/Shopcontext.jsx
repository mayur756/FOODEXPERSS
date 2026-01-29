import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const shopcontext = createContext();

const ShopcontextProvider = ({ children }) => {
  const currency = "₹";
  const delivery_charge = 10;
  const navigate = useNavigate();
  const backendurl = import.meta.env.VITE_BACKEND_URL;

  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [foods, setFoods] = useState([]);

  // ---------------- LOAD TOKEN + CART ----------------
  useEffect(() => {
    const savedToken = localStorage.getItem("token");

    if (savedToken) {
      setToken(savedToken);
      getUserCart(savedToken);  
    }

    getProductData();
  }, []);

  // ---------------- ADD TO CART ----------------
  const addToCart = async (itemId, size) => {
    setCartItems((prev) => {
      const cart = structuredClone(prev);
      if (!cart[itemId]) cart[itemId] = {};
      cart[itemId][size] = (cart[itemId][size] || 0) + 1;
      return cart;
    });

    if (!token) return;

    try {
      await axios.post(
        backendurl + "/api/cart/add",
        { itemId, size },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
    } catch (error) {
      console.log(error);
      toast.error("Cart not saved");
    }
  };

  const clearCart = async () => {
  setCartItems({});

  if (!token) return;

  try {
    await axios.post(
      backendurl + "/api/cart/clear",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
  // ---------------- UPDATE QUANTITY ----------------
  const updatequantity = async (itemId, size, quantity) => {
    const cart = structuredClone(cartItems);
    cart[itemId][size] = quantity;
    setCartItems(cart);

    if (!token) return;

    try {
      await axios.post(
        backendurl + "/api/cart/update",
        { itemId, size, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
    } catch (error) {
      console.log(error);
      toast.error("Failed to update cart");
    }
  };

  // ---------------- GET USER CART ----------------
  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backendurl + "/api/cart/get",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );    

      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load cart");
    }
  };

  // ---------------- CART TOTAL ----------------
 const getCartAmount = () => {
  let total = 0;

  for (const itemId in cartItems) {
    const product = foods.find((f) => f._id === itemId);
    if (!product || !product.price) continue;

    for (const size in cartItems[itemId]) {
      const qty = cartItems[itemId][size];
      const price = product.price[size] || 0;

      total += price * qty;
    }
  }

  return total;
};

  // ---------------- CART COUNT ----------------
  const getCartCount = () => {
    let count = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        count += cartItems[itemId][size];
      }
    }
    return count;
  };

  // ---------------- LOAD PRODUCTS ----------------
  const getProductData = async () => {
    try {
      const res = await axios.get(backendurl + "/api/product/list");
      if (res.data.success) setFoods(res.data.products);
    } catch {
      toast.error("Failed to load products");
    }
  };

  return (
    <shopcontext.Provider
      value={{
        foods,
        currency,
        delivery_charge,
        navigate,
        addToCart,
        cartItems,
        setCartItems,
        updatequantity,
        getCartAmount,
        getCartCount,
        token,
        setToken,
        backendurl,
        getUserCart,
        clearCart
      }}
    >
      {children}
    </shopcontext.Provider>
  );
};

export default ShopcontextProvider;
