import React, { useState ,useEffect} from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function AddProduct() {
    const [name,setName]=useState('');
    const [description,setDescription]=useState('');
    const [price,setPrice]=useState("")
    const [discount,setDiscount]=useState("")
    const [category,setCategory]=useState("")
    const [image,setImage]=useState(null)
    // const [sellerId,setSellerId]=useState();
    const {id}=useParams();
    const navigate=useNavigate();

    useEffect(()=>{
      const token=Cookies.get("jwt");
      if(!token){
        navigate('/');
      }
    },[navigate])

    async function handleSubmit(e) {
      e.preventDefault();
      
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('discount', discount);
      formData.append('category', category);
      formData.append('image', image); // Append image file
      formData.append('seller', id);
    
      try {
        const res = await axios.post('http://localhost:5000/seller/products/add-products', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        });
        
        alert("Product added successfully!");
        console.log(res);
        navigate(`/sellerproducts/${id}`);
      } catch (error) {
        console.error("Error adding product:", error);
        alert("Error adding product.");
      }
    }
    

  return (
    <div>
      <form action="">
        
        <input type="text" value={name} placeholder='Name'  onChange={(e)=>{setName(e.target.value)}}/>
        <input type="text" value={description} placeholder='Description' onChange={(e)=>{setDescription(e.target.value)}}/>
        <input type="text" value={price} placeholder='Price' onChange={(e)=>{setPrice(e.target.value)}}/>
        <input type="text" value={discount} placeholder='Discount' onChange={(e)=>{setDiscount(e.target.value)}}/>
        <input type="text" value={category} placeholder='Category' onChange={(e)=>{setCategory(e.target.value)}}/>
        <input type="file" onChange={(e)=>{setImage(e.target.files[0])}}/>
        <button onClick={e=>{handleSubmit(e)}}>Add product</button>
      </form>
    </div>
  )
}
