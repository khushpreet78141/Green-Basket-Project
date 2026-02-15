
import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Myorders = () => {
  const [orders, setorders] = useState([])

  const token = useSelector((state)=>state.auth.token);
  useEffect(() => {
    const fetchOrders = async()=>{
      if(!token) return;
      const res = await fetch("https://green-basket-project.onrender.com/api/cart/getOrderDetails",{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`}})
      const data = await res.json()
      setorders(data.data)
    }
    fetchOrders()
  }, [token]);

    
  return (
    <>
    <h1 className="greentext font-serif font-semibold text-2xl mb-6 m-5">
  Your Orders 
</h1>
{orders.length===0 ? <div className='md:text-4xl text-xl font-bold text-center md:mt-20'>No orders yet!</div>:<div className="overflow-x-auto bg-white  rounded-2xl shadow-md">
  <table className="md:min-w-full border-collapse">
    <thead className=" green">
      <tr>
        <th className="md:px-6 px-2 py-3 text-left text-sm font-semibold text-white">
          Order ID
        </th>
        <th className="md:px-6 px-2 py-3 text-center text-sm font-semibold text-white">
          Date & Time
        </th>
        <th className="md:px-6 px-2 py-3 text-left text-sm font-semibold text-white">
          quantity
        </th>


          
        <th className="md:px-6 px-2 py-3 text-right text-sm font-semibold text-white">
          Total Price
        </th>
        <th className="md:px-6 px-2 py-3 text-center text-sm font-semibold text-white">
          Status
        </th>
      </tr>
    </thead>
          
    <tbody className="divide-y">
      {orders.map((order) => (
        <tr
          key={order.orderId}
          className="hover:bg-green-50 transition"
        >
          <td className="md:px-6 py-4 text-sm text-gray-700">
            #{order.orderId}
          </td>

          <td className="md:px-6 px-2 py-4 text-center text-sm text-gray-700">
  {new Date(order.createdAt).toLocaleString("en-IN")}
</td>
          <td className="md:px-6 px-4 py-4 text-sm text-gray-700">
            {order.items.reduce((sum,item)=>sum+item.quantity,0)}
           
          </td>

          <td className="md:px-6 py-4 text-right text-sm font-medium text-gray-800">
            ₹{order.totalAmount}
          </td>

          <td className="md:px-6 py-4 text-center">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                order.status === "PAID"
                  ? "bg-green-100 text-green-700"
                  : order.status === "PENDING"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {order.status}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  
</div>}

<Link to="/"><button className='bg-blue-600 p-2 md:mt-20 mt-10 ml-30 md:ml-[45vw] md:mt-50 rounded-2xl text-white font-bold font-serif cursor-pointer'>Back to Home</button></Link>
</>
  )
}

export default Myorders
