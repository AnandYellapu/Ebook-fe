import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RatingAndCommentsComponent = ({ orderId, bookId }) => {
  const [rating, setRating] = useState(null);
  const [comments, setComments] = useState(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(`http://localhost:1113/api/orders/${orderId}/book/${bookId}/feedback`);
        setRating(response.data.rating);
        setComments(response.data.comments);
      } catch (error) {
        console.error('Error fetching feedback:', error);
        // Handle error as needed
      }
    };

    fetchFeedback();
  }, [orderId, bookId]);

  return (
    <div>
      <h2>Feedback for Book</h2>
      {rating !== null && comments !== null ? (
        <div>
          <p>Rating: {rating}</p>
          <p>Comments: {comments}</p>
        </div>
      ) : (
        <p>Loading feedback...</p>
      )}
    </div>
  );
};

export default RatingAndCommentsComponent;
