import express from 'express'
import mongoose  from 'mongoose'
import signUp from '../models/signUpSchema.js'
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
const router = express.Router()


//router for signup

router.post("/signUp",async(req,res)=>{
    try{
        const {fullName,email,password} = req.body;
    if(!fullName || !email || !password){
        return res.status(400).json({
            success:false,
            message:"Details not found"
        })
    }
    const user = await signUp.findOne({email});
    if(user){
        return res.status(409).json({
            success:false,
            message:"this email already exists"
        })
    }
    const hashedPassword = await bcrypt.hash(password,10)
    await signUp.create({
        fullName:fullName,
        email:email,
        password:hashedPassword
    })
    return res.status(201).json({
        success:true,
        message:"signUp data saved successfully"
    })
    }catch(err){
        console.error(err)
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
    
})


//router for login
router.post("/login",async(req,res)=>{
    try{ 
    const {email,password} = req.body;
    if(!email || !password) {
        return res.status(400).json({
            success:false,
            message:"email and password are required"
        });
    }
    const findUser = await signUp.findOne({email})
    if(!findUser){
        return res.status(404).json({
            success:false,
            message:"user not found"
        })
    }
    const isPasswordMatch = await bcrypt.compare(password,findUser.password);

    if(!isPasswordMatch){
        return res.status(401).json({
            success:false,
            message:"Invalid Credentials "
        })
    };

//JWT Generation

    const token = jwt.sign(
        {id : findUser._id,role:findUser.role},
        process.env.JWT_SECRET,
        {expiresIn : "1d"}       
    );
    res.status(200).json({
       success:true,
        token,
        user:{
            _id:findUser._id,
            email:findUser.email,
            fullName:findUser.fullName,
            role:findUser.role
        }
        
    }); }catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            message:"Internal server Error"
        })
    }
})


export default router;


