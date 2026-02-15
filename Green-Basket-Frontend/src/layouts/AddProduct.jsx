
import React from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
     const {

            register,
            handleSubmit,
            reset,
            formState: { errors},
          } = useForm();
        
          const token = useSelector((state)=>state.auth.token)
          const navigate = useNavigate()

      const onSubmit = async(data) => {
        const res = await fetch("https://green-basket-project.onrender.com/api/admin/create-product",{method:'POST',headers:{"Content-Type":"application/json",Authorization:` Bearer ${token}`},body:JSON.stringify(data)})
        if(res.ok){
            toast.success('created successfully', {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",

});
            reset();
            setTimeout(() => {
              navigate("/admin")
            }, 500);
        }
    
      }

  return (
    <div>
      <div className=' md:p10 rounded-3xl bg-gray-50 shadow-2xl  md:w-[30vw] md:mt-20 m-10 md:h-[80vh] p-6 md:m-auto '>
        <h2 className='textgreen font-bold text-[20px]'>Add Product Details here</h2>
         <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col  md:mt-6 sm:gap-3 '>
     <div className='my-6'> <input placeholder="name" className='md:w-full bordergreen border-2 p-1 focus:outline-0 ' {...register('name',{ required:{value:true,message:"Enter name!"}})}/>
      <span className='text-red-500 text-[12px]'>{errors.name && errors.name.message}</span></div>
     <div className='mb-6'> <input placeholder="image src" className='md:w-full bordergreen border-2 p-1 focus:outline-0' {...register('image', { required: {value:true,message:"Enter image src" }})}/>
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
    </div>
  )
}

export default AddProduct
