import React from 'react'
import Title from './Title'
import shipping from '../assets/shipping-fast.svg'
import hot from '../assets/hot-food.svg'
import fresh from '../assets/fresh-food.svg'
import hat from '../assets/hat-chef.svg'

function Features() {

  const data = [
    { img: shipping, title: "Fast Delivery", text: "Get your order quickly with our reliable and efficient services" },
    { img: hot, title: "Hot Foods", text: "Savor freshly prepared, steaming hot meals delivered to you" },
    { img: fresh, title: "Fresh Foods", text: "We serve meals made from the freshest and finest ingredients daily" },
    { img: hat, title: "Expert Chefs", text: "Our skilled chefs craft every dish with passion and precision" },
  ]

  return (
    <section className="max-padd-container py-14 sm:py-20 xl:py-28">

      <Title
        title1="WHY CHOOSE"
        title2="US"
        titlestyles="text-center"
        parastyle="block"
      />

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

        {data.map((item, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center gap-4 bg-deep p-6 rounded-xl transition duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <img src={item.img} alt={item.title} className="w-12 h-12" />

            <div>
              <h5 className="h5">{item.title}</h5>
              <div className="w-10 h-1 bg-secondary mx-auto mt-2 rounded-full" />
            </div>

            <p className="text-sm sm:text-base text-gray-600">
              {item.text}
            </p>
          </div>
        ))}

      </div>
    </section>
  )
}

export default Features
