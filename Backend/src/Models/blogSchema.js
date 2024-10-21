import mongoose from "mongoose";

const blogModel = new mongoose.Schema({
    Title:{
        type:String,
        required:true
    },
    Image:{
        type:String,
        required:true
    },
    Oneline:{
        type:String,
        required:true
    },
    Content : {
        type:String,
        required:true
    },
    Readers:{
        type:Number,
        default:1
    }
},{timestamps:true})

export const BlogSchema = mongoose.model('Blog',blogModel);