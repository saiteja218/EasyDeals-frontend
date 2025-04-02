import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar2";
import cartimg from "../assets/cart.png";
import "./cart.css";
import { axiosInstance } from "../lib/axios.js";

export default function Cart() {
    const location = useLocation();
    const { cart, buyerData } = location.state;
    const [products, setProducts] = useState([]);
    const [sum, setSum] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        async function getprods() {
            try {
                const response = await axiosInstance.post("buyer/user/cart/get-products", { productIds: cart });
                // console.log(response);
                if (response.data && Array.isArray(response.data.products)) {
                    setProducts(response.data.products);
                } else {
                    setProducts([]);
                }
                // console.log(products)
            } catch (error) {
                console.error("Error fetching cart products:", error);
                setProducts([]);
            }
        }
        
        if (cart && cart.length > 0) {
            getprods();
        }
    }, [cart]);

    useEffect(() => {
        const total = products.reduce((acc, product) => acc + Number(product.price || 0), 0);
        setSum(total);
    }, [products]);
    

    async function order() {
        try {
            const ids = products.map(product => product._id);
            const saveOrder = await axiosInstance.post("buyer/user/set-order", {
                products: ids,
                customer: buyerData._id,
                totalAmount: sum
            }, { withCredentials: true });

            alert(saveOrder.data.message);
            navigate("/purchases", { state: { buyerData } });
        } catch (error) {
            console.error("Error saving order:", error);
        }
    }

    return (
        <>
            <Navbar data={buyerData} />
            <div className="main-cart">
                <div className="left">
                    <div className="table">
                        <p>Your Cart:</p>
                        <table>
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.length > 0 ? (
                                    products.map((product, index) => (
                                        <tr key={index}>
                                            <td>{product.name}</td>
                                            <td>1</td>
                                            <td>{product.price}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3">No products in cart</td>
                                    </tr>
                                )}
                                <tr>
                                    <td>Total</td>
                                    <td>{products.length}</td>
                                    <td>{sum}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="btn">
                        <button onClick={order} disabled={products.length === 0}>Purchase</button>
                    </div>
                </div>
                <div className="right"></div>
                <img src={cartimg} alt="cart" height={600} width={600} />
            </div>
        </>
    );
}