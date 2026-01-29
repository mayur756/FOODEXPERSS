import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import Sidebar from './Components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Order from './pages/Order'
import { useEffect, useState } from 'react'
import Login from './Components/Login'



export const backendurl=import.meta.env.VITE_BACKEND_URL;
export const currency ="₹"
export default function App() {
  const [token,setToken]=useState(localStorage.getItem('token') ?localStorage.getItem('token'):'')

  useEffect(()=>{
    localStorage.setItem('token',token)
  },[token])
  return (
    <main>
      <ToastContainer />
      {token===""?(<Login setToken={setToken}/>):(
          <div className="text-[#404040]">
        <div className="mx-auto  flex min-h-screen">
          {/* Sidebar */}
          <Sidebar setToken={setToken} />
          {/* RIGHT CONTENT */}
          <div className="flex-1 bg-[#eef9df] px-8 py-6">
            <Routes>
              <Route path="/" element={<Add token={token}/>} />
              <Route path="/list" element={<List token={token}/>} />
              <Route path="/orders" element={<Order token={token}/>} />
            </Routes>
          </div>

        </div>
      </div>
      )}
    </main>
  )
}
