// WishlistContext.js
import React, { createContext, useState, useContext } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (book) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.some((item) => item._id === book._id)) {
        return prevWishlist; // Book is already in the wishlist
      }
      return [...prevWishlist, book];
    });
  };

  const removeFromWishlist = (bookId) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item._id !== bookId));
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};