import React, { useState } from 'react';
import { useCart } from './CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { Button, Typography, List, ListItem, Radio, RadioGroup, FormControlLabel, TextField, Box, Grid, Container, Paper, CircularProgress } from '@mui/material';
import OrderSuccessPopup from './OrderSuccessPopup';
import { useSnackbar } from 'notistack'; // Import useSnackbar hook from notistack

const stripePromise = loadStripe('pk_test_...');

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(); // Destructure enqueueSnackbar from useSnackbar
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [billingDetails, setBillingDetails] = useState({
    name: '',
    address: '',
    pincode: '',
    phone: '',
  });
  const [userEmail, setUserEmail] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [orderId, setOrderId] = useState('');   //eslint-disable-line

  const handlePlaceOrder = async () => {
    try {
      const authToken = sessionStorage.getItem('authToken');
      const userId = sessionStorage.getItem('userId');
  
      if (!authToken) {
        console.error('User is not authenticated. Cannot place an order.');
        return;
      }
  
      const bookTitles = cart.map((book) => book.title);
      const currentDate = new Date();
  
      const response = await fetch('https://ebook-backend-3czm.onrender.com/api/orders/place-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          cart,
          total: cart.reduce((acc, book) => acc + book.price * book.quantity, 0),
          bookTitles,
          paymentMethod,
          billingDetails: paymentMethod === 'PayOnDelivery' || paymentMethod === 'Card' ? billingDetails : null,
          userEmail,
          userId,
          shippedAt: currentDate,
          deliveredAt: currentDate,
        }),
      });
  
      if (response.ok) {
        const responseData = await response.json();
  
        if (responseData && responseData._id) {
          const orderIdFromResponse = responseData._id;
  
          setUserEmail('');
          setIsButtonDisabled(true);
          setOrderPlaced(true);
          setOrderId(orderIdFromResponse);


          clearCart();   //clear the cart data


          setTimeout(() => {
            setShowSuccessPopup(true);
          }, 1000);
  
          setTimeout(() => {
            navigate('/status');
          }, 5000);
  
          enqueueSnackbar('Order placed successfully.', { variant: 'success' }); // Display success notification
        } else {
          console.error('Error placing the order: Order ID not found in the response.');
          enqueueSnackbar('Failed to place the order. Please try again.', { variant: 'error' }); // Display error notification
        }
      } else {
        console.error('Error placing the order:', response.statusText);
        enqueueSnackbar('Failed to place the order. Please try again.', { variant: 'error' }); // Display error notification
      }
    } catch (error) {
      console.error('Error placing the order:', error);
      enqueueSnackbar('Failed to place the order. Please try again.', { variant: 'error' }); // Display error notification
    }
  };


  return (
    <Container maxWidth="md" className="container-typo">
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Checkout
        </Typography>
        <Paper variant="outlined" elevation={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                Your Cart
              </Typography>
              <List>
                {cart.map((book) => (
                  <ListItem key={book._id}>
                    <Typography>
                      {book.title} - ₹{book.price} x {book.quantity}
                    </Typography>
                  </ListItem>
                ))}
              </List>
              <Typography variant="h6" gutterTop>
                Total Price: ₹
                {cart.reduce((acc, book) => acc + book.price * book.quantity, 0)}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                Payment Method
              </Typography>
              <RadioGroup
                name="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel value="Card" control={<Radio />} label="Credit Card" />
                <FormControlLabel value="PayOnDelivery" control={<Radio />} label="COD" />
              </RadioGroup>
              {paymentMethod === 'Card' && (
                <Elements stripe={stripePromise}>
                  <CheckoutForm handlePlaceOrder={handlePlaceOrder} />
                  <Box mt={2}>
                    <Typography variant="h6" gutterBottom>
                      Billing Details (for Card)
                    </Typography>
                    <TextField
                      label="Name"
                      value={billingDetails.name}
                      onChange={(e) => setBillingDetails({ ...billingDetails, name: e.target.value })}
                      fullWidth
                    />
                    <TextField
                      label="Address"
                      value={billingDetails.address}
                      onChange={(e) => setBillingDetails({ ...billingDetails, address: e.target.value })}
                      fullWidth
                    />
                    <TextField
                      label="Pincode"
                      value={billingDetails.pincode}
                      onChange={(e) => setBillingDetails({ ...billingDetails, pincode: e.target.value })}
                      fullWidth
                    />
                    <TextField
                      label="Phone Number"
                      value={billingDetails.phone}
                      onChange={(e) => setBillingDetails({ ...billingDetails, phone: e.target.value })}
                      fullWidth
                    />
                  </Box>
                </Elements>
              )}
              {paymentMethod === 'PayOnDelivery' && (
                <Box mt={2}>
                  <Typography variant="h6" gutterBottom>
                    Billing Details
                  </Typography>
                  <TextField
                    label="Name"
                    value={billingDetails.name}
                    onChange={(e) => setBillingDetails({ ...billingDetails, name: e.target.value })}
                    fullWidth
                  />
                  <TextField
                    label="Address"
                    value={billingDetails.address}
                    onChange={(e) => setBillingDetails({ ...billingDetails, address: e.target.value })}
                    fullWidth
                  />
                  <TextField
                    label="Pincode"
                    value={billingDetails.pincode}
                    onChange={(e) => setBillingDetails({ ...billingDetails, pincode: e.target.value })}
                    fullWidth
                  />
                  <TextField
                    label="Phone Number"
                    value={billingDetails.phone}
                    onChange={(e) => setBillingDetails({ ...billingDetails, phone: e.target.value })}
                    fullWidth
                  />
                </Box>
              )}
              <TextField
                label="Email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                fullWidth
                placeholder="Please enter your valid email that we will send the order to."
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handlePlaceOrder}
                disabled={isButtonDisabled}
              >
                {isButtonDisabled ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Place Order'
                )}
              </Button>
              {orderPlaced && (
                <div>
                  <Link to="/status">
                    <Button variant="contained" color="primary" className="track-order">
                      Track Order
                    </Button>
                  </Link>
                </div>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Box>
      {/* Render the OrderSuccessPopup component */}
      <OrderSuccessPopup open={showSuccessPopup} handleClose={() => setShowSuccessPopup(false)} />
    </Container>
  );
};

export default Checkout;
