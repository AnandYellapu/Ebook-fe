// FeedbackForm.js

import React, { useState } from 'react';
import { Button, Rating, TextField, Typography } from '@mui/material';
import api from '../services/api';
import { toast } from 'react-toastify';

const Feedback = ({ bookId, onFeedbackSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('');

  const handleRatingChange = (event, newRating) => {
    setRating(newRating);
  };

  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await api.post(`/books/${bookId}/feedback`, {
        rating,
        comments,
      });

      // Optionally, you can handle the response or trigger a callback
      if (onFeedbackSubmit) {
        onFeedbackSubmit(response.data);
      }

      toast.success('Feedback submitted successfully', 'success');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Failed to submit feedback', 'error');
    }
  };

  return (
    <div className="feedback-form">
      <Typography variant="h6" gutterBottom>
        Submit Feedback
      </Typography>
      <Rating
        name="rating"
        value={rating}
        onChange={handleRatingChange}
        precision={0.5}
      />
      <TextField
        label="Comments"
        multiline
        rows={4}
        value={comments}
        onChange={handleCommentsChange}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <Button
        onClick={handleSubmit}
        variant="contained"
        color="primary"
      >
        Submit Feedback
      </Button>
    </div>
  );
};

export default Feedback;
