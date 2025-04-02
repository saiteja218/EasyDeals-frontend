import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import Navbar from './Navbar';
import './products.css';
import { axiosInstance } from '../lib/axios.js';


export default function AddProduct() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = location.state || {};

  // useEffect(() => {
  //   const token = Cookies.get("jwt");
  //   if (!token) {
  //     navigate('/');
  //   }
  // }, [navigate]);

  function handleImageChange(e) {
    const file = e.target.files[0];
    if(!file.type.startsWith('image/')){
      alert('Please select an image file');
      return;
  }
  const reader = new FileReader();
  reader.onloadend = () => {
      setImagePreview(reader.result);
      setImage(reader.result); // Store the file for form submission
  };
  reader.readAsDataURL(file); 
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const productData = {
      name,
      description,
      price,
      discount,
      category,
      image,  // This is the Base64-encoded string
      seller: id
  };

  console.log("Submitting product data:", productData); // Debugging

  try {
      const res = await axiosInstance.post('seller/products/add-products', productData, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
      });
      alert("Product added successfully!");
      navigate(`/sellerproducts/${id}`,{state:{user}});
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product.");
    }
  }

  return (
    <>
      <Navbar name={user?.name || 'Guest'} />
      <div className='Add-products'>
        <div className='add-products-left'>
          <form onSubmit={handleSubmit}>
            <input type="text" value={name} placeholder='Name' onChange={(e) => setName(e.target.value)} />
            <input style={{ padding: "2rem 8px" }} type="text" value={description} placeholder='Description' onChange={(e) => setDescription(e.target.value)} />
            <div className='price'>
              <input type="text" value={price} placeholder='Price' onChange={(e) => setPrice(e.target.value)} />
              <input type="text" value={discount} placeholder='Discount' onChange={(e) => setDiscount(e.target.value)} />
            </div>
            <input type="text" value={category} placeholder='Category' onChange={(e) => setCategory(e.target.value)} />
            <input type="file" onChange={handleImageChange} />
            <button type="submit">Add product</button>
          </form>
        </div>

        <div className='add-products-right'>
          <h1>Live Preview</h1>
          <p style={{width:"40%"}}>This is how, your customers will see your product on the website.</p>
          {name && 
          <div className='preview card'>
            {imagePreview && <img src={imagePreview} alt="Preview" width="200" height="200" />}
            <p id='preview-name'> {name}</p>
            {/* <p> {description}</p> */}
            {(price && discount) && <p id='preview-price'> ₹ {price} <span id='discount'>( {discount}% OFF )</span> </p>}
            {/* <p>{category}</p> */}
            <button id='preview-btn'>Add to Cart</button>
          </div>
}
          
        </div>
      </div>
    </>
  );
}
