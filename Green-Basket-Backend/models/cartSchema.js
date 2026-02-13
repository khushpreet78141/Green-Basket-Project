import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"signUp"
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Products",
        required:true
    },
   quantity:Number,
    
},{timestamps:true})

const cartModel = mongoose.model('Cart',cartSchema);
export default cartModel;
