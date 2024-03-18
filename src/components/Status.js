// // // import React, { useState, useEffect } from 'react';
// // // import { Link } from 'react-router-dom';
// // // import FeedbackForm from './FeedbackForm';
// // // import Button from '@mui/material/Button';
// // // import CircularProgress from '@mui/material/CircularProgress';
// // // import axios from 'axios';
// // // import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from '@mui/lab';
// // // import { toast } from 'react-toastify';
// // // import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// // // import LocalShippingIcon from '@mui/icons-material/LocalShipping';
// // // import DoneIcon from '@mui/icons-material/Done';

// // // const OrderStatus = () => {
// // //   const [orderId, setOrderId] = useState('');
// // //   const [loading, setLoading] = useState(false);
// // //   const [orderData, setOrderData] = useState(null);

// // //   useEffect(() => {
// // //     const fetchOrderStatus = async () => {
// // //       if (orderId) {
// // //         setLoading(true);

// // //         try {
// // //           const orderDataResponse = await axios.get(`https://ebook-zopw.onrender.com/api/orders/${orderId}`);
// // //           setOrderData(orderDataResponse.data);
// // //           setLoading(false);
// // //           toast.success('Order status fetched successfully.');
// // //         } catch (error) {
// // //           console.error('Failed to fetch order status:', error);
// // //           setLoading(false);
// // //           toast.error('Failed to fetch order status. Please try again.');
// // //         }
// // //       }
// // //     };

// // //     fetchOrderStatus();
// // //   }, [orderId]);

// // //   const feedbackSubmitted = orderData && orderData.status === 'delivered' && orderData.feedbackSubmitted;

// // //   return (
// // //     <div className="order-status-container">
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
// // //           disabled={loading}
// // //           className="order-button"
// // //         >
// // //           Check Status
// // //         </Button>
// // //       </div>
// // //       {loading && <CircularProgress className="loading-spinner" />}

// // //       {orderData && (
// // //         <div className="status-timeline" style={{ maxheight: '100px'}}>
// // //         <Timeline align="left">
// // //           <TimelineItem className={orderData.status === 'placed' ? 'blink' : ''}>
// // //             <TimelineOppositeContent>
// // //               {orderData.status === 'placed' && (
// // //                 <div className="status-text-opposite">
// // //                   <p>Placed on {new Date(orderData.createdAt).toLocaleString()}</p>
// // //                 </div>
// // //               )}
// // //             </TimelineOppositeContent>
// // //             <TimelineSeparator>
// // //               <TimelineDot
// // //                 color={orderData.status === 'placed' ? 'primary' : 'grey'}
// // //               >
// // //                 <CheckCircleIcon fontSize="large" />
// // //               </TimelineDot>
// // //               <TimelineConnector />
// // //             </TimelineSeparator>
// // //             <TimelineContent>
// // //               <div className="status-text">Placed</div>
// // //             </TimelineContent>
// // //           </TimelineItem>
        
// // //           <TimelineItem className={orderData.status === 'shipped' ? 'blink' : ''}>
// // //             <TimelineOppositeContent>
// // //               {orderData.status === 'shipped' && (
// // //                 <div className="status-text-opposite">
// // //                   <p>Shipped on {new Date(orderData.shippedAt).toLocaleString()}</p>
// // //                 </div>
// // //               )}
// // //             </TimelineOppositeContent>
// // //             <TimelineSeparator>
// // //               <TimelineDot
// // //                 color={orderData.status === 'shipped' ? 'secondary' : 'grey'}
// // //               >
// // //                 <LocalShippingIcon fontSize="large" />
// // //               </TimelineDot>
// // //               <TimelineConnector />
// // //             </TimelineSeparator>
// // //             <TimelineContent>
// // //               <div className="status-text">Shipped</div>
// // //             </TimelineContent>
// // //           </TimelineItem>
        
// // //           <TimelineItem className={orderData.status === 'delivered' ? 'blink' : ''}>
// // //             <TimelineOppositeContent>
// // //               {orderData.status === 'delivered' && (
// // //                 <div className="status-text-opposite">
// // //                   <p>Delivered on {new Date(orderData.deliveredAt).toLocaleString()}</p>
// // //                 </div>
// // //               )}
// // //             </TimelineOppositeContent>
// // //             <TimelineSeparator>
// // //               <TimelineDot
// // //                 color={orderData.status === 'delivered' ? 'success' : 'grey'}
// // //               >
// // //                 <DoneIcon fontSize="large" />
// // //               </TimelineDot>
// // //             </TimelineSeparator>
// // //             <TimelineContent>
// // //               <div className="status-text">Delivered</div>
// // //             </TimelineContent>
// // //           </TimelineItem>
// // //         </Timeline>
        
