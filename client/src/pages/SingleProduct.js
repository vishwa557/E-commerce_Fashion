import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/singleproduct.css';
import config from '../config.js';

const SingleProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const serverUrl = config.serverUrl;

  useEffect(() => {
    setTimeout(() => {
      axios
        .get(`${serverUrl}api/products/${productId}`)
        .then((response) => {
          setProduct(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching product:', error);
          setIsLoading(false);
        });
    }, 1500);
  }, [productId]);

  if (isLoading) {
    return (
      <div className="loading">
        <div className="loading-dot"></div>
        <div className="loading-dot"></div>
        <div className="loading-dot"></div>
      </div>
    );
  }

  if (!product) {
    return <div>Error loading product</div>;
  }
  return (


    <div className="single-product-container">
      <div className="single-product-card">
        <div className="single-product-image">
          <img src={product.photo} alt={product.name} />
        </div>
        <div className="single-product-details">
          {/* Product details */}
          <h2>{product.name}</h2>
          <div className="product-info">
            <div className="product-price">Price: &#8377;{product.price}</div>
            <div className="product-quantity">Stock: {product.stock}</div>
          </div>
          <p className="product-description">{product.description}</p>
          <button
            className="add-to-cart-btn" >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
