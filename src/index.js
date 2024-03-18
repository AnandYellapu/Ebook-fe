// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import { CartProvider } from './components/CartContext';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//   <CartProvider>
//     <App />
//     </CartProvider>
//     <ToastContainer position="bottom-right" autoClose={5000} pauseOnHover={false} />
//   </React.StrictMode>
// );





import React from 'react';
import ReactDOM from 'react-dom';
import { SnackbarProvider } from 'notistack';
import './index.css';
import App from './App';
import { CartProvider } from './components/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
      <CartProvider>
        <App />
      </CartProvider>
    </SnackbarProvider>
  </React.StrictMode>
);
