import { button, div } from 'framer-motion/client'
import React from 'react'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'

const PaymentModal = ({cartId}) => {
  const [total, settotal] = useState(0)
  const [Paymentverified, setPaymentverified] = useState(false)
  useEffect(() => {
    const fetchOrderAmount = async()=>{
      const details = await fetch(`http://localhost:3000/api/cart/gettotal/${cartId}`,{method:"GET",headers:{"Content-Type":"application/json"}})
      const data = await details.json()
      
      settotal(data.data)


    }
  fetchOrderAmount()
   
  }, [cartId])

const delay = (ms)=>{
  return new Promise(resolve=>setTimeout(resolve,ms))
  
}

  const handlePayment = async()=>{
    if (!cartId) return;
    await delay(2000);
    setPaymentverified(true)
   
     await fetch(`http://localhost:3000/api/cart/postOrderDetails/${cartId}`,{method:"POST",headers:{"Content-Type":"application/json"}})

  }

  return (
    <div className='w-full backdrop-blur-lg absolute top-0 inset-0'>
    <div className='absolute container w-[60vw] md:w-[40vw] border shadow-2xl shadow-white border-green-950 md:px-20 p-8 rounded-4xl bg-white h-96 top-10 left-20 md:top-40 md:left-96 backdrop-blur-lg'>
      <div className={`flex flex-col ${!Paymentverified && "gap-40"} m-auto items-center p-6 ${Paymentverified && "gap-5"}`}>
      <h3 className={`flex gap-5 items-center`}><span className='md:text-2xl font-bold text-xl'>  Amount to be pay :</span><span className='md:text-xl '>₹ {total}</span> </h3>
     {Paymentverified && <div className='md:m-5'>
          <lord-icon
    src="https://cdn.lordicon.com/fsstjlds.json"
    trigger="hover"
    stroke="bold"
    state="hover-loading"
    colors="primary:#109121"
    style={{width:"70px",height:"70px"}}>
</lord-icon>
       </div>}  


      <button className={`bg-lime-400 md:p-3 rounded-2xl md:w-[30vh] ${Paymentverified}`} onClick={handlePayment}>{Paymentverified?"Payment Verified":"Pay Now"}</button>
      </div>
      {Paymentverified && <Link to="/yourOrders"><button className=' md:w-[40vh] text-center bg-blue-700 ml-10 rounded-2xl p-1 md:p-2 m-auto text-white'>view your Order</button></Link>}


        </div>
    </div>
  )
}

export default PaymentModal
