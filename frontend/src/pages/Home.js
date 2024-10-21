import axios from "axios";
import { useState,useEffect } from "react";
import SingleBlog from "../Components/SingleBlog";
import { getUserId } from "../Hook/getUserId";
import SaveButton from "../Components/SaveButton";
import Topread from '../Components/Topread';
import {useCookies} from 'react-cookie'
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";

const Home =()=>{
    const _id = getUserId();
    const [cookie ,setCookie] = useCookies(["access_token"]);
    
     const [blog,setBlog] = useState([])
     const [user,setUser] = useState({})
    const [blogstatus,setBlogStatus] = useState({onoff:true,BlogId:""})
    const [topReading,setTopReading] = useState([]);
    
    useEffect(()=>{

        function checkcookie(){
            if(cookie.access_token){
                return;
            }
            else{
                window.localStorage.removeItem("userID");
            }
        }
        checkcookie();

        axios.get('https://tech-tonic.onrender.com/blog')
        .then((res)=>{
            setBlog(res.data.reverse());
         
            console.log("blog"+blog);
        })
        .catch((err)=>{
            console.log(err);
        })

        function userfn(){
        if(_id){
          axios.get(`https://tech-tonic.onrender.com/user/${_id}`)
         .then((res)=>{
            setUser({...res.data});
        }).catch((err)=>{
            console.log(err)
        })
    }

}
 userfn()
 function topread(){
    const topblog = blog.sort((a,b)=>a.Readers - b.Readers);
    setTopReading(topblog.reverse());
    console.log('read')
}
    topread()

 
    },[_id,blogstatus])




    const Savefn = (BlogId)=>{
         axios.put('https://tech-tonic.onrender.com/blog',{_id,BlogId})
        .then((res)=>{
            console.log('saved')
        }).catch((err)=>{
            console.log(err.message)
        })
    }
   
    const readbuttonfn =async(id)=>{
        setBlogStatus({onoff:false,BlogId:id});
        await axios.put('https://tech-tonic.onrender.com/popularreading',{userID:'670e1b426c1eb970b58827f8',blogID:id})
        .then((res)=>{
            console.log(res.data);
            console.log("record the reader");
        }).catch((err)=>{
            console.log(err)
        })
    }
   
    const isSaved = (id)=>{
        if(!_id)
            {
                return undefined; 
        }
        // else
        // {
        //     const {SavedBlog} = user;
        //     const findSave =  SavedBlog.find((val)=>{return val === id})
        //     return findSave;
        // }    
        else {
            const { SavedBlog } = user;
            if (Array.isArray(SavedBlog)) {            //check the savedBlog is a array
                return SavedBlog.find((val) => val === id);
            } else {
                console.error('SavedBlog is not an array');
                return undefined;
            }
        }
    }
    return(
        <>
        <div >
 {(blogstatus.onoff)? (
    <div><div className="HomePageContainer">
            <ul  className="HomePageContent">
            {blog.map((val,index)=>{
                return(
                   <li key={index +1}>
                       <h1>{val.Title}</h1>
                       <hr color="white"/>
                       <br/>
                       <img src={val.Image} alt="image"/>
                       <br/>
                       <h3>{val.Oneline}</h3>
                       <br/>
                       <button onClick={()=>{readbuttonfn(val._id)}}>read</button>
                       {/* {(_id !== false)? ((isSaved(val._id) !== undefined)? (<>already saved</>) :(<button onClick={(e)=>{Savefn(val._id);}}id={val._id}>{savebutton}</button>)) :(<></>)} */}
                    <div> {(_id !== false)? ((isSaved(val._id) !== undefined)? (<>already saved</>) :(<SaveButton  connectbutton={(e)=>{Savefn(val._id);}}/>)) :(<button><Link to='/login' className="Loglink">Login to save the blog post!</Link></button>)} 
                    </div></li> 
                )
            })}
            </ul>
            <div className="HomePageContent" style={{border:"solid 2px #FF204E"}}>
                <h2 style={{textAlign:"center"}}>Trending</h2>
            <Topread blogstatusonff={readbuttonfn} />
            </div>
            
        </div>
        <Footer Footerclass={"Footer"}/></div>
    ) :(<>
        <button onClick={()=>{setBlogStatus({onoff:true,BlogId:" "})}} className="BackButton">Back</button>
            <SingleBlog BlogId = {blogstatus.BlogId}/>
            </>)}
       
        </div>
       
        </>
    )
}
export default Home;
 
