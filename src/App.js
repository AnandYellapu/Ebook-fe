import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterForm from "./auth/RegisterForm";
import LoginForm from "./auth/LoginForm";
import Header from "./pages/Header";
import BookForm from "./components/BookForm";
import Home from "./pages/Home";
import BookDetails from "./components/BookDetails";
import ShoppingCart from "./components/ShoppingCart";
import { CartProvider } from "./components/CartContext";
import CheckOut from "./components/CheckOut";
import OrderStatusUpdater from "./components/OrderStatusUpdater";
import Footer from "./pages/Footer";
import Status from "./components/Status";

function App() {
  return (
    <BrowserRouter>
    <CartProvider>
    <Header/>
       <Routes>
           <Route path="/" element={<Home />} />
           <Route path='/register' element={<RegisterForm />} />
           <Route path='/login' element={<LoginForm />} />
           <Route path='/create-book' element={<BookForm />} />
           <Route path="/books/:id" element={<BookDetails />} />
           <Route path="/shopping-cart" element={<ShoppingCart />} />
           <Route path="/create" element={<CheckOut />} />
           <Route path="/update-status" element={<OrderStatusUpdater />} />
           <Route path="/status" element={<Status />} />
       </Routes>
       </CartProvider>
       <Footer />
    </BrowserRouter>
   
  );
}

export default App;
