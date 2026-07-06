import User from "../models/User.js";
import jwt, { decode } from 'jsonwebtoken';

export const protect = async (req,res,next) =>{
    console.log("HEADERS:", req.headers.authorization);
    try{
        //cookie la irundu token edukkrom
        const token = req.headers.authorization?.split(" ")[1];

        console.log("TOKEN:", token);
        
        if(!token){
            return res.status(401).json({message:"No token"});
        }

        // Verify token
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded);

        // user fetch
        req.user = await User.findById(decoded.id).select("-password");
        next();



    }
    catch(err){
        console.log("Token verification failed:",err.message);
        return res.status(401).json({message:"Not authorized"});
    }
};