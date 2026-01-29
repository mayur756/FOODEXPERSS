import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa'

function Footer() {
  return (
    <footer className="bg-[#fdfbf6] pt-16">

      {/* Top Text */}
      <div className="text-center px-4">
        <h3 className="text-xl sm:text-2xl font-semibold mb-3">
          Discover Flavours that awaken your taste buds.
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
          Experience a variety of dishes made with the freshest ingredients and bold,
          authentic flavors. Enjoy a delicious journey.
        </p>
        <hr className="my-10 border-gray-300" />
      </div>

      {/* Main Footer */}
      <div className="max-padd-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-14">

        {/* Logo + Subscribe */}
        <div>
          <Link to="/" className="flex items-center text-2xl font-bold mb-3">
            <span className="flex items-center justify-center h-8 w-8 bg-secondary text-white rounded-full mr-1">
              F
            </span>
            oodessa
          </Link>

          <p className="text-sm text-gray-600 mb-4">
            Looking for something delicious? Explore a variety of mouthwatering meals,
            crafted to satisfy your cravings and bring joy to every occasion.
          </p>

          <div className="flex w-full">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-l-full outline-none border text-sm"
            />
            <button className="bg-secondary text-white px-5 rounded-r-full text-sm font-semibold">
              Subscribe
            </button>
          </div>
        </div>

        {/* Learn More */}
        <div>
          <h5 className="font-semibold mb-4">Learn More</h5>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="hover:text-secondary cursor-pointer">About Us</li>
            <li className="hover:text-secondary cursor-pointer">Fresh Foods</li>
            <li className="hover:text-secondary cursor-pointer">Fast Foods</li>
            <li className="hover:text-secondary cursor-pointer">Hot Deals</li>
            <li className="hover:text-secondary cursor-pointer">Popular Foods</li>
            <li className="hover:text-secondary cursor-pointer">FAQ</li>
          </ul>
        </div>

        {/* Our Community */}
        <div>
          <h5 className="font-semibold mb-4">Our Community</h5>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="hover:text-secondary cursor-pointer">Terms & Conditions</li>
            <li className="hover:text-secondary cursor-pointer">Special Offers</li>
            <li className="hover:text-secondary cursor-pointer">Customer Reviews</li>
          </ul>
        </div>

        {/* Contact + Social */}
        <div>
          <h5 className="font-semibold mb-4">Contact Us</h5>
          <ul className="space-y-2 text-sm text-gray-600 mb-4">
            <li>📞 123-456-7890</li>
            <li>📧 info@foodessa.com</li>
          </ul>

          <h5 className="font-semibold mb-3">Social</h5>
          <div className="flex gap-4 text-secondary text-lg">
            <FaFacebookF className="cursor-pointer hover:scale-110 transition" />
            <FaInstagram className="cursor-pointer hover:scale-110 transition" />
            <FaTwitter className="cursor-pointer hover:scale-110 transition" />
            <FaLinkedinIn className="cursor-pointer hover:scale-110 transition" />
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="bg-secondary text-white text-sm py-3 px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
        <span>© 2025 Foodessa</span>
        <span>All rights reserved</span>
      </div>

    </footer>
  )
}

export default Footer
