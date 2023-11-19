// // import React, { useState } from 'react';
// // import Rating from '@mui/material/Rating';
// // import Stack from '@mui/material/Stack';
// // import Button from '@mui/material/Button';
// // import TextField from '@mui/material/TextField';
// // import axios from 'axios';

// // const FeedbackForm = ({ orderId }) => {
// //   const [rating, setRating] = useState(2.5);
// //   const [comments, setComments] = useState('');

// //   const handleRatingChange = (event, newValue) => {
// //     setRating(newValue);
// //   };

// //   const handleCommentsChange = (event) => {
// //     setComments(event.target.value);
// //   };

// //   const handleSubmitFeedback = async () => {
// //     try {
// //       // Validate input before submitting
// //       if (rating < 1 || rating > 5) {
// //         // Handle invalid rating (provide user feedback)
// //         return;
// //       }

// //       // Make an API request to submit feedback
// //       const response = await axios.post('https://ebook-zopw.onrender.com/api/orders/add-feedback', {
// //         orderId,
// //         rating,
// //         comments,
// //       });

// //       // Handle success (e.g., show a success message)
// //       console.log(response.data);

// //       // Optionally, update the UI to reflect the new feedback
// //     } catch (error) {
// //       // Handle error (e.g., show an error message)
// //       console.error('Error submitting feedback:', error);
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>Leave Feedback</h2>
// //       <Stack spacing={1}>
// //         <Rating name="user-rating" value={rating} precision={0.5} onChange={handleRatingChange} />
// //         <TextField
// //           label="Comments"
// //           multiline
// //           rows={4}
// //           variant="outlined"
// //           fullWidth
// //           value={comments}
// //           onChange={handleCommentsChange}
// //         />
// //         <Button variant="contained" color="primary" onClick={handleSubmitFeedback} style={{marginBottom:'30px'}}>
// //           Submit Feedback
// //         </Button>
// //       </Stack>
// //     </div>
// //   );
// // };

// // export default FeedbackForm;





// import React, { useState } from 'react';
// import Rating from '@mui/material/Rating';
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import axios from 'axios';

// const FeedbackForm = ({ orderId, bookId }) => {
//   const [rating, setRating] = useState(2.5);
//   const [comments, setComments] = useState('');

//   const handleRatingChange = (event, newValue) => {
//     setRating(newValue);
//   };

//   const handleCommentsChange = (event) => {
//     setComments(event.target.value);
//   };

//   const handleSubmitFeedback = async () => {
//     try {
//       console.log('Submitting feedback:', { orderId, bookId, rating, comments });
//       // Validate input before submitting
//       if (rating < 1 || rating > 5) {
//         // Handle invalid rating (provide user feedback)
//         return;
//       }

//       // Make an API request to submit feedback for a particular bookId
//       const response = await axios.post('https://ebook-zopw.onrender.com/api/orders/add-feedback', {
//   orderId,
//   bookId,
//   rating,
//   comments,
// });

//       // Handle success (e.g., show a success message)
//       console.log('Response:', response.data);

//       // Optionally, update the UI to reflect the new feedback
//     } catch (error) {
//       // Handle error (e.g., show an error message)
//       console.error('Error submitting feedback:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Leave Feedback</h2>
//       <Stack spacing={1}>
//         <Rating name="user-rating" value={rating} precision={0.5} onChange={handleRatingChange} />
//         <TextField
//           label="Comments"
//           multiline
//           rows={4}
//           variant="outlined"
//           fullWidth
//           value={comments}
//           onChange={handleCommentsChange}
//         />
//         <Button variant="contained" color="primary" onClick={handleSubmitFeedback} style={{ marginBottom: '30px' }}>
//           Submit Feedback
//         </Button>
//       </Stack>
//     </div>
//   );
// };

// export default FeedbackForm;





// import React, { useState } from 'react';
// import Rating from '@mui/material/Rating';
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'

// const FeedbackForm = ({ orderId, bookId }) => {
//   const [rating, setRating] = useState(2.5);
//   const [comments, setComments] = useState('');
//   const [submitted, setSubmitted] = useState(false);
//   const navigate = useNavigate();

//   const handleRatingChange = (event, newValue) => {
//     setRating(newValue);
//   };

//   const handleCommentsChange = (event) => {
//     setComments(event.target.value);
//   };

//   const handleSubmitFeedback = async () => {
//     try {
//       if (rating < 1 || rating > 5) {
//         // Handle invalid rating (provide user feedback)
//         return;
//       }

//       const response = await axios.post('https://ebook-zopw.onrender.com/api/orders/add-feedback', {
//         orderId,
//         bookId,
//         rating,
//         comments,
//       });

//       // Handle success
//       console.log(response.data);
//       setSubmitted(true);

//       // Clear fields after submission
//       setRating(2.5);
//       setComments('');

//       // Automatically navigate back to the home page after 5 seconds
//       setTimeout(() => {
//         // Assuming you have a function or method to navigate to the home page
//         // You may use react-router-dom's history or a similar mechanism
//        navigate('/')
//       }, 5000);
//     } catch (error) {
//       // Handle error
//       console.error('Error submitting feedback:', error);
//     }
//   };

