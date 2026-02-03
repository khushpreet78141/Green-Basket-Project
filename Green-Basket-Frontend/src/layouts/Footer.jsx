import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer className='md:m-20 pb-36 pt-10 light gap-2 flex items-center justify-evenly '>
        
       <div className="flex items-center ">
            <lord-icon
              src="https://cdn.lordicon.com/xazzumfu.json"
              trigger="hover"
              style={{ width: "40px", height: "40px" }}
            />
            <p className="font-semibold md:text-xl">
              Green<span className="text-orange-500 md:text-2xl font-bold">𝕭</span>asket
            </p>
          </div>
          <div className='flex md:gap-10 gap-4'>
            <div>
                <h3 className='md:font-bold my-3 '>Department</h3>
                <ul className='text-gray-700  md:text-[16px] text-[12px]'>
                    <li className='hover:scale-105 tracking-tighter transition-transform '>Fashion</li>
                    <li className='hover:scale-105 tracking-tighter transition-transform '>Education Product</li>
                    <li className='hover:scale-105 tracking-tighter transition-transform '>Frozen Food</li>
                    <li className='hover:scale-105 tracking-tighter transition-transform '>Bevarages</li>
                    <li className='hover:scale-105 tracking-tighter transition-transform '>Organic Grocery</li>
                    
                    
                </ul>
            </div>
            <div>
                <h3 className='md:font-bold my-3 '>About Us</h3>
                <ul className='text-gray-700  md:text-[16px] text-[12px]'>
                    <li className='hover:scale-105 tracking-tighter transition-transform '>About Shopchart</li>
                    <li className='hover:scale-105 tracking-tighter transition-transform '>Careers</li>
                    <li className='hover:scale-105 tracking-tighter transition-transform '>News and Blogs</li>
                    <li className='hover:scale-105 tracking-tighter transition-transform '>Help</li>
                    <li className='hover:scale-105 tracking-tighter transition-transform '>Process Center</li>
                    
                </ul>
            </div><div className='hidden md:block'>
                <h3 className='md:font-bold my-3 '>Help</h3>
                <ul className='text-gray-700  md:text-[16px] text-[12px]'>
                    <li className='hover:scale-105 tracking-tighter transition-transform '>Shopcart Help</li>
                    <li className='hover:scale-105 tracking-tighter transition-transform '>Returns</li>
                    <li className='hover:scale-105 tracking-tighter transition-transform '>track orders</li>
                    <li className='hover:scale-105 tracking-tighter transition-transform '>contact us</li>  
                </ul>
            </div>
          </div>

        
      </footer>
    </div>
  )
}

export default Footer
