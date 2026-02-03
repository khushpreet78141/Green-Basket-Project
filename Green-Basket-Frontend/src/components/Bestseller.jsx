import React, { useState,useEffect } from 'react'
import {toast} from 'react-toastify'
const Bestseller = () => {
    const [bestSellerProducts, setbestSellerProducts] = useState([])
   useEffect(() => {
     const fetchDetails = async()=>{
      const res = await fetch("http://localhost:3000/api/product/bestseller",{method:"GET",headers:{"Content-Type":"application/json"}})
      const data = await res.json()
      setbestSellerProducts(data.data)
     }
     fetchDetails();
   }, [])
   
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
      const quantityIncProduct = bestSellerProducts.map(item=>item._id === pdt._id?{...item,quantity:item.quantity+1}:item);
      setbestSellerProducts(quantityIncProduct)
      const res = await fetch(`http://localhost:3000/api/cart/addingcartItems/${pdt._id}`,{method:"POST",headers:{"Content-Type":"application/json"}})

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
      const quantityDecProduct = bestSellerProducts.map(item=>item._id === pdt._id?{...item,quantity:item.quantity-1}:item);
      setbestSellerProducts(quantityDecProduct)
      const res = await fetch(`http://localhost:3000/api/cart/removingcartItems/${pdt._id}`,{method:"POST",headers:{"Content-Type":"application/json"}});
  }

  return (
    <div className='p-9'>
     <h1 className='md:text-3xl text-xl font-bold textgreen m-5 '> ⭐️ Best Seller for you ⭐️</h1>
     <div className='flex flex-row p-10 gap-10 flex-wrap'> 
      {bestSellerProducts.map(item=>(
        <div key={item._id} className='w-36 text-[20px] hover:scale-105  shadow-2xl shadow-green-950 transition-transform rounded-3xl  flex flex-col items-center textgreen'>
            <p><img src={item.image.url} alt={item.image.alt} /></p>
            <p>{item.name}</p>
            <p className='text-[15px] '>({item.shop})</p>
            <p className='text-gray-400 text-[16px]'> {item.units}</p>
            <p>₹{item.price}</p>
            {item.quantity ===0 ? <div><button onClick={()=>increaseQty(item)} className='w-[90px] rounded-4xl m-1 green text-white '>+</button></div>:<p className='w-[100px] green text-white text-center flex gap-2 items-center justify-around rounded-xl'><button onClick={()=>decreaseQty(item)}>-</button><span>{item.quantity}</span><button onClick={()=>increaseQty(item)}>+</button></p>}

        </div>
        
      ))}</div>

    </div>
  )
}

export default Bestseller
