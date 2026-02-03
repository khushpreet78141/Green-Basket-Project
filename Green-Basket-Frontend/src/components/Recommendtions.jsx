import React from 'react'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
const Recommendtions = () => {
  const [recommendedItems, setrecommendedItems] = useState([])
  useEffect(() => {
    const fetchDetails = async()=>{
      const res = await fetch("http://localhost:3000/api/product/recommended",{method:"GET",headers:{"Content-Type":"application/json"}})
      const data = await res.json()
      setrecommendedItems(data.data)
    }
    fetchDetails()
  }, [])
  

  const increaseQty = async(pdt) => {
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
    const arr = recommendedItems.map(item => item._id === pdt._id ? { ...item, quantity: item.quantity + 1 } : item);
    setrecommendedItems(arr);
    const res = await fetch(`http://localhost:3000/api/cart/addingcartItems/${pdt._id}`,{method:"POST",headers:{"Content-Type":"application/json"}})

  }

  const decreaseQty = async(pdt) => {
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
    const arr = recommendedItems.map(item => item._id === pdt._id && item.quantity>0? { ...item, quantity: item.quantity - 1 } : item);
    setrecommendedItems(arr);
     const res = await fetch(`http://localhost:3000/api/cart/removingcartItems/${pdt._id}`,{method:"POST",headers:{"Content-Type":"application/json"}});
  }


  return (
    <div className='hidden md:block'>
      <h1 className='text-2xl ml-20 font-serif'>you might need</h1>

      <div className='flex flex-wrap justify-center md:justify-start container gap-5 md:m-10 m-5 md:mx-20'>

        {recommendedItems.map(item => (
          <div key={item._id} className='w-36 text-[20px] hover:scale-105 transition-transform rounded-3xl shadow-2xl shadow-gray-300 flex flex-col items-center textgreen'>
            <p><img src={item.image.url} alt={item.image.alt} /></p>
            <p>{item.name}</p>
            <p className='text-[16px] '>({item.shop})</p>
            <p className='text-gray-400 text-[16px]'> {item.units}</p>
            <p>₹{item.price}</p>
            {item.quantity === 0 ? <div><button onClick={() => increaseQty(item)} className='w-[90px] rounded-4xl m-1 green text-white '>+</button></div> : <p className='w-[100px] green text-white text-center flex gap-2 items-center justify-around rounded-xl'><button onClick={() => decreaseQty(item)}>-</button><span>{item.quantity}</span><button onClick={() => increaseQty(item)}>+</button></p>}
          </div>

        ))}

      </div>
    </div>
  )
}

export default Recommendtions
