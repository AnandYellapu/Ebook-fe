import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterForm from "./auth/RegisterForm";
import LoginForm from "./auth/LoginForm";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import Header from "./pages/Header";
import BookForm from "./components/BookForm";
import Home from "./pages/Home";
import BookDetails from "./components/BookDetails";
import ShoppingCart from "./components/ShoppingCart";
import { CartProvider } from "./components/CartContext";
import CheckOut from "./components/CheckOut";
// import Footer from "./pages/Footer";
import Status from "./components/Status";
import Profile from "./auth/Profile";
import AllOrders from "./components/AllOrders";
import UserOrders from "./components/UserOrders";
import { WishlistProvider } from "./components/WishlistContext";
import Wishlist from "./components/Wishlist";
import Dashboard  from "./components/Dashboard";






function App() {
  return (
    <BrowserRouter>
    <CartProvider>
    <WishlistProvider>
    <Header/>
       <Routes>
       
           <Route path="/" element={<Home />} />
           <Route path='/register' element={<RegisterForm />} />
           <Route path='/login' element={<LoginForm />} />
           <Route path='/forgot-password' element={<ForgotPassword />} />
           <Route path='/reset-password/:token' element={<ResetPassword />} />
           <Route path='/create-book' element={<BookForm />} />
           <Route path="/books/:id" element={<BookDetails />} />
           <Route path="/shopping-cart" element={<ShoppingCart />} />
           <Route path="/place-order" element={<CheckOut />} />
           <Route path="/status" element={<Status />} />
           <Route path="/profile" element={<Profile />} />
           <Route path="/all-orders" element={<AllOrders />} />
           <Route path="/user-orders/:userId" element={<UserOrders />} />
           <Route path="/wish-list" element={<Wishlist />} />
           <Route path="/dashboard" element={<Dashboard />} />
          

       </Routes>
       </WishlistProvider>
       </CartProvider>
    </BrowserRouter>
   
  );
}

export default App;
