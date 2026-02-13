import React from 'react'
import { useState,useEffect } from 'react'
import {  toast } from 'react-toastify';
import {useDispatch,useSelector} from 'react-redux'
import { addToCart, removeFromCart } from '../redux/slices/cartSlice';
import { Link } from 'react-router-dom';
const Collection = () => {
  
    const [allCollection, setallCollection] = useState([])
    const [SortbyCategory, setSortbyCategory] = useState("")
   const [SortbyPrice, setSortbyPrice] = useState("")
   const dispatch = useDispatch();
   const cartItems = useSelector((state)=>state.cart.cartItems);
    useEffect(() => {
      const fetchDetails = async()=>{
        const res = await fetch(`http://localhost:3000/api/product/collection`,{method:"GET",headers:{"Content-Type":"application/json"}})
        const data = await res.json();
        setallCollection(data.data)
      }
      fetchDetails() 
    }, [])
   useEffect(() => {
     const fetchDetails = async()=>{
      if(SortbyPrice==="" && SortbyCategory==="") return;
      const res = await fetch(`http://localhost:3000/api/product/sortBy?byprice=${SortbyPrice}&bycategory=${SortbyCategory}`,{method:"GET",headers:{"Content-Type":"application/json"}})
      const data = await res.json()
      setallCollection(data.data)
     }
     fetchDetails();
     
   }, [SortbyPrice,SortbyCategory])
   
    
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
      
  dispatch(addToCart({item:pdt}))
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
    const item = cartItems.find(item=>item._id===pdt._id);
    return item?item.quantity:0;
  }

  return (
    <div>
     <h1 className='md:text-2xl font-bold flex items-center md:m-10'><lord-icon
    src="https://cdn.lordicon.com/ebvizisb.json"
    trigger="hover"
    stroke="bold"
    style={{width:"40px",height:"40px"}}>
</lord-icon><span>Good Food, Zero Hassle</span></h1>
<h1 className='text-center md:text-3xl font-extrabold  text-xl'>Daily Essentials</h1>
<div className="filters md:m-20 flex gap-5 text-xl font-serif">
    <select name="category" id="" className='bordergreen' value={SortbyCategory} onChange={(e)=>setSortbyCategory(e.target.value)}>
        <option value="">category</option>
        <option value="fruits">fruits</option>
        <option value="vegetables">vegetables</option>
        <option value="snacks">snacks</option>
        <option value="grocery">grocery</option>
        <option value="beverages">beverages</option>

    </select>
    <select name="price" id="" value={SortbyPrice} className='bordergreen' onChange={(e)=>setSortbyPrice(e.target.value)}>
        <option value="">price-range</option>
        <option value="high_low">high_low</option>
        <option value="low_high">low_high</option>
        
        
    </select>
</div>
     <div className='flex flex-wrap  md:justify-start container gap-5 md:gap-10 md:m-10 m-5 md:mx-20'>
      

      {allCollection.map(item=>{
        const quantity = getQuantity(item);
     
      return (
        <div key={item._id} className='md:w-36 w-28 text-[20px] hover:scale-105 transition-transform rounded-3xl shadow-lg shadow-green-900 flex flex-col items-center textgreen'>
            <p><Link to={`/specificItem/${item._id}`}><img src={item.image?.url} alt={item.image?.alt} /></Link></p>
            <p>{item.name}</p>
            <p className='text-[14px] '>({item.shop})</p>
            <p className='text-gray-400 text-[16px]'> {item.units}</p>
            <p>₹{item.price}</p>
            {quantity ===0 ? <div><button onClick={()=>increaseQty(item)} className='w-[90px] rounded-4xl m-1 green text-white cursor-pointer'>+</button></div>:<p className='w-[100px] green text-white text-center flex gap-2 items-center justify-around rounded-xl cursor-pointer'><button onClick={()=>decreaseQty(item)}>-</button><span>{quantity}</span><button onClick={()=>increaseQty(item)}>+</button></p>}
            
        </div>

      ) })}
    </div>
    </div>
  )
}

export default Collection
