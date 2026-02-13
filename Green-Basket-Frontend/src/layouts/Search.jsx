import React from 'react'
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/slices/cartSlice';
import { Link } from 'react-router-dom';
const Search = () => {
  const [filteredProducts, setfilteredProducts] = useState([]);
  const location = useLocation()
  const { query } = location.state || {}

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems)

  useEffect(() => {
    if (!query) {
      setfilteredProducts([]);
      return;
    }
    const fetchDetails = async () => {
      setfilteredProducts([])
      const res = await fetch(`http://localhost:3000/api/product/searchInput?q=${query}`, { method: "GET", headers: { "content-Type": "application/json" } })
      const data = await res.json();
      setfilteredProducts(data.data)
    }
    fetchDetails();
  }, [query]);



  const increaseQty = async (pdt) => {
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
    dispatch(addToCart({ item: pdt }));

  }
  const decreaseQty = async (pdt) => {
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
    dispatch(removeFromCart({ id: pdt._id, intent: "DECREMENT" }))
  }
  const getQuantity = (pdt) => {
    const item = cartItems.find((item) => item._id === pdt._id)
    return item ? item.quantity : 0;
  }



  return (
    <div>
      <header className='flex justify-between m-8'>
        <div>
          <h2 className='textgreen md:text-3xl font-bold font-serif '>Showing results for your Search</h2>
          <h2 className='text-red-500 flex items-center'><span><lord-icon
            src="https://cdn.lordicon.com/cvwrvyjv.json"
            trigger="morph"
            stroke="bold"
            state="morph-select"
            colors="primary:#FBBF24 "
            style={{ width: "50px", height: "50px" }}>
          </lord-icon></span><span className='md:text-xl font-extrabold'>Quality food, better living.</span></h2>
        </div>
        <div>
          <h2 className='flex items-center'><span><lord-icon
            src="https://cdn.lordicon.com/kezeezyg.json"
            trigger="morph"
            stroke="bold"
            state="morph-open"
            colors="primary:#EF4444"
            style={{ width: "70px", height: "70px" }}>
          </lord-icon></span><span className='md:text-xl font-bold textgreen'>“Golden deals you’ll love”</span></h2></div>
      </header>

      <main className='md:m-10 flex gap-10 flex-wrap p-4'>
        {filteredProducts.length === 0 && <div className='text-gray-500 md:text-2xl m-auto font-bold'>No products found related to your search</div>}
        {filteredProducts.length > 0 && filteredProducts.map(item => {
          const quantity = getQuantity(item);

          return (

            <div key={item._id} className='md:w-36 w-24 text-[20px] hover:scale-105 transition-transform rounded-3xl shadow-2xl shadow-green-900 flex flex-col items-center  textgreen '>
              <p><Link to={`/specificItem/${item._id}`}><img src={item.image.url} alt={item.image.alt} className=' rounded-4xl' /></Link></p>
              <p>{item.name}</p>
              <p className='text-[14px] '>({item.shop})</p>
              <p className='text-gray-400 text-[16px]'> {item.units}</p>
              <p>₹{item.price}</p>
              {quantity === 0 ? <div><button onClick={() => increaseQty(item)} className='w-[90px] rounded-4xl m-1 green text-white '>+</button></div> : <p className='w-[100px] green text-white text-center flex gap-2 items-center justify-around rounded-xl'><button onClick={() => decreaseQty(item)}>-</button><span>{quantity}</span><button onClick={() => increaseQty(item)}>+</button></p>}

            </div>

          )
        })}
      </main>
    </div>
  )
}

export default Search
