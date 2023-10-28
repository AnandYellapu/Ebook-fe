// CartContext.js
import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (book) => {
    const updatedCart = [...cart, { ...book, quantity: 1 }];
    setCart(updatedCart);
  };

  const removeFromCart = (bookId) => {
    const updatedCart = cart.filter((item) => item._id !== bookId);
    setCart(updatedCart);
  };

  const updateQuantity = (bookId, newQuantity) => {
    const updatedCart = cart.map((item) => {
      if (item._id === bookId) {
        return { ...item, quantity: Math.max(1, item.quantity + newQuantity) };
      }
      return item;
    });
    setCart(updatedCart);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity , setCart}}>
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
