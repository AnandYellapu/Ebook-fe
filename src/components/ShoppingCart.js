import React from 'react';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';
import { Button, Card, CardContent, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const ShoppingCart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const handleRemoveItem = (bookId) => {
    removeFromCart(bookId);
  };

  const handleIncreaseQuantity = (bookId) => {
    updateQuantity(bookId, 1);
  };

  const handleDecreaseQuantity = (bookId) => {
    updateQuantity(bookId, -1);
  };

  if (cart.length === 0) {
    return <p className="empty-cart">Your shopping cart is empty.</p>;
  }

  return (
    <Card className="shopping-cart-container">
      <CardContent>
        <Typography variant="h5" className='shopping-cart-title'>
          Shopping Cart
        </Typography>
        <ul className="cart-items">
          {cart.map((book) => {
            const key = `${book._id}-${book.quantity}`;
            return (
              <li key={key} className="cart-item">
                <div className="item-details">
                  <Typography variant="body1">
                    {book.title} - ₹{book.price}
                  </Typography>
                  <div className="quantity-controls">
                    <IconButton onClick={() => handleDecreaseQuantity(book._id)}>
                      <RemoveIcon />
                    </IconButton>
                    <Typography variant="body1">{book.quantity}</Typography>
                    <IconButton onClick={() => handleIncreaseQuantity(book._id)}>
                      <AddIcon />
                    </IconButton>
                  </div>
                  <IconButton onClick={() => handleRemoveItem(book._id)} className="remove-button">
                    <DeleteIcon />
                  </IconButton>
                </div>
              </li>
            );
          })}
        </ul>
        <Typography variant="body1" className="total-price">
          Total Price: ₹{cart.reduce((acc, book) => acc + book.price * book.quantity, 0)}
        </Typography>

        {/* Link to Checkout */}
        <Link to="/create">
          <Button variant="contained" color="primary" className="checkout-button">
            Proceed to Checkout
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ShoppingCart;
