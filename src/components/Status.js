// // // import React, { useState } from 'react';
// // // import { Link } from 'react-router-dom';
// // // import Button from '@mui/material/Button';
// // // import CircularProgress from '@mui/material/CircularProgress';
// // // import axios from 'axios';
// // // import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// // // import LocalShippingIcon from '@mui/icons-material/LocalShipping';
// // // import DoneIcon from '@mui/icons-material/Done';
// // // import { toast } from 'react-toastify';

// // // const OrderStatus = () => {
// // //   const [orderId, setOrderId] = useState('');
// // //   const [loading, setLoading] = useState(false);
// // //   const [orderData, setOrderData] = useState(null);
// // // const orderUserId = orderData.userId;
// // // console.log('User ID:', orderUserId);

// // //   const fetchOrderStatus = async () => {
// // //     if (orderId) {
// // //       setLoading(true);

// // //       try {
// // //         const orderDataResponse = await axios.get(`https://ebook-zopw.onrender.com/api/orders/${orderId}`);
// // //         setOrderData(orderDataResponse.data);
// // //         setLoading(false);
// // //         toast.success('Order status fetched successfully.');
// // //       } catch (error) {
// // //         console.error('Failed to fetch order status:', error);
// // //         setLoading(false);
// // //         toast.error('Failed to fetch order status. Please try again.');
// // //       }
// // //     }
// // //   };

// // //   return (
// // //     <div className="order-status-container">
// // //       <div className="status-box">
// // //         {orderData && (
// // //           <>
// // //             <div className={`status ${orderData.status === 'placed' ? 'blink' : ''}`}>
// // //               {orderData.status === 'placed' && (
// // //                 <>
// // //                   <CheckCircleIcon className="icon blinking-icon" fontSize="large" />
// // //                   <span className="status-text">Placed</span>
// // //                 </>
// // //               )}
// // //             </div>
// // //             <div className={`status ${orderData.status === 'shipped' ? 'blink' : ''}`}>
// // //               {orderData.status === 'shipped' && (
// // //                 <>
// // //                   <LocalShippingIcon className="icon blinking-icon" fontSize="large" />
// // //                   <span className="status-text">Shipped</span>
// // //                 </>
// // //               )}
// // //             </div>
// // //             <div className={`status ${orderData.status === 'delivered' ? 'blink' : ''}`}>
// // //               {orderData.status === 'delivered' && (
// // //                 <>
// // //                   <DoneIcon className="icon blinking-icon" fontSize="large" />
// // //                   <span className="status-text">Delivered</span>
// // //                 </>
// // //               )}
// // //             </div>
// // //           </>
// // //         )}
// // //       </div>
// // //       <div className="input-container">
// // //         <input
// // //           type="text"
// // //           placeholder="Order ID"
// // //           value={orderId}
// // //           onChange={(e) => setOrderId(e.target.value)}
// // //           className="order-input"
// // //         />
// // //         <Button
// // //           variant="contained"
// // //           color="primary"
// // //           onClick={fetchOrderStatus}
// // //           disabled={loading}
// // //           className="order-button"
// // //         >
// // //           Check Status
// // //         </Button>
// // //       </div>
// // //       {loading && <CircularProgress className="loading-spinner" />}

// // //       {orderData && (
// // //         <div className="order-details">
// // //           <h2 className="order-heading">Order Details</h2>
// // //           <p className="order-id">Order ID: {orderData._id}</p>
// // //           <p className="order-status">Status: {orderData.status}</p>
// // //           {orderData.books.map((book, index) => (
// // //             <div key={index} className="book-details">
// // //               <p className="book-title">Title: {book.title}</p>
// // //             </div>
// // //           ))}
// // //           <p className="total-price">Total Price: ₹{orderData.total}</p>
// // //           <Button component={Link} to="/" variant="contained" color="primary">
// // //           Back to Home
// // //         </Button>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default OrderStatus;



// // import React, { useState } from 'react';
// // import { Link } from 'react-router-dom';
// // import Button from '@mui/material/Button';
// // import CircularProgress from '@mui/material/CircularProgress';
// // import axios from 'axios';
// // import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from '@mui/lab';
// // import { toast } from 'react-toastify';
// // import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// // import LocalShippingIcon from '@mui/icons-material/LocalShipping';
// // import DoneIcon from '@mui/icons-material/Done';

