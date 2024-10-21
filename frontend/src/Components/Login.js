import axios from "axios";
import { useState } from "react";
import {useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom';
import Footer from "./Footer";
const Login = ()=>{
    const Navigate = useNavigate();
    const  [loginData, setLoginData] = useState({});
    const  [status, setStatus] = useState({status:"login your account"});
    const [cookie,setCookie] = useCookies(['access_token'])
    const handlestate = (event) =>{
        const {name ,value} = event.target;
        setLoginData({...loginData,[name]:value});
    }

   const submitHandler = async(event)=>{
    event.preventDefault();
    await axios.post('http://localhost:8080/user/login',{loginData})
    .then((res)=>{
        if(res.data.message === "successfully logged in"){
        setStatus(res.data);
        console.log(res.data);
        setCookie('access_token',res.data.token);
        window.localStorage.setItem("userID",res.data.userId);
        Navigate('/')
        }
        else{
            setStatus({status:res.data.message});
        }
    }).catch((err)=>{
        console.log(err)
    })
   }
return (
        <div>
        <div className="Login-Page">
            <h1 >Login</h1>
            <form onSubmit={submitHandler} className="Login-Container">   
            <div>    
            <label htmlFor='Email'>Email</label>
            <input type='text' name='Email' id='Email' onChange={handlestate}/>
            </div>
            <div><label htmlFor='Password'>Password</label>
            <input type='text' name='Password' id='Password' onChange={handlestate}/>
            </div>
            <p>{status.status}</p>
            <button>submit</button>
            </form>
          
        </div>
        <Footer Footerclass={"FooterOtherpage"}/>
        </div>
)

}
export default Login;