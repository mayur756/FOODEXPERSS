import React, { useState } from 'react'
import loginImg from '../assets/login.png'
import axios from 'axios'
import { backendurl } from '../App'
import { toast } from 'react-toastify'

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        `${backendurl}/api/user/admin`,
        { email, password }
      )

      if (response.data.success) {
        setToken(response.data.token) 
        toast.success("Login successful")
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || "Login failed")
    }
  }

  return (
    <div className="absolute top-0 left-0 h-full w-full z-50 bg-white">
      <div className="flex h-full w-full">

        {/* Image side */}
        <div className="w-1/2 hidden sm:block">
          <img src={loginImg} alt="" className="object-cover h-full w-full" />
        </div>

        {/* Form side */}
        <div className="flexCenter w-full sm:w-1/2">
          <form
            onSubmit={onSubmitHandler}
            className="flex flex-col items-center w-[90%] sm:max-w-md m-auto gap-y-5 text-gray-800"
          >
            <div className="w-full mb-4">
              <h3 className="bold-36">Admin Panel</h3>
            </div>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-3 py-2 ring-1 ring-slate-900/10 rounded bg-primary"
              required
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-3 py-2 ring-1 ring-slate-900/10 rounded bg-primary"
              required
            />

            <button
              type="submit"
              className="btn-dark w-full mt-5 !py-[7px] !rounded"
            >
              Login
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}

export default Login
