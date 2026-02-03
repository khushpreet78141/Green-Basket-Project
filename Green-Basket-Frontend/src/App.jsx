import { useState } from 'react'
import { BrowserRouter, Routes } from 'react-router-dom'
import Layout from './layouts/Layout'
import { Route } from 'react-router-dom'
import Home from './components/Home'
import Cart from './layouts/Cart'
import Search from './layouts/Search'
import CategoryProducts from './components/CategoryProducts'
import OrderDetails from './components/OrderDetails'
import Myorders from './components/Myorders'
import Collection from './components/Collection'
import { ToastContainer } from 'react-toastify'


function App() {

  return (
    <>
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"

/>
   <BrowserRouter>
   <Routes>
    <Route element={<Layout/>}>
    <Route  path="/"  element={<Home/>}/>
    <Route path="/category/:category" element={<CategoryProducts/>}/>
    <Route path="collection" element={<Collection/>}/>
    

       
</Route>
<Route path="cart" element={<Cart/>}/>
<Route path="searchbar" element={<Search/>}/>

<Route path="/placeOrder/:cartId" element={<OrderDetails/>}/>



<Route path="yourOrders" element={<Myorders/>}/>
    
    </Routes>
    </BrowserRouter>
  
    </>
  )
}

export default App
