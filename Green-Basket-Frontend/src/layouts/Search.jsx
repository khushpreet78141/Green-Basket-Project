import React from 'react'
import { useLocation } from 'react-router-dom';
import { useState,useEffect } from 'react';
import {toast} from 'react-toastify'
const Search = () => {
  const [filteredProducts, setfilteredProducts] = useState([]);
  const location = useLocation()
  const {query} = location.state || {}



  useEffect(() => {
    if (!query) {
    setfilteredProducts([]);
    return;
  }
    const fetchDetails = async() =>{
     setfilteredProducts([])
      const res = await fetch(`http://localhost:3000/api/product/searchInput?q=${query}`,{method:"GET",headers:{"content-Type":"application/json"}})
    const data = await res.json();
    setfilteredProducts(data.data)
    }
    fetchDetails();  
  }, [query]);



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
      const quantityIncProduct = filteredProducts.map(item=>item._id === pdt._id?{...item,quantity:(item.quantity??0)+1}:item);
      setfilteredProducts(quantityIncProduct)
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
      const quantityDecProduct = filteredProducts.map(item=>item._id === pdt._id && item.quantity>0?{...item,quantity:item.quantity-1}:item);
      setfilteredProducts(quantityDecProduct)
       const res = await fetch(`http://localhost:3000/api/cart/removingcartItems/${pdt._id}`,{method:"POST",headers:{"Content-Type":"application/json"}});
  }

  

  return (
    <div>
      <header className='flex justify-between m-8'>
        <div>
        <h2 className='textgreen text-3xl font-bold font-serif '>Showing results for your Search</h2>
        <h2 className='text-red-500 flex items-center'><span><lord-icon
          src="https://cdn.lordicon.com/cvwrvyjv.json"
          trigger="morph"
          stroke="bold"
          state="morph-select"
          colors="primary:#FBBF24 "
          style={{ width: "50px", height: "50px" }}>
        </lord-icon></span><span className='text-xl font-extrabold'>Quality food, better living.</span></h2>
        </div>
        <div>
        <h2 className='flex items-center'><span><lord-icon
    src="https://cdn.lordicon.com/kezeezyg.json"
    trigger="morph"
    stroke="bold"
    state="morph-open"
    colors="primary:#EF4444"
    style={{width:"70px",height:"70px"}}>
</lord-icon></span><span className='text-xl font-bold textgreen'>“Golden deals you’ll love”</span></h2></div>
      </header>

      <main className='md:m-10 flex gap-30 '>
        {filteredProducts && filteredProducts.map(item=>(

        <div key={item._id} className='w-36 text-[20px] hover:scale-105 transition-transform rounded-3xl shadow-2xl shadow-green-900 flex flex-col items-center textgreen'>
            <p><img src={item.image.url} alt={item.image.alt} className=' rounded-4xl'/></p>
            <p>{item.name}</p>
            <p className='text-[16px] '>({item.shop})</p>
            <p className='text-gray-400 text-[16px]'> {item.units}</p>
            <p>₹{item.price}</p>
            {item.quantity ===0 ? <div><button onClick={()=>increaseQty(item)} className='w-[90px] rounded-4xl m-1 green text-white '>+</button></div>:<p className='w-[100px] green text-white text-center flex gap-2 items-center justify-around rounded-xl'><button onClick={()=>decreaseQty(item)}>-</button><span>{item.quantity}</span><button onClick={()=>increaseQty(item)}>+</button></p>}
        
        </div>

      ))}
      </main>
    </div>
  )
}

export default Search
