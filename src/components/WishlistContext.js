// // import React, { createContext, useState, useContext, useEffect } from 'react';
// // import axios from 'axios';
// // import { useSnackbar } from 'notistack';

// // const WishlistContext = createContext();

// // export const WishlistProvider = ({ children }) => {
// //   const [wishlist, setWishlist] = useState([]);
// //   const [error, setError] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const { enqueueSnackbar } = useSnackbar(); // Destructure enqueueSnackbar from useSnackbar

// //   const authToken = sessionStorage.getItem('authToken');
// //   const userId = sessionStorage.getItem('userId');

// //   const axiosInstance = axios.create({
// //     baseURL: 'https://ebook-backend-3czm.onrender.com/api',
// //     headers: {
// //       Authorization: authToken ? `Bearer ${authToken}` : ''
// //     }
// //   });

// //   useEffect(() => {
// //     const fetchWishlist = async () => {
// //       setLoading(true);
// //       try {
// //         if (authToken && userId) {
// //           const response = await axiosInstance.get(`/wishlists/get/${userId}`);
// //           setWishlist(response.data.books);
// //         }
// //       } catch (error) {
// //         setError(error.message);
// //         enqueueSnackbar('Error fetching wishlist', { variant: 'error' }); // Display error notification
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchWishlist();

// //     return () => {
// //       // Cleanup function if needed
// //     };
// //   }, [authToken, userId, enqueueSnackbar]);   //eslint-disable-line


  
// //   const addToWishlist = async (bookId) => {
// //     setLoading(true);
// //     try {
// //       const response = await axiosInstance.post('/wishlists/add', { userId, bookId });
// //       setWishlist(response.data.books);
// //       enqueueSnackbar('Book added to wishlist', { variant: 'success' }); // Display success notification
// //     } catch (error) {
// //       setError(error.message);
// //       enqueueSnackbar('Error adding to wishlist', { variant: 'error' }); // Display error notification
// //     } finally {
// //       setLoading(false);
// //     }
// //   };



// //   const removeFromWishlist = async (bookId) => {
// //     setLoading(true);
// //     try {
// //       const response = await axiosInstance.delete(`/wishlists/remove/${userId}/${bookId}`);
// //       setWishlist(response.data.books);
// //       enqueueSnackbar('Book removed from wishlist', { variant: 'success' }); // Display success notification
// //     } catch (error) {
// //       setError(error.message);
// //       enqueueSnackbar('Error removing from wishlist', { variant: 'error' }); // Display error notification
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, error, loading }}>
// //       {children}
// //     </WishlistContext.Provider>
// //   );
// // };

// // export const useWishlist = () => {
// //   const context = useContext(WishlistContext);
// //   if (!context) {
// //     throw new Error('useWishlist must be used within a WishlistProvider');
// //   }
// //   return context;
// // };












// WishlistContext.js


import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar(); // Destructure enqueueSnackbar from useSnackbar

  const authToken = sessionStorage.getItem('authToken');
  const userId = sessionStorage.getItem('userId');

  const axiosInstance = axios.create({
    baseURL: 'https://ebook-backend-3czm.onrender.com/api',
    headers: {
      Authorization: authToken ? `Bearer ${authToken}` : ''
    }
  });

  useEffect(() => {
    // console.log("Fetching wishlist...");
    setLoading(true);
    try {
      if (authToken && userId) {
        axiosInstance.get(`/wishlists/get/${userId}`)
          .then(response => {
            // console.log("Wishlist data received:", response.data.books);
            setWishlist(response.data.books);
          });
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error.message);
      setError(error.message);
      enqueueSnackbar('Error fetching wishlist', { variant: 'error' }); // Display error notification
    } finally {
      setLoading(false);
    }
  }, [authToken, userId, enqueueSnackbar]);   //eslint-disable-line

  const addToWishlist = async (bookId) => {
    // console.log("Adding book to wishlist...");
    setLoading(true);
    try {
      const response = await axiosInstance.post('/wishlists/add', { userId, bookId });
      // console.log("Book added to wishlist:", response.data.books);
      setWishlist(response.data.books);
      enqueueSnackbar('Book added to wishlist', { variant: 'success' }); // Display success notification
    } catch (error) {
      console.error("Error adding to wishlist:", error.message);
      setError(error.message);
      enqueueSnackbar('Error adding to wishlist', { variant: 'error' }); // Display error notification
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (bookId) => {
    // console.log("Removing book from wishlist...");
    setLoading(true);
    try {
      const response = await axiosInstance.delete(`/wishlists/remove/${userId}/${bookId}`);
      // console.log("Book removed from wishlist:", response.data.books);
      setWishlist(response.data.books);
      enqueueSnackbar('Book removed from wishlist', { variant: 'success' }); // Display success notification
    } catch (error) {
      console.error("Error removing from wishlist:", error.message);
      setError(error.message);
      enqueueSnackbar('Error removing from wishlist', { variant: 'error' }); // Display error notification
    } finally {
      setLoading(false);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, error, loading }}>
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