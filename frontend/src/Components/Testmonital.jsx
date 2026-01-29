import React from 'react'
import Title from './Title'
import { FaCheck, FaStar } from 'react-icons/fa6'
import user1 from '../assets/testimonials/user1.png'
import user2 from '../assets/testimonials/user2.png'
import food1 from '../assets/food_1.png'
import food2 from '../assets/food_2.png'
import food3 from '../assets/food_12.png'
import food4 from '../assets/food_44.png'

function Testmonital() {
  return (
    <section className="py-14 sm:py-20">

      <Title
        title1="DELICIOUS"
        title2="REVIEWS"
        titlestyles="text-center"
        parastyle="block"
      />

      <div className="max-padd-container mt-12">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-12">

          {/* Left */}
          <div className="hidden lg:flex flex-col justify-between">
            <Title title1="What People" title2="Says" parastyle="block" />

            <div className="bg-deep p-4 rounded-xl mt-10">
              <div className="flex text-secondary gap-1 text-lg">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              <p className="mt-2 text-sm">
                More than <b>25,000+</b> reviews
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Card */}
            <div className="bg-deep p-5 rounded-xl hover:shadow-lg transition">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img src={user1} className="w-10 h-10 rounded-full" />
                  <h5 className="font-semibold">John Doe</h5>
                </div>
                <span className="bg-secondary text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
                  <FaCheck /> Verified
                </span>
              </div>

              <div className="flex text-secondary mt-4">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>

              <h4 className="font-semibold mt-2">High Quality</h4>
              <p className="text-sm text-gray-600 mt-2">
                The food was absolutely delicious! Every bite was bursting with flavor and arrived fresh.
              </p>

              <div className="flex gap-2 mt-4">
                <img src={food1} className="w-12 h-12 rounded object-cover" />
                <img src={food2} className="w-12 h-12 rounded object-cover" />
              </div>
            </div>

            {/* Card */}
            <div className="bg-deep p-5 rounded-xl hover:shadow-lg transition">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img src={user2} className="w-10 h-10 rounded-full" />
                  <h5 className="font-semibold">Iza</h5>
                </div>
                <span className="bg-secondary text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
                  <FaCheck /> Verified
                </span>
              </div>

              <div className="flex text-secondary mt-4">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>

              <h4 className="font-semibold mt-2">Amazing Taste</h4>
              <p className="text-sm text-gray-600 mt-2">
                Everything was hot, fresh, and perfectly cooked. I will definitely order again!
              </p>

              <div className="flex gap-2 mt-4">
                <img src={food3} className="w-12 h-12 rounded object-cover" />
                <img src={food4} className="w-12 h-12 rounded object-cover" />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

export default Testmonital
