import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useCart } from './CartContext';
import { useWishlist } from './WishlistContext';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { ShoppingCart, Favorite } from '@mui/icons-material';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import { Typography } from '@mui/material';
import Pagination from './Pagination';

const BookCard = ({ book }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();
  const [wishlistStatus, setWishlistStatus] = useState(false);

  useEffect(() => {
    if (wishlist.find((item) => item._id === book._id)) {
      setWishlistStatus(true);
    } else {
      setWishlistStatus(false);
    }
  }, [wishlist, book._id]);

  const handleWishlistClick = () => {
    if (wishlistStatus) {
      removeFromWishlist(book._id);
      setWishlistStatus(false);
    } else {
      addToWishlist(book);
      setWishlistStatus(true);
    }
  };

  return (
    <Paper key={book._id} elevation={3} style={{ width: '18rem', padding: '16px', marginBottom: '20px' }}>
      <Link to={`/books/${book._id}`} className="card-link">
        <img src={book.coverImage} alt={book.title} style={{ maxWidth: '100px', marginBottom: '40px' }} />
        <div className="card-body" style={{ minHeight: '180px' }}>
          <h5 className="card-title" style={{ marginBottom: '30px' }}>{book.title}</h5>
          <p className="card-text">Author: {book.author}</p>
          <p className="card-text">₹{book.price}</p>
        </div>
      </Link>
      <div className="card-footer" style={{ marginTop: 'auto' }}>
        <IconButton onClick={handleWishlistClick} color={wishlistStatus ? 'error' : 'default'}>
          {wishlistStatus ? <Favorite color="error" /> : <Favorite />}
        </IconButton>
        <div className="card-footer" style={{ marginTop: 'auto' }}>
          <Button
            onClick={() => addToCart(book)}
            variant="contained"
            color="primary"
            startIcon={<ShoppingCart />}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </Paper>
  );
};

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAuthor, setFilterAuthor] = useState('');
  const [priceRange, setPriceRange] = useState([100, 1000]);
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const booksPerPage = 4;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get('/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  if (!books) {
    return <div>Loading...</div>;
  }

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;

  let filteredBooks = [...books];

  if (searchTerm.trim() !== '') {
    filteredBooks = filteredBooks.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (filterAuthor.trim() !== '') {
    filteredBooks = filteredBooks.filter(
      (book) => book.author.toLowerCase().includes(filterAuthor.toLowerCase())
    );
  }

  filteredBooks = filteredBooks.filter((book) => book.price >= priceRange[0] && book.price <= priceRange[1]);
  const currentBooks = filteredBooks ? filteredBooks.slice(indexOfFirstBook, indexOfLastBook) : [];
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  return (
    <Container maxWidth="md" className="container-typo">
      <div className="filters">
        <div className="search-filter">
          <TextField
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setCurrentPage(1);
              setSearchTerm(e.target.value);
            }}
            placeholder="Search"
            variant="outlined"
            size="small"
            fullWidth
            className="input-field"
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setSearchTerm('')} edge="end">
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
          </div>
          <TextField
            type="text"
            value={filterAuthor}
            onChange={(e) => {
              setCurrentPage(1);
              setFilterAuthor(e.target.value);
            }}
            placeholder="Filter by Author"
            variant="outlined"
            size="small"
            fullWidth
            className="input-field"
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setFilterAuthor('')} edge="end">
                  <FilterListIcon />
                </IconButton>
              ),
            }}
          />
        </div>
        <div className="price-range">
          <Typography id="price-range-slider" gutterBottom>
            Price Range
          </Typography>
          <Slider
            value={priceRange}
            onChange={handlePriceRangeChange}
            valueLabelDisplay="auto"
            aria-labelledby="price-range-slider"
            min={0}
            max={1000}
            color="secondary"
            sx={{
              width: '100%',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginBottom: '20px',
              color: '#f50057',
            }}
          />
          <Typography variant="subtitle1" align="center" style={{ color: '#f50057' }}>
            ₹{priceRange[0]} - ₹{priceRange[1]}
          </Typography>
        </div>
        <div className="book-list-wrapper">
          {currentBooks.map((book) => (
            <BookCard key={book._id} book={book} addToCart={addToCart} addToWishlist={addToWishlist} />
          ))}
        </div>
        <Pagination
          booksPerPage={booksPerPage}
          totalBooks={filteredBooks.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </Container>
    );
  };
  export default BookList;
