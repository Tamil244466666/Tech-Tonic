import logo from './logo.svg';
import './App.css';
import Register_login from './pages/Register-login.jsx';
import {Router,Routes,Route} from 'react-router-dom';
import Navbar from './Components/Navbar.jsx'
import Login from './Components/Login.jsx';
import Home from './pages/Home.jsx';
import Saved from './pages/Saved.jsx';
import Aboutus from './pages/AboutUs.jsx';
import Footer from './Components/Footer.jsx';

function App() {
  return (
    <>
    <Navbar/>
    <br/>
    <Router>
    <Routes>
      <Route path='/register' element={<Register_login/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/Saved' element={<Saved/>}/>
      <Route path='/AboutUs' element={<Aboutus/>}/>
    </Routes>
    </Router>
 
    </>
  );
}

export default App;
