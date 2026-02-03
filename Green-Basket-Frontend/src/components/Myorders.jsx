import { div, tr } from 'framer-motion/client'
import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
const Myorders = () => {
  const [orders, setorders] = useState([])

  useEffect(() => {
    const fetchOrders = async()=>{
      const res = await fetch("http://localhost:3000/api/cart/getOrderDetails",{method:"GET",headers:{"Content-Type":"application/json"}})
      const data = await res.json()
      setorders(data.data)
    }
    fetchOrders()
  }, [])
  console.log(orders)
    
  return (
    <>
    <h1 className="greentext font-serif font-semibold text-2xl mb-6 m-5">
  Your Orders 
</h1>

<div className="overflow-x-auto bg-white  rounded-2xl shadow-md">
  <table className="min-w-full border-collapse">
    <thead className=" green">
      <tr>
        <th className="px-6 py-3 text-left text-sm font-semibold text-white">
          Order ID
        </th>
        <th className="px-6 py-3 text-left text-sm font-semibold text-white">
          Item
        </th>
        <th className="px-6 py-3 text-center text-sm font-semibold text-white">
          Quantity
        </th>
        <th className="px-6 py-3 text-right text-sm font-semibold text-white">
          Total Price
        </th>
        <th className="px-6 py-3 text-center text-sm font-semibold text-white">
          Status
        </th>
      </tr>
    </thead>

    <tbody className="divide-y">
      {orders.map((item) => (
        <tr
          key={item.orderId}
          className="hover:bg-green-50 transition"
        >
          <td className="px-6 py-4 text-sm text-gray-700">
            #{item.orderId}
          </td>

          <td className="px-6 py-4 text-sm text-gray-700">
            {item.item}
          </td>

          <td className="px-6 py-4 text-center text-sm text-gray-700">
            {item.quantity}
          </td>

          <td className="px-6 py-4 text-right text-sm font-medium text-gray-800">
            ₹{item.totalAmount}
          </td>

          <td className="px-6 py-4 text-center">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                item.status === "PAID"
                  ? "bg-green-100 text-green-700"
                  : item.status === "PENDING"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {item.status}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  
</div>
<Link to="/"><button className='bg-blue-600 p-2 mt-20 ml-30 md:ml-[45vw] md:mt-50 rounded-2xl text-white font-bold font-serif'>Back to Home</button></Link>
</>
  )
}

export default Myorders
