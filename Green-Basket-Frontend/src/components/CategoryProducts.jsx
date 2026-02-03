import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { motion } from "framer-motion";
import { toast } from 'react-toastify';
const CategoryProducts = () => {
    const { category } = useParams();
    const [selectedProduct, setselectedProduct] = useState([]);
    const [sortOption, setsortOption] = useState("")

    useEffect(() => {

      const fetchDetails = async()=>{
        const res = await fetch(`http://localhost:3000/api/product/category/${category}`,{method:"GET",headers:{"Content-Type":"application/json"}})
        const data = await res.json()
        setselectedProduct(data.data);

      }
      
      fetchDetails();
    
    }, [category])

    useEffect(() => {
      const fetchDetails = async() =>{
        const res = await fetch(`http://localhost:3000/api/product/category/${category}/sortBy?price=${sortOption}`)
        const data = await res.json();
        setselectedProduct(data.data);
      }
      fetchDetails();
    }, [sortOption])
    
  
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
      const quantityIncProduct = selectedProduct.map(item=>item._id === pdt._id?{...item,quantity:(item.quantity??0)+1}:item);
      setselectedProduct(quantityIncProduct)
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
    
      const quantityDecProduct = selectedProduct.map(item=>item._id === pdt._id && item.quantity>0?{...item,quantity:item.quantity-1}:item);
      setselectedProduct(quantityDecProduct)
      const res = await fetch(`http://localhost:3000/api/cart/removingcartItems/${pdt._id}`,{method:"POST",headers:{"Content-Type":"application/json"}});
      

  }

  return (
    <>
    <motion.h1
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  className="w-2xl  hidden md:block text-3xl font-extrabold  capitalize mb-4 text-center  m-auto mt-15 textgreen text-shadow-lg shadow-emerald-500 p-3 rounded-3xl "
>
  Quality {category} curated for everyday needs
</motion.h1>
    <div>
      <select name="sortBy" id="" value={sortOption} onChange={(e)=>setsortOption(e.target.value)} className='text-[16px] m-2 md:absolute right-15  rounded-2xl p-1 bordergreen'>
        <option value="">Sort by price</option>
        <option value="low_high">low_high</option>
        <option value="high_low">high_low</option>
      </select>
    </div>
    <div className='flex flex-wrap justify-center md:justify-start container gap-10  md:m-10 m-5 md:mx-20'>
      

      {selectedProduct.map(item=>(
        <div key={item._id} className='w-36 text-[20px] hover:scale-105 transition-transform rounded-3xl shadow-2xl shadow-gray-300 flex flex-col items-center textgreen'>
            <p><img src={item.image.url} alt={item.image.alt} /></p>
            <p>{item.name}</p>
            <p className='text-[16px] '>({item.shop})</p>
            <p className='text-gray-400 text-[16px]'> {item.units}</p>
            <p>₹{item.price}</p>
            {item.quantity ===0 ? <div><button onClick={()=>increaseQty(item)} className='w-[90px] rounded-4xl m-1 green text-white '>+</button></div>:<p className='w-[100px] green text-white text-center flex gap-2 items-center justify-around rounded-xl'><button onClick={()=>decreaseQty(item)}>-</button><span>{item.quantity}</span><button onClick={()=>increaseQty(item)}>+</button></p>}

        </div>

      ))}
    </div>
    </>
  )
}

export default CategoryProducts
