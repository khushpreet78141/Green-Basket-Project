import React, { useState,useEffect } from 'react'
import { toast } from 'react-toastify'
import { useDispatch,useSelector } from 'react-redux'
import { addToCart } from '../redux/slices/cartSlice'

const ItemDetails = () => {
    const [pdtQuantity, setpdtQuantity] = useState(1)
    const [pdtdetail, setpdtdetail] = useState({})
    const dispatch = useDispatch();
    
    const cartItems = useSelector((state)=>state.cart.cartItems);
    useEffect(() => {
        const fetchDetails = async()=>{
            const res = await fetch(`https://green-basket-project.onrender.com/api/product/getOneitem`,{method:"GET",headers:{"Content-Type":"application/json"}});
        const reqdata = await res.json();
        setpdtdetail(reqdata.data);
        }
        fetchDetails();
       
    }, [])
    

    const handleAddtoCart = async() =>{
        if(!pdtdetail._id) return;
        console.log("item is added to cart")
         toast(' quantity ⬆️ updated in cart ', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        
        })
        dispatch(addToCart({item:pdtdetail,quantity:pdtQuantity}));

    }

    
    return (
        <div className='  md:w-4xl m-auto mt-20 md:p-8 shadow-2xl rounded-4xl shadow-green-950  p-2 mb-5 hover:scale-105 transition-transform'> 
           <div className='flex items-center justify-between md:mr-10'> <h1 className='textgreen text-xl font-bold mb-10'>Item Details</h1>
            <p className="text-sm text-gray-500 mb-1 ">
  Fresh & ready to deliver
</p></div>
            <section className='flex justify-around gap-4'>

                <div><img src={pdtdetail?.image?.url} alt={pdtdetail?.image?.alt} className='w-40 md:w-60 h-40 md:h-60  '/></div>
                <div className='text-[12px] md:text-2xl flex flex-col items-center'>
                    <div className='flex gap-5'><div className='flex flex-col'><span >Item :</span> <span>Shop :</span><span>units : </span><span> price :</span> <span>Quantity : </span></div>
                    <div className='flex flex-col justify-around'> <span className="md:text-[15px]"> {pdtdetail.name} </span> <span className="md:text-[15px]"> ({pdtdetail.shop})</span><span className="md:text-[15px]"> {pdtdetail.units}</span><span className="md:text-[15px]"> ₹{pdtdetail.price}</span> <div className='flex items-center md:gap-2'>  <span className='w-[100px] green  m-auto text-white text-center flex gap-2 items-center justify-around rounded-xl cursor-pointer'> <button onClick={()=>setpdtQuantity(prev=>Math.max(1,prev-1))}>-</button><span>{pdtQuantity}</span><button onClick={()=>setpdtQuantity(prev=>prev+1)}>+</button></span></div></div>
                    </div>  
                    <button onClick={handleAddtoCart}className='green m-auto md:mt-10 md:w-xl text-white  p-1 rounded-full md:px-10 cursor-pointer'>🛒Add to cart</button>
               </div>
        
            </section>

            <ul className="md:text-sm text-[10px] text-gray-500 flex flex-col md:flex-row">
  <li> Non-returnable item </li>
  <li> &nbsp;| &nbsp; Price may vary based on availability </li>
  <li> &nbsp;| &nbsp;Images shown are for representation only </li>
</ul>


        </div>
    )
}

export default ItemDetails
