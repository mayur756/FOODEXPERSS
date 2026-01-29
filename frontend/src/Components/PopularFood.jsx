import React, { useContext, useEffect, useState } from 'react'
import { shopcontext } from '../context/Shopcontext'
import Title from './Title'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'
import Item from './Item'

function PopularFood() {
  const { foods } = useContext(shopcontext)
  const [popularFoods, setPopularFoods] = useState([])

  useEffect(() => {
    if (Array.isArray(foods)) {
      const data = foods.filter(item => item.popular === true)
      setPopularFoods(data.slice(0, 8))
    }
  }, [foods])

  return (
    <section className="max-padd-container py-14 sm:py-20">

      <Title
        title1="Popular"
        title2="Foods"
        titlestyles="text-center"
        parastyle="block"
      />

      <Swiper
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          480: { slidesPerView: 1.3 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        modules={[Autoplay, Pagination]}
        className="mt-10 !pb-12"
      >
        {popularFoods.map(food => (
          <SwiperSlide key={food._id} className="px-2">
            <Item food={food} />
          </SwiperSlide>
        ))}
      </Swiper>

    </section>
  )
}

export default PopularFood
