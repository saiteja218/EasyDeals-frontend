import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import Navbar from './Navbar';
import "./products.css"

export default function SellerProducts() {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = location.state || {};



    // useEffect(() => {
    //     const token = Cookies.get("jwt");
    //     if (!token) { 
    //         navigate('/');
    //     }
    // }, [navigate])
    // console.log(id)
    useEffect(() => {
        async function getproducts() {
            let productdata = await axios.get(`https://easydeals-backend.onrender.com/seller/products/get-seller-products/${id}`, { withCredentials: true });
            // data-data.data;
            // console.log(productdata.data.sellerProducts);
            console.log(user)
            setProducts(productdata.data.sellerProducts)
            // console.log(user)

        }
        getproducts();
    }, [id])

    function handleButton() {
        navigate(`/add-product/${id}`, { state: { user } });
    }

    async function handleDelete(id) {

        try {
            await axios.delete(`https://easydeals-backend.onrender.com/seller/products/delete-product/${id}`, { withCredentials: true })
            document.getElementById(id).style.display = "none";
            // setProducts(products.filter(product => product._id !==id)); 
            alert("Product deleted successfully!");
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Error deleting product.");
        }

    }

    function handleUpdate(id) {
        try {
            const prod=products.find(p=>p._id==id);
            navigate('/edit-product',{state:{user,prod}})
        } catch (error) {
            
        }

    }

    return (

        <div className='seller-products-div'>
            <Navbar name={user.name} />
            <div style={{ display: "flex", justifyContent: "space-between", padding: "1rem 4rem", alignItems: "center" }}>
                <div>
                    <h3 style={{ fontWeight: "500", fontStyle: "italic" }}>YOUR PRODUCTS</h3>
                </div>
                <div>
                    <button id='btn1' onClick={(e) => handleButton()}>Add new product</button>
                </div>
                {/* {products.length === 0 && <h2>No products added</h2>} */}
            </div>
            <div className='products'>
                {
                    products.length > 0 &&
                    products.map((product, index) => {
                        return (
                            <div key={index} className='product-card card' id={product._id}>

                                <div>
                                    <img src={`https://easydeals-backend.onrender.com/${product.image}`} width="150" height="150" />
                                </div>
                                <div className='product-title'>
                                    {product.name}
                                </div>
                                <div className='product-price'>
                                    <span>&#8377; {product.price}  </span> <span id='discount'>({product.discount}% OFF)</span>
                                </div>
                                <div className='btns'>
                                    <div>
                                        <button style={{ backgroundColor: "#1464c0" }} onClick={(e) => handleUpdate(product._id)}>Edit</button>
                                    </div>
                                    <div>
                                        <button style={{ backgroundColor: "#cd3838" }} onClick={(e) => handleDelete(product._id)}>Delete</button>
                                    </div>
                                </div>

                            </div>
                        )
                    })}
            </div>


        </div>
    )
}
