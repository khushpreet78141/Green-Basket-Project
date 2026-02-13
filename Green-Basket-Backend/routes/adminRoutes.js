import express from 'express'
import Products from '../models/productDetailsSchema.js';

import auth from '../middleware/authmiddleware.js';
import isAdmin from '../middleware/isAdmin.js';
import mongoose from 'mongoose';
const router = express.Router();
//add products by admin 
router.post("/create-product",auth,isAdmin,async(req,res)=>{
    try{
        const {  name,
  image,
  description,
  category,
  shop,
  units,
  price,
  instock} = req.body 
  
  const createdBy = req.user.id

  const result = await Products.create({ name,
  image:{
    url:image,
    
  },
  quantity:0,
  description,
  category,
  shop,
  units,
  price,
  instock,createdBy});
  
  res.status(201).json({
    success:true,
    data:result
  });

    }catch(err){
        console.error(err)
        res.status(500).json({
            success:false,
            message:"Internal server Error"
        });

    }
});

//delete product
router.delete("/deleteProduct/:id",auth,isAdmin,async(req,res)=>{
    try{
        const {id} = req.params;
    const deleteProduct = await Products.findByIdAndDelete(id);
    
    res.status(200).json({
        success:true,
        message:"Deleted successfully"
    });
    }catch(err){
        console.error(err)
        res.status(500).json({
            success:false,
            message:"Internal server error"
        });
    }
    

})


//edit product
router.get("/getpdt/:id",async(req,res)=>{
    try{

    const {id} = req.params
    const findPdt = await Products.findById(id).lean();
    
    if(!findPdt){
        return res.status(404).json({
            success:false,
            message:"product not found"
        })
    }
    res.status(200).json({
        success:true,
        data:{...findPdt,image:findPdt.image?.url}
    })
 }catch(err){
    console.error(err)
    res.status(500).json({
        success:false,
        message:"product not found"
    })
 }
})


//update product
router.put("/saveproduct/:id",async(req,res)=>{
    try{
        const {id} = req.params
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                success:false,
                message:"Invalid product Id"
            })
        }
        const existing = await Products.findById(id);
        if(!existing){
            return res.status(404).json({
                success:false,
                message:"product not found"
            })
        }
        const updated = {}
        const allowedfield = [
            "name",
      "description",
      "category",
      "shop",
      "units",
      "price"
        ]
        allowedfield.forEach((field)=>{
            if(req.body[field] !== undefined){
                updated[field] = req.body[field]
            }
        })
        if(req.body.image){
            updated.image = {
                ...updated.image,url:req.body.image
            }
        }

        //const {name,image,description,category,shop,units,price} = req.body
        if (updated.price && updated.price < 0) {
      return res.status(400).json({
        success: false,
        message: "Price cannot be negative",
      });
    }
        const pdt = await Products.findByIdAndUpdate(id,updated,{new:true});
        res.status(200).json({
            success:true,
            data: pdt

        });

    }catch(err){
        console.error(err);

        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        });



    }
})

export default router;