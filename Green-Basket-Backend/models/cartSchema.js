import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Products",
        required:true
    },
   quantity:Number,
    
},{timestamps:true})

const cartModel = mongoose.model('Cart',cartSchema);
export default cartModel;
