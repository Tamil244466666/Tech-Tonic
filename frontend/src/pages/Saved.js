import { useEffect, useState } from "react";
import axios from 'axios';
import {getUserId} from '../Hook/getUserId';
import { Link } from "react-router-dom";
import SingleBlog from "../Components/SingleBlog";
import Unsave from '../Components/Unsave';

const Saved = ()=>{
    const _id = getUserId()
    const [user,setUser] = useState({});
    const [savedBlog,setSavedBlog] = useState([]);
    const [pageShift,setPageShift] = useState([{onoff:false , BlogId:""}]);
    useEffect(()=>{

        if(_id){

        // axios.get(`http//:localhost:8080/user/${userID}`)   // this couse me error
        // .then((res)=>{
        //     setUser({...res.data});
        //     console.log([...res.data.savedBlog])
        // }).catch((err)=>{
        //     console.log(err.massage)
        // })

        axios.get(`http://localhost:8080/user/${_id}`)
        .then((res)=>{
           setUser({...res.data});
           console.log(res.data)
       }).catch((err)=>{
           console.log(err)
       })
    
        axios.get('http://localhost:8080/blog').then((res)=>{
            setSavedBlog([...res.data].reverse());
            console.log("after")
            console.log(res.data);
        }).catch((err)=>{
            console.log(err.massage)
        })
    }
    
    },[])


    const unSavefn = (BlogId)=>{
        axios.put('http://localhost:8080/blog/unsave',{_id,BlogId})
       .then((res)=>{
           console.log('unsaved')
       }).catch((err)=>{
           console.log(err.message)
       })
   }



    return(
        <div className="SavePage">
        {(pageShift.onoff)? 

        (<><button className="BackButton2" onClick={()=>setPageShift({onoff:false,BlogId:``})}>Back</button>
        <SingleBlog BlogId={pageShift.BlogId}/></>) 
        
        :((_id)? ((Array.isArray(user.SavedBlog) && user.SavedBlog.length > 0)? (
        <ul>     
        { 
        savedBlog.map((val)=>    
        {
        if (Array.isArray(user.SavedBlog))
            {
                const saveArray = user.SavedBlog;
            if(saveArray.find((value) => value === val._id))
            {
            return(
                <li key={val._id}>
                <h1>{val.Title}</h1>
                <img src={val.Image} alt="image"/>
                <h3>{val.Oneline}</h3>
                <div>
                <button onClick={()=>setPageShift({onoff:true,BlogId:`${val._id}`})}>read</button>
                <Unsave unSaveButton={()=>{unSavefn(val._id);}}/>
                </div>
                </li>
                )
            }
            }
        }
                    )
        }
        </ul>) :(<div className="NotLogin"><h1>Your havent save anything </h1><Link to='/'><h1 className="NotLoginButton">Go to HomePage</h1></Link></div>)) 
        :(<div className="NotLogin"><h1>login to access the saved readings</h1> <Link to='/login' ><h1 className="NotLoginButton">login</h1></Link></div>))}
        </div>
    )
}
export default Saved;