import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const addressSchema = new Schema({
  
    cartId : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Cart",
        required:true
    },

  firstName: { type: String ,required:true,trim:true},
  lastName: { type: String, match: /^[A-Za-z]+$/i ,trim:true },
  city:{type: String , required:true ,trim:true},
  pincode:{type:String,match: /^[0-9]{6}$/,required:true },
  address:{type:String,required:true ,trim:true},
  phoneNumber:{ type:String , match:/^[0-9]{10}$/,required:true },
  

},{timestamps:true});


const addressModel = mongoose.model('Address',addressSchema );
export default addressModel;


