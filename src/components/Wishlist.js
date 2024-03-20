
// // // Wishlist.js

// // import React, { useEffect } from 'react';
// // import { Link } from 'react-router-dom';
// // import { useWishlist } from './WishlistContext';
// // import { useCart } from './CartContext';
// // import { Paper, Container, Button, IconButton } from '@mui/material';
// // import { ShoppingCart, Clear } from '@mui/icons-material';

// // const Wishlist = () => {
// //   const { wishlist, removeFromWishlist, loading, error } = useWishlist();
// //   const { addToCart } = useCart();

// //   useEffect(() => {
// //     if (loading) {
// //       console.log('Loading wishlist...');
// //     } else if (error) {
// //       console.error('Error fetching wishlist:', error);
// //     } else {
// //       console.log('Wishlist loaded:', wishlist);
// //     }
// //   }, [wishlist, loading, error]);

// //   const handleRemoveFromWishlist = (bookId) => {
// //     removeFromWishlist(bookId);
// //   };

// //   const handleAddToCart = (book) => {
// //     addToCart(book);
// //     removeFromWishlist(book._id);
// //   };

// //   return (
// //     <Container maxWidth="md" className="container-typo">
// //       <h2 className="my-wishlist">My Wishlist</h2>
// //       <div className="book-list" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
// //         {loading ? (
// //           <p>Loading...</p>
// //         ) : error ? (
// //           <p>Error: {error}</p>
// //         ) : wishlist.length === 0 ? (
          // <Paper elevation={3} style={{ padding: '16px', textAlign: 'center' }} className="empty">
          //   Your wishlist is empty.
          // </Paper>
// //         ) : (
// //           wishlist.map((book) => (
// //             <Paper
// //               key={book._id}
// //               elevation={4}
// //               style={{
// //                 flex: '0 0 33.33%',
// //                 margin: '20px',
// //                 padding: '48px',
// //                 display: 'flex',
// //                 flexDirection: 'column',
// //                 justifyContent: 'space-between',
// //                 position: 'relative',
// //               }}
// //             >
// //               <Link to={`/books/${book._id}`} className="card-link">
// //                 <div className="card-body" style={{ textAlign: 'center' }}>
// //                   <img src={book.coverImage} alt={book.title} style={{ maxWidth: '100px', margin: 'auto' }} />
// //                   <div style={{ marginTop: '10px' }}>
// //                     <h5 className="card-title" style={{ marginBottom: '5px' }}>
// //                       {book.title}
// //                     </h5>
// //                     <p className="card-text" style={{ marginBottom: '0' }}>
// //                       Author: {book.author}
// //                     </p>
// //                   </div>
// //                 </div>
// //               </Link>
// //               <div className="card-footer" style={{ position: 'absolute', top: '10px', right: '10px' }}>
// //                 <IconButton onClick={() => handleRemoveFromWishlist(book._id)} color="error">
// //                   <Clear />
// //                 </IconButton>
// //               </div>
// //               <div className="card-footer" style={{ textAlign: 'center' }}>
// //                 <IconButton onClick={() => handleAddToCart(book)} color="primary" style={{ margin: 'auto' }}>
// //                   <ShoppingCart />
// //                 </IconButton>
// //               </div>
// //             </Paper>
// //           ))
// //         )}
// //       </div>
// //       <Link to="/" style={{ textDecoration: 'none' }}>
// //         <Button variant="outlined" color="primary">
// //           Back to Home
// //         </Button>
// //       </Link>
// //     </Container>
// //   );
// // };

// // export default Wishlist;









// wishlist.js


import React from 'react';
import { useWishlist } from './WishlistContext';
import { useCart } from './CartContext';
import { IconButton, Typography, Card, CardContent, CardMedia, Box, Grid, Paper, Button } from '@mui/material';
import { Clear as ClearIcon, ShoppingCart as ShoppingCartIcon, Refresh as RefreshIcon } from '@mui/icons-material'; // Import the RefreshIcon
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (book) => {
    addToCart(book);
  };

  const handleRemoveFromWishlist = (bookId) => {
    removeFromWishlist(bookId); // Remove the book from the wishlist when clicked
  };

  const handleRefresh = () => {
    window.location.reload(); // Reload the page
  };

  return (
    <div>
      {wishlist.length > 0 && ( // Conditionally render the Refresh button
        <Button variant="outlined" color="primary" onClick={handleRefresh} style={{ marginTop: '20px', marginBottom: '20px', marginLeft: '30px' }}> {/* Add the Refresh button */}
          <RefreshIcon />
          Refresh
        </Button>
      )}
      {wishlist.length === 0 && (
        <Paper elevation={3} style={{ padding: '16px', textAlign: 'center' }} className="empty">
          Your wishlist is empty.
        </Paper>
      )}
      <Grid container spacing={2} sx={{ marginTop: '20px', gap: '0px' }}>
        {wishlist.map((book) => (
          <Grid item xs={12} sm={6} md={3} key={book._id}>
            <Card style={{ height: '100%', position: 'relative' }}>
              <Link to={`/books/${book._id}`} className="card-link">
                <CardMedia
                  component="img"
                  height="190"
                  image={book.coverImage} // Assuming each book object has a coverImage property
                  alt={book.title} // Assuming each book object has a title property
                  style={{ maxWidth: '120px', margin: 'auto' }}
                />
                <CardContent>
                  <Typography variant="h6">{book.title}</Typography>
                  <Typography variant="subtitle1" color="textSecondary">by {book.author}</Typography>
                </CardContent>
              </Link>
              <Box sx={{ position: 'absolute', top: '8px', right: '8px' }}>
                <IconButton aria-label="Remove from Wishlist" onClick={() => handleRemoveFromWishlist(book._id)}>
                  <ClearIcon color="error" />
                </IconButton>
              </Box>
              <Box sx={{ position: 'absolute', bottom: '8px', right: '8px' }}>
                <IconButton aria-label="Add to Cart" onClick={() => handleAddToCart(book)}>
                  <ShoppingCartIcon color="primary" />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Link to="/" style={{ textDecoration: 'none', display: 'block', textAlign: 'center', marginTop: '20px' }}> {/* Move the Back to Home button down */}
        <Button variant="outlined" color="primary">
          Back to Home
        </Button>
      </Link>
    </div>
  );
};

export default Wishlist;
