import express from 'express'
import Products from '../models/productDetailsSchema.js'
import Cart from '../models/cartSchema.js';
import Address from '../models/shippingAddressSchema.js'
import orderDetails from '../models/orderSchema.js'
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';
const router = express.Router();


//item added to cart
router.post("/addingcartItems/:id",async(req,res)=>{
    try{
        const productId = req.params.id
         const findItem = await Products.findById(productId);
         if(!findItem){
            return res.status(400).json({
                success:false,
                message:"product not found"
            })
         }

    const existingItem = await Cart.findOne({productId })
        if(existingItem){
            existingItem.quantity+=1
            await existingItem.save()

            return res.status(200).json({
                success:true,
                data:existingItem
            })
        }

    const newcartItem = await Cart.create({
        productId,
        quantity:1
    })
    await newcartItem.save()
    res.status(201).json({
        success:true,
        data:findItem
    })
    }catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }

})

//item quantity removing from cart
router.post("/removingcartItems/:id",async(req,res)=>{
    try{
        const productId = req.params.id
         const findItem = await Products.findById(productId);
         if(!findItem){
            return res.status(400).json({
                success:false,
                message:"product not found"
            })
        }

    const existingItem = await Cart.findOne({productId })
        if(existingItem.quantity>1){
            existingItem.quantity-=1
            await existingItem.save()

            return res.status(200).json({
                success:true,
                data:existingItem
            })
        }else{
            await Cart.deleteOne({productId});
        }
    }catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
    

})
//permanently delete item from cart
router.delete("/deleteCart/:id",async(req,res)=>{
    try{
        const {id} = req.params
    const del = await Cart.findByIdAndDelete(id)
    res.status(200).json({
        success:true,

    })
    }catch(err){
        console.error(err)
        res.status(500).json({
            success:false
        })
    }
    
    
})

//showing all items on cart

router.get("/getCartItems",async(req,res)=>{
    try{
        const pdts = await Cart.find({})
            .populate("productId","name image price")
        const validItems = pdts.filter(item => item.productId !== null);
        res.status(200).json({
            success:true,
            data:pdts
        })
    }catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            message:"Internal server Error"
        })
    }
})

//shipping address

router.post("/shippingAddress",async(req,res)=>{
    try{
    const { cartId ,firstName , lastName , city , pincode , address , phoneNumber } = req.body;
    
    const updatedAddress = await Address.create({
        cartId,
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

//getting total 
router.get("/gettotal/:cartId",async(req,res)=>{
    try{
        const {cartId} = req.params
    const data = await Cart.findById(cartId)
        .populate("productId","price")
    if (!data || !data.productId) {
  return res.status(404).json({
    success: false,
    message: "Product not available"
  });
}

    const total = data.productId.price *data.quantity
   
    res.status(200).json({
        success:true,
        data:total
    })
    }catch(err){
        console.error(err)
        res.status(500).json({
            success:false,
            message:"Internal server Error"
        })
    }
})


// add order details to schema

router.post("/postOrderDetails/:cartId",async(req,res)=>{
    try{
        const { cartId }= req.params
    const findingOrder = await Cart.findById(cartId)
        .populate("productId","name price")
    if(!findingOrder) return res.status(404).json({
        success:false,
        message:"Item not found in Cart"
    });
    

    const order = await orderDetails.create({

        orderId:uuidv4(), 
        cartId:findingOrder._id,
        productId:findingOrder.productId._id,
        item:findingOrder.productId.name,
        quantity:findingOrder.quantity,
        totalAmount:findingOrder.quantity*findingOrder.productId.price,
        status: "PAID"
    });
    await Cart.findByIdAndDelete(cartId)
    res.status(201).json({
        success:true,
        message:"data created successfully",
        data:order
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

router.get("/getOrderDetails",async(req,res)=>{
    try{
        const orders = await orderDetails.find({});
        res.status(200).json({
            success:true,
            message:"data sent succeccfully",
            data:orders
        })
    }catch(err){
        console.error(err)
        res.status(500).json({
            success:false,
            message:"Internal server Error"
        })
    }  
})



//adding to cart to specified quantity in oneItem

router.post("/oneItem/:id",async(req,res)=>{
    try{
    const productId = req.params.id;
    const {quantity} = req.body;
    const existingItem = await Cart.findOne({productId})

    if(existingItem){
        existingItem.quantity = existingItem.quantity + parseInt(quantity)
        await existingItem.save()
        return res.status(200).json({
            success:true,
            message:"Data created success"
        });
    }
    const item = await Cart.create({
        productId,
        quantity:parseInt(quantity)
    });
    
    res.status(200).json({
        success:true,
        message:"Data created successfully"
    })}catch(err){
        console.error(err)
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }

})

export default router;