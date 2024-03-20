// // CartContext.js

// import React, { createContext, useState, useContext , useEffect} from 'react';
// import axios from 'axios';

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);


//   const addToCart = async (book) => {
//     try {
//       const { _id, title, price, quantity } = book; // Assuming book contains _id field
//       const response = await axios.post('https://ebook-backend-3czm.onrender.com/api/cart/add', {
//         bookId: _id, // Assuming _id is the bookId field
//         title,
//         price,
//         quantity,
//       });
    
//       setCart(prevCart => [...prevCart, response.data]);
//       console.log('Cart after adding:', cart);
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//     }
//   };


  
//   const removeFromCart = async (bookId) => {
//     try {
//       await axios.delete(`https://ebook-backend-3czm.onrender.com/api/cart/remove/${bookId}`);
//       console.log('Item removed from cart:', bookId);
//       setCart(prevCart => prevCart.filter(item => item._id !== bookId));
//       console.log('Cart after removal:', cart);
//     } catch (error) {
//       console.error('Error removing from cart:', error);
//     }
//   };


//   const updateQuantity = async (bookId, newQuantity) => {
//     try {
//       const response = await axios.put(`https://ebook-backend-3czm.onrender.com/api/cart/update/${bookId}`, { quantity: newQuantity });
//       const updatedCartItem = response.data;
//       setCart(prevCart => prevCart.map(item => 
//         item._id === bookId ? { ...item, quantity: updatedCartItem.quantity } : item
//       ));
//     } catch (error) {
//       console.error('Error updating quantity:', error);
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
//     }
//   };

//   const clearCart = () => {
//     setCart([]);
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













import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack'; // Import useSnackbar hook from notistack

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { enqueueSnackbar } = useSnackbar(); // Destructure enqueueSnackbar from useSnackbar



  const addToCart = async (book) => {
    try {
      const { _id, title, price, quantity } = book; // Assuming book contains _id field
      const existingCartItem = cart.find(item => item._id === _id);
      if (existingCartItem) {
        enqueueSnackbar('This item is already in your cart.', { variant: 'info' }); // Display info notification
        return;
      }
      const response = await axios.post('https://ebook-backend-3czm.onrender.com/api/cart/add', {
        bookId: _id, // Assuming _id is the bookId field
        title,
        price,
        quantity,
      });
      setCart(prevCart => [...prevCart, response.data]);
      enqueueSnackbar('Item added to cart successfully.', { variant: 'success' }); // Display success notification
      console.log('Cart after adding:', cart);
    } catch (error) {
      console.error('Error adding to cart:', error);
      enqueueSnackbar('Item is already in cart.', { variant: 'error' }); // Display error notification
    }
  };



  const removeFromCart = async (bookId) => {
    try {
      await axios.delete(`https://ebook-backend-3czm.onrender.com/api/cart/remove/${bookId}`);
      console.log('Item removed from cart:', bookId);
      setCart(prevCart => prevCart.filter(item => item._id !== bookId));
      enqueueSnackbar('Item removed from cart successfully.', { variant: 'success' }); // Display success notification
      console.log('Cart after removal:', cart);
    } catch (error) {
      console.error('Error removing from cart:', error);
      enqueueSnackbar('Failed to remove item from cart. Please try again.', { variant: 'error' }); // Display error notification
    }
  };



  const updateQuantity = async (bookId, newQuantity) => {
    try {
      const response = await axios.put(`https://ebook-backend-3czm.onrender.com/api/cart/update/${bookId}`, { quantity: newQuantity });
      const updatedCartItem = response.data;
      setCart(prevCart => prevCart.map(item =>
        item._id === bookId ? { ...item, quantity: updatedCartItem.quantity } : item
      ));
      enqueueSnackbar('Quantity updated successfully.', { variant: 'success' }); // Display success notification
    } catch (error) {
      console.error('Error updating quantity:', error);
      enqueueSnackbar('Failed to update quantity. Please try again.', { variant: 'error' }); // Display error notification
    }
  };

  

  const fetchCart = async () => {
    try {
      const response = await axios.get('https://ebook-backend-3czm.onrender.com/api/cart');
      console.log('Cart data fetched:', response.data);
      if (Array.isArray(response.data)) {
        setCart(response.data);
        console.log('Cart after fetching:', cart);
      } else {
        console.error('Invalid data format returned from server:', response.data);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      enqueueSnackbar('Failed to fetch cart data. Please try again.', { variant: 'error' }); // Display error notification
    }
  };

 

  const clearCart = async () => {
    try {
      // Clear the cart on the server-side
      await axios.delete('https://ebook-backend-3czm.onrender.com/api/cart/clear');
      // Clear the cart locally
      setCart([]);
      enqueueSnackbar('Cart cleared successfully.', { variant: 'success' }); // Display success notification
    } catch (error) {
      console.error('Error clearing cart:', error);
      enqueueSnackbar('Failed to clear cart. Please try again.', { variant: 'error' }); // Display error notification
    }
  };
  

  useEffect(() => {
    fetchCart();
  }, []); //eslint-disable-line

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
