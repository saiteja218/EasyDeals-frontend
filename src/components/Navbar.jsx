import {React,useEffect} from 'react'
import './Home.css'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
export default function Navbar({name}) {
    const navigate=useNavigate();
    // useEffect(() => {
    //     const token = Cookies.get("jwt");
    //     if (!token) { 
    //         navigate('/');
    //     }
    // }, [navigate])
   

     // Function to handle logout
  const handleLogout = () => {
    // Delete the JWT cookie
    Cookies.remove('jwt');  // Replace 'jwt' with the actual name of your JWT cookie
    // Navigate to home page
    navigate('/');
  };

  return (
    name?(
    <div style={{padding:"0.5rem 3rem"}}className='navbar'>

        <div className='navbar-left'>
            <div>
                <img src={logo} alt="logo" width={50} height={50}  onClick={()=>{navigate('/')}} style={{cursor:"pointer"}}/>
            </div>
            <div>
                 <h2 onClick={()=>{navigate('/')}} style={{cursor:"pointer"}}>EasyDeals</h2>
            </div>
        </div>

        <div className='navbar-right'>
            <div>
                <p>Hello, {name}</p>
            </div>
            <div>
                <button style={{border:"none"}} onClick={handleLogout}>Logout</button>
            </div>
        </div>

      
    </div>):null
  )
}
