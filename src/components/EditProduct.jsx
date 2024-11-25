import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import Navbar from './Navbar';
import './products.css';

export default function EditProduct() {
  const [name, setName] = useState('');
  const [prodId, setProdId] = useState();
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, prod } = location.state || {};

  
  useEffect(() => {
    // Populate form data if product details (prod) are passed in
    if (prod) {
      setProdId(prod._id);
      setName(prod.name);
      setDescription(prod.description);
      setDiscount(prod.discount);
      setCategory(prod.category);
      setPrice(prod.price);
      setImage(prod.image); // This is only for preview; won't be re-uploaded if not modified
      setImagePreview(`https://easydeals-backend.onrender.com/${prod.image}`);
    }
})

    // JWT token check for authentication
   

  function handleImageChange(e) {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  }

  function validateInputs() {
    // Basic validation for required fields
    if (!name || !price || isNaN(parseFloat(price)) || !category) {
      alert('Please ensure all required fields are filled correctly.');
      return false;
    }
    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateInputs()) return;

    const formData = new FormData();
    formData.append('_id', prodId);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', parseFloat(price));
    formData.append('discount', parseFloat(discount) || 0);
    formData.append('category', category);
    formData.append('seller', prod.seller);

    // Only add image if it was updated
    if (image) {
        formData.append('image', image);
    }

    try {
        const res = await axios.patch(
            `https://easydeals-backend.onrender.com/seller/products/update-products/${prodId}`, 
            formData, // Use formData here
            { headers: { 'Content-Type': 'multipart/form-data' } }
        );

        alert('Product edited successfully!');
        navigate(`/sellerproducts/${prod.seller}`, { state: { user } });
    } catch (error) {
        console.error('Error editing product:', error.message || error);
        alert('Error editing product. Please try again.');
    }
}


  return (
    <>
      <Navbar name={user?.name || 'Guest'} />
      <div className="Add-products">
        <div className="add-products-left">
          <form onSubmit={handleSubmit}>
            <input type="text" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)} required />
            <input
              style={{ padding: '2rem 8px' }}
              type="text"
              value={description}
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="price">
              <input
                type="number"
                value={price}
                placeholder="Price"
                onChange={(e) => setPrice(e.target.value)}
                required
              />
              <input
                type="number"
                value={discount}
                placeholder="Discount"
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>
            <input type="text" value={category} placeholder="Category" onChange={(e) => setCategory(e.target.value)} required />
            <input type="file" onChange={handleImageChange} />
            <button type="submit">Edit product</button>
          </form>
        </div>

        <div className="add-products-right">
          <h1>Live Preview</h1>
          <p style={{ width: '40%' }}>This is how your customers will see your product on the website.</p>
          {name && (
            <div className="preview card">
              {imagePreview && <img src={imagePreview} alt="Preview" width="200" height="200" />}
              <p id="preview-name">{name}</p>
              {price && discount && (
                <p id="preview-price">
                  ₹ {price} <span id="discount">({discount}% OFF)</span>
                </p>
              )}
              <button id="preview-btn">Add to Cart</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
