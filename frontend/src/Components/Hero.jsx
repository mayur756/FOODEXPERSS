import React from 'react'
import { Link } from 'react-router-dom'
import bg from '../assets/bg.png'
import {TbTruckDelivery} from 'react-icons/tb'
import {IoPeopleCircleOutline} from 'react-icons/io5'
import {IoMdRestaurant} from 'react-icons/io'
import {AiFillShop} from 'react-icons/ai'
import {PiChefHatFill} from 'react-icons/pi'
function Hero() {
    return (
        <div className='bg-deep'>
            <section className='max-padd-container py-20 xl:py-36'>
            <div className='flexCenter gap-6 flex-col xl:flex-row'>
                {/* left side */}
                <div className='flex flex-1 flex-col pt-12 xl:pt-32'>
                    <h1 className='h1 max-w-[46rem]'>Grab Exclusive <span className='inline-flex'>
                        <span className='inline-flex items-center justify-center p-5 h-16 w-16 bg-secondary text-white -rotate-[31deg] rounded-full'>F</span>ood
                    </span>experss Discount Now!</h1>
                    <p>Foodessa, a world of flavors, freshness, and delight. Discover dishes that satisfy your cravings, excite your taste buds, and bring people together. From classic favorites to modern delights, find the perfect meal for every moment</p>
                    <div className='mt-6'>
                        <Link to={'/menu'} className='btn-secondary'>Explore Now</Link>
                    </div>
                </div>
                {/* right side */}
                <div className='flex flex-1 relative z-10 top-12'>
                    <div className='relative'>
                        <img src={bg} alt='bg' height={666} width={666}></img>
                        {/* Badge */}
                        <div className='hidden sm:block absolute top-8 right-14 max-w-48 bg-light shadow-sm pl-2 py-2 rounded-xl'>
                            <div className='flex gap-2'>
                                <TbTruckDelivery className='text-secondary' size={31}/>
                                <h5 className='h5 relative top-1'>Fast Delivery</h5>
                            </div>
                            <p>Fresh,hot meals at your doorstep</p>
                        </div>
                        <div className='hidden sm:block absolute top-52 right-6 max-w-60 bg-light shadow-sm p-2 rounded-xl'>
                            <div className='flex gap-2'>
                                <IoMdRestaurant className='text-secondary' size={26}/>
                                <h5 className='h5'>99+Dishes</h5>
                            </div>
                        </div>
                         <div className='hidden sm:block absolute top-34  right-12 max-w-48  bg-light shadow-sm pl-2 py-2 rounded-xl'>
                            <div className='flex gap-2'>
                                <AiFillShop  className='text-secondary' size={23}/>
                                <h5 className='h5'>200+Branches</h5>
                            </div>
                            <p>Bring  great food closer for you</p>
                        </div>
                         <div className='hidden sm:block absolute top-28  left-3 max-w-48  bg-light shadow-sm pl-2 py-2 rounded-xl'>
                            <div className='flex gap-2'>
                                <IoPeopleCircleOutline className='text-secondary' size={31}/>
                                <h5 className='h5 relative top-1'>Happy Custmor</h5>
                            </div>
                            <p>Serving smiles with every delicous bite</p>
                        </div>
                        <div className='hidden sm:block absolute top-72  left-3 max-w-48  bg-light shadow-sm  p-2 rounded-xl'>
                            <div className='flex gap-2'>
                                <PiChefHatFill className='text-secondary' size={27}/>
                                <h5 className='h5 relative top-1'>Expert Cooks</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </div>
    )
}

export default Hero
