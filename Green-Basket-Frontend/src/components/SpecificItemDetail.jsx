import React from 'react'
import { useState,useEffect } from 'react'
import { toast } from 'react-toastify'
import { useDispatch,useSelector } from 'react-redux'
import { addToCart } from '../redux/slices/cartSlice'
import { useParams } from 'react-router-dom'
const SpecificItemDetail = () => {
  const [pdtQuantity, setpdtQuantity] = useState(1);
    const [pdtdetail, setpdtdetail] = useState({});
    const dispatch = useDispatch();
    const cartItems = useSelector((state)=>state.cart.cartItems);
    const [tabdata, settabdata] = useState("Description")
    const {id} = useParams()

    useEffect(() => {
        const fetchDetails = async()=>{
            const res = await fetch(`http://localhost:3000/api/product/specificDetail/${id}`,{method:"GET",headers:{"Content-Type":"application/json"}});
        const reqdata = await res.json();
        setpdtdetail(reqdata.data);
        }
        fetchDetails();
       
    }, [id])
    
    const handletabData = (text)=>{
      settabdata(text)

    }
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

    if(!pdtdetail?._id){
      return <p className="text-center mt-20">Loading product details...</p>
    }
  return (
    <>
    <div className='  md:w-4xl m-auto mt-20 md:p-8 shadow-2xl rounded-4xl shadow-green-950  p-2 mb-5 hover:scale-105 transition-transform'>
       <div className='flex items-center justify-between md:mr-10'> <h1 className='textgreen text-xl font-bold mb-10'>Item Details</h1>
            <p className="text-sm text-gray-500 mb-1 ">
  Fresh & ready to deliver
</p></div>
            <section className='flex justify-around gap-4'>

                <div><img src={pdtdetail?.image?.url} alt={pdtdetail?.image?.alt} className='w-40 md:w-60 h-40 md:h-60  '/></div>
                <div className='text-[12px] md:text-2xl flex flex-col items-center'>
                    <div className='flex gap-5'><div className='flex flex-col'><span >Item :</span> <span>Shop :</span><span>units : </span><span> price :</span> <span>Quantity : </span></div>
                    <div className='flex flex-col justify-around'> <span className="md:text-[15px]"> {pdtdetail?.name} </span> <span className="md:text-[15px]"> ({pdtdetail?.shop})</span><span className="md:text-[15px]"> {pdtdetail?.units}</span><span className="md:text-[15px]"> ₹{pdtdetail?.price}</span> <div className='flex items-center md:gap-2'>  <span className='w-[100px] green  m-auto text-white text-center flex gap-2 items-center justify-around rounded-xl'> <button onClick={()=>setpdtQuantity(prev=>Math.max(1,prev-1))}>-</button><span>{pdtQuantity}</span><button onClick={()=>setpdtQuantity(prev=>prev+1)}>+</button></span></div></div>
                    </div>  
                    <button onClick={handleAddtoCart}className='green m-auto md:mt-10 md:w-xl text-white  p-1 rounded-full md:px-10'>🛒Add to cart</button>
               </div>
        
            </section>
    </div>
    <div className="tabsection md:mt-30 mt-10 mb-5">
      <div className='md:w-xl m-auto h-[40vh]  rounded-2xl shadow-2xl shadow-green-950'>
        <div className="buttons md:text-2xl flex gap-10 md:gap-0 ">
          <button className={`md:w-[15vw]  rounded-l-2xl p-2 ${tabdata==="Description" && "green text-white"}`} onClick={()=>handletabData("Description")}>Description</button>
          <button className={`md:w-[15vw]  p-2 ${tabdata==="Delivery" && "green text-white"}`} onClick={()=>handletabData("Delivery")}>Delivery</button>
          <button className={`md:w-[15vw]  rounded-r-2xl p-2 ${tabdata==="Returns" && "green text-white"}`} onClick={()=>handletabData("Returns")}>Returns</button>
        </div>
        <div className='text bg-green-100 h-[30vh] p-1'>{tabdata==="Description" && 
          <ul className='m-5 md:text-xl flex-col flex gap-5'>
          <li>🛒 Carefully selected and quality-checked before dispatch
</li>
          <li>✅ Suitable for everyday use and regular consumption</li>
          <li>📦 Packed hygienically to ensure safety and freshness</li>
          </ul>}
          {tabdata==="Delivery" && 
          <ul className='m-5 text-xl flex-col flex gap-5'>
          <li>🚛 Delivery Time: 2–4 working days

</li>
          <li>📍 Service Area: Depends on your location</li>
          <li>🕒 Timings: Standard delivery hours apply</li>
          </ul>}
          {tabdata==="Returns" && 
          <ul className='m-5 text-xl flex-col flex gap-5'>
          <li>🔁 Easy replacement for damaged or incorrect items

</li>
          <li>⏱ Request window: Within 24 hours of delivery
</li>
          <li>📞 Support: Customer care available for assistance</li>
          </ul>}</div>

      </div>
      </div>
      </>
  )
}

export default SpecificItemDetail
