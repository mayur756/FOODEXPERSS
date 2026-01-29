import React from 'react'
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaHeadset,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
} from 'react-icons/fa'

export default function Contact() {
  return (
    <>
      {/* CONTACT SECTION */}
      <section className="max-padd-container mt-24 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
          {/* LEFT – FORM */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              Get in <span className="text-green-700">Touch</span>
            </h2>
            <p className="text-gray-600 mb-6">
              Have questions or need help? Send us a message, and
              we’ll get back to you as soon as possible.
            </p>

            <form className="space-y-4">
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-1/2 px-4 py-3 bg-green-100 rounded-md outline-none"
                />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-1/2 px-4 py-3 bg-green-100 rounded-md outline-none"
                />
              </div>

              <textarea
                rows="5"
                placeholder="Write your message here"
                className="w-full px-4 py-3 bg-green-100 rounded-md outline-none resize-none"
              ></textarea>

              <button
                type="submit"
                className="bg-green-700 text-white px-6 py-3 rounded-md hover:bg-green-800 transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* RIGHT – CONTACT DETAILS */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              Contact <span className="text-green-700">Details</span>
            </h2>
            <p className="text-gray-600 mb-6">
              We are always here to assist you! Feel free to reach
              out to us through any of the following methods.
            </p>

            <div className="space-y-5 text-gray-700">
              <div className="flex gap-3 items-start">
                <FaMapMarkerAlt className="text-green-700 mt-1" />
                <div>
                  <h5 className="font-semibold">Location:</h5>
                  <p>Gujarat, India</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <FaEnvelope className="text-green-700 mt-1" />
                <div>
                  <h5 className="font-semibold">Email:</h5>
                  <p>info@foodessa.com</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <FaPhoneAlt className="text-green-700 mt-1" />
                <div>
                  <h5 className="font-semibold">Phone:</h5>
                  <p>+1 (800) 123-4567</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <FaHeadset className="text-green-700 mt-1" />
                <div>
                  <h5 className="font-semibold">Support:</h5>
                  <p>24/7 Support is open</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MAP */}
        <div className="mt-20">
          <h2 className="text-2xl font-semibold mb-4">
            Find us <span className="text-green-700">Here</span>
          </h2>
          <div className="w-full h-72 rounded-xl overflow-hidden shadow-md">
            <iframe
              className="w-full h-full border-0"
              loading="gujarat"
              allowFullScreen
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1173752.241563237!2d70.80215955!3d22.258652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614e35be!2sGujarat!5e0!3m2!1sen!2sin"
              title="Gujarat Map"
            ></iframe>
          </div>
        </div>
      </section>
      {/* footer */}
      <footer className="bg-[#fffdf4] border-t">
        <div className="max-padd-container py-12">
          <h2 className="text-xl font-semibold mb-2">
            Discover flavors that awaken your taste buds.
          </h2>
          <p className="text-gray-600">
            Experience a variety of dishes made with the freshest
            ingredients and bold, authentic flavors.
          </p>
        </div>

        <hr />

        <div className="max-padd-container py-14 grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* BRAND */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-3">
              <span className="text-green-700">F</span>oodexperss
            </h2>
            <p className="text-gray-600 mb-5">
              Looking for something delicious? Explore a variety
              of meals crafted to satisfy your cravings.
            </p>

            <div className="flex bg-green-100 rounded-full overflow-hidden max-w-sm">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent px-4 py-3 outline-none w-full"
              />
              <button className="bg-green-700 text-white px-6 py-3 rounded-full">
                Subscribe
              </button>
            </div>
          </div>

          {/* LINKS */}
          <div>
            <h4 className="font-semibold mb-4">Learn More</h4>
            <ul className="space-y-2 text-gray-600">
              <li>About Us</li>
              <li>Fresh Foods</li>
              <li>Fast Foods</li>
              <li>Hot Deals</li>
              <li>FAQ</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Community</h4>
            <ul className="space-y-2 text-gray-600">
              <li>Terms & Conditions</li>
              <li>Special Offers</li>
              <li>Customer Reviews</li>
            </ul>
          </div>

          {/* CONTACT + SOCIAL */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <p className="text-gray-600">123-456-7890</p>
            <p className="text-gray-600 mb-4">
              info@foodessa.com
            </p>

            <div className="flex gap-3 text-white">
              <FaFacebookF />
              <FaInstagram />
              <FaTwitter />
              <FaYoutube />
              <FaLinkedinIn />
            </div>
          </div>
        </div>

        <div className="bg-green-700 text-white py-3">
          <div className="max-padd-container flex justify-between items-center text-sm">
            <p className='text-white'>2025 Foodessa</p>
            <p className='text-white'>All rights reserved</p>
          </div>
        </div>
      </footer>
    </>
  )
}
