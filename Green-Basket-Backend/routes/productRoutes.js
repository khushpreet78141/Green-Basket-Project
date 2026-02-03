import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import Products from '../models/productDetailsSchema.js'
import BestSeller from '../models/bestSellerSchema.js'
import Cart from '../models/cartSchema.js';



//get all collection
router.get('/collection', async(req, res) => {
    try{
        const products = await Products.find({})
        
        res.status(200).json({
            success:true,
            message:"products are sent",
            data:products

        })
    }catch(err){
        console.error(err)
        res.status(500).json("Internal server error")
    }
  
  
})

//filtering category wise 
router.get("/category/:category",async(req,res)=>{
    try{
        const { category } = req.params;

    const requiredCategory = await Products.find({category});
    res.status(200).json({
        success:true,
        data:requiredCategory
    })

    }catch(err){
        console.error(err)

        res.status(500).json("Internal server error")
    }
})
//sorting acc to price in respective category
router.get("/category/:category/sortBy",async(req,res)=>{
    try{
        const { category } = req.params
        const { price } = req.query
        let sortoption = {}
        if(price ==="low_high"){
            sortoption = {price:1}
        }else if(price ==="high_low"){
            sortoption = {price:-1}
        }
        const required = await Products.find({category}).sort(sortoption)
        res.status(200).json({
            success:true,
            data:required
        })
    }catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            message:"Internal server Error"
        })
    }
})

//best seller
router.get("/bestseller",async(req,res)=>{
    try{
        const product = await Products.find({inStock:true}).sort({averageRating:-1,totalSold:-1,totalReviews:-1}).limit(6)
        res.status(200).json({
            success:true,
            data:product
        })
    }catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
   
})

//search filter
router.get("/searchInput",async(req,res)=>{
    try{
        const { q } = req.query
         if (!q || q.trim() === "") {
      return res.status(200).json({
        success: true,
        data: []
      });
    }

    const filter = {}
    if(q){
        filter.$or = [
            {name:{$regex:q,$options:"i"}},
            {category:{$regex:q,$options:"i"}}
        ]
    }
    const pdts = await Products.find(filter)
    res.status(200).json({
        success:true,
        data:pdts
    })
    }catch(err){
        console.error(err)
        res.status(500).json({
            success:false,
            message: "Internal server Error"
        })
    }
})



//you might need section acc to latest created item in cart
router.get("/recommended",async(req,res)=>{
    try{
        const lastCartItem = await Cart.findOne().sort({createdAt:-1}).populate("productId");
        if (!lastCartItem || !lastCartItem.productId) {
      return res.status(200).json({
        success: true,
        data: []
      });
    }
        const recommended = await Products.find({
            category:lastCartItem.productId.category,
            _id:{$ne : lastCartItem.productId._id},
            inStock:true,
        }).limit(7);
        res.status(200).json({
            success:true,
            data: recommended
        })
    }catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            message:"Internal server Error"
        })
    }
})

//sorting acc to price and category

router.get("/sortBy",async(req,res)=>{
    try{ 
          console.log("SORT ROUTE HIT");
    const { byprice , bycategory } = req.query
    const filtercategory = {}
    let sortoption = {}
    if(bycategory){
        filtercategory.category = bycategory
    }

    if(byprice==="low_high"){
        sortoption = {price:1}
    }
    else if(byprice==="high_low"){
        sortoption = {price:-1}
         }
   
    const pdts = await Products.find(filtercategory).sort(sortoption);

    res.status(200).json({
        success:true,
        data:pdts
    });
    }
   catch(err){
        console.error(err)
        res.status(500).json({
            success:false,
            message:"Internal server Error"
        })
    }
})

//get any one item 
router.get("/getOneitem",async(req,res)=>{
    try{
         const item = await Products.findOne({})
         console.log(item)
         res.status(200).json({
            success:true,
            data:item
         })    
    }catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
   

})

export default router;