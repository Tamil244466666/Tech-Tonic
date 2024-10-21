import axios from "axios"
import { useEffect, useState } from "react"
import SingleBlog from "./SingleBlog"

const Topread = ({blogstatusonff})=>{
    const [blog,setblog]= useState([]);
    const [pageswitch,setPageSwitch] = useState({onoff:true,BlogId:""})
    useEffect(()=>{
        axios.get('http://localhost:8080/blog').then((res)=>{
            const Allblog = res.data.sort((a,b)=>{return (a.Readers - b.Readers)});
            console.log("after")
            console.log(Allblog);
            setblog([...Allblog]);
            console.log(">before")
            console.log(res.data);
        })
    },[])


    const pageSwitchfn = (id)=>{
        blogstatusonff(id)
            setPageSwitch({onoff:false,BlogId:id})

        }
    
    return(
        <>
        <div className="TopRead">
        {
        (pageswitch.onoff)? 
        (blog.map((val,index)=>{return(<ol onClick={()=>{pageSwitchfn(val._id)}}><img src={val.Image}/><button >{index+1} . {val.Title}</button></ol>)}))

        :(<><button></button><SingleBlog BlogId={pageswitch.BlogId}/></>)
    }
    </div></>
    )
}

export default Topread;