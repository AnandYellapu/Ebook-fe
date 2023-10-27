import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DoneIcon from '@mui/icons-material/Done';
import { toast } from 'react-toastify';

const OrderStatus = () => {
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState(null);

  const fetchOrderStatus = async () => {
    if (orderId) {
      setLoading(true);

      try {
        const orderDataResponse = await axios.get(`https://ebook-zopw.onrender.com/api/orders/${orderId}`);
        setOrderData(orderDataResponse.data);
        setLoading(false);
        toast.success('Order status fetched successfully.');
      } catch (error) {
        console.error('Failed to fetch order status:', error);
        setLoading(false);
        toast.error('Failed to fetch order status. Please try again.');
      }
    }
  };

  return (
    <div className="order-status-container">
      <div className="status-box">
        {orderData && (
          <>
            <div className={`status ${orderData.status === 'placed' ? 'blink' : ''}`}>
              {orderData.status === 'placed' && (
                <>
                  <CheckCircleIcon className="icon blinking-icon" fontSize="large" />
                  <span className="status-text">Placed</span>
                </>
              )}
            </div>
            <div className={`status ${orderData.status === 'shipped' ? 'blink' : ''}`}>
              {orderData.status === 'shipped' && (
                <>
                  <LocalShippingIcon className="icon blinking-icon" fontSize="large" />
                  <span className="status-text">Shipped</span>
                </>
              )}
            </div>
            <div className={`status ${orderData.status === 'delivered' ? 'blink' : ''}`}>
              {orderData.status === 'delivered' && (
                <>
                  <DoneIcon className="icon blinking-icon" fontSize="large" />
                  <span className="status-text">Delivered</span>
                </>
              )}
            </div>
          </>
        )}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="order-input"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={fetchOrderStatus}
          disabled={loading}
          className="order-button"
        >
          Check Status
        </Button>
      </div>
      {loading && <CircularProgress className="loading-spinner" />}

      {orderData && (
        <div className="order-details">
          <h2 className="order-heading">Order Details</h2>
          <p className="order-id">Order ID: {orderData._id}</p>
          <p className="order-status">Status: {orderData.status}</p>
          {orderData.books.map((book, index) => (
            <div key={index} className="book-details">
              <p className="book-title">Title: {book.title}</p>
            </div>
          ))}
          <p className="total-price">Total Price: ₹{orderData.total}</p>
          {orderData.status === 'delivered' && (
            <Link to={`/orders/${orderId}/feedback`} className="feedback-link">
              Share Your Feedback
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderStatus;
