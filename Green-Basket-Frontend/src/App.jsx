import { useState,useEffect } from 'react'
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
import SignUp from './components/SignUp'
import Login from './components/Login'
import SpecificItemDetail from './components/SpecificItemDetail'
import { useDispatch } from 'react-redux'
import { loginSuccess } from './redux/slices/authSlice'
import Admin from './components/Admin'
import AddProduct from './layouts/AddProduct'
import EditProduct from './layouts/EditProduct'
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
  const token = localStorage.getItem("token");
   const user = localStorage.getItem("user");
  if(token && user){
    dispatch(loginSuccess({token,user:JSON.parse(user)}));

  }
  
  }, [])
  
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
    <Route path="/specificItem/:id" element={<SpecificItemDetail/>}/>
    <Route path="/admin" element={<Admin/>}/>

       
</Route>
<Route path="cart" element={<Cart/>}/>
<Route path="searchbar" element={<Search/>}/>

<Route path="/placeOrder" element={<OrderDetails/>}/>



<Route path="yourOrders" element={<Myorders/>}/>
<Route path="signUp" element={<SignUp/>} />
<Route path="login" element={<Login/>}/>
<Route path="/create-product" element={<AddProduct/>}/>
<Route path='admin/editProduct/:id' element={<EditProduct/>}/>
    
    </Routes>
    </BrowserRouter>
  
    </>
  )
}

export default App
