import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/success.css';
import config from '../config.js';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const serverUrl = config.serverUrl;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${serverUrl}api/orders`, {
          withCredentials: true,
        });
        setOrders(response.data.orders);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, []);

  const openOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  const closeOrderDetails = () => {
    setSelectedOrder(null);
  };

  if (orders.length === 0) {
    return (
      <div className="no-orders-container">
        <img src="https://static.vecteezy.com/system/resources/previews/014/814/239/original/no-order-a-flat-rounded-icon-is-up-for-premium-use-vector.jpg" alt="No orders" className="no-orders-image" />
        <button className="start-shopping-button" onClick={() => { window.location.href = '/products' }}>Start Shopping</button>
      </div>
    );
  }

  return (
    <div className="user-orders-container">
      <h1>User Orders</h1>
      <table className="order-table">
        <thead>
          <tr>
            <th>Products</th>
            <th>Quantity</th>
            <th>Payment Status</th>
            <th>Order Placed Date</th>
            <th>Delivery Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr className="order-row" key={order._id}>
              <td>
                {order.products.map((product) => (
                  <div key={product._id} className="product-detailss">
                    <img src={product.productDetails.photo} alt={product.productDetails.name} className="product-imageinSucces" />
                    <h5>{product.productDetails.name}</h5>
                  </div>
                ))}
              </td>
              <td>
                <ul className="product-list">
                  {order.products.map((product) => (
                    <li key={product._id}>
                      <div>
                        <p>{product.quantity}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </td>
              <td style={{ color: order.payment_status === 'paid' ? 'green' : 'red' }}>{order.payment_status}</td>
              <td>{order.createdAt.substring(0, 10)}</td>
              <td style={{ color: order.delivery_status === 'Delivered' ? 'green' : 'red' }}>{order.delivery_status}</td>
              <td>
                <button className="order-details-button" onClick={() => openOrderDetails(order)}>
                  More details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedOrder && (
        <div className="modal" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Order #{selectedOrder._id}</h5>
                {selectedOrder.receipt_url && (
                     
                        <a href={selectedOrder.receipt_url} target="_blank" rel="noopener noreferrer">
                          View Receipt
                        </a>
                      
                    )}
                <button type="button" className="close" onClick={closeOrderDetails}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="order-details-row">
                  <div className="order-details-column">
                    <h5>Products Details:</h5>
                    <ul>
                      {selectedOrder.products.map((product) => (
                        <li key={product._id}>
                          <p>Product: {product.productDetails.name}</p>
                          <p>Quantity: {product.quantity}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="order-details-column">
                    <h5>Order Summary:</h5>
                    <p>Subtotal: {selectedOrder.subtotal}</p>
                    <p>Total: {selectedOrder.total}</p>
                    <p>Payment mode: card</p>
                  
                  </div>
                  <div className="order-details-column">
                    <h5>Shipping Address:</h5>
                    <p>House Number: {selectedOrder.shippingAddress.houseNumber}</p>
                    <p>Street: {selectedOrder.shippingAddress.street}</p>
                    <p>City: {selectedOrder.shippingAddress.city}</p>
                    <p>State: {selectedOrder.shippingAddress.state}</p>
                    <p>Country: {selectedOrder.shippingAddress.country}</p>
                    <p>Zip Code: {selectedOrder.shippingAddress.zipCode}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserOrders;
