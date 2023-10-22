import React from 'react';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

const stripePromise = loadStripe('pk_test_51NwPsNSBOx4YfpRqgJvR4q1Y0YolhPdSuA0waOcvSr0GsbuXE2OfkaYEDTZBd57hWKaCVtYaj03zHEg438T2MWO1004SdSFHtY');

const Checkout = () => {
  const { cart } = useCart();
  const [orderPlaced, setOrderPlaced] = React.useState(false);

  const handlePlaceOrder = async () => {
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      console.error('User is not authenticated. Cannot place an order.');
      return;
    }

    try {
      const bookTitles = cart.map((book) => book.title);

      const response = await fetch('https://ebook-zopw.onrender.com/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          cart,
          total: cart.reduce((acc, book) => acc + book.price * book.quantity, 0),
          bookTitles,
        }),
      });

      if (response.ok) {
        const orderData = await response.json();
        console.log(orderData);
        setOrderPlaced(true);
      } else {
        console.error('Failed to place the order.');
      }
    } catch (error) {
      console.error('Error placing the order:', error);
    }
  }

  if (cart.length === 0) {
    return <p className='empty-cart-message'>Your cart is empty. Add some books before checking out.</p>;
  }

  // Determine the user's role based on the JWT token's payload
  const authToken = sessionStorage.getItem('authToken');
  if (!authToken) {
    console.error('User is not authenticated. Cannot determine the role.');
    return;
  }

  try {
    const tokenPayload = JSON.parse(atob(authToken.split('.')[1]));
    const userRole = tokenPayload.role;

    // console.log(`Login is an ${userRole === 'admin' ? 'admin' : 'user'}`);

    return (
      <div className='checkout-container'>
        <Typography variant="h4" className='checkout-title'>Checkout</Typography>
        <List className='checkout-items'>
          {cart.map((book) => (
            <ListItem key={book._id} className='checkout-item'>
              <Typography>{book.title} - ₹{book.price} x {book.quantity}</Typography>
            </ListItem>
          ))}
        </List>
        <Typography variant="h5" className='total-price'>Total Price: ₹{cart.reduce((acc, book) => acc + book.price * book.quantity, 0)}</Typography>
        <Elements stripe={stripePromise} className='StripeElement'>
          <CheckoutForm handlePlaceOrder={handlePlaceOrder} />
        </Elements>
        {orderPlaced && (
          <div className='order-tracking-button'>
            {userRole === 'admin' ? (
              <Link to="/update-status">
                <Button variant="contained" color="primary" className='track-order'>
                  Update Status
                </Button>
              </Link>
            ) : (
              <Link to="/status">
                <Button variant="contained" color="primary" className='track-order'>
                  Track Order
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error decoding JWT token:', error);
    return null;
  }
}

export default Checkout;
