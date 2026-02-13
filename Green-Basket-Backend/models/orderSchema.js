import mongoose from "mongoose";

const Schema = mongoose.Schema;
const orderSchema = new Schema({
   
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"signUpSchema",
    required:true
  },
    orderId:{
        type:String,
        required:true,
        unique:true
    },
    items:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Products",
                required:true
            },
            
            quantity:Number
        }
    ],
    totalAmount:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:["PENDING","PAID"],
        default:"PENDING"
    },

},{timestamps:true})

const orderModel = mongoose.model("OrderDetails",orderSchema)
export default orderModel;
