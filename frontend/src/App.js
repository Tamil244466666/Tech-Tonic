import logo from './logo.svg';
import './App.css';
import Register_login from './pages/Register-login';
import {Router,Routes,Route} from 'react-router-dom';
import Navbar from './Components/Navbar.js'
import Login from './Components/Login';
import Home from './pages/Home.js';
import Saved from './pages/Saved.js';
import Aboutus from './pages/AboutUs.js';
import Footer from './Components/Footer.js';

function App() {
  return (
    <>
    <Navbar/>
    <br/>
    {/* <Router> */}
    <Routes>
      <Route path='/register' element={<Register_login/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/Saved' element={<Saved/>}/>
      <Route path='/AboutUs' element={<Aboutus/>}/>
    </Routes>
    {/* </Router> */}
 
    </>
  );
}

export default App;
