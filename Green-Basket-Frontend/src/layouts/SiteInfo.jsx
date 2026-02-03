import React from 'react'
import deliverboy from '../assets/deliveryboy.png'
const SiteInfo = () => {
  return (
    
      <div className='darkpink   text-white m-2 items-center text-shadow-2xs  text-shadow-white flex text-[12px] md:text-2xl rounded-4xl p-4 md:w-4xl md:m-auto'>
        <p className='p-4 md:leading-15 text-orange-300'>"Fast, reliable delivery powered by our dedicated partners on the move.
Bringing fresh, quality essentials from the market straight to your doorstep."</p>


<div><img src={deliverboy} alt="" className='w-[700px] '/></div>
    </div>

  )
}

export default SiteInfo
