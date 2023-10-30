import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Menu,
  MenuItem,
} from '@mui/material';
import { ShoppingCart, Book, Add, ExitToApp, Login, Favorite } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { useCart } from '../components/CartContext';
import { useWishlist } from '../components/WishlistContext'; // Import the useWishlist hook
import { toast } from 'react-toastify';

const parseToken = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (error) {
    console.error('Error parsing token:', error);
    return {};
  }
};

const Header = () => {
  const { cart } = useCart();
  const { wishlist } = useWishlist(); // Access the wishlist from the context
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('authToken');
    navigate('/login');
    toast.success('Logout successful');
  };

  const userToken = sessionStorage.getItem('authToken');
  const userRole = userToken ? parseToken(userToken).role : null;
  const userId = sessionStorage.getItem('userId');

  const wishlistStatus = wishlist.length > 0;

  return (
    <AppBar position="static">
      <Toolbar>
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
          <Typography variant="h6">
            <Book fontSize="large" />
            EBook
          </Typography>
        </Link>
        <div style={{ flexGrow: 1 }} />
        {userToken && (
          <Link to="/shopping-cart" style={{ textDecoration: 'none', color: 'white' }}>
            <IconButton color="inherit">
              <Badge badgeContent={cart.length} color="error">
                <ShoppingCart fontSize="large" />
              </Badge>
            </IconButton>
          </Link>
        )}

        {wishlistStatus ? (
          <Link to="/wishlist" style={{ textDecoration: 'none', color: 'white' }}>
            <IconButton color="inherit">
              <Favorite color="error" fontSize="large" />
            </IconButton>
          </Link>
        ) : (
          <Link to="/wishlist" style={{ textDecoration: 'none', color: 'white' }}>
            <IconButton color="inherit">
              <Favorite fontSize="large" />
            </IconButton>
          </Link>
        )}

        <div>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <MenuIcon fontSize="large" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            id="user-menu"
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose} component={Link} to="/profile">
              Profile
            </MenuItem>

            {userRole === 'admin' && (
              <MenuItem onClick={handleMenuClose} component={Link} to="/create-book">
                <Add fontSize="small" />
                Create Book
              </MenuItem>
            )}

            {userRole === 'user' && (
              <MenuItem onClick={handleMenuClose} component={Link} to={`/user-orders/${userId}`}>
                <Add fontSize="small" />
                My Orders
              </MenuItem>
            )}

            {userRole === 'admin' && (
              <MenuItem onClick={handleMenuClose} component={Link} to="/all-orders">
                <Add fontSize="small" />
                All Orders
              </MenuItem>
            )}

            {(userRole === 'admin' || userRole === 'user') && (
              <MenuItem onClick={handleMenuClose} component={Link} to="/status">
                <Add fontSize="small" />
                Track Order
              </MenuItem>
            )}

            {userToken ? (
              <MenuItem onClick={handleLogout}>
                <ExitToApp fontSize="small" />
                Logout
              </MenuItem>
            ) : (
              <MenuItem onClick={handleMenuClose} component={Link} to="/login">
                <Login fontSize="small" />
                Login
              </MenuItem>
            )}
          </Menu>
        </div>


       



      </Toolbar>
    </AppBar>
  );
};

export default Header;


