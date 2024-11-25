import React from 'react';
// import './App.css'
import Home from './components/Home'
import {Routes,Route, useNavigate} from 'react-router-dom';
import SellerLogin from './components/SellerLogin'
import SellerSignup from './components/SellerSignup'
import SellerProducts from './components/SellerProducts';
import AddProduct from './components/AddProduct';
// import Cookies from 'js-cookie';
import BuyerLogin from './components/BuyerLogin';
import BuyerHome from './components/BuyerHome';
import BuyerSignup from './components/BuyerSignup';
import AllProducts from './components/AllProducts';
import EditProduct from './components/EditProduct';
import Cart from './components/Cart';
import Purchases from './components/Purchases';



function App() {

  

  

  return (
    <div>

      <Routes>
        
        <Route path='/' element={<Home/>} />
        <Route path='/seller/login' element={<SellerLogin/>}/>
        <Route path='/seller/signup' element={<SellerSignup/>}/>
        <Route path='/sellerproducts/:id'element={<SellerProducts/>}/>
        <Route path='/add-product/:id' element={<AddProduct/>}/>
        <Route path='/buyer/login' element={<BuyerLogin/>}/>
        <Route path='/buyer/signup' element={<BuyerSignup/>}/>
        <Route path='/buyerhome' element={<BuyerHome/>}/>  
        <Route path='/products' element={<AllProducts/>}/> 
        <Route path='/edit-product' element={<EditProduct/>}/> 
        <Route path='/cart' element={<Cart/>}/> 
        <Route path='/purchases' element={<Purchases/>}/>
        
      </Routes>
      
    </div>
    
  )
}

export default App
