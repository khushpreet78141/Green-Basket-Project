
import { address } from 'framer-motion/client'
import React from 'react'
import { useForm } from "react-hook-form"
import { useState } from 'react'
import PaymentModal from '../components/PaymentModal'
import { useParams } from 'react-router-dom'


const OrderDetails = () => {
  const [popup, setpopup] = useState(false);
  const {cartId } = useParams()



  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting , isSubmitSuccessful },
  } = useForm()
  const onSubmit = async (data) => {
    const res = await fetch(`http://localhost:3000/api/cart/shippingAddress/`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({cartId,...data})})
    const dataas = await res.json()
    if(dataas.success){
       setTimeout(() => {
        setpopup(true)
      }, 3000);
    
    console.log(data)

  }
    

  }
  return (

    <div className='green h-[90vh]' >
      <h1 className='text-green-50 text-3xl pt-6 font-bold m-10'>Enter Your Shipping Details</h1>
     
      <div className='bg-green-50 md:w-5xl m-auto p-6 rounded-3xl'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col font-serif gap-5 items-start justify-between'>
           
          <div> <span className='md:text-[23px]  textgreen'>Firstname :</span> <input className='bordergreen rounded-4xl md:text-[16px] text-[12px] focus:outline-0 px-2 py-1 ' {...register("firstName", { required: { value: true, message: "This field is required !" }, maxLength: 20 })} />
            {errors.firstName && <p className='text-[12px] text-red-600'>{errors.firstName.message}</p>}</div>
          <div> <span className='md:text-[23px]  textgreen'>Lastname :</span> <input className='bordergreen rounded-4xl text-[12px] md:text-[16px] focus:outline-0 px-2 py-1 ' {...register("lastName", { required: { value: true, message: "This field is required !" }, pattern: { value: /^[A-Za-z]+$/i, message: "enter valid last name !" } })} />
            {errors.lastName && <p className='text-[12px] text-red-600'>{errors.lastName.message}</p>}</div>
          <div> <span className='md:text-[23px]  textgreen '>City :</span> <input className='bordergreen rounded-4xl text-[12px] md:text-[16px] focus:outline-0 px-2 py-1 ' {...register("city", { required: { value: true, message: "This field is required !" }, maxLength: 20 })} />
            {errors.city && <p className='text-[12px] text-red-600'>{errors.city.message}</p>}</div>
          <div> <span className='md:text-[23px]  textgreen'>Pincode : </span> <input className='bordergreen rounded-4xl text-[12px] md:text-[16px] focus:outline-0 px-2 py-1 'type="text" {...register("pincode", { required: { value: true, message: "Pincode is required !" }, pattern: { value: /^[0-9]{6}$/, message: "Enter valid 6-digit pincode!" } })} />
            {errors.pincode && <p className='text-[12px] text-red-600'>{errors.pincode.message}</p>}</div>
          <div> <span className='md:text-[23px]  textgreen'>Address : </span> <input type="text" className='bordergreen rounded-4xl text-[12px] md:text-[16px] focus:outline-0 px-2 py-1 max-w-xl' {...register("address", { required: true })} />
            {errors.address && <p className='text-[12px] text-red-600'>{errors.address.message}</p>} </div>
          <div> <span className='md:text-[23px]  textgreen'>Phone-Number : </span> <input className='bordergreen rounded-4xl text-[12px] md:text-[16px] focus:outline-0 px-2 py-1 ' type="tel" {...register("phoneNumber", { required: { value: true, message: "Phone number is required !" }, pattern: { value: /^[0-9]{10}$/, message: "Invalid phone number!" } })} />
            {errors.phoneNumber && <p className='text-[12px] text-red-600'>{errors.phoneNumber.message}</p>}</div>

          <input
  type="submit"
  disabled={isSubmitting}
  className="green text-white px-4 py-2 font-bold rounded-3xl m-auto"
  value={
    isSubmitting
      ? "Processing..."
      : isSubmitSuccessful
      ? "Proceed to Pay"
      : "Submit"
  }

/>

        </form>
      </div>{popup && <PaymentModal onClose={()=>setpopup(false)} cartId={cartId}/>}
    </div>
    
  )
}

export default OrderDetails
