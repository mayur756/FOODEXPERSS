import React, { useContext, useState } from 'react'
import { FaStar, FaStarHalfStroke } from 'react-icons/fa6'
import { TbShoppingBagPlus } from 'react-icons/tb'
import { shopcontext } from '../context/Shopcontext'

function Item({ food }) {
  const { currency, addToCart } = useContext(shopcontext)

  if (!food) return null

  const defaultSize =
    Array.isArray(food.sizes) && food.sizes.length > 0
      ? food.sizes[0]
      : null

  const [size, setSize] = useState(defaultSize)

  return (
    <div className="relative flex rounded-xl bg-deep overflow-visible">

      {/* IMAGE */}
      <div className="absolute -left-[70px] top-1/2 -translate-y-1/2
                      h-[155px] w-[155px] flexCenter bg-white
                      rounded-full shadow">
        <img
          src={food.image}
          alt={food.name}
          className="h-full w-full object-contain rounded-full"
        />
      </div>

      {/* CONTENT */}
      <div className="pl-28 pr-4 py-4 w-full">

        {/* TITLE */}
        <h4 className="bold-16 line-clamp-1 mb-1">{food.name}</h4>

        <div className="flex items-center justify-between mb-2">
          <h5 className="medium-14">{food.category}</h5>
          <div className="flex gap-1 text-secondary">
            <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfStroke />
          </div>
        </div>

        <p className="line-clamp-2 text-sm mb-3">{food.description}</p>

        {/* SIZES */}
        {Array.isArray(food.sizes) && (
          <div className="flex gap-1 mb-3">
            {[...food.sizes]
              .sort((a, b) => {
                const order = ["H", "F", "S", "M", "L", "XL"]
                const indexA = order.indexOf(a) === -1 ? 999 : order.indexOf(a)
                const indexB = order.indexOf(b) === -1 ? 999 : order.indexOf(b)
                return indexA - indexB
              })
              .map((item) => (
                <button
                  key={item}
                  onClick={() => setSize(item)}
                  aria-label={`Select size ${item}`}
                  className={`h-6 w-6 rounded-sm font-semibold transition-colors
                    ${item === size ? "bg-secondary text-white" : "bg-light"}`}
                >
                  {item}
                </button>
              ))}
          </div>
        )}

        {/* FOOTER */}
        <div className="flex items-center justify-between text-xs font-semibold">
          <div className="flex gap-1">
            <span>Prep:</span>
            <span>{food.prepTime || "20m"}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-secondary">
              {size && food.price?.[size]
                ? `${currency}${food.price[size]}`
                : "--"}
            </span>

            <button
              onClick={()=>addToCart(food._id,size)}
              disabled={!size}
              className={`p-1 rounded-sm text-lg transition-colors
                ${size ? "bg-secondary text-white" : "bg-gray-300 cursor-not-allowed"}`}
              aria-label="Add to cart"
            >
              <TbShoppingBagPlus />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Item
