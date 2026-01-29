import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaSquarePlus } from 'react-icons/fa6'
import { FaListAlt } from 'react-icons/fa'
import { MdFactCheck } from 'react-icons/md'
import { BiLogOut } from 'react-icons/bi'

const Sidebar = ({setToken}) => {
  return (
    <div className="bg-[#fbfbf5] min-h-screen w-[230px] border-r border-gray-200">

      <div className="flex flex-col pt-14 h-full">

        {/* Logo */}
        <div className="flex items-center gap-1 pl-10 text-2xl font-bold mb-10">
          <span className="inline-flex items-center justify-center p-2 h-8 w-8 
                          bg-secondary text-white -rotate-[31deg] rounded-full">
            F
          </span>
          oodessa
        </div>

        {/* Menu */}
        <div className="flex flex-col gap-6">

          {/* Add Item */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `relative flex items-center gap-3 pl-10 pr-4 py-2 rounded-md
               ${isActive
                ? 'bg-[#e9f7d8] bg-secondary font-medium'
                : 'text-gray-700 hover:bg-[#f1f8e8]'}`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute left-0 top-0 h-full w-1 bg-secondary rounded-r"></span>
                )}
                <FaSquarePlus />
                <span>Add Item</span>
              </>
            )}
          </NavLink>

          {/* List */}
          <NavLink
            to="/list"
            className={({ isActive }) =>
              `relative flex items-center gap-3 pl-10 pr-4 py-2 rounded-md
               ${isActive
                ? 'bg-[#e9f7d8] bg-secondary font-medium'
                : 'text-gray-700 hover:bg-[#f1f8e8]'}`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute left-0 top-0 h-full w-1 bg-secondary rounded-r"></span>
                )}
                <FaListAlt />
                <span>List</span>
              </>
            )}
          </NavLink>

          {/* Orders */}
          <NavLink
            to="/orders"
            className={({ isActive }) =>
              `relative flex items-center gap-3 pl-10 pr-4 py-2 rounded-md
               ${isActive
                ? 'bg-[#e9f7d8] bg-secondary font-medium'
                : 'text-gray-700 hover:bg-[#f1f8e8]'}`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute left-0 top-0 h-full w-1 bg-secondary rounded-r"></span>
                )}
                <MdFactCheck />
                <span>Orders</span>
              </>
            )}
          </NavLink>

        </div>

        {/* Logout */}
        <div className="mt-auto pl-10 pb-6">
          <button onClick={()=>setToken('')} className="flex items-center gap-3 text-red-600 px-3 py-2 rounded-md">
            <BiLogOut />
            <span>Logout</span>
          </button>
        </div>

      </div>
    </div>
  )
}

export default Sidebar
