import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userSchema } from "./src/Models/userSchema.js";
import {userRouter} from './src/Routes/userRouter.js';
import cors from 'cors';
import { BlogRouter } from "./src/Routes/BlogRouter.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8080;
app.use(cors())
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/user',userRouter);
app.use('/blog',BlogRouter);

mongoose.connect("mongodb+srv://tamilkumaran021:mHMcdfDZSXY6D3LV@techtoniccluster.sn1b6.mongodb.net/TechTonicCluster?retryWrites=true&w=majority&appName=TechTonicCluster")
.then(()=>{
    console.log('DB is connected');
    app.listen(PORT,()=>{
        console.log("server is online");
    })
})
.catch((err)=>{
    console.log(err)
})




