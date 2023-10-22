import React, { useState } from 'react';
import api from '../services/api';
import { Container, TextField, TextareaAutosize, Button, Typography, Grid } from '@mui/material';

const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [coverImage, setCoverImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post('/books', { title, author, description, price, coverImage });
      console.log('Book created successfully');

      // Clear the input fields after a successful creation
      setTitle('');
      setAuthor('');
      setDescription('');
      setPrice('');
      setCoverImage('');
    } catch (error) {
      console.error('Error creating book:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h5" className='create-a-book'>
        Create a Book
      </Typography>
      <form onSubmit={handleSubmit} className="book-form">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Title"
              fullWidth
              required
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Author"
              fullWidth
              required
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextareaAutosize
              minRows={3}
              maxRows={6}
              placeholder="Description"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={{minWidth:'250px', minHeight: '100px' }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Price"
              fullWidth
              required
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Cover Image URL"
              fullWidth
              required
              type="text"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth className="submit-button">
              Create Book
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default BookForm;
