import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function AllProducts() {
     const [products,setProdutcs]=useState([]);

    useEffect(()=>{
           async function getprod() {
             const data=await (await axios.get("http://localhost:5000/seller/products/get-products")).data.data
             console.log(data);

           }
           getprod()
    })


  return (
    <div>
      hello
    </div>
  )
}
