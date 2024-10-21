import { useState } from "react"

const Unsave = ({unSaveButton})=>{


    const [visable,setVisable] = useState(false);

const unsavebuttonfn =()=>{
    unSaveButton();
    setVisable(true)
}

return(
    <>
    <button onClick={unsavebuttonfn} disabled={visable}>Unsave</button>
    </>
)
}
export default Unsave;

