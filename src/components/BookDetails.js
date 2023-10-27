import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaBook, FaMoneyBillAlt, FaEdit, FaTrash } from 'react-icons/fa';
import api from '../services/api';
import { Button, TextareaAutosize, TextField } from '@mui/material';
import { toast } from 'react-toastify';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBook, setEditedBook] = useState({});
  const authToken = sessionStorage.getItem('authToken');
  const userRole = sessionStorage.getItem('userRole');

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await api.get(`/books/${id}`);
        setBook(response.data);
        setEditedBook(response.data);
      
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
              {/* Edit form */}
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
              {/* View mode */}
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

      {(authToken && userRole === 'user') && (
        <div className="view-mode">
          {/* View mode */}
          <p>You don't have permission to edit or delete this book.</p>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
