import React, { useState, useEffect } from 'react';

const BookReviews = ({ bookId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`https://ebook-zopw.onrender.com/api/orders/reviews/${bookId}`); // Assuming your API endpoint for reviews is '/api/orders/reviews/:bookId'
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        setReviews(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchReviews();
  }, [bookId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews available for this book.</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.orderId}>
              <p>User ID: {review.userId}</p>
              <p>Rating: {review.rating}</p>
              <p>Comments: {review.comments}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookReviews;
