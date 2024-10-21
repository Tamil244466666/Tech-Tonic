import express from 'express';
import { BlogSchema } from '../Models/blogSchema.js';
import { userSchema } from '../Models/userSchema.js';

const router = express.Router();

// Create a blog
router.post('/',async(req,res)=>{
    try{
        const Blog = await BlogSchema.create(req.body);
        res.json({status:"Blog is successfully created"})
    }
    catch(err){
        res.json({Status:err.message})
    }
})

// Show the Blog
router.get('/',async(req,res)=>{
    try{
        const allBlog = await BlogSchema.find();
        res.json(allBlog);
    }catch(err){
        res.json({Message:err.message})
    }
})


//find a single Blog

router.get('/:id',async(req,res)=>{
    try{
        const {id} = req.params
        const findone = await BlogSchema.findOne({_id:id})
        res.json(findone);
    }catch(err){
        res.json({Message:err.message})
    }

})

//save a blog
router.put('/',async(req,res)=>{
    try{
        const {_id,BlogId} = req.body;
        const saveone = await userSchema.findById({_id});
        saveone.SavedBlog.unshift(BlogId);
        await saveone.save();
        res.json({status:"saved"});
    }
    catch(err){
        res.json({message:err.message})
    }
})

router.put('/popularreading',async(req,res)=>{
    try{
        const {userID,blogID} = req.body;
        const blog = await BlogSchema.findById({_id:blogID});
        blog.Readers = blog.Readers + 1;
        await blog.save();
       res.json({message:"added"})
        
    //     if(Array.isArray(blog.Readers)){
    //     blog.Readers.unshift(userID);
    //     await blog.save();
    //     res.json({message:"added"})
    // }else{
    //     res.json({message:"it is not a array"})
    // }      
    }
    catch(err){
        
        res.json({message:err.message,mess:"error accored"})
    }
})
router.put('/unsave',async(req,res)=>{
    try{
        const {_id,BlogId} = req.body;
        const saveone = await userSchema.findById({_id});
        const unSaveArr = saveone.SavedBlog.filter((val)=> {return (val !== BlogId)})
        saveone.SavedBlog = [...unSaveArr];
        await saveone.save();
        res.json({status:"unsaved"});
    }
    catch(err){
        res.json({message:err.message})
    }
})



export {router as BlogRouter}