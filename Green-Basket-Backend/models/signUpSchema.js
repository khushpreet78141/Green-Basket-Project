import mongoose from 'mongoose';
import { Schema } from 'mongoose';


const signUpSchema = new Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    }
});

const signUpModel = mongoose.model("SignUp",signUpSchema);
export default signUpModel;

