import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function SellerProducts() {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        const token=Cookies.get("jwt");
        if(!token){
          navigate('/');
        }
      },[navigate])
    // console.log(id)
    useEffect(() => {
        async function getproducts(params) {
            let productdata = await axios.get(`http://localhost:5000/seller/products/get-seller-products/${id}`,{ withCredentials: true });
            // data-data.data;
            // console.log(productdata.data.sellerProducts);
            
            setProducts(productdata.data.sellerProducts)


        }
        getproducts();
    }, [id])

    function handleButton() {
        navigate(`/add-product/${id}`)
    }

    return (

        <div>
            <div>
                <button onClick={(e) => handleButton()}>Add product</button>
            </div>
            {/* {products.length === 0 && <h2>No products added</h2>} */}
            {
                products.length >0  &&  
                products.map((product, index) => {
                    return (
                        <div key={index}>
                            {product.name}
                            <img src={`http://localhost:5000/${product.image}`}  width="200" height="200" />
                        </div>
                    )
                })}


        </div>
    )
}
