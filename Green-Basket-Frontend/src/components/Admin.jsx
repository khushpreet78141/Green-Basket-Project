import React from 'react'
import { useForm } from 'react-hook-form';
import { useState,useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {toast} from 'react-toastify'

const Admin = () => {

  const [product, setproduct] = useState([]);
  const navigate = useNavigate();
  const token = useSelector((state)=>state.auth.token)

  const handleCreate = ()=>{
    navigate("/create-product");
    
  }

  useEffect(() => {
    
    const fetchProduct = async()=>{
    try{
    const res = await fetch("http://localhost:3000/api/product/collection",{method:'GET',headers:{"Content-Type":"application/json"}})
    if(!res.ok) throw new Error("Failed to fetch products")
    const data = await res.json();
    setproduct(data.data);
  

  } 
catch(err){
  console.error(err);

}

}
fetchProduct();

  }, [])
  const handleDelete = async(id)=>{
    const confirmed = window.confirm("are you sure  to delete this product ")
    if(confirmed){
const res = await fetch(` http://localhost:3000/api/admin/deleteProduct/${id}`,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${token} `}} )
    if(!res.ok) return;
    setproduct(product=>product.filter(item=>item._id !== id))
    toast.warn('deleted successfully', {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",

});
    }
    ;


  }
 
  return (
    <>
    <div className="header mt-5 flex items-center justify-around">
      <h2 className='font-extrabold mt-6'>Products</h2>
      <button className='bg-green-600 text-white p-2 rounded-2xl font-bold' onClick={handleCreate}> + &nbsp;Create Product</button>
    
    </div>
    <div>
      
      <table className="md:w-5xl m-auto mt-10 md:mb-10 border-collapse text-left">
  <thead className="bg-gray-100">
    <tr>
      <th className="p-3">Image</th>
      <th className="p-3">Item</th>
      <th className="p-3 text-center">Price</th>
      <th className="p-3 text-center">Stock</th>
      <th className="p-3 text-right">Action</th>
    </tr>
  </thead>

  <tbody>
    {product.map((item) => (
      <tr key={item?._id} className="border-t hover:bg-gray-50">
        <td className="p-3">
          {item.image?.url ? (
            <img
              src={item.image.url}
              alt={item.image.alt || "product image"}
              className="w-14 h-14 object-cover rounded"
            />
          ) : (
            <span className="text-gray-400">No image</span>
          )}
        </td>

        <td className="p-3 font-medium">
          {item.name || "Product unavailable"}
        </td>

        <td className="p-3 text-center">
          ₹{item.price}
        </td>

        <td className="p-3 text-center">
          {item.inStock ? "Available":"Not Available"}
        </td>

        <td className="p-3 text-right space-x-2 space-y-2 text-[14px]">


          <button
            onClick={() => navigate(`editProduct/${item._id}`)}
            className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Edit
          </button>

          <button
            onClick={() => handleDelete(item._id)}
            
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>

        </td>
      </tr>
    ))}
  </tbody>
</table>
 

    </div>
    
    </>

  )
}

export default Admin
