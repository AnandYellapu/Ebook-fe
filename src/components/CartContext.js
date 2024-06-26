// import React, { createContext, useState, useContext, useEffect } from 'react';
// import axios from 'axios';
// import { useSnackbar } from 'notistack'; // Import useSnackbar hook from notistack

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);
//   const { enqueueSnackbar } = useSnackbar(); // Destructure enqueueSnackbar from useSnackbar



//   const addToCart = async (book) => {
//     try {
//       const { _id, title, price, quantity } = book; // Assuming book contains _id field
//       const existingCartItem = cart.find(item => item._id === _id);
//       if (existingCartItem) {
//         enqueueSnackbar('This item is already in your cart.', { variant: 'info' }); // Display info notification
//         return;
//       }
//       const response = await axios.post('https://ebook-backend-3czm.onrender.com/api/cart/add', {
//         bookId: _id, // Assuming _id is the bookId field
//         title,
//         price,
//         quantity,
//       });
//       setCart(prevCart => [...prevCart, response.data]);
//       enqueueSnackbar('Item added to cart successfully.', { variant: 'success' }); // Display success notification
//       console.log('Cart after adding:', cart);
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//       enqueueSnackbar('Item is already in cart.', { variant: 'error' }); // Display error notification
//     }
//   };



//   const removeFromCart = async (bookId) => {
//     try {
//       await axios.delete(`https://ebook-backend-3czm.onrender.com/api/cart/remove/${bookId}`);
//       console.log('Item removed from cart:', bookId);
//       setCart(prevCart => prevCart.filter(item => item._id !== bookId));
//       enqueueSnackbar('Item removed from cart successfully.', { variant: 'success' }); // Display success notification
//       console.log('Cart after removal:', cart);
//     } catch (error) {
//       console.error('Error removing from cart:', error);
//       enqueueSnackbar('Failed to remove item from cart. Please try again.', { variant: 'error' }); // Display error notification
//     }
//   };



//   const updateQuantity = async (bookId, newQuantity) => {
//     try {
//       const response = await axios.put(`https://ebook-backend-3czm.onrender.com/api/cart/update/${bookId}`, { quantity: newQuantity });
//       const updatedCartItem = response.data;
//       setCart(prevCart => prevCart.map(item =>
//         item._id === bookId ? { ...item, quantity: updatedCartItem.quantity } : item
//       ));
//       enqueueSnackbar('Quantity updated successfully.', { variant: 'success' }); // Display success notification
//     } catch (error) {
//       console.error('Error updating quantity:', error);
//       enqueueSnackbar('Failed to update quantity. Please try again.', { variant: 'error' }); // Display error notification
//     }
//   };

  

//   const fetchCart = async () => {
//     try {
//       const response = await axios.get('https://ebook-backend-3czm.onrender.com/api/cart');
//       console.log('Cart data fetched:', response.data);
//       if (Array.isArray(response.data)) {
//         setCart(response.data);
//         console.log('Cart after fetching:', cart);
//       } else {
//         console.error('Invalid data format returned from server:', response.data);
//       }
//     } catch (error) {
//       console.error('Error fetching cart:', error);
//       enqueueSnackbar('Failed to fetch cart data. Please try again.', { variant: 'error' }); // Display error notification
//     }
//   };

 

//   const clearCart = async () => {
//     try {
//       // Clear the cart on the server-side
//       await axios.delete('https://ebook-backend-3czm.onrender.com/api/cart/clear');
//       // Clear the cart locally
//       setCart([]);
//       enqueueSnackbar('Cart cleared successfully.', { variant: 'success' }); // Display success notification
//     } catch (error) {
//       console.error('Error clearing cart:', error);
//       enqueueSnackbar('Failed to clear cart. Please try again.', { variant: 'error' }); // Display error notification
//     }
//   };
  

//   useEffect(() => {
//     fetchCart();
//   }, []); //eslint-disable-line

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// };











// CartContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack'; // Import useSnackbar hook from notistack

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { enqueueSnackbar } = useSnackbar(); // Destructure enqueueSnackbar from useSnackbar
  const authToken = sessionStorage.getItem('authToken');
  const userId = sessionStorage.getItem('userId');

  // Fetch cart items for the current user
  const fetchCart = async () => {
    try {
      const response = await axios.get(`https://ebook-backend-3czm.onrender.com/api/cart/${userId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      if (Array.isArray(response.data)) {
        setCart(response.data);
      } else {
        console.error('Invalid data format returned from server:', response.data);
      }
    } catch (error) {

    }
  };

  useEffect(() => {
    // Fetch cart items when the component mounts
    fetchCart();
  }, []); //eslint-disable-line

 


  const addToCart = async (book) => {
    try {
      const { _id, title, price, quantity } = book;
  
      // Check if the item already exists in the cart
      const existingCartItem = cart.find(item => item._id === _id);
      if (existingCartItem) {
        // If the item already exists, show an error message
        enqueueSnackbar('This item is already in your cart.', { variant: 'info' });
        return;
      }
  
      // If the item does not exist, add it to the cart
      const response = await axios.post(`https://ebook-backend-3czm.onrender.com/api/cart/add/${userId}`, {
        bookId: _id,
        title,
        price,
        quantity,
      }, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      setCart(prevCart => [...prevCart, response.data]);
      enqueueSnackbar('Item added to cart successfully.', { variant: 'success' });
    } catch (error) {
      console.error('Error adding to cart:', error);
      enqueueSnackbar('Item is already in cart', { variant: 'error' });
    }
  };
  


  const removeFromCart = async (bookId) => {
    try {
      await axios.delete(`https://ebook-backend-3czm.onrender.com/api/cart/remove/${userId}/${bookId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      setCart(prevCart => prevCart.filter(item => item._id !== bookId));
      enqueueSnackbar('Item removed from cart successfully.', { variant: 'success' });
    } catch (error) {
      console.error('Error removing from cart:', error);
      enqueueSnackbar('Failed to remove item from cart. Please try again.', { variant: 'error' });
    }
  };

  const updateQuantity = async (bookId, newQuantity) => {
    try {
      const response = await axios.put(`https://ebook-backend-3czm.onrender.com/api/cart/update/${userId}/${bookId}`, { quantity: newQuantity }, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      const updatedCartItem = response.data;
      setCart(prevCart => prevCart.map(item =>
        item._id === bookId ? { ...item, quantity: updatedCartItem.quantity } : item
      ));
      // enqueueSnackbar('Quantity updated successfully.', { variant: 'success' });
    } catch (error) {
      console.error('Error updating quantity:', error);
      enqueueSnackbar('Failed to update quantity. Please try again.', { variant: 'error' });
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete(`https://ebook-backend-3czm.onrender.com/api/cart/clear/${userId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      setCart([]);
      enqueueSnackbar('Cart cleared successfully.', { variant: 'success' });
    } catch (error) {
      console.error('Error clearing cart:', error);
      enqueueSnackbar('Failed to clear cart. Please try again.', { variant: 'error' });
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
