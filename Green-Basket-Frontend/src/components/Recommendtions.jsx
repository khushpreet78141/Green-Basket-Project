import React from 'react'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import {useDispatch,useSelector} from 'react-redux'
import { addToCart, removeFromCart } from '../redux/slices/cartSlice';
import { Link } from 'react-router-dom';
const Recommendtions = () => {
  const [recommendedItems, setrecommendedItems] = useState([])
    const dispatch = useDispatch();
    const cartItems = useSelector((state)=>state.cart.cartItems);

    useEffect(() => {

    const fetchDetails = async()=>{
      if(!cartItems.length) return;
      const latestItem = cartItems[cartItems.length-1]
      if(!latestItem?.category) return;
      const res = await fetch(`https://green-basket-project.onrender.com/api/product/recommended/${latestItem.category}`,{method:"GET",headers:{"Content-Type":"application/json"}})
      const result = await res.json()
      setrecommendedItems(result.data)

    }
    fetchDetails()
  }, [cartItems])

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
    dispatch(addToCart({item:pdt}))

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
    dispatch(removeFromCart({id:pdt._id,intent:"DECREMENT"}));

  }
   const getQuantity = (pdt)=>{
    const item = cartItems?.find(item=>item._id===pdt._id);
    return item?item.quantity:0;
  }


  return (
    <div className='hidden md:block'>
      <h1 className='text-2xl ml-20 font-serif'>you might need</h1>

      <div className='flex flex-wrap justify-center md:justify-start container gap-5 md:m-10 m-5 md:mx-20'>

        {recommendedItems.map(item => {
            const quantity = getQuantity(item)
        
        return (
          <div key={item._id} className='md:w-36 w-28 text-[20px] hover:scale-105 transition-transform rounded-3xl shadow-2xl shadow-gray-300 flex flex-col items-center textgreen'>
            <p><Link to={`/specificItem/${item._id}`}><img src={item.image.url} alt={item.image.alt} /></Link></p>
            <p>{item.name}</p>
            <p className='text-[14px] '>({item.shop})</p>
            <p className='text-gray-400 text-[16px]'> {item.units}</p>
            <p>₹{item.price}</p>
            {quantity === 0 ? <div><button onClick={() => increaseQty(item)} className='w-[90px] rounded-4xl m-1 green text-white '>+</button></div> : <p className='w-[100px] green text-white text-center flex gap-2 items-center justify-around rounded-xl'><button onClick={() => decreaseQty(item)}>-</button><span>{quantity}</span><button onClick={() => increaseQty(item)}>+</button></p>}
          </div>

        )})}

      </div>
    </div>
  )
}

export default Recommendtions
