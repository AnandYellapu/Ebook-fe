import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const OrderStatusUpdater = () => {
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState(null);

  const handleUpdateStatus = async () => {
    setLoading(true);

    try {
      // Send a request to update the order status
      const response = await fetch('http://localhost:1113/api/orders/update-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId, status }),
      });

      if (response.ok) {
        const updatedOrder = await response.json();
        setOrderData(updatedOrder);
      } else {
        // Handle error here
        console.error('Failed to update order status');
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="order-status-container">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" className="update-order">
            Update Order Status
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Order ID"
            variant="outlined"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="input-field"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Status"
            variant="outlined"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="input-field"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateStatus}
            disabled={loading}
            className="update-button"
            fullWidth
          >
            Update Status
          </Button>
        </Grid>
        {loading && (
          <Grid item xs={12}>
            <CircularProgress className="loading-spinner" />
          </Grid>
        )}
        {orderData && (
          <Grid item xs={12}>
            <div className="order-details">
              <Typography variant="h6" className="update-order">
                Updated Order Status:
              </Typography>
              <Typography variant="body1" className="orderId">
                Order ID: {orderData.orderId}
              </Typography>
              <Typography variant="body1" className="order-status">
                Status: {orderData.status}
              </Typography>
            </div>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default OrderStatusUpdater;