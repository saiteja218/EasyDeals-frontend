// import React, { useEffect, useState } from 'react'
// import { useLocation } from 'react-router-dom'
// import Navbar2 from './Navbar2';
// import algoliasearch from "algoliasearch";
// import './purchase.css'
// const client = algoliasearch('VQ3KJTIQVD', '7d7685118964f54246dfe39c99e02615');
// const index = client.initIndex('orders');
// const index2 = client.initIndex('products');
// import Cookies from 'js-cookie';

// export default function Purchases() {
//     const location = useLocation();
//     const { buyerData } = location.state;
//     console.log(buyerData)
//     const [orders, setOrders] = useState([]);
//     const [productsMap, setProductsMap] = useState({});

//     useEffect(() => {
//         const token = Cookies.get("jwt");
//         if (!token) {
//           navigate('/');
//         }
//       }, [navigate]);

//     useEffect(() => {
//         async function getData() {
//             const filters = `customer:"${buyerData._id}"`
//             let response = await index.search("", {
//                 filters,
//                 hitsPerPage: 1000
//             })
//             setOrders(response.hits)
//             // console.log(response.hits)
//             const productsIds = response.hits.flatMap(order => {
//                 return order.products;
//             })

//             let prodResponse = await index2.getObjects(productsIds);
//             // console.log(prodResponse.results)
//             const products = {}
//             for (let product of prodResponse.results) {
//                 products[product.objectID] = product;
//             }
//             // console.log(products)
//             setProductsMap(products);

//         }
//         getData()
//     }, [buyerData])



//     return (
//         <div>
//             <Navbar2 data={buyerData} />
//             <h2 className='title' style={{margin:"20px 25px"}}> <i>Your Purchases:</i> </h2>
//             <div className='purchase-main'>

//                 {
//                     orders.map((order, index) => {
//                         let sum = 0;

//                         return (
//                             <div key={index} className='order'>
//                                 <div className='prods'>
//                                 {

//                                     order.products.map((productId, index2) => {
//                                         const prod = productsMap[productId];

//                                         if (prod) {
//                                             sum += prod.price;
//                                             return (
//                                                 <div key={index2} className='product'>
//                                                     <img src={`https://easydeals-backend.onrender.com/${prod.image}`} alt="" width="150" height="150" />
//                                                     <p>{prod.name}</p>

//                                                 </div>
//                                             )
//                                         } else {
//                                             return (
//                                                 <div key={index2}>
//                                                     <p>Loading...</p>
//                                                 </div>
//                                             );
//                                         }
//                                     })}
//                                     </div>


//                                 <div>
//                                     <p className="order-total">Total: {sum}</p>
//                                 </div>
//                             </div>

//                         )

//                     })

//                 }

//             </div>
//         </div>
//     )
// }

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar2 from './Navbar2';
import Cookies from 'js-cookie';
import { axiosInstance } from '../lib/axios';
import './purchase.css';

export default function Purchases() {
    const location = useLocation();
    const { buyerData } = location.state;
    const [orders, setOrders] = useState([]);
    const [productsMap, setProductsMap] = useState({});

    useEffect(() => {
        async function getData() {
            try {
                const response = await axiosInstance.post("buyer/user/get-orders", { customerId: buyerData._id });
                const orderData = response.data.orders || [];
                setOrders(orderData);
                
                // Extract product IDs
                const productIds = [...new Set(orderData.flatMap(order => order.products))];
                if (productIds.length === 0) return;
                
                // Fetch product details
                const prodResponse = await axiosInstance.post("buyer/user/cart/get-products", { productIds });
                const products = {};
                for (let product of prodResponse.data.products) {
                    products[product._id] = product;
                }
                setProductsMap(products);
            } catch (error) {
                console.error("Error fetching orders and products:", error);
            }
        }
        getData();
    }, [buyerData]);

    return (
        <div>
            <Navbar2 data={buyerData} />
            <h2 className='title' style={{ margin: "20px 25px" }}><i>Your Purchases:</i></h2>
            <div className='purchase-main'>
                {orders.length > 0 ? (
                    orders.map((order, index) => {
                        let sum = 0;
                        return (
                            <div key={index} className='order'>
                                <div className='prods'>
                                    {order.products.map((productId, index2) => {
                                        const prod = productsMap[productId];
                                        if (prod) {
                                            sum += prod.price;
                                            return (
                                                <div key={index2} className='product'>
                                                    <img
                                                        src={prod.image.startsWith("http") ? prod.image : `https://easydeals-backend.onrender.com/${prod.image}`}
                                                        width="150"
                                                        height="150"
                                                        alt={prod.name}
                                                    />
                                                    <p>{prod.name}</p>
                                                </div>
                                            );
                                        } else {
                                            return <p key={index2}>Loading...</p>;
                                        }
                                    })}
                                </div>
                                <div>
                                    <p className="order-total">Total: {sum}</p>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p style={{ marginLeft: '25px' }}>No purchases found.</p>
                )}
            </div>
        </div>
    );
}

