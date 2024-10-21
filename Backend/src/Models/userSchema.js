import mongoose, { Types } from "mongoose";

const userModel =new mongoose.Schema({
    UserName:{
        type:String,
        required:true,unique:true},
    Email:{
        type:String,
        required : true,
        unique:true
    },
    Password:{
        type:String,
        required :true
    },
    SavedBlog:{
        type:Array,
    }
    
})

export const userSchema = mongoose.model('users',userModel);