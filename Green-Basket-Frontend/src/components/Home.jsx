import React from 'react'
import Categories from './Categories'
import About from '../layouts/About'
import Recommendtions from './Recommendtions'
import ItemDetails from './ItemDetails'
import Bestseller from './Bestseller'
import SiteInfo from '../layouts/SiteInfo'
import Footer from '../layouts/Footer'
const Home = () => {
  return (
    <>
    <About/>
    <Categories/>
    <Recommendtions/>
    <ItemDetails/>
    <Bestseller/>
    <SiteInfo/>
    <Footer/>
    
   </>


    
  ) 
}

export default Home




