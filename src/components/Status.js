// import React, { useState, useEffect } from 'react';
// import Button from '@mui/material/Button';
// import CircularProgress from '@mui/material/CircularProgress';
// import axios from 'axios';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import LocalShippingIcon from '@mui/icons-material/LocalShipping';
// import DoneIcon from '@mui/icons-material/Done';

// const OrderStatus = () => {
//   const [orderId, setOrderId] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [orderData, setOrderData] = useState(null);

//   const fetchOrderStatus = async () => {
//     if (orderId) {
//       setLoading(true);

//       try {
//         const response = await axios.get(`http://localhost:1113/api/orders/${orderId}`);
//         setOrderData(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Failed to fetch order status:', error);
//         setLoading(false);
//       }
//     }
//   };

//   useEffect(() => {
//     // fetchOrderStatus();
//   }, [orderId]);

//   return (
//     <div className="order-status-container">
//       <div className="status-box">
//         {orderData && (
//           <>
//             <div className={`status ${orderData.status === 'placed' ? 'blink' : ''}`}>
//               {orderData.status === 'placed' && (
//                 <>
//                   <CheckCircleIcon className="icon blinking-icon" fontSize="large" />
//                   <span className="status-text">Placed</span>
//                 </>
//               )}
//             </div>
//             <div className={`status ${orderData.status === 'shipped' ? 'blink' : ''}`}>
//               {orderData.status === 'shipped' && (
//                 <>
//                   <LocalShippingIcon className="icon blinking-icon" fontSize="large" />
//                   <span className="status-text">Shipped</span>
//                 </>
//               )}
//             </div>
//             <div className={`status ${orderData.status === 'delivered' ? 'blink' : ''}`}>
//               {orderData.status === 'delivered' && (
//                 <>
//                   <DoneIcon className="icon blinking-icon" fontSize="large" />
//                   <span className="status-text">Delivered</span>
//                 </>
//               )}
//             </div>
//           </>
//         )}
//       </div>
//       <div className="input-container">
//         <input
//           type="text"
//           placeholder="Order ID"
//           value={orderId}
//           onChange={(e) => setOrderId(e.target.value)}
//           className="order-input"
//         />
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={fetchOrderStatus}
//           disabled={loading}
//           className="order-button"
//         >
//           Check Status
//         </Button>
//       </div>
//       {loading && <CircularProgress className="loading-spinner" />}

//       {orderData && (
//         <div className="order-details">
//           <h2 className="order-heading">Order Details</h2>
//           <p className="order-id">Order ID: {orderData.orderId}</p>
//           <p className="order-status">Status: {orderData.status}</p>
//           {orderData.books.map((book, index) => (
//             <div key={index} className="book-details">
//               <p className="book-title">Title: {book.title}</p>
//               <p className="total-price">Total Price: ₹{orderData.total}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderStatus;





// import React, { useState } from 'react';
// import Button from '@mui/material/Button';
// import CircularProgress from '@mui/material/CircularProgress';
// import axios from 'axios';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import LocalShippingIcon from '@mui/icons-material/LocalShipping';
// import DoneIcon from '@mui/icons-material/Done';

// const OrderStatus = () => {
//   const [orderId, setOrderId] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [orderData, setOrderData] = useState(null);
//   const [review, setReview] = useState('');
//   const [rating, setRating] = useState(0);


//   const fetchOrderStatus = async () => {
//   if (orderId) {
//     setLoading(true);

//     try {
//       const orderDataResponse = await axios.get(`http://localhost:1113/api/orders/${orderId}`);
//       setOrderData(orderDataResponse.data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Failed to fetch order status:', error);
//       setLoading(false);
//     }
//   }
// };


//   const submitReview = async () => {
//     if (orderId && review && rating >= 1 && rating <= 5) {
//       try {
//         const response = await axios.post(`http://localhost:1113/api/orders/${orderId}/review`, {
//           review,
//           rating,
//         });
//           setReview(response.data);
//         setLoading(false);
//         // Optionally, you can handle the response or update the UI.
//       } catch (error) {
//         console.error('Failed to submit review:', error);
//       }
//     }
//   };

