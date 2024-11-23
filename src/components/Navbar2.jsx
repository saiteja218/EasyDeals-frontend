import React from 'react'
import './Home.css'     
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'

export default function Navbar2({data}) {
    // console.log(data)
    const navigate=useNavigate();
  return (
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
                <p>Hello, {data.name}</p>
            </div>
            <div>
                <button style={{border:"none"}}>Logout</button>
            </div>
        </div>

      
    </div>
  )
}
