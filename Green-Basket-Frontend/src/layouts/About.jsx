import React from 'react'
import bggreen from '../assets/bggreen2.avif'
import trollypng from '../assets/trolly.png'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div>
      <section className='relative'><main className="flex  justify-center mt-5">
       
  <div className="w-full md:max-w-6xl lg:max-h-[70vh] overflow-hidden">
    <img
      src={bggreen}
      alt=""
      className="md:w-full  md:h-full md:object-cover"
      style={{
        clipPath: "ellipse(100% 80% at 50% 20%)",
      }}
    />

  </div>
  

</main>
<div className='absolute md:left-40 top-10 left-5'>
    <p className='md:text-3xl text-xs md:mb-4 font-extrabold text-white flex flex-col md:gap-3'> <span>Your neighborhood store , delivered</span> <span> to your doorstep . </span></p>
    <p className='md:text-xl text-xs text-gray-200 mt-5 flex flex-col'> <span>A smarter way to shop fresh groceries and essentials </span><span> — fast, reliable, and convenient.</span></p>
  <Link to="/collection" ><button className='md:m-20 m-10 mx-30 bg-lime-300 text-green-950 p-3 rounded-2xl font-bold'>Shop Now</button></Link>
  </div>
  <div className='hidden md:block'>
    <img src={trollypng} alt="" className='w-[40vw]  absolute md:right-20  md:top-10'/>
    
  </div>
</section>
    </div>
  )
}

export default About
