import React from 'react';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardContent,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const ShoppingCart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const handleRemoveItem = (bookId) => {
    removeFromCart(bookId);
  };

  const handleQuantityChange = (bookId, change) => {
    updateQuantity(bookId, change);
  };

  if (cart.length === 0) {
    return <Typography variant="h6">Your shopping cart is empty.</Typography>;
  }

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Shopping Cart
        </Typography>
        <List>
          {cart.map((book) => (
            <ListItem key={book._id}>
              <ListItemText
                primary={`${book.title} - ₹${book.price}`}
                secondary={`Quantity: ${book.quantity}`}
              />
              <ListItemSecondaryAction>
                <IconButton onClick={() => handleQuantityChange(book._id, -1)}>
                  <RemoveIcon />
                </IconButton>
                <IconButton onClick={() => handleQuantityChange(book._id, 1)}>
                  <AddIcon />
                </IconButton>
                <IconButton onClick={() => handleRemoveItem(book._id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <Typography variant="h6" gutterTop>
          Total Price: ₹
          {cart.reduce((acc, book) => acc + book.price * book.quantity, 0)}
        </Typography>

        {/* Link to Checkout */}
        <Link to="/place-order">
          <Button variant="contained" color="primary">
            Proceed to Checkout
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ShoppingCart;
