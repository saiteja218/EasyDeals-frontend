import React, { useEffect, useState } from "react";
import axios from "axios"
import { useLocation, useNavigate } from "react-router-dom";
import algoliasearch from "algoliasearch";
const client = algoliasearch('VQ3KJTIQVD', '7d7685118964f54246dfe39c99e02615');
const index = client.initIndex('products');
import cartimg from '../assets/cart.png'
import Navbar from "./Navbar2";
import './cart.css'
import Orders from "./Orders";

export default function Cart() {
    const location = useLocation()
    const { cart, buyerData } = location.state;
    const [products, setProducts] = useState([]);
    const [sum, setSum] = useState(0);
    const navigate=useNavigate()
    useEffect(() => {
        async function getprods() {
            try {
                // console.log("prods")
                const response = await index.getObjects(cart);
                setProducts(response.results);
                console.log(products)
            } catch (error) {
                console.error("Error fetching cart products:", error);
            }

        }
        getprods();
    }, [cart])

    useEffect(() => {
        let total = 0;
        products.forEach(product => {
            total += product.price;
        });
        setSum(total);
    }, [products]);

    async function order() {
        try {
            const ids= products.map(product=>product.objectID)
            const saveOrder = await axios.post("https://easydeals-backend.onrender.com/buyer/user/set-order", {
                products:ids,customer:buyerData._id,totalAmount:sum
            }, { withCredentials: true })
            alert(saveOrder.data.message)
            navigate('/purchases',{state:{buyerData}})
        } catch (error) {
            console.error("error saving order:(",error);
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
                                    <th>Quaintity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {

                                    products.map((product, index) => {
                                        // setSum(sum+product.price)
                                        return (
                                            <tr key={index}>
                                                <td>{product.name}</td>
                                                <td>1</td>
                                                <td>{product.price}</td>
                                            </tr>
                                        )
                                    })
                                }
                                <tr>
                                    <td>Total</td>
                                    <td>{products.length}</td>
                                    <td>{sum}</td>
                                </tr>
                            </tbody>

                        </table>
                    </div>

                    <div className="btn">
                        <button onClick={order}>Purchase</button>
                    </div>
                </div>
                <div className="right">

                </div>
                <img src={cartimg} alt="cart" height={600} width={600} />
            </div>
        </>
    )
}