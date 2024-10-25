import React from 'react';
import { useNavigate } from 'react-router-dom';
import left from '../assets/1-1.jpg'
import right from '../assets/1-2.jpg'
import "./Home.css"



function Home(){
    const navigate=useNavigate();

    return(
       <div className='home-div'>
        <div className='buyer'>
            <img src={left} alt="" height={600} width={600} onClick={()=>{navigate("/buyer/login")}}/>
            <button style={{backgroundColor:"#1464c0",color:"#e3f2fe"}} className='home-btn' onClick={()=>{navigate("/buyer/login")}}>Buyer</button>
        </div>
        <div className="seller">
            <img src={right} alt="" height={600} width={600}  onClick={()=>{navigate("/seller/login")}}/>
            <button style={{backgroundColor:"#e3f2fe", color:"#1464c0"}} className='home-btn' onClick={()=>{navigate("/seller/login")}}>Seller</button>
        </div>

       </div>
    )
}

export default Home;