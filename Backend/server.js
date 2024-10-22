import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userSchema } from "./src/Models/userSchema.js";
import {userRouter} from './src/Routes/userRouter.js';
import cors from 'cors';
import { BlogRouter } from "./src/Routes/BlogRouter.js";
import axios from 'axios';


const url = 'https://tech-tonic-frontend.onrender.com/'; // Replace with your Render URL
const interval = 30000; // Interval in milliseconds (30 seconds)





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


// Reloader Function
function reloadWebsite() {
    axios.get(url)
      .then(response => {
        console.log(`Reloaded at ${new Date().toISOString()}: Status Code ${response.status}`);
      })
      .catch(error => {
        console.error(`Error reloading at ${new Date().toISOString()}:`, error.message);
      });
  }
  
  setInterval(reloadWebsite, interval);




