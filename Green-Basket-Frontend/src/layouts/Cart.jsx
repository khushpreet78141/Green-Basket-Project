
import React from 'react'
import { Link } from 'react-router-dom'
import { useState,useEffect } from 'react'

const Cart = () => {
  const [cartItems, setcartItems] = useState([])
  
  useEffect(() => {
    const fetchDetails = async()=>{
      const res = await fetch("http://localhost:3000/api/cart/getCartItems",{method:"GET",headers:{"Content-Type":"application/json"}})
      const data = await res.json()
      setcartItems(data.data)

      
    }
    fetchDetails();
  }, [])
  console.log(cartItems)
const deleteCartItem = async(id)=>{
  const confirmed = window.confirm("are you sure to remove item from cart?")
  
  if(!confirmed) return;  
  const res = await fetch(`http://localhost:3000/api/cart/deleteCart/${id}`,{method:"DELETE",headers:{"Content-Type":"application/json"}})
  const data = await res.json()
  if(data.success){
    setcartItems(prev=>prev.filter(item=>item._id !== id))
  }
} 
  return (
    <div className=''>
      <div className="m-5 animate-fade-in">
  <h1 className="textgreen text-3xl md:text-4xl font-bold">
    Review Your Cart
  </h1>
  <p className="text-gray-500 mt-1 text-sm md:text-base">
    Check your items and proceed when you’re ready
  </p>
</div>
 
      {cartItems.map(item=>(
        <div key={item._id}>
          <table className="md:w-5xl  m-auto mt-10 mb-10 border-collapse text-left">
  <thead className="bg-gray-100">
    <tr>
      <th className="p-3">Image</th>
      <th className="p-3">Item</th>
      <th className="p-3 text-center">Quantity</th>
      <th className="p-3 text-right">Total</th>
      <th className='row-span-2 text-center bg-white '><Link to={`/placeOrder/${item._id}`}><button className='green text-white p-2 rounded-4xl cursor-pointer'>Order now</button></Link></th>
      <th className='bg-white'><button className='bg-red-500 row-span-2 p-2 rounded-2xl text-white' onClick={()=>deleteCartItem(item._id)}>Delete</button></th>
    </tr>
  </thead>
  <tbody>
  <tr className="border-t">
    <td className="p-3">
      {item.productId?.image?.url ? (
        <img
          src={item.productId.image.url}
          alt={item.productId.image.alt || "product image"}
          className="w-15"
        />
      ) : (
        <span className="text-gray-400">No image</span>
      )}
    </td>

    <td className="p-3">
      {item.productId?.name || "Product unavailable"}
    </td>

    <td className="p-3 text-center">
      {item.quantity}
    </td>

    <td className="p-3 text-right">
      ₹{item.productId
        ? item.quantity * item.productId.price
        : 0}
    </td>
  </tr>
</tbody>


</table>

        </div>
      ))}
    </div>
  )
}

export default Cart
