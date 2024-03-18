
import React, { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack'; 

const FeedbackForm = ({ orderId, bookId }) => {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [feedbackExists, setFeedbackExists] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(); 

  useEffect(() => {
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
        enqueueSnackbar('Please select a rating between 1 and 5.', { variant: 'error' }); 
        return;
      }

      const response = await axios.post('https://ebook-zopw.onrender.com/api/orders/add-feedback', {
        orderId,
        bookId,
        rating,
        comments,
      });

      console.log('Feedback submission response:', response.data);

      setSubmitted(true);
      enqueueSnackbar('Feedback submitted successfully.', { variant: 'success' }); 

      setTimeout(() => {
        navigate('/');
      }, 5000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      enqueueSnackbar('Failed to submit feedback. Please try again.', { variant: 'error' }); 
    }
  };

  return (
    <Stack direction="column" alignItems="center" spacing={4} sx={{ maxWidth: '600px', margin: '0 auto' }}>
      {submitted ? (
        <div>
          <h2>Thanks for your feedback!</h2>
        </div>
      ) : (
        <div>
          {!feedbackExists && (
            <div>
              <h2>Leave Feedback</h2>
              <Stack direction="column" alignItems="center" spacing={2} sx={{ width: '100%' }}>
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
                <Button variant="contained" color="primary" onClick={handleSubmitFeedback}>
                  Submit Feedback
                </Button>
              </Stack>
            </div>
          )}
        </div>
      )}
    </Stack>
  );
};

export default FeedbackForm;
