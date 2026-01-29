import React, { useContext } from 'react'
import { shopcontext } from '../context/Shopcontext'
import Title from '../Components/Title'

function CartTotal() {
  const { currency, delivery_charge, getCartAmount } =
    useContext(shopcontext)

  const subtotal = getCartAmount()
  const total =
    subtotal === 0 ? 0 : subtotal + delivery_charge

  return (
    <div>
      <Title title1="Cart" title2="Total" titlestyles="h3" />

      <div className="flexBetween pt-3">
        <h5 className='h5'>Subtotal:</h5>
        <p className='h5'>
          {currency}
          {subtotal}.00
        </p>
      </div>

      <hr className="mx-auto h-[1px] w-full bg-gray-900/10 my-1" />

      <div className="flexBetween pt-3">
        <h5 className='h5'>Shipping Fee:</h5>
        <p className='h5'>
          {subtotal === 0
            ? "0.00"
            : `${currency}${delivery_charge}.00`}
        </p>
      </div>
       <hr className="mx-auto h-[1px] w-full bg-gray-900/10 my-1" />
      <div className="flexBetween pt-3">
        <h5 className='h5'>Total:</h5>
        <p className='h5'>
          {currency}
          {total}.00
        </p>
      </div>
      <hr className="mx-auto h-[1px] w-full bg-gray-900/10 my-1" />
    </div>
  )
}

export default CartTotal
