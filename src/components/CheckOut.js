import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import {Button,Typography,List,ListItem,Radio,RadioGroup,FormControlLabel,TextField,Box,Grid,Container,Paper,CircularProgress,Popover,IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';


const stripePromise = loadStripe('pk_test_...');

const Checkout = () => {
  const { cart, setCart } = useCart();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [billingDetails, setBillingDetails] = useState({
    name: '',
    address: '',
    pincode: '',
    phone: '',
  });
  const [orderId, setOrderId] = useState(null); // eslint-disable-line no-unused-vars
  const [userEmail, setUserEmail] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);

 

  // const handlePlaceOrder = async () => {
  //   const authToken = sessionStorage.getItem('authToken');
  //   const userId = sessionStorage.getItem('userId');

  //   if (!authToken) {
  //     console.error('User is not authenticated. Cannot place an order.');
  //     return;
  //   }

  //   try {
  //     const bookTitles = cart.map((book) => book.title);

  //     const response = await fetch('https://ebook-zopw.onrender.com/api/orders/place-order', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${authToken}`,
  //       },
  //       body: JSON.stringify({
  //         cart,
  //         total: cart.reduce((acc, book) => acc + book.price * book.quantity, 0),
  //         bookTitles,
  //         paymentMethod,
  //         billingDetails: paymentMethod === 'PayOnDelivery' || paymentMethod === 'Card' ? billingDetails : null,
  //         userEmail,
  //         userId,
  //       }),
  //     });

  //     if (response.ok) {
  //       const orderData = await response.json();
  //       setOrderId(orderData._id);

  //       let updatedCart = [...cart];
  //       for (const book of cart) {
  //         updatedCart = updatedCart.filter((item) => item._id !== book._id);
  //       }
  //       setCart(updatedCart);

  //       setBillingDetails({
  //         name: '',
  //         address: '',
  //         pincode: '',
  //         phone: '',
  //       });
  //       setUserEmail('');
  //       setIsButtonDisabled(true);
  //       setOrderPlaced(true);
  //       setIsSuccessPopupOpen(true);

  //       setTimeout(() => {
  //         setIsSuccessPopupOpen(false);
  //         navigate('/status');
  //       }, 5000);
  //     }
  //   } catch (error) {
  //     console.error('Error placing the order:', error);
  //   }
  // };

  const handlePlaceOrder = async () => {
    const authToken = sessionStorage.getItem('authToken');
    const userId = sessionStorage.getItem('userId');
  
    if (!authToken) {
      console.error('User is not authenticated. Cannot place an order.');
      return;
    }
  
    try {
      const bookTitles = cart.map((book) => book.title);
      const currentDate = new Date();
  
      const response = await fetch('https://ebook-zopw.onrender.com/api/orders/place-order', {
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
          shippedAt: currentDate, // Set shippedAt to the current date and time
          deliveredAt: currentDate,
        }),
      });
  
      if (response.ok) {
        const orderData = await response.json();
        setOrderId(orderData._id);
  
        let updatedCart = [...cart];
        for (const book of cart) {
          updatedCart = updatedCart.filter((item) => item._id !== book._id);
        }
        setCart(updatedCart);
  
        setBillingDetails({
          name: '',
          address: '',
          pincode: '',
          phone: '',
        });
        setUserEmail('');
        setIsButtonDisabled(true);
        setOrderPlaced(true);
        setIsSuccessPopupOpen(true);
  
        setTimeout(() => {
          setIsSuccessPopupOpen(false);
          navigate('/status');
        }, 5000);
      }
    } catch (error) {
      console.error('Error placing the order:', error);
    }
  };
  

  useEffect(() => {
    if (isSuccessPopupOpen) {
      setTimeout(() => {
        setIsSuccessPopupOpen(false);
      }, 5000);
    }
  }, [isSuccessPopupOpen]);

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
      <Popover
        open={isSuccessPopupOpen}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
      >
        <Box
          sx={{
            width: '200px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            backgroundColor: 'white',
          }}
        >
          <IconButton
            sx={{ position: 'absolute', top: '5px', right: '5px' }}
            onClick={() => setIsSuccessPopupOpen(false)}
          >
            <CloseIcon />
          </IconButton>
          <CheckCircleIcon fontSize="large" sx={{ color: 'success' }} />
          <Typography variant="h6">Order placed successfully!</Typography>
          <Link to="/status">
            <Button variant="contained" color="primary" className="track-order">
              Track Order
            </Button>
          </Link>
        </Box>
      </Popover>
    </Container>
  );
};

export default Checkout;
