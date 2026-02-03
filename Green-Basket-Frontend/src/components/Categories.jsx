import React from 'react'
import { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'

const Categories = () => {

    const [categories, setcategories] = useState([])
    useEffect(() => {

        const fetchDetails = async()=>{
            setcategories([])
            const res = await fetch("http://localhost:3000/api/product/collection",{method:"GET",header:{"Content-Type":"application/json"}})
            const data = await res.json()
            setcategories(data.data)
        }
       const mancatogries = [
        {
            name:"fruits",
            image:{
                url:"/allfruits.png",
                alt:"image"
            }
        },
        {
            name:"vegetables",
            image:{
                url:"/veggies.png",
                alt:"image"
            }
        },
        {
            name:"snacks",
            image:{
                url:"/snacks.png",
                alt:"image"
            }
        },
        {
            name:"grocery",
            image:{
                url:"/grocery.png",
                alt:"image"
            }
        },
        {
            name:"beverages",
            image:{
                url:"/beverages.png",
                alt:"image"
            }
        }
    ]
    setcategories(mancatogries)
    }, [])

    
   
  return (
    <div className='flex md:flex-row flex-col gap-4 md:gap-1 items-center my-20 mx-24 justify-around'>
      {categories.map(item=>(
        <div key={item.name} className='flex flex-col  transition-transform hover:scale-105 shadow-2xl items-center gap-4  p-4 rounded-2xl  shadow-green-950 md:w-1/6 '>
            <div><img src={item.image.url} alt={item.image.alt} className='w-20 h-20 '/></div>
           <Link to={`/category/${item.name}`}> <button className='text-white bg-green-950 p-1 rounded-xl font-bold'>{item.name}</button> </Link>

        </div>

))}

    </div> 

  )
}

export default Categories
