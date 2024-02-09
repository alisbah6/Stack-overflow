import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs';
import users from "../models/userSchema.js";
export const signup=async(req,res)=>
{ const {name,email,password}=req.body;
try{
    const existinguser=await users.findOne({email});
    if(existinguser){
        return res.status(404).json({message:"User already Exists"});
    }
    const hashedpassword=await bcrypt.hash(password,12)
    const newUser=await users.create({name,email,password:hashedpassword});
    const token=jwt.sign({email:newUser.email,id:newUser.id},"test",{expiresIn:'1h'});
    res.status(200).json({result:newUser,token})
}
catch(err){
res.status(500).json("Something went wrong");
}
}

export const login=async(req,res)=>{
    const {email,password}=req.body;
try{
    const existinguser=await users.findOne({email});
    if(!existinguser){
        return res.status(404).json({message:"User dosen't Exists"});
    }
    const isPasswordCrt=await bcrypt.compare(password,existinguser.password)
    if(!isPasswordCrt){
        return res.status(400).json({message:"Invalid Credentials"})
    }
    const token=jwt.sign({email:existinguser.email,id:existinguser.id},"test",{expiresIn:"1h"});
    res.status(200).json({result:existinguser,token})
}
catch(err){
    res.status(500).json("Something went wrong");
    }
}