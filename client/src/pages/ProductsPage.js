import React, { useState, useEffect, useRef } from 'react';
import '../styles/products.css';
import { toast } from "react-toastify";
import { getUserDetails } from '../components/getuserdetails';
import config from '../config.js';

const ProductCard = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCartItems] = useState([]);
    const [selectedPriceRange, setSelectedPriceRange] = useState('');
    const [userId, setUserId] = useState(null);

    const womenSectionRef = useRef(null);
    const kidsSectionRef = useRef(null);
    const mensSectionRef = useRef(null);
    const serverUrl = config.serverUrl;

    useEffect(() => {
        getUserDetails()
            .then(user => {
                setUserId(user._id);
                // console.log(user);
                const myCart = JSON.parse(localStorage.getItem("mycart")) || {};
                const cart = myCart[user._id] || [];
                setCartItems(cart);

            })
            .catch(error => {
                console.error('There was a problem getting the user details:', error);
            });
    }, []);

    function handleCartClick(event, product) {
        event.preventDefault();
        if (!userId) {
            toast.error("Please login to add the items to cart.", {
                position: "bottom-left",
            });
        } else {
            const myCart = JSON.parse(localStorage.getItem("mycart")) || {};
            const updatedCart = myCart[userId] ? [...myCart[userId], product] : [product];
            setCartItems(updatedCart);
            myCart[userId] = updatedCart;
            localStorage.setItem("mycart", JSON.stringify(myCart));
            toast.success(`${product.name} added to cart`, {
                position: "bottom-left",
                autoClose: 1000,
                style: {
                    borderRadius: '8px',
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    color:'white',
                  },
            });
        }
    }

    const handlePhotoClick = (productId) => {
        
        console.log('Photo clicked');
        window.location.href = `/singleproduct/${productId}`;
          };

    useEffect(() => {
        fetch(`${serverUrl}api/products`)
            .then((response) => response.json())
            .then((data) => setProducts(data));
    }, []);

    function scrollToSection(sectionRef) {
        const section = sectionRef.current;
        section.scrollIntoView({ behavior: 'smooth' });
    }

    function handleCategoryChange(event) {
        const category = event.target.value;
        switch (category) {
            case 'women':
                scrollToSection(womenSectionRef);
                break;
            case 'kids':
                scrollToSection(kidsSectionRef);
                break;
            case 'mens':
                scrollToSection(mensSectionRef);
                break;
            default:
                break;
        }
    }

    function handlePriceRangeChange(event) {
        setSelectedPriceRange(event.target.value);
    }
    return (
        <div className='hideh2'>
            <div className='category-dropdown'>
                <div className="category-dropdown-container">
                    <label htmlFor="category-select">Category:</label>
                    <select id="category-select" onChange={handleCategoryChange}>
                        <option value="women">Women</option>
                        <option value="kids">Kids</option>
                        <option value="mens">Mens</option>
                    </select>
                </div>

                <div className="category-dropdown-container">
                    <label htmlFor="category-select">Price:</label>
                    <select value={selectedPriceRange} onChange={handlePriceRangeChange}>
                        <option value="">All</option>
                        <option value="100-500">&#8377;100 - &#8377;500</option>
                        <option value="501-1000">&#8377;501 - &#8377;1000</option>
                        <option value="1001-2000">&#8377;1001 - &#8377;2000</option>
                        <option value="2001+">&#8377;2001+</option>
                    </select>
                </div>
            </div>

            <h2 ref={womenSectionRef}>Women's Products</h2>
            <div className="product-card-container">
                {products
                    .filter((product) => product.category === 'women')
                    .filter((product) => {
                        if (selectedPriceRange === '') {
                            return true;
                        }
                        const [minPrice, maxPrice] = selectedPriceRange.split('-');
                        return product.price >= minPrice && product.price <= maxPrice;
                    })
                    .map((product) => (
                        <div className="product-card" key={product._id}>
                            <div className="product-image" onClick={() => handlePhotoClick(product._id)}>
                                <img src={product.photo} alt={product.name} />
                            </div>

                            <div className="product-details">
                                <h3>{product.name}</h3>
                                <div className="product-info">
                                    <div className="product-price">Price:&#8377;{product.price}</div>
                                    <div className="product-quantity">Stock: {product.stock}</div>
                                </div>
                                <button
                                    className="add-to-cart-btn" onClick={(event) => handleCartClick(event, product)}

                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
            </div>

            <h2 ref={kidsSectionRef}>Kids' Products</h2>
            <div className="product-card-container">
                {products
                    .filter((product) => product.category === 'kids')
                    .filter((product) => {
                        if (selectedPriceRange === '') {
                            return true;
                        }
                        const [minPrice, maxPrice] = selectedPriceRange.split('-');
                        return product.price >= minPrice && product.price <= maxPrice;
                    })
                    .map((product) => (
                        <div className="product-card" key={product._id}>
                            <div className="product-image"  onClick={() => handlePhotoClick(product._id)}>
                                <img src={product.photo} alt={product.name} />
                            </div>

                            <div className="product-details">
                                <h3>{product.name}</h3>
                                <div className="product-info">
                                    <div className="product-price">Price:&#8377;{product.price}</div>
                                    <div className="product-quantity">Stock: {product.stock}</div>
                                </div>
                                <button
                                    className="add-to-cart-btn" onClick={(event) => handleCartClick(event, product)}

                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
            </div>

            <h2 ref={mensSectionRef}>Men's Products</h2>
            <div className="product-card-container">
                {products
                    .filter((product) => product.category === 'men')
                    .filter((product) => {
                        if (selectedPriceRange === '') {
                            return true;
                        }
                        const [minPrice, maxPrice] = selectedPriceRange.split('-');
                        return product.price >= minPrice && product.price <= maxPrice;
                    })
                    .map((product) => (
                        <div className="product-card" key={product._id}>
                            <div className="product-image"  onClick={() => handlePhotoClick(product._id)}>
                                <img src={product.photo} alt={product.name} />
                            </div>

                            <div className="product-details">
                                <h3>{product.name}</h3>
                                <div className="product-info">
                                    <div className="product-price">Price:&#8377;{product.price}</div>
                                    <div className="product-quantity">Stock: {product.stock}</div>
                                </div>
                                <button
                                    className="add-to-cart-btn" onClick={(event) => handleCartClick(event, product)}

                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};


export default ProductCard;






