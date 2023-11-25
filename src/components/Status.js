// OrderStatus.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FeedbackForm from './FeedbackForm';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from '@mui/lab';
import { toast } from 'react-toastify';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DoneIcon from '@mui/icons-material/Done';

const OrderStatus = () => {
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
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

    fetchOrderStatus();
  }, [orderId]);

  const feedbackSubmitted = orderData && orderData.status === 'delivered' && orderData.feedbackSubmitted;

  return (
    <div className="order-status-container">
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
          disabled={loading}
          className="order-button"
        >
          Check Status
        </Button>
      </div>
      {loading && <CircularProgress className="loading-spinner" />}

      {orderData && (
        <div className="status-timeline">
        <Timeline align="left">
          <TimelineItem className={orderData.status === 'placed' ? 'blink' : ''}>
            <TimelineOppositeContent>
              <div className="status-text-opposite">
                {orderData.status === 'placed' && `Placed on ${new Date(orderData.createdAt).toLocaleString()}`}
              </div>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot
                color={orderData.status === 'placed' ? 'primary' : 'grey'}
              >
                <CheckCircleIcon fontSize="large" />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <div className="status-text">Placed</div>
            </TimelineContent>
          </TimelineItem>
        
          <TimelineItem className={orderData.status === 'shipped' ? 'blink' : ''}>
            <TimelineOppositeContent>
              <div className="status-text-opposite">
                {`Shipped on ${new Date(orderData.shippedAt).toLocaleString()}`}
              </div>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot
                color={orderData.status === 'shipped' ? 'secondary' : 'grey'}
              >
                <LocalShippingIcon fontSize="large" />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <div className="status-text">Shipped</div>
            </TimelineContent>
          </TimelineItem>
        
          <TimelineItem className={orderData.status === 'delivered' ? 'blink' : ''}>
            <TimelineOppositeContent>
              <div className="status-text-opposite">
                {`Delivered on ${new Date(orderData.deliveredAt).toLocaleString()}`}
              </div>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot
                color={orderData.status === 'delivered' ? 'success' : 'grey'}
              >
                <DoneIcon fontSize="large" />
              </TimelineDot>
            </TimelineSeparator>
            <TimelineContent>
              <div className="status-text">Delivered</div>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
        
        </div>
      )}

      {orderData && (
        <div className="order-details">
          <h2 className="order-heading">Order Details</h2>
          <p className="order-id">Order ID: {orderData._id}</p>
          <p className="order-status">Status: {orderData.status}</p>
          {orderData.books.map((book, index) => (
            <div key={index} className="order-id">
              <div key={index} className="book-details">
                <p className="book-title">Title: {book.title}</p>
              </div>
              {orderData.status === 'delivered' && !feedbackSubmitted && (
                <FeedbackForm orderId={orderData._id} bookId={book.bookId} />
              )}
            </div>
          ))}

          <Button component={Link} to="/" variant="contained" color="primary">
            Back to Home
          </Button>
        </div>
      )}
    </div>
  );
};

export default OrderStatus;