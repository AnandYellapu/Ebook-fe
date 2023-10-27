// import React, { useState } from 'react';
// import { useCart } from './CartContext';
// import { Link } from 'react-router-dom';
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import CheckoutForm from './CheckoutForm';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import TextField from '@mui/material/TextField';
// import { toast } from 'react-toastify';

// const stripePromise = loadStripe('pk_test_...'); // Replace with your Stripe public key

// const Checkout = () => {
//   const { cart } = useCart();
//   const [orderPlaced, setOrderPlaced] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState('');
//   const [billingDetails, setBillingDetails] = useState({
//     name: '',
//     address: '',
//     pincode: '',
//     phone: '',
//   });
//   const [orderId, setOrderId] = useState(null);
//   // const [orderId, setOrderId] = useState(null);
//   const [userEmail, setUserEmail] = useState('');
//   const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Add this state

//   const handlePlaceOrder = async () => {
//     const authToken = sessionStorage.getItem('authToken');

//     if (!authToken) {
//       console.error('User is not authenticated. Cannot place an order.');
//       toast.error('User is not authenticated. Please log in to place an order.');
//       return;
//     }

//     try {
//       const bookTitles = cart.map((book) => book.title);

//       const response = await fetch('https://ebook-zopw.onrender.com/api/orders/place-order', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${authToken}`,
//         },
//         body: JSON.stringify({
//           cart,
//           total: cart.reduce((acc, book) => acc + book.price * book.quantity, 0),
//           bookTitles,
//           paymentMethod,
//           billingDetails: paymentMethod === 'Card' ? billingDetails : null,
//           userEmail,
//         }),
//       });

//       if (response.ok) {
//         const orderData = await response.json();
//         setOrderId(orderData._id);
//         setOrderPlaced(true);

//         // Clear fields and disable the "Place Order" button
//         setBillingDetails({
//           name: '',
//           address: '',
//           pincode: '',
//           phone: '',
//         });
//         setUserEmail('');
//         setIsButtonDisabled(true);
//         toast.success('Order placed successfully!');
//       } else {
//         console.error('Failed to place the order.');
//         toast.error('Failed to place the order. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error placing the order:', error);
//       toast.error('Error placing the order. Please try again.');
//     }
//   };

//   if (cart.length === 0) {
//     return <p className='empty-cart-message'>Your cart is empty. Add some books before checking out.</p>;
//   }

//   return (
//     <div className="checkout-container">
//       <Typography variant="h4" className="checkout-title">
//         Checkout
//       </Typography>
//       <List className="checkout-items">
//         {cart.map((book) => (
//           <ListItem key={book._id} className="checkout-item">
//             <Typography>{book.title} - ₹{book.price} x {book.quantity}</Typography>
//           </ListItem>
//         ))}
//       </List>
//       <Typography variant="h5" className="total-price">
//         Total Price: ₹{cart.reduce((acc, book) => acc + book.price * book.quantity, 0)}
//       </Typography>

//       <div>
//         <Typography variant="h6">Payment Method:</Typography>
//         <RadioGroup
//           name="paymentMethod"
//           value={paymentMethod}
//           onChange={(e) => setPaymentMethod(e.target.value)}
//         >
//           <FormControlLabel value="Card" control={<Radio />} label="Credit Card" />
//           <FormControlLabel value="PayOnDelivery" control={<Radio />} label="COD" />
//         </RadioGroup>
//       </div>
//       {paymentMethod === 'Card' && (
//         <Elements stripe={stripePromise} className="StripeElement">
//           <CheckoutForm handlePlaceOrder={handlePlaceOrder} />
//         </Elements>
//       )}
//       {paymentMethod === 'PayOnDelivery' && (
//         <div>
//           <Typography variant="h6">Billing Details</Typography>
//           <TextField
//             label="Name"
//             value={billingDetails.name}
//             onChange={(e) => setBillingDetails({ ...billingDetails, name: e.target.value })}
//             fullWidth
//           />
//           <TextField
//             label="Address"
//             value={billingDetails.address}
//             onChange={(e) => setBillingDetails({ ...billingDetails, address: e.target.value })}
//             fullWidth
//           />
//           <TextField
//             label="Pincode"
//             value={billingDetails.pincode}
//             onChange={(e) => setBillingDetails({ ...billingDetails, pincode: e.target.value })}
//             fullWidth
//           />
//           <TextField
//             label="Phone Number"
//             value={billingDetails.phone}
//             onChange={(e) => setBillingDetails({ ...billingDetails, phone: e.target.value })}
//             fullWidth
//           />
//         </div>
//   )}

