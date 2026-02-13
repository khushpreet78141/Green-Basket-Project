import { button, div } from 'framer-motion/client'
import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { clearCart } from '../redux/slices/cartSlice'
import { useDispatch } from 'react-redux'

const PaymentModal = () => {
  const cartItems = useSelector((state) => state.cart.cartItems)
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const [Paymentverified, setPaymentverified] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(Paymentverified){
      setTimeout(() => {
        navigate("/yourOrders");
      },2000);
    }
  
    return () => {
      clearTimeout()
    }
  }, [Paymentverified,navigate])
  
  
  const handlePayment = async () => {

    if (!cartItems) return;
    
    const res = await fetch(`http://localhost:3000/api/cart/postOrderDetails`, {
      method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({
        items: cartItems,
        totalAmount: total
      })
    })
    const data1 = await res.json();


    const makePayment = await fetch(`http://localhost:3000/api/payment/proceedPayment`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`},body:JSON.stringify({orderId:data1.order.orderId,amount:data1.order.totalAmount})});
    const data2 = await makePayment.json()
    const verifiedPayment = await fetch(`http://localhost:3000/api/payment/verify-payment`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`},body:JSON.stringify({paymentId:data2.paymentOrder.paymentId,orderId:data1.order.orderId,status:data2.paymentOrder.status})});
    const isVerified = await verifiedPayment.json()
    if(isVerified.success){
      setPaymentverified(true)
    dispatch(clearCart())
  }
    
  }

  return (
    <div className='w-full backdrop-blur-lg absolute top-0 inset-0'>
      <div className='absolute container w-[60vw] md:w-[40vw] border shadow-2xl shadow-white border-green-950 md:px-20 md:p-8 p-3 rounded-4xl bg-white h-96 top-10 left-20 md:top-40 md:left-96 backdrop-blur-lg'>
        <div className={`flex flex-col md:gap-10 gap-5 m-auto items-center md:p-6 `}>
          <div className='flex flex-col items-center text-[14px] md:text-[16px] gap-4'>
            <span>your details</span>
            <span>CARD - NUMBER : 111 111 1111</span>
            <span>Payment-Mode : Online</span>
          </div>
        <h3 className={`flex gap-5 items-center ${Paymentverified&&"hidden"}`}><span className='md:text-2xl font-bold text-[16px]'>  Amount to be pay :</span><span className='md:text-xl '>₹ {total}</span> </h3>
         <h3 className={`flex gap-5 items-center ${Paymentverified&&"hidden"}`}><span className='md:text-2xl font-bold text-[16px]'>  Total no.of items :</span><span className='md:text-xl '> {cartItems.length}</span> </h3>
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

        <button className={`green text-white p-2 rounded-2xl font-bold  disabled:bg-[rgb(90,115,112)]
    disabled:cursor-not-allowed
    disabled:opacity-70`} disabled={Paymentverified} onClick={()=>handlePayment() }>{Paymentverified ? "Payment Verified" : "Make Payment"}</button>

        <div>
            
        </div>
      </div>
    </div>
   
    </div>
  )
}

export default PaymentModal
