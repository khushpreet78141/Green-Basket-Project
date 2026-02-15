import React, { useState,useEffect } from 'react'
import {toast} from 'react-toastify'
import { useDispatch,useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../redux/slices/cartSlice'
import { Link } from 'react-router-dom'
const Bestseller = () => {
    const cartItems = useSelector((state)=>state.cart.cartItems)
    const [bestSellerProducts, setbestSellerProducts] = useState([])
   useEffect(() => {
     const fetchDetails = async()=>{
      const res = await fetch("https://green-basket-project.onrender.com/api/product/bestseller",{method:"GET",headers:{"Content-Type":"application/json"}})
      const data = await res.json()
      setbestSellerProducts(data.data)
     }
     fetchDetails();
   }, [])
   const dispatch = useDispatch();
    const increaseQty = async(pdt) =>{
      toast(' quantity ⬆️ updated in cart ', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
      
          });
          dispatch(addToCart({item:pdt}));

  }
  
  const decreaseQty = async(pdt) =>{
     toast(' quantity ⬇️ updated in cart', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
    
        });
        dispatch(removeFromCart({id:pdt._id,intent:"DECREMENT"}))
     
  }
  const getQuantity = (pdt)=>{
    const item = cartItems.find((item)=>item._id === pdt._id)
    return item?item.quantity:0;
  }

  return (
    <div className='p-9'>
     <h1 className='md:text-3xl text-xl font-bold textgreen m-5 '> ⭐️ Best Seller for you ⭐️</h1>
     <div className='flex flex-row md:p-10 md:gap-10 gap-4 flex-wrap p-5'> 
      {bestSellerProducts.map(item=>{
        const quantity = getQuantity(item);
        
      return (
        <div key={item._id} className='md:w-36 w-24 md:text-[20px] text-[18px] hover:scale-105  shadow-2xl shadow-green-950 transition-transform rounded-3xl  flex flex-col items-center justify-center textgreen'>
            <p><Link to={`/specificItem/${item._id}`}><img src={item.image.url} alt={item.image.alt} /></Link></p>
            <p className='text-[18px]'> {item.name}</p>
            <p className='text-[14px] '>({item.shop})</p>
            <p className='text-gray-400 text-[16px]'>{item.units}</p>
            <p>₹{item.price}</p>
            { quantity===0 ? <div><button onClick={()=>increaseQty(item)} className='w-[90px] rounded-4xl m-1 green text-white cursor-pointer'>+</button></div>:<p className='w-[100px] green text-white text-center flex gap-2 items-center justify-around rounded-xl cursor-pointer'><button onClick={()=>decreaseQty(item)}>-</button><span>{quantity}</span><button onClick={()=>increaseQty(item)}>+</button></p>}

        </div>  
      )})}</div>

    </div>
  )
}

export default Bestseller
