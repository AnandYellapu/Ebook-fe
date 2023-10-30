// Wishlist.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from './WishlistContext';
import { useCart } from './CartContext';
import { Paper, Container, Button, IconButton } from '@mui/material';
import { Favorite, ShoppingCart } from '@mui/icons-material';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  
  // Create state to track whether the heart icon is clicked or not
  const [isHeartClicked, setHeartClicked] = useState({});

  const handleRemoveFromWishlist = (bookId) => {
    removeFromWishlist(bookId);
  };

  const handleAddToCart = (book) => {
    addToCart(book);
    removeFromWishlist(book._id);
  };

  const toggleHeart = (bookId) => {
    setHeartClicked((prevState) => ({
      ...prevState,
      [bookId]: !prevState[bookId],
    }));
  };

  return (
    <Container maxWidth="md" className="container-typo">
      <h2>My Wishlist</h2>
      <div className="book-list">
        {wishlist.length === 0 ? (
          <Paper elevation={3} style={{ padding: '16px', textAlign: 'center' }}>
            Your wishlist is empty.
          </Paper>
        ) : (
          wishlist.map((book) => (
            <Paper key={book._id} elevation={3} style={{ width: '18rem', padding: '16px', marginBottom: '20px' }}>
              <Link to={`/books/${book._id}`} className="card-link">
                <img src={book.coverImage} alt={book.title} style={{ maxWidth: '100px' }} />
                <div className="card-body" style={{ minHeight: '180px' }}>
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text">Author: {book.author}</p>
                  <p className="card-text">₹{book.price}</p>
                </div>
              </Link>
              <div className="card-footer" style={{ marginTop: 'auto' }}>
                <IconButton
                  onClick={() => {
                    handleRemoveFromWishlist(book._id);
                    toggleHeart(book._id);
                  }}
                  color="error"
                >
                  {isHeartClicked[book._id] ? <Favorite style={{ color: 'error' }} /> : <Favorite />}
                </IconButton>
                <IconButton onClick={() => handleAddToCart(book)} color="primary">
                  <ShoppingCart />
                </IconButton>
              </div>
            </Paper>
          ))
        )}
      </div>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Button variant="outlined" color="primary">
          Back to Home
        </Button>
      </Link>
    </Container>
  );
};

export default Wishlist;
