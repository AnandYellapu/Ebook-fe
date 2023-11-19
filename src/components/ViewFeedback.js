// // ViewFeedback.js

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ViewFeedback = ({ orderId, bookId }) => {
//   const [feedbackData, setFeedbackData] = useState(null);

//   useEffect(() => {
//     const fetchFeedback = async () => {
//       try {
//         const response = await axios.get(`http://localhost:1113/api/orders/feedback/${orderId}/${bookId}`);
//         console.log('Feedback data response:', response.data);
//         setFeedbackData(response.data);
//       } catch (error) {
//         console.error('Error fetching feedback:', error);
//       }
//     };

//     // Fetch feedback data when the component mounts
//     fetchFeedback();
//   }, [orderId, bookId]);

//   console.log('orderId:', orderId);
//   console.log('bookId:', bookId);
//   console.log('Feedback data:', feedbackData);

//   return (
//     <div>
//       {feedbackData ? (
//         <div>
//           <h2>Feedback for Book</h2>
//           <p>Rating: {feedbackData.rating}</p>
//           <p>Comments: {feedbackData.comments}</p>
//         </div>
//       ) : (
//         <p>No feedback available for this book.</p>
//       )}
//     </div>
//   );
// };

// export default ViewFeedback;




// ViewFeedback.js

import React, { useState, useEffect } from 'react';
import api from '../services/api';

const ViewFeedback = ({ orderId, bookId }) => {
  const [feedbackData, setFeedbackData] = useState(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await api.get(`/orders/feedback/${orderId}/${bookId}`);
        setFeedbackData(response.data);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    // Fetch feedback data when the component mounts
    fetchFeedback();
  }, [orderId, bookId]);

  return (
    <div>
      {feedbackData ? (
        <div>
          <h3>Feedback from Users</h3>
          <p>Rating: {feedbackData.rating}</p>
          <p>Comments: {feedbackData.comments}</p>
        </div>
      ) : (
        <p>No feedback available for this book.</p>
      )}
    </div>
  );
};

export default ViewFeedback;
