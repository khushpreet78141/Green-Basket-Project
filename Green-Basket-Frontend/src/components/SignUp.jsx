import React from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [apiSuccess, setApiSuccess] = useState(false);
     const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors, isSubmitting ,isSubmitSuccessful},
      } = useForm();
      
      const navigate = useNavigate()
      const onSubmit = async(data)=>{
        try{
        const res = await fetch("http://localhost:3000/api/user/signUp",{method:"POST",headers:{"Content-Type":"application/json"}, body:JSON.stringify(data)});
        const result = await res.json()
        if(!res.ok || !result.success){
          setApiSuccess(false)
          alert(result.message)
          setError("root",{message:result.message || "signup failed"})
          return;
        }
        localStorage.clear()
          localStorage.removeItem("token");
localStorage.removeItem("user");
        setApiSuccess(true)
          setTimeout(() => {

            navigate("/login")

          }, 2000);
          
        
        reset();
                
        }catch(err){
          setApiSuccess(false)
          alert(err)
          setError("root",{message:result.message || "Server Error"})
        }
      }
  
           
  return (
    <div className=' md:p-8 rounded-3xl bg-gray-50 shadow-2xl  md:w-[30vw] md:mt-30 m-10 md:h-[60vh] p-6 md:m-auto '>
      <h1 className='text-[24px]'>Welcome!</h1>
      <h2 className='textgreen font-bold text-[20px]'>Sign Up here</h2>
      {isSubmitting && <div className='backdrop-blur-3xl  flex flex-col items-center mt-15 gap-5 '>
      <lord-icon
    src="https://cdn.lordicon.com/euaablbm.json"
    trigger="loop"
    stroke="bold"
    state="loop-cycle"
    colors="primary:#121331,secondary:#0a5c49"
    style={{width:"100px",height:"100px"}}>
</lord-icon>
        <span className='text-xl'>Loading ...</span></div>} 

        {!isSubmitSuccessful && !isSubmitting && <div>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col  md:mt-6 sm:gap-3 '>
     <div className='my-6'> <input placeholder="fullName" className='md:w-full bordergreen border-2 p-1 focus:outline-0 ' {...register('fullName',{ required:{value:true,message:"Enter name!"}})}/>
      <span className='text-red-500 text-[12px]'>{errors.fullName && errors.fullName.message}</span></div>
     <div className='mb-6'> <input placeholder="email" className='md:w-full bordergreen border-2 p-1 focus:outline-0' {...register('email', { required: {value:true,message:"Enter email!" }, pattern:{value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,message:"Enter valid Email!"} })} />
      <span className='text-red-500 text-[12px]'>{errors.email && errors.email.message}</span></div>
     <div className='mb-6'> <input type='password' placeholder="Password" className='md:w-full bordergreen border-2 p-1 focus:outline-0' {...register('password', {required:{value:true,message:"Enter password!"} ,pattern: {value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
,message:"password must be 8 characters and include uppercase, lowercase,number,special character" }})} />
      <span className='text-red-500 text-[12px]'>{errors.password && errors.password.message}</span></div>
   <div>   <p className='text-gray-500'>Already have an account ? <Link to="/login"><span className='textgreen underline-offset-1 underline '>Login</span></Link> </p>
      <input type="submit" className='w-full green text-white p-1' disabled={isSubmitting}/></div>
    </form>

    </div>}

    {isSubmitSuccessful && !isSubmitting && <div className='text-green-800 text-center mt-10 flex flex-col items-center gap-9 m-7'><lord-icon
    src="https://cdn.lordicon.com/fsstjlds.json"
    trigger="in"
    delay="500"
    stroke="bold"
    state="in-reveal"
    colors="primary:#109121"
    style={{width:"100px",height:"100px"}}>
</lord-icon><span>successfully Signed up</span></div>}
    </div>
  )
}

export default SignUp
