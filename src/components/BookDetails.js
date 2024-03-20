import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, TextField, Card, CardContent, Typography, Stack, Rating } from '@mui/material';
import { Book as BookIcon, CurrencyRupee as CurrencyRupeeIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import ConfirmationDialog from './ConfirmationDialog';
import api from '../services/api';

const BookDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedBook, setEditedBook] = useState({
    title: '',
    author: '',
    description: '',
    price: 0,
  });

  const [bookNotFound, setBookNotFound] = useState(false);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const bookResponse = await api.get(`/books/${id}`);
        const reviewsResponse = await api.get(`/reviews/book/${id}/reviews`);
        
        setBook(bookResponse.data);
        setReviews(reviewsResponse.data.reviews);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setBookNotFound(true); // Set book not found state
        } else {
          console.error('Error fetching book details:', error);
        }
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleEdit = () => {
    setEditMode(true);
    setEditedBook({
      title: book.title,
      author: book.author,
      description: book.description,
      price: book.price,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedBook({
      ...editedBook,
      [name]: value,
    });
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/books/${id}`, editedBook);
      enqueueSnackbar('Book updated successfully.', { variant: 'success' });
      setEditMode(false);
      setBook(editedBook);
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/books/${id}`);
      enqueueSnackbar('Book deleted successfully.', { variant: 'success' });
      navigate('/');
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleConfirmationDialogOpen = () => {
    setConfirmationDialogOpen(true);
  };

  const handleConfirmationDialogClose = () => {
    setConfirmationDialogOpen(false);
  };

  const handleConfirmDelete = async () => {
    handleDelete();
    handleConfirmationDialogClose();
  };

  if (bookNotFound) {
    return <div className="no-book-found">No book found with ID: {id}</div>;
  }

  if (!book) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="book-details">
      <h2>
        <BookIcon /> {book.title}
      </h2>
      <img className="cover-image" src={book.coverImage} alt={book.title} style={{ maxWidth: '200px' }} />
      {!editMode ? (
        <>
          <p>{book.author}</p>
          <p>{book.description}</p>
          <p className="price-book">
            <CurrencyRupeeIcon className="book-price-price" /> {book.price}
          </p>
        </>
      ) : (
        <>
          <TextField
            name="title"
            label="Title"
            value={editedBook.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="author"
            label="Author"
            value={editedBook.author}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="description"
            label="Description"
            value={editedBook.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="price"
            label="Price"
            type="number"
            value={editedBook.price}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </>
      )}

      {/* Display Edit and Delete Buttons */}
      <div className="edit-delete-buttons">
        {!editMode ? (
          <Button variant="outlined" color="primary" startIcon={<EditIcon />} onClick={handleEdit}>
            Edit
          </Button>
        ) : (
          <>
            <Button variant="outlined" color="primary" onClick={handleUpdate}>
              Update
            </Button>
            <Button variant="outlined" onClick={handleCancelEdit}>
              Cancel
            </Button>
          </>
        )}
        <Button variant="outlined" color="secondary" startIcon={<DeleteIcon />} onClick={handleConfirmationDialogOpen}>
          Delete
        </Button>
      </div>

      {/* Display Confirmation Dialog */}
      <ConfirmationDialog
        open={confirmationDialogOpen}
        title="Confirm Delete"
        message="Are you sure you want to delete this book?"
        confirmText="Delete"
        onConfirm={handleConfirmDelete}
        onCancel={handleConfirmationDialogClose}
      />

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
