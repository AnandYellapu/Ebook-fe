import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import Button from '@mui/material/Button';
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

    // Create a PaymentMethod using the card element
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
    <Paper elevation={3} className="checkout-form">
      <div className="card-element-container">
        <CardElement className="card-element" />
      </div>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={!stripe}
        onClick={handleSubmit}
        className="pay-button"
      >
        Pay and Place Order
      </Button>
    </Paper>
  );
};

export default CheckoutForm;
