import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import right from '../assets/1-2.jpg'
import "./signup.css"

function SellerLogin(){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    // const { id } = useParams();

    async function handleSubmit(e) {
      e.preventDefault();
        
        try {
            const res= await axios.post('https://easydeals-backend.onrender.com/seller/user/login',{
                email,password
            },{withCredentials:true})
            alert(res.data.message);
            navigate(`/sellerproducts/${res.data.user._id}`,{state:{user :res.data.user}})
            // console.log(res.data.user);    
            
        } catch (error) {
            alert(error.response?.data.message);   
            console.log(error);
                  
         }
        //  console.log(res); 

        
        
    }

    return(
      <div className="seller-signup-div">
      <div className="seller-signup-div-left">

          <form onSubmit={handleSubmit}>
              <p style={{color:"white",fontWeight:"600",fontSize:"1.2rem"}}>Login and start Selling!</p>
              <div className="seller-signup-form">
                  
                  <div>
                      <input
                          type="email"
                          placeholder="Enter Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                      />
                  </div>
                  <div>
                      <input
                          type="password"
                          placeholder="Enter Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                      />
                  </div>
                  <button type="submit">Login</button>

                  <a href=""  onClick={()=>{navigate("/seller/signup")}}>Didn't have an account? Create here</a>
              </div>
          </form>
      </div>
      <div className="seller">
          <img src={right} alt="" height={600} width={600} onClick={() => { navigate("/buyer/login") }} />
          <button style={{ backgroundColor: "#e3f2fe", color: "#1464c0", width: "40%" }} className='home-btn' onClick={() => { navigate("/buyer/login") }}>Go to shoppers login</button>
      </div>
  </div>
    )
}


export default SellerLogin;