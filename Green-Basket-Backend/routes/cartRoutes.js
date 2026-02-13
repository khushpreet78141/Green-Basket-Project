import express from 'express'
import Products from '../models/productDetailsSchema.js'
import Cart from '../models/cartSchema.js';
import Address from '../models/shippingAddressSchema.js'
import orderDetails from '../models/orderSchema.js'
import { v4 as uuidv4 } from 'uuid';
import auth from '../middleware/authmiddleware.js'
import mongoose from 'mongoose';
const router = express.Router();


//shipping address

router.post("/shippingAddress",auth,async(req,res)=>{
    try{
    const { firstName , lastName , city , pincode , address , phoneNumber } = req.body;
    
    const updatedAddress = await Address.create({
        userId:req.user.id,
        firstName,
        lastName,
        city,
        pincode,
        address,
        phoneNumber
    });

    await updatedAddress.save();
    res.status(201).json({
        success:true,
        message:"shipping address saved successfull"
    })

     }catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
});


// add order details to schema

router.post("/postOrderDetails",auth,async(req,res)=>{
    try{
        const { items ,totalAmount }= req.body

    if(!items || items.length===0){
        return res.status(400).json({
            success:false,
            message:"no items in order"
        })
    }
    const formattedItems = items.map(item=>(
        {productId:item._id,quantity:item.quantity}
    ))

    const order = await orderDetails.create({
        userId:req.user.id,
        orderId:uuidv4(),
        items:formattedItems,
        totalAmount:totalAmount,
        status: "PENDING"
    });
    
    res.status(201).json({
        success:true,
        message:"data created successfully",
        order
    })
    }catch(err){
        console.error(err)
        res.status(500).json({
            success:false,
            message:"Internal server Error"
        })
    }   
})


//get all orderdetails from schema in order to show on frontend

router.get("/getOrderDetails",auth,async(req,res)=>{
    try{
        
        const orders = await orderDetails.find({userId:req.user.id});
        
        res.status(200).json({
            success:true,
            message:"data sent succeccfully",
            data:orders
        });


    }catch(err){
        console.error(err)
        res.status(500).json({
            success:false,
            message:"Internal server Error"
        })
    }  
})


export default router;