// // const OrderStatus = () => {
// //   const { user } = useContext(UserContext);
// //   const { orderId } = useParams();
// //   const [loading, setLoading] = useState(false);
// //   const [orderData, setOrderData] = useState(null);
// //   const [feedback, setFeedback] = useState({ rating: 0, comments: '' });

// //   useEffect(() => {
// //     const fetchOrderStatus = async () => {
// //       setLoading(true);
// //       try {
// //         const orderDataResponse = await axios.get(`https://ebook-zopw.onrender.com/api/orders/${orderId}`);
// //         setOrderData(orderDataResponse.data);
// //         setLoading(false);
// //         if (orderDataResponse.data && orderDataResponse.data.userId) {
// //           console.log('User ID:', orderDataResponse.data.userId);
// //         }
// //         toast.success('Order status fetched successfully.');
// //       } catch (error) {
// //         console.error('Failed to fetch order status:', error);
// //         setLoading(false);
// //         toast.error('Failed to fetch order status. Please try again.');
// //       }
// //     };

// //     fetchOrderStatus();
// //   }, [orderId]);

// //   const submitFeedback = async () => {
// //     try {
// //       const response = await axios.post('/api/orders/add-feedback', {
// //         orderId,
// //         rating: feedback.rating,
// //         comments: feedback.comments,
// //         userId: user ? user.id : null, // Adjust accordingly based on your user object structure
// //       });

// //       // Handle success, update UI, or display a message to the user
// //       toast.success('Feedback submitted successfully.');
// //     } catch (error) {
// //       console.error('Error submitting feedback:', error);
// //       // Handle error and display an error message
// //       toast.error('Failed to submit feedback. Please try again.');
// //     }
// //   };



// //   return (
// //     <div className="order-status-container">
// //       <div className="input-container">
// //         <input
// //           type="text"
// //           placeholder="Order ID"
// //           value={orderId}
// //           onChange={(e) => setOrderId(e.target.value)}
// //           className="order-input"
// //         />
// //         <Button
// //           variant="contained"
// //           color="primary"
// //           onClick={fetchOrderStatus}
// //           disabled={loading}
// //           className="order-button"
// //         >
// //           Check Status
// //         </Button>
// //       </div>
// //       {loading && <CircularProgress className="loading-spinner" />}

// //       {orderData && (
// //         <div className="status-timeline">
// //           <Timeline align="left">
// //             <TimelineItem className={orderData.status === 'placed' ? 'blink' : ''}>
// //               <TimelineOppositeContent>
// //                 <div className="status-text-opposite">
// //                 {orderData.status === 'placed' && `Placed on ${new Date(orderData.createdAt).toLocaleString()}`}
// //                 </div>
// //               </TimelineOppositeContent>
// //               <TimelineSeparator>
// //                 <TimelineDot
// //                   color={orderData.status === 'placed' ? 'primary' : 'grey'}
// //                 >
// //                   <CheckCircleIcon fontSize="large" />
// //                 </TimelineDot>
// //                 <TimelineConnector />
// //               </TimelineSeparator>
// //               <TimelineContent>
// //                 <div className="status-text">Placed</div>
// //               </TimelineContent>
// //             </TimelineItem>

// //             <TimelineItem className={orderData.status === 'shipped' ? 'blink' : ''}>
// //               <TimelineOppositeContent>
// //                 <div className="status-text-opposite">
// //                 {`Shipped on ${new Date(orderData.shippedAt).toLocaleString()}`}
// //                 </div>
// //               </TimelineOppositeContent>
// //               <TimelineSeparator>
// //                 <TimelineDot
// //                   color={orderData.status === 'shipped' ? 'secondary' : 'grey'}
// //                 >
// //                   <LocalShippingIcon fontSize="large" />
// //                 </TimelineDot>
// //                 <TimelineConnector />
// //               </TimelineSeparator>
// //               <TimelineContent>
// //                 <div className="status-text">Shipped</div>
// //               </TimelineContent>
// //             </TimelineItem>

// //             <TimelineItem className={orderData.status === 'delivered' ? 'blink' : ''}>
// //               <TimelineOppositeContent>
// //                 <div className="status-text-opposite">
// //                 {`Delivered on ${new Date(orderData.deliveredAt).toLocaleString()}`}
// //                 </div>
// //               </TimelineOppositeContent>
// //               <TimelineSeparator>
// //                 <TimelineDot
// //                   color={orderData.status === 'delivered' ? 'success' : 'grey'}
// //                 >
// //                   <DoneIcon fontSize="large" />
// //                 </TimelineDot>
// //               </TimelineSeparator>
// //               <TimelineContent>
// //                 <div className="status-text">Delivered</div>
// //               </TimelineContent>
// //             </TimelineItem>
// //           </Timeline>
// //         </div>
// //       )}

