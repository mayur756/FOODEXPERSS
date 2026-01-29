import React, { useContext, useEffect, useState } from "react";
import loginImg from "../assets/login.png";
import axios from "axios";
import { toast } from "react-toastify"; // Keep toast import
import { shopcontext } from "../context/Shopcontext";

const Login = () => {
  const { token, setToken, navigate , getUserCart } = useContext(shopcontext);

  const [currState, setCurrState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redirect after login
  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      let res;

      if (currState === "Sign Up") {
        res = await axios.post("http://localhost:4000/api/user/register", {
          name,
          email,
          password,
        });
      } else {
        res = await axios.post("http://localhost:4000/api/user/login", {
          email,
          password,
        });
      }

      console.log("AUTH RESPONSE:", res.data);

      if (res.data.success) {
        toast.success(res.data.message || "Success");

        if (currState === "Sign Up") {
          setCurrState("Login");
          setPassword("");
        } else {
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);

          //fetch user cart data imadately after login

          await getUserCart(res.data.token)
        }
      } else {
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (error) {
      console.log("AUTH ERROR:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Server error");
    }
  };

  return (
    <section className="absolute top-0 left-0 h-full w-full z-50 bg-white">
      <div className="flex h-full w-full">
        {/* Image */}
        <div className="w-1/2 hidden sm:block">
          <img src={loginImg} className="object-cover h-full w-full" />
        </div>

        {/* Form */}
        <div className="flex w-full sm:w-1/2 items-center justify-center">
          <form
            onSubmit={onSubmitHandler}
            className="flex flex-col w-[90%] sm:max-w-md gap-5"
          >
            <h3 className="text-3xl font-bold">{currState}</h3>

            {currState === "Sign Up" && (
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-2 border"
                required
              />
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 border"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border"
              required
            />

            <button className="bg-black text-white py-2">
              {currState === "Sign Up" ? "Create Account" : "Login"}
            </button>

            <p className="text-sm">
              {currState === "Sign Up" ? (
                <>
                  Already have an account?{" "}
                  <span
                    className="cursor-pointer text-gray-600"
                    onClick={() => setCurrState("Login")}
                  >
                    Login
                  </span>
                </>
              ) : (
                <>
                  Don’t have an account?{" "}
                  <span
                    className="cursor-pointer text-gray-600"
                    onClick={() => setCurrState("Sign Up")}
                  >
                    Sign Up
                  </span>
                </>
              )}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
