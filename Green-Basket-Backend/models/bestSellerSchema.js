import mongoose from "mongoose";
const Schema = mongoose.Schema

const bestSellerSchema = new Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Products",
        required:true

    },
    
    rating:{
        type:Number,
        min:1,
        max:5
    },
    comment:String,

},{timestamps:true});
const bestSellerModel = mongoose.model("BestSeller",bestSellerSchema);
export default bestSellerModel;

