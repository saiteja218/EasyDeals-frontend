import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import left from '../assets/1-1.jpg'

function BuyerSignup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const navigate = useNavigate();


    async function handleSubmit(e) {
        e.preventDefault();
        try {
          if(password==password2){
            const res = await axios.post('https://easydeals-backend.onrender.com/buyer/user/register', {
                name, email, password
            }, { withCredentials: true })
            alert("new user added");
            console.log(res);
            navigate(`/buyerhome`,{state:{name:res.data.isemail}})
          }else{
            alert("passwords are not matching!")
          }


        } catch (error) {
            alert(error.response?.data.message);
            console.log(error);
        }

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
        <p style={{color:"#1464c0",fontWeight:"600"}}>Signup and start shopping!</p>
        <div className='form-content'>
          <div>
            <input
              type="name"
              value={name}
              placeholder='Enter Name'
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
              placeholder='Re-Enter Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>

            <input
              type="password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword2(e.target.value)}
              required
            />
          </div>
          <button id='login-btn1' type="submit">Create Account</button>
          <a href="" onClick={()=>{navigate("/buyer/login")}}>Already have an account? Login here</a>
          
        </div>
        
      </form>
    </div>

  </div>
        
    )
}

export default BuyerSignup;