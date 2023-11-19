// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import api from '../services/api';
// import { useCart } from './CartContext';
// import { useWishlist } from './WishlistContext'; // Import the useWishlist hook
// import TextField from '@mui/material/TextField';
// import IconButton from '@mui/material/IconButton';
// import SearchIcon from '@mui/icons-material/Search';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import { ShoppingCart, Favorite } from '@mui/icons-material'; // Import the heart icon
// import Paper from '@mui/material/Paper';
// import Container from '@mui/material/Container';
// import Button from '@mui/material/Button';
// import  {FormControl, InputLabel, Select, MenuItem}  from '@mui/material';



// const BookCard = ({ book }) => {
//   const { addToCart } = useCart();
//   const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();
//   const [wishlistStatus, setWishlistStatus] = useState(false);

//   useEffect(() => {
//     if (wishlist.find((item) => item._id === book._id)) {
//       setWishlistStatus(true);
//     } else {
//       setWishlistStatus(false);
//     }
//   }, [wishlist, book._id]);

//   const handleWishlistClick = () => {
//     if (wishlistStatus) {
//       removeFromWishlist(book._id);
//       setWishlistStatus(false);
//     } else {
//       addToWishlist(book);
//       setWishlistStatus(true);
//     }
//   };


//   return (
//     <Paper key={book._id} elevation={3} style={{ width: '18rem', padding: '16px', marginBottom: '20px' }}>
//       <Link to={`/books/${book._id}`} className="card-link">
//         <img src={book.coverImage} alt={book.title} style={{ maxWidth: '100px', marginBottom:'40px' }} />
//         <div className="card-body" style={{ minHeight: '180px' }}>
//           <h5 className="card-title" style={{ marginBottom:'30px' }}>{book.title}</h5>
//           <p className="card-text">Author: {book.author}</p>
//           <p className="card-text">₹{book.price}</p>
//         </div>
//       </Link>
//       <div className="card-footer" style={{ marginTop: 'auto' }}>
//         <IconButton onClick={handleWishlistClick} color={wishlistStatus ? 'error' : 'default'}>
//           {wishlistStatus ? <Favorite color="error" /> : <Favorite />}
//         </IconButton>
//         <div className="card-footer" style={{ marginTop: 'auto' }}>
//               <Button
//                 onClick={() => addToCart(book)}
//                 variant="contained"
//                 color="primary"
//                 startIcon={<ShoppingCart />}
//               >
//                 Add to Cart
//               </Button>
//             </div>
//       </div>
//     </Paper>
//   );
// };



// const BookList = () => {
//   const [books, setBooks] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterAuthor, setFilterAuthor] = useState('');
//   const [sortCriteria, setSortCriteria] = useState(''); // Default: no sorting
//   const [sortOrder, setSortOrder] = useState('asc'); // Default: ascending

//   const { addToCart } = useCart();
//   const { addToWishlist } = useWishlist();

//   const booksPerPage = 4;

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const response = await api.get('/books');
//         setBooks(response.data);
//       } catch (error) {
//         console.error('Error fetching books:', error);
//       }
//     };

//     fetchBooks();
//   }, []);

//   const indexOfLastBook = currentPage * booksPerPage;
//   const indexOfFirstBook = indexOfLastBook - booksPerPage;

//   const sortBooks = (booksToSort) => {
//     switch (sortCriteria) {
//       case 'price':
//         return booksToSort.sort((a, b) => (sortOrder === 'asc' ? a.price - b.price : b.price - a.price));
//       default:
//         return booksToSort;
//     }
//   };
  
  
//   let filteredBooks = [...books];

//   if (searchTerm.trim() !== '') {
//     filteredBooks = filteredBooks.filter((book) =>
//       book.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }

//   if (filterAuthor.trim() !== '') {
//     filteredBooks = filteredBooks.filter(
//       (book) => book.author.toLowerCase().includes(filterAuthor.toLowerCase())
//     );
//   }
  


//   // Sort the filtered books based on the selected criteria and order
//   filteredBooks = sortBooks(filteredBooks);

