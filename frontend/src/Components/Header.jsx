import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { RiShoppingBasketLine, RiUserLine } from 'react-icons/ri';
import { TbUserCircle, TbArrowNarrowRight } from 'react-icons/tb';
import { CgMenuLeft } from "react-icons/cg";
import { shopcontext } from '../context/Shopcontext';

export default function Header() {
  const { getCartCount, navigate, token, setToken, clearCart } = useContext(shopcontext);
  const [menuOpened, setMenuOpened] = useState(false);

  const toggleMenu = () => setMenuOpened(!menuOpened);

  const logout = async () => {
    await clearCart();
    localStorage.removeItem("token");
    setToken("");
    navigate("/login");
  };

  return (
    <header className="py-3 w-full sticky top-0 bg-white z-50 shadow-sm">
      <div className="max-padd-container flexBetween">

        {/* Logo */}
        <Link to="/" className="bold-24 flex">
          <span className="inline-flex">
            <span className="inline-flex items-center justify-center p-2 h-8 w-8 bg-secondary text-white -rotate-[31deg] rounded-full">
              F
            </span>
            ood
          </span>experss
        </Link>

        {/* Desktop Navbar */}
        <div className="hidden xl:flex">
          <Navbar />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 sm:gap-6">

          {/* Cart */}
          <Link to="/cart" className="relative">
            <RiShoppingBasketLine className="text-2xl" />
            {getCartCount() > 0 && (
              <span className="bg-secondary text-white medium-14 absolute left-3.5 -top-2.5 flexCenter w-4 h-4 rounded-full">
                {getCartCount()}
              </span>
            )}
          </Link>

          {/* Login / User */}
          <div className="group relative">
            {token ? (
              <>
                <button className="btn-outline !border-none flexCenter !py-3">
                  <TbUserCircle className="text-xl" />
                </button>

                <ul className="hidden group-hover:flex flex-col absolute right-0 top-11 bg-white shadow-lg rounded-md w-32 p-2 ring-1 ring-slate-200 z-50">
                  <li
                    onClick={() => navigate('/order')}
                    className="px-2 py-1 cursor-pointer hover:bg-gray-100 rounded flex justify-between"
                  >
                    Orders <TbArrowNarrowRight />
                  </li>

                  <hr />

                  <li
                    onClick={logout}
                    className="px-2 py-1 cursor-pointer hover:bg-gray-100 rounded flex justify-between"
                  >
                    Logout <TbArrowNarrowRight />
                  </li>
                </ul>
              </>
            ) : (
              <button onClick={() => navigate('/login')} className="btn-outline flexCenter gap-2">
                Login <RiUserLine />
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <CgMenuLeft
            onClick={toggleMenu}
            className="text-2xl cursor-pointer xl:hidden"
          />
        </div>
      </div>

      {/* Dark Overlay */}
      {menuOpened && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* Mobile Slide Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-[260px] bg-white shadow-xl z-50 p-6 transform transition-transform duration-300
        ${menuOpened ? "translate-x-0" : "-translate-x-full"} xl:hidden`}
      >
        <Navbar toggleMenu={() => setMenuOpened(false)} />
      </div>
    </header>
  );
}