//   return (
//     <div className="order-status-container">
//       <div className="status-box">
//         {orderData && (
//           <>
//             <div className={`status ${orderData.status === 'placed' ? 'blink' : ''}`}>
//               {orderData.status === 'placed' && (
//                 <>
//                   <CheckCircleIcon className="icon blinking-icon" fontSize="large" />
//                   <span className="status-text">Placed</span>
//                 </>
//               )}
//             </div>
//             <div className={`status ${orderData.status === 'shipped' ? 'blink' : ''}`}>
//               {orderData.status === 'shipped' && (
//                 <>
//                   <LocalShippingIcon className="icon blinking-icon" fontSize="large" />
//                   <span className="status-text">Shipped</span>
//                 </>
//               )}
//             </div>
//             <div className={`status ${orderData.status === 'delivered' ? 'blink' : ''}`}>
//               {orderData.status === 'delivered' && (
//                 <>
//                   <DoneIcon className="icon blinking-icon" fontSize="large" />
//                   <span className="status-text">Delivered</span>
//                 </>
//               )}
//             </div>
//           </>
//         )}
//       </div>
//       <div className="input-container">
//         <input
//           type="text"
//           placeholder="Order ID"
//           value={orderId}
//           onChange={(e) => setOrderId(e.target.value)}
//           className="order-input"
//         />
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={fetchOrderStatus}
//           disabled={loading}
//           className="order-button"
//         >
//           Check Status
//         </Button>
//       </div>
//       {loading && <CircularProgress className="loading-spinner" />}

//       {orderData && (
//   <div className="order-details">
//     <h2 className="order-heading">Order Details</h2>
//     <p className="order-id">Order ID: {orderData.orderId}</p>
//     <p className="order-status">Status: {orderData.status}</p>
//     {orderData.books.map((book, index) => (
//       <div key={index} className="book-details">
//         <p className="book-title">Title: {book.title}</p>
//         <p className="total-price">Total Price: ₹{orderData.total}</p> {/* Fixed this line */}
//       </div>
//     ))}
//     <input
//       type="text"
//       placeholder="Write a review"
//       value={review}
//       onChange={(e) => setReview(e.target.value)}
//       className="review-input"
//     />
//     <input
//       type="number"
//       placeholder="Rating (1-5)"
//       value={rating}
//       onChange={(e) => setRating(e.target.value)}
//       className="rating-input"
//     />
//     <Button
//       variant="contained"
//       color="primary"
//       onClick={submitReview}
//       disabled={loading}
//       className="review-button"
//     >
//       Submit Review
//     </Button>
//   </div>
// )}
//     </div>
//   );
// };

// export default OrderStatus;





import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DoneIcon from '@mui/icons-material/Done';

const OrderStatus = () => {
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);

  const fetchOrderStatus = async () => {
    if (orderId) {
      setLoading(true);

      try {
        const orderDataResponse = await axios.get(`http://localhost:1113/api/orders/${orderId}`);
        setOrderData(orderDataResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch order status:', error);
        setLoading(false);
      }
    }
  };

  const submitReview = async () => {
    if (orderId && review && rating >= 1 && rating <= 5) {
      try {
        const response = await axios.post(`http://localhost:1113/api/orders/reviews/${orderId}/review`, {
          orderId,
          review,
          rating,
        });
        setReview(response.data);
        setLoading(false);
        // Optionally, you can handle the response or update the UI.
      } catch (error) {
        console.error('Failed to submit review:', error);
      }
    }
  };

  return (
    <div className="order-status-container">
      <div className="status-box">
        {orderData && (
          <>
            <div className={`status ${orderData.status === 'placed' ? 'blink' : ''}`}>
              {orderData.status === 'placed' && (
                <>
                  <CheckCircleIcon className="icon blinking-icon" fontSize="large" />
                  <span className="status-text">Placed</span>
                </>
              )}
            </div>
            <div className={`status ${orderData.status === 'shipped' ? 'blink' : ''}`}>
              {orderData.status === 'shipped' && (
                <>
                  <LocalShippingIcon className="icon blinking-icon" fontSize="large" />
                  <span className="status-text">Shipped</span>
                </>
              )}
            </div>
            <div className={`status ${orderData.status === 'delivered' ? 'blink' : ''}`}>
              {orderData.status === 'delivered' && (
                <>
                  <DoneIcon className="icon blinking-icon" fontSize="large" />
                  <span className="status-text">Delivered</span>
                </>
              )}
            </div>
          </>
        )}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="order-input"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={fetchOrderStatus}
          disabled={loading}
          className="order-button"
        >
          Check Status
        </Button>
      </div>
      {loading && <CircularProgress className="loading-spinner" />}

      {orderData && (
        <div className="order-details">
          <h2 className="order-heading">Order Details</h2>
          <p className="order-id">Order ID: {orderData.orderId}</p>
          <p className="order-status">Status: {orderData.status}</p>
          {orderData.books.map((book, index) => (
            <div key={index} className="book-details">
              <p className="book-title">Title: {book.title}</p>
            </div>
          ))}
          <p className="total-price">Total Price: ₹{orderData.total}</p>
          {orderData.status === 'delivered' && (
            <div className="review-container">
              <input
                type="text"
                placeholder="Write a review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="review-input"
              />
              <input
                type="number"
                placeholder="Rating (1-5)"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="rating-input"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={submitReview}
                disabled={loading}
                className="review-button"
              >
                Submit Review
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderStatus;
