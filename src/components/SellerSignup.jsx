import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import right from '../assets/1-2.jpg'
import "./signup.css"

function SellerSignup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const res = await axios.post('https://easydeals-backend.onrender.com/seller/user/register', {
                name, email, password
            }, { withCredentials: true })
            alert("new user added");
            console.log(res.data.newSeller._id);
            navigate(`/sellerproducts/${res.data.newSeller._id}`,{state:{user :res.data.user}})


        } catch (error) {
            alert(error.response?.data.message);
            console.log(error);
        }

    }

    return (
        <div className="seller-signup-div">
            <div className="seller-signup-div-left">

                <form onSubmit={handleSubmit}>
                    <p style={{color:"white",fontWeight:"600",fontSize:"1.2rem"}}>Signup and start Selling!</p>
                    <div className="seller-signup-form">
                        <div>
                            <input type="text"
                                placeholder="Enter Name"
                                value={name}
                                onChange={(e) => { setName(e.target.value) }}
                            />
                        </div>
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
                                placeholder="Set Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Signup</button>

                        <a href="" onClick={()=>{navigate("/seller/login")}} style={{color:"white"}}>Already have an account? Login here</a>
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

export default SellerSignup;