//   return (
//     <div>
//       {submitted ? (
//         <div>
//           <h2>Thanks for your feedback!</h2>
//         </div>
//       ) : (
//         <div>
//           <h2>Leave Feedback</h2>
//           <Stack spacing={1}>
//             <Rating name="user-rating" value={rating} precision={0.5} onChange={handleRatingChange} />
//             <TextField
//               label="Comments"
//               multiline
//               rows={4}
//               variant="outlined"
//               fullWidth
//               value={comments}
//               onChange={handleCommentsChange}
//             />
//             <Button variant="contained" color="primary" onClick={handleSubmitFeedback} style={{ marginBottom: '30px' }}>
//               Submit Feedback
//             </Button>
//           </Stack>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FeedbackForm;




// import React, { useState, useEffect } from 'react';
// import Rating from '@mui/material/Rating';
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const FeedbackForm = ({ orderId, bookId, orderDelivered }) => {
//   const [rating, setRating] = useState(0);
//   const [comments, setComments] = useState('');
//   const [submitted, setSubmitted] = useState(false);
//   const [hideForm, setHideForm] = useState(false);
//   const navigate = useNavigate();

//   const handleRatingChange = (event, newValue) => {
//     setRating(newValue);
//   };

//   const handleCommentsChange = (event) => {
//     setComments(event.target.value);
//   };

//   const handleSubmitFeedback = async () => {
//     try {
//       if (rating < 1 || rating > 5) {
//         // Handle invalid rating (provide user feedback)
//         return;
//       }

//       const response = await axios.post('https://ebook-zopw.onrender.com/api/orders/add-feedback', {
//         orderId,
//         bookId,
//         rating,
//         comments,
//       });

//       // Handle success
//       console.log(response.data);
//       setSubmitted(true);

//       // Clear fields after submission
//       setRating(2.5);
//       setComments('');

//       // Automatically navigate back to the home page after 5 seconds
//       setTimeout(() => {
//         // Assuming you have a function or method to navigate to the home page
//         // You may use react-router-dom's history or a similar mechanism
//         navigate('/');
//       }, 1000000);
//     } catch (error) {
//       // Handle error
//       console.error('Error submitting feedback:', error);
//     }
//   };

//   useEffect(() => {
//     // If the order is delivered and feedback is submitted, hide the form
//     if (orderDelivered && submitted) {
//       setHideForm(true);
//     }
//   }, [orderDelivered, submitted]);

//   return (
//     <div>
//       {submitted ? (
//         <div>
//           <h2>Thanks for your feedback!</h2>
//         </div>
//       ) : (
//         !hideForm && (
//           <div>
//             <h2>Leave Feedback</h2>
//             <Stack spacing={1}>
//               <Rating name="user-rating" value={rating} precision={0.5} onChange={handleRatingChange} />
//               <TextField
//                 label="Comments"
//                 multiline
//                 rows={4}
//                 variant="outlined"
//                 fullWidth
//                 value={comments}
//                 onChange={handleCommentsChange}
//               />
//               <Button variant="contained" color="primary" onClick={handleSubmitFeedback} style={{ marginBottom: '30px' }}>
//                 Submit Feedback
//               </Button>
//             </Stack>
//           </div>
//         )
//       )}
//     </div>
//   );
// };

// export default FeedbackForm;





// FeedbackForm.js

import React, { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const FeedbackForm = ({ orderId, bookId }) => {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [feedbackExists, setFeedbackExists] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if feedback already exists for the given order and book
    const checkFeedbackStatus = async () => {
      try {
        const response = await axios.get(`https://ebook-zopw.onrender.com/api/orders/check-feedback/${orderId}/${bookId}`);
        setFeedbackExists(response.data.feedbackExists);
      } catch (error) {
        console.error('Error checking feedback status:', error);
      }
    };

    checkFeedbackStatus();
  }, [orderId, bookId]);

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };

  const handleSubmitFeedback = async () => {
    try {
      if (rating < 1 || rating > 5) {
        // Handle invalid rating (provide user feedback)
        return;
      }

      const response = await axios.post('https://ebook-zopw.onrender.com/api/orders/add-feedback', {
        orderId,
        bookId,
        rating,
        comments,
      });

      // Handle success
      console.log(response.data);
      setSubmitted(true);

      // Automatically navigate back to the home page after 5 seconds
      setTimeout(() => {
        navigate('/');
      }, 100000);
    } catch (error) {
      // Handle error
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <div>
      {submitted ? (
        <div>
          <h2>Thanks for your feedback!</h2>
        </div>
      ) : (
        <div>
          {!feedbackExists && (
            <div>
              <h2>Leave Feedback</h2>
              <Stack spacing={1}>
                <Rating name="user-rating" value={rating} precision={0.5} onChange={handleRatingChange} />
                <TextField
                  label="Comments"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  value={comments}
                  onChange={handleCommentsChange}
                />
                <Button variant="contained" color="primary" onClick={handleSubmitFeedback} style={{ marginBottom: '30px' }}>
                  Submit Feedback
                </Button>
              </Stack>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;
