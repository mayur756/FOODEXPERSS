import React from 'react'
import Hero from '../Components/Hero'
import Features from '../Components/Features'
import PopularFood from '../Components/PopularFood'
import Testmonital from '../Components/Testmonital'
import Footer from '../Components/Footer'
const Home = () => {
  return (
    <>
      <Hero/>
      <Features/>
      <PopularFood/>
      <Testmonital/>
      <div>
        <Footer/>
      </div>
    </>
  )
}

export default Home
