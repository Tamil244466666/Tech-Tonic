import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "./Footer";

const SingleBlog = (prop)=>{

    const [blog,setBlog] = useState({})

    useEffect(()=>{
        axios.get(`https://tech-tonic.onrender.com/blog/${prop.BlogId}`).then((res)=>{
            setBlog(res.data);
            console.log(blog)
        }).catch((err)=>{
            console.log(err)
        })
    },[])

    return(
        <>
            <div className="SinglePage">
                <h1>Title: {blog.Title}</h1>
                <img src={blog.Image} alt="Image"/>
                <p>{blog.Oneline}</p>
                <p>{blog.Content}</p>
            </div>
        </>
    )
}

export default SingleBlog;
