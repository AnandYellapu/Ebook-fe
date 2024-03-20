
import React from 'react';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';
import { Button, Card, CardContent, Grid, IconButton, Typography, List, ListItem, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const ShoppingCart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  

  const handleRemoveItem = (bookId) => {
    removeFromCart(bookId);
  };

  


  const handleQuantityChange = (bookId, change) => {
    const currentQuantity = cart.find(item => item._id === bookId).quantity;
    const updatedQuantity = currentQuantity + change;
    
    if (updatedQuantity > 0) {
      updateQuantity(bookId, updatedQuantity);
    }
  };
  
  

  if (cart.length === 0) {
    return <Typography variant="h6" className='shopping-cart'>Your shopping cart is empty.</Typography>;
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
              <Grid container alignItems="center">
                <Grid item xs={12} sm={8}>
                  <ListItemText
                    primary={`${book.title} - ₹${book.price}`}
                    secondary={`Quantity: ${book.quantity}`}
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Grid container spacing={2}>
                    <Grid item>
                      <IconButton onClick={() => handleQuantityChange(book._id, -1)}>
                        <RemoveIcon />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <IconButton onClick={() => handleQuantityChange(book._id, 1)}>
                        <AddIcon />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <IconButton onClick={() => handleRemoveItem(book._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
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
