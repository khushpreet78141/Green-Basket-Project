import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const productDetails = new Schema({
  name: String,
  image:{
    url:String,
    alt:String
  },
  description:String,
  category:String,
  shop:String,
  units:String,
  price:Number,
  inStock:{type:Boolean,default:true},
  quantity:{
    type: Number,
    default: 0
  },
   averageRating: {
    type: Number,
    default: 0
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  totalSold: {
    type: Number,
    default: 0
  }


},{timestamps:true});

const productsModel = mongoose.model('Products', productDetails);

export default productsModel;

