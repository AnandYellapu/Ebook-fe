import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaBook, FaMoneyBillAlt, FaEdit, FaTrash } from 'react-icons/fa';
import { Button, TextareaAutosize, TextField, Card, CardContent, Typography, Stack, Rating } from '@mui/material';
import { toast } from 'react-toastify';
import api from '../services/api';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBook, setEditedBook] = useState({});
  const authToken = sessionStorage.getItem('authToken');
  const userRole = sessionStorage.getItem('userRole');

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const bookResponse = await api.get(`/books/${id}`);
        const reviewsResponse = await api.get(`/reviews/book/${id}/reviews`);
        
        setBook(bookResponse.data);
        setReviews(reviewsResponse.data.reviews);
        setEditedBook(bookResponse.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedBook(book);
  };

  const handleSaveEdit = async () => {
    try {
      await api.put(`/books/${id}`, editedBook);
      setIsEditing(false);
      // Refresh book details after edit
      const response = await api.get(`/books/${id}`);
      setBook(response.data);
      toast.success('Book updated successfully', 'success');
    } catch (error) {
      console.error('Error updating book:', error);
      toast.error('Failed to update book', 'error');
    }
  };

  const handleDelete = () => {
    const shouldDelete = window.confirm('Are you sure you want to delete this book?');
    if (shouldDelete) {
      api.delete(`/books/${id}`)
        .then(() => {
          navigate('/');
          toast.success('Book deleted successfully', 'success');
        })
        .catch((error) => {
          console.error('Error deleting book:', error);
          toast.error('Failed to delete book', 'error');
        });
    }
  };

  const handleInputChange = (e) => {
    setEditedBook({
      ...editedBook,
      [e.target.name]: e.target.value,
    });
  };

  if (!book) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="book-details">
      <h2>
        <FaBook /> {book.title}
      </h2>
      <img className="cover-image" src={book.coverImage} alt={book.title} style={{ maxWidth: '200px' }} />
      <p>{book.author}</p>
      <p>{book.description}</p>
      <p className="price-book">
        <FaMoneyBillAlt className="book-price-price" /> ₹{book.price}
      </p>

      {(authToken && userRole === 'admin') && (
        <div>
          {isEditing ? (
            <div className="edit-mode">
              <TextField
                label="Title"
                name="title"
                value={editedBook.title}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
              />
              <TextField
                label="Author"
                name="author"
                value={editedBook.author}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
              />
              <TextareaAutosize
                rowsmin={3}
                name="description"
                value={editedBook.description}
                onChange={handleInputChange}
                placeholder="Description"
                className="edit-input"
              />
              <TextField
                label="Price"
                type="number"
                name="price"
                value={editedBook.price}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
              />
              <Button onClick={handleSaveEdit} variant="contained" color="primary">
                Save
              </Button>
              <Button onClick={handleCancelEdit} variant="contained">
                Cancel
              </Button>
            </div>
          ) : (
            <div className="view-mode">
              <Button onClick={handleEdit} variant="contained" color="primary" startIcon={<FaEdit />}>
                Edit
              </Button>
              <Button onClick={handleDelete} variant="contained" color="secondary" startIcon={<FaTrash />}>
                Delete
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Display Reviews Section */}
      <div className="reviews-section">
        <h3 className="reviews-heading">Reviews</h3>
        {reviews.length === 0 && (
          <p className="no-reviews">No reviews available for this book.</p>
        )}
        {reviews.map((review) => (
          <Card key={review.orderId} className="review-card">
            <CardContent>
              <Stack spacing={1} className="rating-stack" style={{alignItems:'center'}}>
                Rating:<Rating
                  name="half-rating"
                  defaultValue={review.rating}
                  precision={0.5}
                  readOnly
                />
              </Stack>
              <Typography variant="body1" paragraph className="comments-text">
                Comments: {review.comments}
              </Typography>
              <Typography variant="caption" color="textSecondary" className="date-text">
                Date: {new Date(review.createdAt).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BookDetails;