//   const currentBooks = filteredBooks ? filteredBooks.slice(indexOfFirstBook, indexOfLastBook) : [];

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const handleSortChange = (event) => {
//     const newSortCriteria = event.target.value;
//     setSortCriteria(newSortCriteria);
//   };

//   const handleOrderChange = (event) => {
//     const newSortOrder = event.target.value;
//     setSortOrder(newSortOrder);
//   };



// return (
//   <Container maxWidth="md" className="container-typo">
//     <div className="filters">
//       <TextField
//         type="text"
//         value={searchTerm}
//         onChange={(e) => {
//           setCurrentPage(1);
//           setSearchTerm(e.target.value);
//         }}
//         placeholder="Search"
//         variant="outlined"
//         size="small"
//         fullWidth
//         InputProps={{
//           endAdornment: (
//             <IconButton onClick={() => setSearchTerm('')} edge="end">
//               <SearchIcon />
//             </IconButton>
//           ),
//         }}
//       />
//       <TextField
//         type="text"
//         value={filterAuthor}
//         onChange={(e) => {
//           setCurrentPage(1);
//           setFilterAuthor(e.target.value);
//         }}
//         placeholder="Filter by Author"
//         variant="outlined"
//         size="small"
//         fullWidth
//         InputProps={{
//           endAdornment: (
//             <IconButton onClick={() => setFilterAuthor('')} edge="end">
//               <FilterListIcon />
//             </IconButton>
//           ),
//         }}
//       />
//       <div className="filters">

//       <FormControl variant="outlined" size="small" className="sort-control">
//       <InputLabel className="sort-label">Sort By</InputLabel>
//       <Select
//         value={sortCriteria}
//         onChange={handleSortChange}
//         label="Sort By"
//         className="sort-select"
//       >
//         <MenuItem value="">None</MenuItem>
//         <MenuItem value="price">Price</MenuItem>
//       </Select>
//     </FormControl>
    
    
    
//   <FormControl variant="outlined" size="small" className="order-control">
//     <InputLabel className="sort-label">Order</InputLabel>
//     <Select
//       value={sortOrder}
//       onChange={handleOrderChange}
//       label="Order"
//       className="sort-select"
//     >
//       <MenuItem value="asc">Ascending</MenuItem>
//       <MenuItem value="desc">Descending</MenuItem>
//     </Select>
//   </FormControl>
// </div>
//     </div>
//     <div className="book-list">
//       {currentBooks.map((book) => (
//         <BookCard key={book._id} book={book} addToCart={addToCart} addToWishlist={addToWishlist} />
//       ))}
//     </div>
//     <Pagination
//       booksPerPage={booksPerPage}
//       totalBooks={filteredBooks.length}
//       paginate={paginate}
//       currentPage={currentPage}
//     />
//   </Container>
// );
// };


// const Pagination = ({ booksPerPage, totalBooks, paginate, currentPage }) => {
//   const pageNumbers = [];

//   for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <nav>
//       <div className="pagination">
//         {pageNumbers.map((number) => (
//           <div key={number} className={`pagination-item ${number === currentPage ? 'active' : ''}`}>
//             <button onClick={() => paginate(number)} className="pagination-btn">
//               {number}
//             </button>
//           </div>
//         ))}
//       </div>
//     </nav>
//   );
//         };

// export default BookList;














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
import { Typography,Slider} from '@mui/material';
import Pagination from './Pagination';
// import 'bootstrap/dist/css/bootstrap.min.css';

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
  const [priceRange, setPriceRange] = useState([0, 1000]); // Default price range

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

  // Filter by price range
  filteredBooks = filteredBooks.filter(
    (book) => book.price >= priceRange[0] && book.price <= priceRange[1]
  );

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
        <Typography gutterBottom>Price Range</Typography>
        <Slider
          value={priceRange}
          onChange={handlePriceRangeChange}
          valueLabelDisplay="auto"
          step={10}
          min={0}
          max={500}
          className='price-range-slider'
        />
        <Typography variant="subtitle1" gutterBottom>
          {`₹${priceRange[0]} - ₹${priceRange[1]}`}
        </Typography>
      </div>
      <div className="book-list">
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




