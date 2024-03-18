
// Wishlist.js

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from './WishlistContext';
import { useCart } from './CartContext';
import { Paper, Container, Button, IconButton } from '@mui/material';
import { ShoppingCart, Clear } from '@mui/icons-material';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, loading, error } = useWishlist();
  const { addToCart } = useCart();

  useEffect(() => {
    if (loading) {
      console.log('Loading wishlist...');
    } else if (error) {
      console.error('Error fetching wishlist:', error);
    } else {
      console.log('Wishlist loaded:', wishlist);
    }
  }, [wishlist, loading, error]);

  const handleRemoveFromWishlist = (bookId) => {
    removeFromWishlist(bookId);
  };

  const handleAddToCart = (book) => {
    addToCart(book);
    removeFromWishlist(book._id);
  };

  return (
    <Container maxWidth="md" className="container-typo">
      <h2 className="my-wishlist">My Wishlist</h2>
      <div className="book-list" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : wishlist.length === 0 ? (
          <Paper elevation={3} style={{ padding: '16px', textAlign: 'center' }} className="empty">
            Your wishlist is empty.
          </Paper>
        ) : (
          wishlist.map((book) => (
            <Paper
              key={book._id}
              elevation={4}
              style={{
                flex: '0 0 33.33%',
                margin: '20px',
                padding: '48px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
              }}
            >
              <Link to={`/books/${book._id}`} className="card-link">
                <div className="card-body" style={{ textAlign: 'center' }}>
                  <img src={book.coverImage} alt={book.title} style={{ maxWidth: '100px', margin: 'auto' }} />
                  <div style={{ marginTop: '10px' }}>
                    <h5 className="card-title" style={{ marginBottom: '5px' }}>
                      {book.title}
                    </h5>
                    <p className="card-text" style={{ marginBottom: '0' }}>
                      Author: {book.author}
                    </p>
                  </div>
                </div>
              </Link>
              <div className="card-footer" style={{ position: 'absolute', top: '10px', right: '10px' }}>
                <IconButton onClick={() => handleRemoveFromWishlist(book._id)} color="error">
                  <Clear />
                </IconButton>
              </div>
              <div className="card-footer" style={{ textAlign: 'center' }}>
                <IconButton onClick={() => handleAddToCart(book)} color="primary" style={{ margin: 'auto' }}>
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