//       <TextField
//         label="Email"
//         value={userEmail}
//         onChange={(e) => setUserEmail(e.target.value)}
//         fullWidth
//         placeholder='Please enter your valid email that we will send the order to.'
//       />
//       <Button variant="contained" color="primary" onClick={handlePlaceOrder} disabled={isButtonDisabled}>
//         Place Order
//       </Button>
//       {orderPlaced && (
//         <div className="order-tracking-button">
//           <Link to="/status">
//             <Button variant="contained" color="primary" className="track-order">
//               Track Order
//             </Button>
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Checkout;





import React, { useState } from 'react';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';

const stripePromise = loadStripe('pk_test_...');

const Checkout = () => {
  const { cart } = useCart();
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

  const handlePlaceOrder = async () => {
    const authToken = sessionStorage.getItem('authToken');

    if (!authToken) {
      console.error('User is not authenticated. Cannot place an order.');
      toast.error('User is not authenticated. Please log in to place an order.');
      return;
    }

    try {
      const bookTitles = cart.map((book) => book.title);

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
          billingDetails: paymentMethod === 'PayOnDelivery' || paymentMethod==='Card' ? billingDetails : null,
          userEmail,
        }),
      });

      if (response.ok) {
        const orderData = await response.json();
        setOrderId(orderData._id);
        setOrderPlaced(true);

        // Clear fields and disable the "Place Order" button
        setBillingDetails({
          name: '',
          address: '',
          pincode: '',
          phone: '',
        });
        setUserEmail('');
        setIsButtonDisabled(true);
        toast.success('Order placed successfully!');
      } else {
        console.error('Failed to place the order.');
        toast.error('Failed to place the order. Please try again.');
      }
    } catch (error) {
      console.error('Error placing the order:', error);
      toast.error('Error placing the order. Please try again.');
    }
  };



 
  

  if (cart.length === 0) {
    return <p className='empty-cart-message'>Your cart is empty. Add some books before checking out.</p>;
  }

  return (
    <div className="checkout-container">
      <Typography variant="h4" className="checkout-title">
        Checkout
      </Typography>
      <List className="checkout-items">
        {cart.map((book) => (
          <ListItem key={book._id} className="checkout-item">
            <Typography>{book.title} - ₹{book.price} x {book.quantity}</Typography>
          </ListItem>
        ))}
      </List>
      <Typography variant="h5" className="total-price">
        Total Price: ₹{cart.reduce((acc, book) => acc + book.price * book.quantity, 0)}
      </Typography>

      <div>
        <Typography variant="h6">Payment Method:</Typography>
        <RadioGroup
          name="paymentMethod"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <FormControlLabel value="Card" control={<Radio />} label="Credit Card" />
          <FormControlLabel value="PayOnDelivery" control={<Radio />} label="COD" />
        </RadioGroup>
      </div>
      {paymentMethod === 'Card' && (
        <Elements stripe={stripePromise} className="StripeElement">
          <CheckoutForm handlePlaceOrder={handlePlaceOrder} />
          <div>
            <Typography variant="h6">Billing Details (for Card)</Typography>
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
          </div>
        </Elements>
      )}
      {paymentMethod === 'PayOnDelivery' && (
        <div>
          <Typography variant="h6">Billing Details</Typography>
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
        </div>
  )}

      <TextField
        label="Email"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
        fullWidth
        placeholder='Please enter your valid email that we will send the order to.'
      />
      <Button variant="contained" color="primary" onClick={handlePlaceOrder} disabled={isButtonDisabled}>
        Place Order
      </Button>
      {orderPlaced && (
        <div className="order-tracking-button">
          <Link to="/status">
            <Button variant="contained" color="primary" className="track-order">
              Track Order
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Checkout;