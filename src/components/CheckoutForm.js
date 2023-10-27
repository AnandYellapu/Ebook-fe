import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import Paper from '@mui/material/Paper';

const CheckoutForm = ({ handlePlaceOrder }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error('Error creating payment method:', error);
    } else {
      console.log('PaymentMethod:', paymentMethod);

      handlePlaceOrder();
    }
  };

  return (
    <Paper elevation={3} className="checkout-form" style={{ padding: '20px', width: '100%', maxWidth: '500px', margin: '0 auto' }}>
      <div className="card-element-container">
        <label style={{ fontSize: '16px', marginBottom: '10px' }}>Card Details</label>
        <CardElement className="card-element" onClick={handleSubmit} style={{ border: '1px solid #ccc', padding: '10px' }} />
      </div>
    </Paper>
  );
};

export default CheckoutForm;
