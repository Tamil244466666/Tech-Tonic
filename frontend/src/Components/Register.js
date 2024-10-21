import {useState ,useEffect} from 'react' 
import {useNavigate,} from 'react-router-dom';
import Footer from './Footer';

import axios from 'axios'
const Register = ()=>{

  const [userData,setUserData] = useState({});
  const [resMessage,setresMessage] = useState({status:"create a account"});

  const Navigate = useNavigate();

  function handlestate(event){
        const {name ,value} = event.target;
        setUserData({...userData,[name]:value});
        console.log(userData);
  }

  const submitHandler = async(event)=>{
    try{
    event.preventDefault()
    await axios.post('https://tech-tonic.onrender.com/user/register',{userData})
    .then((responce)=>{

        
        setresMessage(responce.data)
        console.log(responce.data);
        if(responce.data.status === "Successfully created"){
            Navigate('/login')   
        }
    }).catch((err)=>{
        console.log(err.message)
    })
}
catch(err){
    console.log(err.message)
}


  }

    return (
        <>
        <div className="Login-Page">
            <h1>Register</h1>
            <form onSubmit={submitHandler} className="Login-Container"> 
            <div>  
            <label htmlFor='UserName'>Username</label>
            <input type='text' name='UserName' id='UserName' onChange={handlestate}/>
            </div>
            <div>
            <label htmlFor='Email'>Email</label>
            <input type='text' name='Email' id='Email' onChange={handlestate}/>
            </div>
            <div>
            <label htmlFor='Password'>Password</label>
            <input type='password' name='Password' id='Password' onChange={handlestate}/>
            </div>
            <div>
            <label htmlFor='ReenterPassword'>Password</label>
            <input type='text' name='ReenterPassword' id='ReenterPassword' onChange={handlestate}/>
            </div>
            <p>{resMessage.status}</p>
            <button>submit</button>
            </form>
        </div>
        <Footer Footerclass={"FooterOtherpage"}/>
        </>
    )

}

export default Register;
