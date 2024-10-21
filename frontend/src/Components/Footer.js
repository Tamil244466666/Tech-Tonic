import { Link } from "react-router-dom";

const Footer = ({Footerclass})=>{
    return(
        <>
        <div className={Footerclass}>
        <h3>Contact Us: Email:<a href="mailto:tamilkumaran021@gmail.com" style={{background:"#A0153E"}}>tamilkumaran021@gmail.com</a> Phone: +91 7550198531</h3>
        <h3>© 2024 Tech Tonic. All Rights Reserved.</h3>
        </div>
        </>
    )
}

export default Footer;