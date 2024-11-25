import React, { useEffect, useState } from 'react';
import '../App.css';
import './buyer.css';
import Carousel from 'react-bootstrap/Carousel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import p1 from '../assets/person1.png';
import p2 from '../assets/person2.png';
import p3 from '../assets/person3.png';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar2 from './Navbar2';

function BuyerHome() {
    const navigate = useNavigate();
    const location = useLocation();
    const [buyerData,setData]=useState({})
    // const { buyerData } = location.state || null;
     
    useEffect(() => {
        // if (!buyerData) {
        //     console.log('Buyer data missing, redirecting to login...');
        //     navigate('/buyer/login'); // Redirect only when buyerData is null or undefined
        // }
        const data = JSON.parse(localStorage.getItem('buyerData'));
        console.log(data)
        setData(data);
    }, [navigate]);

    const handleBrowserBtn = () => {
        navigate('/products', { state: { buyerData } });
    };

    const CarouselItem = ({ imageSrc, buttonAction }) => (
        <Row>
            <Col>
                <div className="homeLeft">
                    <h1 style={{ fontWeight: '700' }}><i>SHOP WITH UTMOST</i></h1>
                    <h1 style={{ color: '#216ad9', fontWeight: '700' }}><i>STYLE</i></h1>
                    <h5>
                        Shop the Latest Trends and Gadgets! <br />
                        Get up to 60% off on trendy clothes and the best gadgets. <br />
                        Enjoy a minimum 10% discount on all products. <br />
                        Hurry, shop now and save big!
                    </h5>
                    <button
                        onClick={buttonAction}
                        style={{
                            margin: '11px 0', border: 'none', color: 'white',
                            backgroundColor: '#216ad9', padding: '5px 12px',
                            fontWeight: '600', borderRadius: '5px', fontSize: '1.2rem',
                        }}
                    >
                        Browse Products
                    </button>
                </div>
            </Col>
            <Col className="imgg">
                <img src={imageSrc} alt="Shopping Style" style={{ height: '89.3vh', width: '760px' }} />
            </Col>
        </Row>
    );

    return (
        <div className="homeDiv">
            <Navbar2 data={buyerData} />
            <Carousel>
                <Carousel.Item>
                    <CarouselItem imageSrc={p1} buttonAction={handleBrowserBtn} />
                </Carousel.Item>
                <Carousel.Item>
                    <CarouselItem imageSrc={p2} buttonAction={handleBrowserBtn} />
                </Carousel.Item>
                <Carousel.Item>
                    <CarouselItem imageSrc={p3} buttonAction={handleBrowserBtn} />
                </Carousel.Item>
            </Carousel>
        </div>
    );
}

export default BuyerHome;
