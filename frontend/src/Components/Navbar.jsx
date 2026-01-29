import React from 'react'
import { TbHomeFilled } from 'react-icons/tb'
import { IoMdListBox } from 'react-icons/io'
import { IoMailOpen } from 'react-icons/io5'
import { FaTimes } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

export default function Navbar({ toggleMenu }) {

  const navItems = [
    { to: '/', label: 'Home', icon: <TbHomeFilled /> },
    { to: '/menu', label: 'Menu', icon: <IoMdListBox /> },
    { to: '/contact', label: 'Contact', icon: <IoMailOpen /> },
  ]

  return (
    <nav className="flex flex-col xl:flex-row gap-8">

      {/* Mobile Header */}
      <div className="flex items-center justify-between xl:hidden mb-6">
        <h4 className="bold-24 text-secondary">Foodexpress</h4>
        <FaTimes
          onClick={toggleMenu}
          className="text-xl cursor-pointer"
        />
      </div>

      {/* Nav Items */}
      {navItems.map(({ to, label, icon }) => (
        <NavLink
          key={label}
          to={to}
          onClick={toggleMenu}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md transition
            ${isActive ? "bg-secondary text-white" : "text-gray-700 hover:bg-gray-100"}`
          }
        >
          <span className="text-xl">{icon}</span>
          <span className="medium-16">{label}</span>
        </NavLink>
      ))}

    </nav>
  )
}
