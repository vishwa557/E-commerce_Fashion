import React from 'react';
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import {ToastContainer} from "react-toastify";

import AuthPage from './pages/AuthPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import NavBar from './pages/NavBar';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import Success from './pages/checkoutSuccess';
import SingleProduct from './pages/SingleProduct';



function App() {
  return (
    <Router>
      <ToastContainer/>
      <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/auth" element={<AuthPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="/products" element={<ProductsPage/>}/>
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/success" element={<Success/>}/>
        <Route path="/singleproduct/:productId" element={<SingleProduct/>}/>

      </Routes>
    </Router>
  );
}

export default App;
