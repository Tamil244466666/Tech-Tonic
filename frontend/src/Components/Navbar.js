import { Link } from "react-router-dom"
import {useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom'
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Logo from "../Asset/TechTonic Logo.png"

const Navbar = ()=>{
    const [Logout,setLogout] = useState("Navbar") 
    const location = useLocation();
    console.log(location.pathname);
    const identify ={border:"solid 1px white",background:"#00193a" ,color:"white"};
    const [useidentify,setidentify] = useState({Home:undefined,Saved:undefined,Login:undefined,Register:undefined,AboutUs:undefined})


const Menuicon1 = "https://img.icons8.com/?size=100&id=YOrgWKvUdGE3&format=png&color=f0f0f0";
const Menuicon2 = "https://img.icons8.com/?size=100&id=79201&format=png&color=f0f0f0";
const [cookie,setCookie] = useCookies(['access_token']);
const [visable] = useState("burgerMenuicon");
const [MobileMenu,setMobileMenu] = useState("BurgerMenuHide");
const [iconUrl, setUrl] = useState(Menuicon1)


const Menu = "BurgerMenu";
const Menu2 = "BurgerMenuHide";
const Navigate = useNavigate();

const handlelogout = ()=>{
    setCookie("access_token","");
    window.localStorage.removeItem("userID");
    Navigate('/login')
}

const BurgerMenu = ()=>{
    if(MobileMenu === Menu2){
        setUrl(Menuicon2);
        setMobileMenu(Menu);
    }
    else{
        setUrl(Menuicon1);
        setMobileMenu(Menu2);
    }
}
useEffect(()=>{
    if(location.pathname === '/'){
        setidentify({Home:identify,Saved:undefined,Login:undefined,Register:undefined,AboutUs:undefined})
}
    if(location.pathname === '/Saved'){
        setidentify({Home:undefined,Saved:identify,Login:undefined,Register:undefined,AboutUs:undefined})
}
    if(location.pathname === '/register'){
        setidentify({Home:undefined,Saved:undefined,Login:undefined,Register:identify,AboutUs:undefined})
}
    if(location.pathname === '/login'){
        setidentify({Home:undefined,Saved:undefined,Login:identify,Register:undefined,AboutUs:undefined})
}
    if(location.pathname === '/AboutUs'){
        setidentify({Home:undefined,Saved:undefined,Login:identify,Register:undefined,AboutUs:identify})
}



},[useidentify])

const Logoutclassfn = ()=>{
    if(Logout === "Navbar"){
        setLogout("NavbarLogout");
    }
    else{
        setLogout("Navbar")
    }
}
    return(
        <>
        <div className={Logout}>
            <img src={Logo} alt="logo" />
         <Link className="NavLink" to='/' style={useidentify.Home}>Home</Link>
         <Link  className="NavLink" to='/Saved' style={useidentify.Saved}>Saved</Link>
  
        <Link  className="NavLink" to='/AboutUs' style={useidentify.AboutUs}>About Us</Link>
        {cookie.access_token? (<Link className="NavLinkLogout" onClick={handlelogout}>Logout</Link>):(<div className="NavUser"><Link  className="NavLink" to='/register' style={useidentify.Register}>Register</Link>
            <Link className="NavLinkLogin" to='/login'   style={useidentify.Login}>Login</Link></div>)}
        </div>



        <div className="MoblieLogo">
            <img src={Logo} alt="logo"/>
        </div>
        <img src={iconUrl} className={visable} alt="menu"
        onClick={()=>{BurgerMenu() }}/>

            <div className={MobileMenu}>
            <Link className="NavLink" to='/'>Home</Link>
         <Link  className="NavLink" to='/Saved'>Saved</Link>
   {cookie.access_token? (<Link  className="Navbutton" onClick={handlelogout}>logout</Link>) :(<div className="NavUser"><Link  className="NavLink" to='/register'>Register</Link>
        <Link className="NavLinkLogin" to='/login'>Login</Link></div>)}
        <Link  className="NavLink" to='/AboutUs'>About Us</Link>
            </div>

        </>
    )
}

export default Navbar;