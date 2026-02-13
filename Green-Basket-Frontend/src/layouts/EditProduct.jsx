import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'
const EditProduct = () => {
  const {id} = useParams();
  const token = useSelector((state)=>state.auth.token);
  const navigate = useNavigate()
  const {
          register,
          handleSubmit,
          reset,
          formState: { errors },
        } = useForm();


  useEffect(() => {
    const fetchProduct = async()=>{
      const res = await fetch(`http://localhost:3000/api/admin/getpdt/${id}`,{method:"GET",headers:{"Content-Type":"application/json"}});
      const result = await res.json();
      console.log(result)
      reset(result.data) //inject api data into form
    }
    fetchProduct();
  }, []);


    const onSubmit = async(data) => {
       const res = await fetch(`http://localhost:3000/api/admin/saveproduct/${id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`},body:JSON.stringify(data)});
        if(res.ok){
          toast.success('edited successfully!', {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",

});
            console.log("product edited successfully"); 
            reset();
            setTimeout(() => {
              navigate('/admin')
            }, 1000);
            
            
        }
       }  

  return (
    <div className='backdrop-blur-2xl shadow-2xl shadow-gray-500 w-56 m-auto p-4 min-h-96 md:mt-10  md:w-96'>
      <h1 className='md:text-3xl'>Edit Product details</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col  md:mt-6 sm:gap-3 items-center'>
     <div className='my-6'> <input placeholder="name" className='md:w-full bordergreen border-2 p-1 focus:outline-0 ' {...register('name',{ required:{value:true,message:"Enter name!"}})}/>
      <span className='text-red-500 text-[12px]'>{errors.name && errors.name.message}</span></div>
     <div className='mb-6'> <input placeholder="image" className='md:w-full bordergreen border-2 p-1 focus:outline-0' {...register('image', { required: {value:true,message:"Enter image src" }})}/>
      <span className='text-red-500 text-[12px]'>{errors.image && errors.image.message}</span></div>
    <div className='mb-6'> <input placeholder="description" className='md:w-full bordergreen border-2 p-1 focus:outline-0' {...register('description')}/>
     </div>
        <div className='mb-6'> <input placeholder="category" className='md:w-full bordergreen border-2 p-1 focus:outline-0' {...register('category')}/>
      </div> 
      <div className='mb-6'><input placeholder="shop" className='md:w-full bordergreen border-2 p-1 focus:outline-0' {...register('shop')}/>
      </div>
        <div className='mb-6'>
            <input placeholder="units" className='md:w-full bordergreen border-2 p-1 focus:outline-0' {...register('units')}/>
        </div>
         <div className='mb-6'>
            <input placeholder="price" type='number' className='md:w-full bordergreen border-2 p-1 focus:outline-0' {...register('price')}/>
        </div>
         
     <input type="submit" value="Save" className='w-full green text-white p-1' />

    </form>
     
    </div>
  )
}

export default EditProduct