// //       {orderData && (
// //         <div className="order-details">
// //           <h2 className="order-heading">Order Details</h2>
// //           <p className="order-id">Order ID: {orderData._id}</p>
// //           <p className="order-status">Status: {orderData.status}</p>
// //           {orderData.books.map((book, index) => (
// //             <div key={index} className="book-details">
// //               <p className="book-title">Title: {book.title}</p>
// //             </div>
// //           ))}
// //           <p className="total-price">Total Price: ₹{orderData.total}</p>
// //           <Button component={Link} to="/" variant="contained" color="primary">
// //             Back to Home
// //           </Button>
// //           <div className="feedback-form">
// //           <h3>Provide Feedback</h3>
// //           <div>
// //             <label>Rating:</label>
// //             <input
// //               type="number"
// //               min="1"
// //               max="5"
// //               value={feedback.rating}
// //               onChange={(e) => setFeedback({ ...feedback, rating: e.target.value })}
// //             />
// //           </div>
// //           <div>
// //             <label>Comments:</label>
// //             <textarea
// //               value={feedback.comments}
// //               onChange={(e) => setFeedback({ ...feedback, comments: e.target.value })}
// //             />
// //           </div>
// //           <Button variant="contained" color="primary" onClick={submitFeedback}>
// //             Submit Feedback
// //           </Button>
// //         </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default OrderStatus;






// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import FeedbackForm from './FeedbackForm';
// import Button from '@mui/material/Button';
// import CircularProgress from '@mui/material/CircularProgress';
// import axios from 'axios';
// import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from '@mui/lab';
// import { toast } from 'react-toastify';
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
//         const orderDataResponse = await axios.get(`https://ebook-zopw.onrender.com/api/orders/${orderId}`);
//         setOrderData(orderDataResponse.data);
//         setLoading(false);
//         toast.success('Order status fetched successfully.');
//       } catch (error) {
//         console.error('Failed to fetch order status:', error);
//         setLoading(false);
//         toast.error('Failed to fetch order status. Please try again.');
//       }
//     }
//   };

//   return (
//     <div className="order-status-container">
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
//         <div className="status-timeline">
//           <Timeline align="left">
//             <TimelineItem className={orderData.status === 'placed' ? 'blink' : ''}>
//               <TimelineOppositeContent>
//                 <div className="status-text-opposite">
//                 {orderData.status === 'placed' && `Placed on ${new Date(orderData.createdAt).toLocaleString()}`}
//                 </div>
//               </TimelineOppositeContent>
//               <TimelineSeparator>
//                 <TimelineDot
//                   color={orderData.status === 'placed' ? 'primary' : 'grey'}
//                 >
//                   <CheckCircleIcon fontSize="large" />
//                 </TimelineDot>
//                 <TimelineConnector />
//               </TimelineSeparator>
//               <TimelineContent>
//                 <div className="status-text">Placed</div>
//               </TimelineContent>
//             </TimelineItem>

//             <TimelineItem className={orderData.status === 'shipped' ? 'blink' : ''}>
//               <TimelineOppositeContent>
//                 <div className="status-text-opposite">
//                 {`Shipped on ${new Date(orderData.shippedAt).toLocaleString()}`}
//                 </div>
//               </TimelineOppositeContent>
//               <TimelineSeparator>
//                 <TimelineDot
//                   color={orderData.status === 'shipped' ? 'secondary' : 'grey'}
//                 >
//                   <LocalShippingIcon fontSize="large" />
//                 </TimelineDot>
//                 <TimelineConnector />
//               </TimelineSeparator>
//               <TimelineContent>
//                 <div className="status-text">Shipped</div>
//               </TimelineContent>
//             </TimelineItem>

//             <TimelineItem className={orderData.status === 'delivered' ? 'blink' : ''}>
//               <TimelineOppositeContent>
//                 <div className="status-text-opposite">
//                 {`Delivered on ${new Date(orderData.deliveredAt).toLocaleString()}`}
//                 </div>
//               </TimelineOppositeContent>
//               <TimelineSeparator>
//                 <TimelineDot
//                   color={orderData.status === 'delivered' ? 'success' : 'grey'}
//                 >
//                   <DoneIcon fontSize="large" />
//                 </TimelineDot>
//               </TimelineSeparator>
//               <TimelineContent>
//                 <div className="status-text">Delivered</div>
//               </TimelineContent>
//             </TimelineItem>
//           </Timeline>
//         </div>
//       )}

     

