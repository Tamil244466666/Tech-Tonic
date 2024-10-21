import express from 'express';
import emailValidator from 'deep-email-validator';
import mongoose from 'mongoose';
import { userSchema } from '../Models/userSchema.js';
import bcrypt from 'bcrypt';
import  jwt from 'jsonwebtoken';

const router = express.Router();
// Register
router.post('/register',async(req,res)=>{
    try{
    const {UserName,Email,Password,ReenterPassword} = req.body.userData;

    const  isEmailValid = (Email) =>{
        return emailValidator.validate(Email)
    }
  
    isEmailValid(Email).then(async(result) => {
        if (result.valid) {
            const findEmail = await userSchema.findOne({Email:Email})
            const findName = await userSchema.findOne({UserName:UserName})

            if(!findEmail){
                if(!findName){
                    if(Password === ReenterPassword){
            const hashPassword = await bcrypt.hash(Password,10);
            const user =await userSchema.create({...req.body.userData,Password:hashPassword});
            res.json({status:"Successfully created"});
                }
                else{
                    res.json({status:"The Reentered password is not matching"})
                }
                }
                else{
                    res.json({status:"The Username is already exist"});
                }
        }
            else{
                res.json({status:"The Email is already exist"});
            }
        } 
        else {
            res.json({status:'Invalid Email'});
        }
      });
}catch(err)
        {
            res.json({message:err.message})
        }
})

router.post('/login',async(req,res)=>{

        const {Email,Password} = req.body.loginData;
    try{
        const user = await userSchema.findOne({Email:Email})
    if(!user){
        return res.json({message:"The user is not exists"})
    }
    else{
        const isPasswordValid = await bcrypt.compare(Password,user.Password);
        if(!isPasswordValid){
            return res.json({message:"Password is invalid"})
        }
        else{
            const token = jwt.sign({id:user._id},"secret");
            return res.json({token,userId:user._id ,message:"successfully logged in"})
        }
    }
    }catch(err){
        res.json({status:err.message})
    }
})

router.get('/:id',async(req,res)=>{
   try{ 
    const {id} = req.params;
    const user = await userSchema.findById(id);
    res.json(user)
}catch(err){
    res.json(err)
}
})



export {router as userRouter}