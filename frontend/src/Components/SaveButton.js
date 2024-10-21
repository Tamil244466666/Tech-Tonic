import axios from "axios";
import { useEffect,useState } from "react";
import { getUserId } from "../Hook/getUserId";

const SaveButton = ({connectbutton})=>{

    const _id = getUserId();
    const [visable , setVisable] = useState("Save");
    const [visable2 , setVisable2] = useState(false);

    const handletheclock = ()=>{
        connectbutton()
        if(visable==="Save"){
            setVisable("Saved");
            setVisable2(true);
        }
        else{
            return
        }
    }

    const unSavefn = (BlogId)=>{
        axios.put('http://localhost:8080/blog/unsave',{_id,BlogId})
       .then((res)=>{
           console.log('unsaved')
       }).catch((err)=>{
           console.log(err.message)
       })
   }
    return (
        <>        
        {
        (visable2)? 
        (<>Saved</>)
        :(<button onClick={handletheclock}>{visable}</button>)
        }
        </>
    )
}
export default SaveButton;