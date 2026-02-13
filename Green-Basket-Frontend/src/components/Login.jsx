import React from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useEffect } from 'react';
import { loginSuccess } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const {
            register,
            handleSubmit,
            reset,
            setError,
            formState: { errors,isSubmitting ,isSubmitSuccessful},
          } = useForm();
          const dispatch = useDispatch();
           const navigate = useNavigate();
          const onSubmit = async(data)=>{
            try{
            const res = await fetch("http://localhost:3000/api/user/login",{method:"POST",headers:{"Content-Type":"application/json"}, body:JSON.stringify(data)});
            const result = await res.json()
            
            if(!res.ok || !result.success){
              setError("root",{message:result.message || "Login Failed"})
              
            }
           
            localStorage.setItem("token",result.token);
            localStorage.setItem("user",JSON.stringify(result.user));
             dispatch(loginSuccess({token:result.token,user:result.user}));
               if(result.success){
                setTimeout(() => {
                   navigate("/");
                }, 1000);
             
            }
            reset();
            }catch(err){
              setError("root",{message:result.message || "Server Error"});

            }
          }
          useEffect(() => {
            const token = localStorage.getItem("token");
            const user = localStorage.getItem("user");
            if(token){
             dispatch(loginSuccess({token,user:JSON.parse(user)}));
            }
          }, [])
        
  return (
    <div className=' md:p-8 rounded-3xl bg-gray-50 shadow-2xl  md:w-[30vw] md:mt-30 md:m-auto m-10 p-10 md:h-[60vh]'>
      <h1 className='text-[24px]'>Welcome!</h1>
      <h2 className='textgreen font-bold text-[20px]'>Login here</h2>
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
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col  mt-6 '>
     
     <div className='mb-6'> <input placeholder="email" className='md:w-full bordergreen border-2 p-1 focus:outline-0' {...register('email', { required: {value:true,message:"Enter email!" }, pattern:{value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,message:"Enter valid Email!"} })} />
      <span className='text-red-500 text-[12px]'>{errors.email && errors.email.message}</span></div>
     <div className='mb-6'> <input type='password' placeholder="Password" className='md:w-full bordergreen border-2 p-1 focus:outline-0' {...register('password', {required:{value:true,message:"Enter password!"} ,pattern: {value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
,message:"password must be 8 characters and include uppercase, lowercase,number,special character" }})} />
      <span className='text-red-500 text-[12px]'>{errors.password && errors.password.message}</span></div>
    <div>   <p className='text-gray-500 mb-3'>Don't have any account ? <Link to="/signUp"><span className='textgreen underline-offset-1 underline '>signUp</span></Link> </p>
      <input type="submit" className='w-full green text-white p-1'/></div>
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
</lord-icon><span>successfully Logged In</span></div>}
    </div>
  )
}

export default Login

