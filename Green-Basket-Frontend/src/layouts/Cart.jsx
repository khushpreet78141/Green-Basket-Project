
import React from 'react'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/slices/cartSlice';

const Cart = () => {

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems)

  const deleteCartItem = async (item) => {
    const confirmed = window.confirm("are you sure to remove item from cart?")


    if (confirmed) {
      dispatch(removeFromCart({ id: item._id, intent: "DELETE" }));
    }
  }
  const total = cartItems.reduce((sum,item)=>sum+(item.quantity*item.price),0)


  return (
    <div className='min-h-screen pb-20'>
      <div className="m-5 animate-fade-in">
        <h1 className="textgreen text-3xl md:text-4xl font-bold">
          Review Your Cart
        </h1>
        <p className="text-gray-500 mt-1 text-sm md:text-base">
          Check your items and proceed when you’re ready
        </p>
      </div>

      {cartItems.length===0 &&  <div className="flex flex-col items-center justify-center h-[60vh] text-gray-600 gap-4">
      <h2 className="text-2xl font-semibold">🛒 Your cart is empty</h2>
      <p>Add items to your cart to see them here.</p>
      <Link to="/" className="green text-white px-4 py-2 rounded-xl">
        Continue Shopping
      </Link>
    </div>}
    {cartItems.length>0 &&
     <div>
          <table className="md:w-5xl  m-auto mt-10 md:mb-10 border-collapse text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Image</th>
                <th className="p-3">Item</th>
                <th className="p-3 text-center">Quantity</th>
                <th className="p-3 text-right">Total</th>
                <th className="p-3 text-right">Action</th>

                
              </tr>
            </thead>
      {cartItems.map(item => (
       
            <tbody key={item._id}>
              <tr className="border-t">
                <td className="p-3">
                  {item.image?.url ? (
                    <img
                      src={item.image.url}
                      alt={item.image.alt || "product image"}
                      className="w-15"
                    />
                  ) : (
                    <span className="text-gray-400">No image</span>
                  )}
                </td>

                <td className="p-3">
                  {item.name || "Product unavailable"}
                </td>

                <td className="p-3 text-center">
                  {parseFloat(item.quantity)
                  *parseFloat((item.units).split(" ")[0])}{" "}{(item.units).split(" ")[1]}
                </td>

                <td className="p-3 text-right">
                  ₹{item
                    ? item.quantity * item.price
                    : 0}
                </td>
                <td className='bg-white  md:text-right'><button className='bg-red-500 row-span-2 p-2 rounded-2xl text-white ml-5 md:ml-0 cursor-pointer' onClick={() => deleteCartItem(item)}>remove</button></td>
              </tr>
            </tbody>

      ))}

          </table>


        </div> }
      <div className='flex md:ml-96 gap-10 items-center mb-20'>
      <Link to="/placeOrder">
        <button className='green text-white p-2 rounded-2xl text-xl cursor-pointer text-center md:w-[200px] m-3' disabled={cartItems.length ===0}>Order Now</button></Link>
        <div className='w-[200px] border-green-950 border-4 rounded-2xl text-xl p-1 text-center'>Sub-Total : ₹{total}</div></div>
    </div>
  )
}

export default Cart
