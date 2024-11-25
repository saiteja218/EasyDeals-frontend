import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar2';
import "../styles/allproducts.css"
import algoliasearch from 'algoliasearch'; // Correct import statement
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
const client = algoliasearch('VQ3KJTIQVD', '7d7685118964f54246dfe39c99e02615');
const index = client.initIndex('products');

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [cart, addProducts] = useState([]);
  const location = useLocation();
  const { buyerData } = location.state;
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState('');
  const [max, setMax] = useState(100000000);
  const [min, setMin] = useState(0);
  const [cartVisible, setCartVisible] = useState(false);


  // useEffect(() => {
  //   const token = Cookies.get("jwt");
  //   if (!token) {
  //     navigate('/');
  //   }
  // }, [navigate]);
  useEffect(() => {
    async function getProd() {
      try {
        // const response = await axios.get("http://localhost:5000/seller/products/get-products");

        // setProducts(response.data.data); 
        let hits = [];
        let page = 0;
        let totalPages = 1;
        while (page < totalPages) {
          const response = await index.search('', {
            page,
            hitsPerPage: 1000,
          })
          hits = [...hits, ...response.hits];
          totalPages = response.nbPages;
          page++
        }
        setProducts(hits)

      } catch (error) {
        console.error("Error fetching products:", error);
      }

      try {
        const response = await axios.get("https://easydeals-backend.onrender.com/seller/products/get-categories");
        // console.log(response.data.categories)

        setCategories(response.data.categories)
        // console.log(categories)

      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    getProd();
    // console.log(products)
  }, []);

  function handleUpdate(id) {
    if (!cart.includes(id)) {
      addProducts((prev) => [...prev, id]);
      // console.log("Added to cart:", id);
    }
  }

  useEffect((e) => {
    if (cart.length > 0) {
      setCartVisible(true)

    }
    else {
      setCartVisible(false)
    }

  }, [cart])

  function handleRemove(id) {
    addProducts((prev) => prev.filter((productId) => productId !== id));
  }



  function handleMin(e) {
    setMin(e.target.value ? e.target.value : 0)
  }
  function handleMax(e) {
    setMax(e.target.value ? e.target.value : 0)
  }




  async function handleFilter() {
    try {
      let filteredConditions = [];
      if (min) {
        filteredConditions.push(`price>=${min}`)
      }
      if (min) {
        filteredConditions.push(`price<=${max}`)
      }

      if (selectCategory) {
        filteredConditions.push(`category:${selectCategory}`)
      }

      let filters = filteredConditions.join(" AND ");

      console.log(filters);



      let resp = await index.search("", {
        filters,
        hitsPerPage: 1000,

      })
      let sortedProducts = resp.hits;

      // Apply sorting locally based on sortOption
      switch (sortOption) {
        case "price":
          sortedProducts.sort((a, b) => a.price - b.price);
          break;
        case "discount":
          sortedProducts.sort((a, b) => b.discount - a.discount);
          break;
        case "a-to-z":
          sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "z-to-a":
          sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
          break;
        default:
          break; // No sorting
      }

      // Update the products state
      setProducts(sortedProducts);

    } catch (error) {
      console.error("Error applying filters:", error);
    }

  }

  function handleReset() {
    setMin(0);
    setMax(0);
    setSelectCategory("");
    setSortOption("")
    handleFilter();
  }





  // useEffect(() => {
  //   console.log("cart")
  //   console.log(cart)
  // }, [cart])



  return (
    <div className='main'>
      <Navbar data={buyerData} />
      <div className='all-products-main'>
        <div className='product-sort'>
          <div className="sorts">
            <div className="sort-by-price">
              <label htmlFor="min-price">Minimum Price:</label>
              <input
                type="number"
                id="min-price"
                name="min"
                placeholder="Min Price"
                onChange={handleMin}
              />
              <label htmlFor="max-price">Maximum Price:</label>
              <input
                type="number"
                id="max-price"
                name="max"
                placeholder="Max Price"
                onChange={handleMax}
              />

            </div>

          </div>

          <div className='sort-by-features'>
            <label>Sort by:</label>
            <select onChange={(e) => { setSortOption(e.target.value) }} value={sortOption}>
              <option value="">Select Option</option>
              <option value="price">Price</option>
              <option value="discount">Discount</option>
              <option value="a-to-z">A to Z</option>
              <option value="z-to-a">Z to A</option>
            </select>
          </div>

          <div className='sort-by-categories'>
            <p>Sort by Category:</p>
            <div className='categories'>
              {/* <button
                className={`btn4  ${!selectCategory ? 'active-category' : ''}`} onClick={() => { setSelectCategory(""); }}>All</button> */}
              {
                categories.map((category, index) => {
                  // console.log(category)
                  return (
                    <button className={`btn4  ${selectCategory == category.category ? 'active-category' : ''}`} onClick={() => { setSelectCategory(category.category); }} key={index}>
                      {category.category}
                    </button>
                  )
                })
              }
            </div>
            <div className='filter-btns'>
              <button className="filter-button" onClick={handleFilter}>
                Apply Filters
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 24" fill="currentColor" width="18px" height="18px" >
                  <path d="M10 18h4v-2h-4v2zm-7-7v2h18v-2H3zm3-7v2h12V4H6z" />
                </svg>
              </button>
              <button className="reset-button" onClick={handleReset}>Reset Filter</button>
            </div>


          </div>


          {cartVisible &&<div className="btn3">
            <button
              onClick={() => {
                if (cart.length > 0) {
                  navigate('/cart', { state: { cart,buyerData} });
                } else {
                  alert("Your cart is empty!");
                }
              }}
            >
              Go to Cart
              <span
                id="cart-length"
                style={{ display: cart.length > 0 ? "inline" : "none" }}
              >
                {cart.length}
              </span>
            </button>

          </div>}


        </div>

        <div className='all-products'>
          <div className='prods '>
            {/* hello */}
            {products?
              products.map((product, index) => {
                
                const isInCart = cart.includes(product.objectID);
                // console.log(cart.length)
                return (
                  <div className='product-card card' key={index}>
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
                      <div className='btn0' style={{ display: isInCart ? "none" : "block" }}>
                        <button style={{ backgroundColor: "#1464c0" }} onClick={(e) => handleUpdate(product.objectID)}>Add to Cart</button>
                      </div>
                      <div className='btn1' style={{ display: isInCart ? "block" : "none" }}>
                        <button style={{ backgroundColor: "#cd3838" }} onClick={(e) => handleRemove(product.objectID)}>Remove Item</button>
                      </div>

                    </div>
                  </div>
                )
              }):<p>Loading...</p>
            }
          </div>
        </div>

      </div>

    </div>

  )
}
