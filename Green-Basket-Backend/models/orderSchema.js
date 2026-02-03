import mongoose from "mongoose";

const Schema = mongoose.Schema;
const orderSchema = new Schema({
    orderId: {
    type: String,
    unique: true,
    required: true,
  },
  cartId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Cart",
        required:true
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Products",
        required:true
    },

    item:String,
    quantity:Number,
    totalAmount:Number,
    status:{
        type:String,
        enum:["PENDING","PAID"],
        default:"PENDING"
    },

},{timestamps:true})

const orderModel = mongoose.model("OrderDetails",orderSchema)
export default orderModel;
