import React, { useEffect } from 'react'
import '../App.css';
import "./buyer.css"
import Carousel from 'react-bootstrap/Carousel';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import p1 from "../assets/person1.png"
import p2 from "../assets/person2.png"
import p3 from "../assets/person3.png"
import Cookies from 'js-cookie';
import { useNavigate,useLocation } from 'react-router-dom';
import Navbar2 from './Navbar2';


function BuyerHome(){
    const navigate=useNavigate();
    const location=useLocation();
    const {buyerData}=location.state||"null";
    useEffect(() => {
        const token = Cookies.get("jwt");
        if (!token) {
          navigate('/');
        }
      }, [navigate]);
    function handleBrowserBtn(){
        
        navigate('/products',{state:{buyerData}})
    }
    return (

        <div className='homeDiv'>
            <Navbar2 data={buyerData} />
            <Carousel>
                <Carousel.Item style={{}}>
                    <Row>
                        <Col><div className='homeLeft'>
                            <h1 style={{ fontWeight: "700" }}><i>SHOP WITH UTMOST</i></h1>
                            <h1 style={{ color: "#216ad9", fontWeight: "700" }}><i><i>STYLE</i></i></h1>
                            <h5>Shop the Latest Trends and Gadgets! <br /> Get up to 60% off on trendy clothes and the best gadgets. <br /> Enjoy a minimum 10% discount on all products. <br /> Hurry, shop now and save big!</h5>
                            <div>
                                <button 
                                onClick={handleBrowserBtn}
                                style={{ margin: "11px 0", border: "none", color: "white", backgroundColor: "#216ad9", padding: "5px 12px", fontWeight: "600", borderRadius: "5px", fontSize: "1.2rem" }}>Browse Products</button>
                            </div>
                            
                        </div>
                        </Col>
                        <Col className='imgg'><img src={p1} alt="" style={{ height: "89.3vh", width: "760px" }} /></Col>

                    </Row>
                </Carousel.Item>

                <Carousel.Item>
                    <Row>
                        <Col><div className='homeLeft'>
                            <h1 style={{ fontWeight: "700" }}><i>SHOP WITH UTMOST</i></h1>
                            <h1 style={{ color: "#216ad9", fontWeight: "700" }}><i><i>STYLE</i></i></h1>
                            <h5>Shop the Latest Trends and Gadgets! <br /> Get up to 60% off on trendy clothes and the best gadgets. <br /> Enjoy a minimum 10% discount on all products. <br /> Hurry, shop now and save big!</h5>
                            <div>
                                <button onClick={(e)=>handleBrowserBtn()} style={{ margin: "11px 0", border: "none", color: "white", backgroundColor: "#216ad9", padding: "5px 12px", fontWeight: "600", borderRadius: "5px", fontSize: "1.2rem" }}>Browse Products</button>
                            </div>
                            {/* <div className="companies">
                                <h5>Products are avilable from:</h5>
                                <div className="cimgg">
                                    <img src={c1} alt="" />
                                    <img src={c2} alt="" />
                                    <img src={c3} alt="" />
                                    <img src={c4} alt="" />
                                    <img src={c5} alt="" />
                                    <img src={c6} alt="" />
                                </div>

                            </div> */}
                        </div>
                        </Col>
                        <Col className='imgg'><img src={p2} alt="" style={{ height: "89.3vh", width: "760px" }} /></Col>
                    </Row>
                </Carousel.Item>

                <Carousel.Item>
                    <Row>
                        <Col><div className='homeLeft'>
                            <h1 style={{ fontWeight: "700" }}><i>SHOP WITH UTMOST</i></h1>
                            <h1 style={{ color: "#216ad9", fontWeight: "700" }}><i><i>STYLE</i></i></h1>
                            <h5>Shop the Latest Trends and Gadgets! <br /> Get up to 60% off on trendy clothes and the best gadgets. <br /> Enjoy a minimum 10% discount on all products. <br /> Hurry, shop now and save big!</h5>
                            <div>
                                <button onClick={handleBrowserBtn} style={{ margin: "11px 0", border: "none", color: "white", backgroundColor: "#216ad9", padding: "5px 12px", fontWeight: "600", borderRadius: "5px", fontSize: "1.2rem" }}>Browse Products</button>
                            </div>
                            {/* <div className="companies">
                                <h5>Products are avilable from:</h5>
                                <div className="cimgg">
                                    <img src={c1} alt="" />
                                    <img src={c2} alt="" />
                                    <img src={c3} alt="" />
                                    <img src={c4} alt="" />
                                    <img src={c5} alt="" />
                                    <img src={c6} alt="" />
                                </div>

                            </div> */}
                        </div>
                        </Col>
                        <Col className='imgg'><img src={p3} alt="" style={{ height: "89.3vh", width: "760px" }} /></Col>
                    </Row>
                </Carousel.Item>
            </Carousel>

        </div>
    )
}

export default BuyerHome;