// // //         </div>
// // //       )}

// // //       {orderData && (
// // //         <div className="order-details">
// // //           <h2 className="order-heading">Order Details</h2>
// // //           <p className="order-id">Order ID: {orderData._id}</p>
// // //           <p className="order-status">Status: {orderData.status}</p>
// // //           {orderData.books.map((book, index) => (
// // //             <div key={index} className="order-id">
// // //               <div key={index} className="book-details">
// // //                 <p className="book-title">Title: {book.title}</p>
// // //               </div>
// // //               {orderData.status === 'delivered' && !feedbackSubmitted && (
// // //                 <FeedbackForm orderId={orderData._id} bookId={book.bookId} />
// // //               )}
// // //             </div>
// // //           ))}

// // //           <Button component={Link} to="/" variant="contained" color="primary">
// // //             Back to Home
// // //           </Button>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default OrderStatus;






import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FeedbackForm from './FeedbackForm';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DoneIcon from '@mui/icons-material/Done';
import { useSnackbar } from 'notistack'; // Import useSnackbar hook from notistack

const steps = [
  { label: 'Placed', icon: <CheckCircleIcon fontSize="large" style={{ color: '#1976D2' }} />, key: 'createdAt' },
  { label: 'Shipped', icon: <LocalShippingIcon fontSize="large" style={{ color: '#FFA000' }} />, key: 'shippedAt' },
  { label: 'Delivered', icon: <DoneIcon fontSize="large" style={{ color: '#4CAF50' }} />, key: 'deliveredAt' },
];

const OrderStatus = () => {
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const { enqueueSnackbar } = useSnackbar(); // Destructure enqueueSnackbar from useSnackbar

  const fetchOrderStatus = async () => {
    if (orderId) {
      setLoading(true);

      try {
        const orderDataResponse = await axios.get(`https://ebook-zopw.onrender.com/api/orders/${orderId}`);
        setOrderData(orderDataResponse.data);
        setLoading(false);
        enqueueSnackbar('Order status fetched successfully.', { variant: 'success' }); // Display success notification
      } catch (error) {
        setLoading(false);
        enqueueSnackbar('Failed to fetch order status. Please try again.', { variant: 'error' }); // Display error notification
      }
    }
  };

  useEffect(() => {
    fetchOrderStatus();
  }, [orderId]); //eslint-disable-line

  const feedbackSubmitted = orderData && orderData.status === 'delivered' && orderData.feedbackSubmitted;

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
          disabled={loading}
          className="order-button"
          onClick={fetchOrderStatus}
        >
          Check Status
        </Button>
      </div>
      {loading && <CircularProgress className="loading-spinner" />}

      {orderData && (
        <div className="status-stepper" style={{ width: '80%', marginTop: '50px' }}>
          <Box>
            <Stepper activeStep={getActiveStep(orderData.status)} alternativeLabel>
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepLabel
                    icon={
                      <div className={`status-icon ${orderData.status === step.label.toLowerCase() ? 'blink' : ''}`}>
                        {step.icon}
                        {orderData.status === step.label.toLowerCase() && orderData[step.key] && (
                          <p className="status-date-time">Date: {new Date(orderData[step.key]).toLocaleDateString()}, Time: {new Date(orderData[step.key]).toLocaleTimeString()}</p>
                        )}
                      </div>
                    }
                  >
                    {step.label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </div>
      )}

      {orderData && (
        <div className="order-details">
          <h2 className="order-heading">Order Details</h2>
          <p className="order-id">Order ID: {orderData._id}</p>
          <p className="order-status">Status: {orderData.status}</p>

          {orderData.books.map((book, index) => (
            <div key={index} className="order-id">
              <div key={index} className="book-details">
                <p className="book-title">Title: {book.title}</p>
              </div>
              {orderData.status === 'delivered' && !feedbackSubmitted && (
                <FeedbackForm orderId={orderData._id} bookId={book.bookId} />
              )}
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

const getActiveStep = (status) => {
  switch (status) {
    case 'placed':
      return 0;
    case 'shipped':
      return 1;
    case 'delivered':
      return 2;
    default:
      return 0;
  }
};

export default OrderStatus;
