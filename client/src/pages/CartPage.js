import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/cart.css';
import PayButton from './PayButton';
import { toast } from "react-toastify";
import { getUserDetails } from '../components/getuserdetails';
import config from '../config.js';


const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [userAddress, setUserAddress] = useState([]);
  const navigate = useNavigate();

  const [userId, setUserId] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const serverUrl = config.serverUrl;


  useEffect(() => {
    getUserDetails().then((user) => {
      const id = user._id;
      setUserId(id);
      setUser(user);
    });
  }, []);

  useEffect(() => {
    if (userId) {

      const cart = JSON.parse(localStorage.getItem('mycart')) || {};
      const userCart = cart[userId] || [];
      setCartItems(userCart);
    }
  }, [userId]);


  const handleClickProfile = () => {
    navigate("/profile");
  };

  const totalPrice = () => {
    try {
      const cart = JSON.parse(localStorage.getItem('mycart')) || {};
      const userCart = cart[userId] || [];
      const total = userCart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      console.log(total);

      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const incrementQuantity = (index) => {
    try {
      const updatedCart = [...cartItems];
      const item = updatedCart[index];
      const maxQuantity = item.stock;
      if (item.quantity < maxQuantity) {
        item.quantity += 1;
        item.stock -= 1;
        setCartItems(updatedCart);
        if (userId) {
          const cart = JSON.parse(localStorage.getItem('mycart')) || {};
          cart[userId] = updatedCart;
          localStorage.setItem('mycart', JSON.stringify(cart));
        }
      } else {
        toast.error(`Only ${maxQuantity} available in stock`, {
          position: "bottom-left",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const decrementQuantity = (index) => {
    try {
      const updatedCart = [...cartItems];
      const item = updatedCart[index];
      if (item.quantity === 0) {
        updatedCart.splice(index, 1);
      } else {
        item.quantity -= 1;
        item.stock += 1;
      }
      setCartItems(updatedCart);
      if (userId) {
        const cart = JSON.parse(localStorage.getItem('mycart')) || {};
        cart[userId] = updatedCart;
        localStorage.setItem('mycart', JSON.stringify(cart));
        console.log(cart.stock);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const removeItem = (index) => {
    try {
      const updatedCart = [...cartItems];
      updatedCart.splice(index, 1);
      setCartItems(updatedCart);
      if (userId) {
        const cart = JSON.parse(localStorage.getItem('mycart')) || {};
        cart[userId] = updatedCart;
        localStorage.setItem('mycart', JSON.stringify(cart));
      }
      toast.info("item removed from cart", {
        position: "bottom-left",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value);
    // Store the selected address in local storage
    localStorage.setItem('selectedAddress', event.target.value);
  };

  // ...

  useEffect(() => {
    // Retrieve the selected address from local storage on component mount
    const storedAddress = localStorage.getItem('selectedAddress');
    setSelectedAddress(storedAddress);
  }, []);


  const fetchUserAddressCart = async () => {
    const response = await fetch(
      `${serverUrl}api/get_address`,
      {
        method: "GET",
        credentials: 'include',
      }
    );
    const resData = await response.json();
    setUserAddress(resData);
  };

  useEffect(() => {
    fetchUserAddressCart();
  }, []);


  return (
    <div>
      <div className="container cartContainer">
        <div className="row">
          <div className="md-col-12">
            <h1 className="text-center bg-light p-2 mb-1">My Bag</h1>
            <h4 className="text-center">
              {cartItems?.length > 0
                ? `${cartItems.length} items added in your cart`
                : "Your Shopping Bag is Empty!!"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-7">
            {cartItems.map((item, index) => {
              return (
                <div key={index} className="row m-2 card p-1 flex-row">
                  <div className="col-md-4">
                    <img
                      src={item.photo}
                      alt="photo"
                      width={"180px"}
                      height={"180px"}
                    />
                  </div>

                  <div className="col-md-8 mt-3">
                    <h6>{item.name}</h6>
                    <p>{item.description}</p>
                    <span>Price: {item.price}/-</span>{" "}
                    <span className="quantity">
                      Quantity:
                      <button onClick={() => incrementQuantity(index)} disabled={item.quantity === item.stock}>+</button>
                      <p>{item.quantity}</p>
                      <button onClick={() => decrementQuantity(index)} disabled={item.quantity === 1}>-</button>
                    </span>
                    <div className="cartRemoveBtn">
                      <button onClick={() => removeItem(index)}>Remove</button>
                    </div>
                  </div>


                </div>
              );
            })}
          </div>
          <div className="col-md-5 ordersum">
            <div className="card p-3">
              <h5 className="text-center">Order Summary</h5>
              <div className="d-flex justify-content-between mt-3">
                <h6>Subtotal:</h6>
                <h6>{totalPrice()}</h6>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <h6>Delivery Charges:</h6>
                <h6 style={{ color: "#28a745" }}>FREE</h6>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <h6>Total:</h6>
                <h6>{totalPrice()}</h6>
              </div>
              <div className="d-flex justify-content-center">
                <PayButton cartItems={cartItems} user={user} selectedAddress={selectedAddress} />

              </div>
              
                  <div className="addressCartContainer">
                    <h5>Select an address:</h5>
                    <select
                      name="addresses"
                      value={selectedAddress} // Set the value to the selectedAddress state
                      onChange={handleAddressChange} // Handle address change event
                    >
                      {userAddress.addresses && userAddress.addresses.length > 0 ? (
                        userAddress.addresses.map((address) => (
                          <option key={address._id} value={address._id}>
                            {address.street}, {address.city}, {address.state} {address.zip}
                          </option>
                        ))
                      ) : (
                        <>
                          <p>
                            No addresses found, Please try after adding an address:{" "}
                            <button onClick={handleClickProfile}>Profile</button>{" "}
                          </p>
                        </>
                      )}
                    </select>
                  </div>
               
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
export default CartPage;