//       {orderData && (
//         <div className="order-details">
//           <h2 className="order-heading">Order Details</h2>
//           <p className="order-id">Order ID: {orderData._id}</p>
//           <p className="order-status">Status: {orderData.status}</p>
//           {orderData.books.map((book, index) => (
//             <div key={index} className="book-details">
//               <p className="book-title">Title: {book.title}</p>
//             </div>
//           ))}
//           <p className="total-price">Total Price: ₹{orderData.total}</p>
//           <h2>Leave Feedback</h2>
//           {orderData && orderData.status === 'delivered' && (
//             <div className="feedback-section">
//               <FeedbackForm orderId={orderData._id} />
//             </div>
//           )}

//           <Button component={Link} to="/" variant="contained" color="primary">
//             Back to Home
//           </Button>
//         </div>
      
//       )}
//     </div>
//   );
// };

// export default OrderStatus;






// OrderStatus.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FeedbackForm from './FeedbackForm';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from '@mui/lab';
import { toast } from 'react-toastify';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DoneIcon from '@mui/icons-material/Done';


const OrderStatus = () => {
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState(null);

  const fetchOrderStatus = async () => {
    if (orderId) {
      setLoading(true);

      try {
        const orderDataResponse = await axios.get(`https://ebook-zopw.onrender.com/api/orders/${orderId}`);
        setOrderData(orderDataResponse.data);
        setLoading(false);
        toast.success('Order status fetched successfully.');
      } catch (error) {
        console.error('Failed to fetch order status:', error);
        setLoading(false);
        toast.error('Failed to fetch order status. Please try again.');
      }
    }
  };

  return (
    <div className="order-status-container">
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
        <div className="status-timeline">
          <Timeline align="left">
          <TimelineItem className={orderData.status === 'placed' ? 'blink' : ''}>
                        <TimelineOppositeContent>
                          <div className="status-text-opposite">
                          {orderData.status === 'placed' && `Placed on ${new Date(orderData.createdAt).toLocaleString()}`}
                          </div>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                          <TimelineDot
                            color={orderData.status === 'placed' ? 'primary' : 'grey'}
                          >
                            <CheckCircleIcon fontSize="large" />
                          </TimelineDot>
                          <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                          <div className="status-text">Placed</div>
                        </TimelineContent>
                      </TimelineItem>
          <TimelineItem className={orderData.status === 'shipped' ? 'blink' : ''}>
          <TimelineOppositeContent>
            <div className="status-text-opposite">
              {`Shipped on ${new Date(orderData.shippedAt).toLocaleString()}`}
            </div>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot
              color={orderData.status === 'shipped' ? 'secondary' : 'grey'}
            >
              <LocalShippingIcon fontSize="large" />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <div className="status-text">Shipped</div>
          </TimelineContent>
        </TimelineItem>
        
        <TimelineItem className={orderData.status === 'delivered' ? 'blink' : ''}>
          <TimelineOppositeContent>
            <div className="status-text-opposite">
              {`Delivered on ${new Date(orderData.deliveredAt).toLocaleString()}`}
            </div>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot
              color={orderData.status === 'delivered' ? 'success' : 'grey'}
            >
              <DoneIcon fontSize="large" />
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent>
            <div className="status-text">Delivered</div>
          </TimelineContent>
        </TimelineItem>
          </Timeline>
        </div>
      )}

      {orderData && (
        <div className="order-details">
          <h2 className="order-heading">Order Details</h2>
          <p className="order-id">Order ID: {orderData._id}</p>
          <p className="order-status">Status: {orderData.status}</p>
          {orderData.books.map((book, index) => (
            <div key={index} className="book-details">
              <p className="book-title">Title: {book.title}</p>
            </div>
          ))}
          <p className="total-price">Total Price: ₹{orderData.total}</p>
          {orderData.books.map((book, index) => (
            <div key={index} className="order-id">
          <FeedbackForm orderId={orderData._id} bookId={book.bookId} />
            </div>
          ))}

          <Button component={Link} to="/" variant="contained" color="primary">
            Back to Home
          </Button>
        </div>
      )}
    </div>
  );
};

export default OrderStatus;
