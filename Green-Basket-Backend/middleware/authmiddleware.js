import jwt from "jsonwebtoken";

//middleware for authorization

const auth = (req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(401).json({message:"Token missing"})
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = {
            id:decoded.id,
            role:decoded.role
        }
        
        next();
    }catch{
        res.status(401).json({message:"Invalid token"});
    }
};

export default auth;


