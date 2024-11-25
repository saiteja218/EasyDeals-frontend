import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import left from '../assets/1-1.jpg'
import "./Home.css"


function BuyerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // const { id } = useParams();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await axios.post('https://easydeals-backend.onrender.com/buyer/user/login', {
        email, password
      }, { withCredentials: true })
      alert(res.data.message);
      const buyerData=res.data.isemail
      console.log(buyerData);
      // navigate(`/buyerhome`,{state:{buyerData}})
      localStorage.setItem('buyerData', JSON.stringify(buyerData));
      navigate(`/buyerhome`)
      // console.log(res.data.isemail.name);

    } catch (error) {
      // alert(error.response?.data.message);   
      console.log(error);

    }
    //  console.log(res); 



  }

  return (
    <div className='login-div'>
      <div className='buyer'>
        <img src={left} alt="" height={600} width={600} onClick={() => { navigate("/seller/login") }} />
        <button style={{ backgroundColor: "#1464c0", color: "#e3f2fe" }} className='home-btn' onClick={() => { navigate("/seller/login") }}>Go to Sellers Login</button>
      </div>
      {/* <h2>Buyer Login</h2> */}
      <div className='login-form'>

        <form onSubmit={handleSubmit} id='login-formm'>
          <p style={{color:"#1464c0",fontWeight:"600"}}>Login and start shopping!</p>
          <div className='form-content'>
            <div>
              <input
                type="email"
                value={email}
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>

              <input
                type="password"
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button id='login-btn1' type="submit">Shoppers Login</button>
            <a href="" onClick={()=>{navigate("/buyer/signup")}}>Didn't have an account? Create here</a>
            
          </div>
          
        </form>
      </div>

    </div>
  )
}


export default BuyerLogin;