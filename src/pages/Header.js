import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  ShoppingCart,
  Book,
  Add,
  ExitToApp,
  Login,
  Favorite,
  Menu as MenuIcon,
  Person,
  ListAlt,
  TrackChanges,
} from '@mui/icons-material';
import { useCart } from '../components/CartContext';
import { useWishlist } from '../components/WishlistContext';
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
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
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
    <div>
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
            <Link to="/wish-list" style={{ textDecoration: 'none', color: 'white' }}>
              <IconButton color="inherit">
                <Favorite color="error" fontSize="large" />
              </IconButton>
            </Link>
          ) : (
            <Link to="/wish-list" style={{ textDecoration: 'none', color: 'white' }}>
              <IconButton color="inherit">
                <Favorite fontSize="large" />
              </IconButton>
            </Link>
          )}

          <IconButton color="inherit" onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>


          <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
            <List>
              <ListItem button component={Link} to="/profile" onClick={handleDrawerClose}>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>

              {userRole === 'admin' && (
                <ListItem button component={Link} to="/create-book" onClick={handleDrawerClose}>
                  <ListItemIcon>
                    <Add />
                  </ListItemIcon>
                  <ListItemText primary="Create Book" />
                </ListItem>
              )}

              {userRole === 'user' && (
                <ListItem
                  button
                  component={Link}
                  to={`/user-orders/${userId}`}
                  onClick={handleDrawerClose}
                >
                  <ListItemIcon>
                    <ListAlt />
                  </ListItemIcon>
                  <ListItemText primary="My Orders" />
                </ListItem>
              )}

              {userRole === 'admin' && (
                <ListItem button component={Link} to="/all-orders" onClick={handleDrawerClose}>
                  <ListItemIcon>
                    <ListAlt />
                  </ListItemIcon>
                  <ListItemText primary="All Orders" />
                </ListItem>
              )}

              {(userRole === 'admin' || userRole === 'user') && (
                <ListItem button component={Link} to="/status" onClick={handleDrawerClose}>
                  <ListItemIcon>
                    <TrackChanges />
                  </ListItemIcon>
                  <ListItemText primary="Track Order" />
                </ListItem>
              )}

              {userToken ? (
                <ListItem button onClick={handleLogout}>
                  <ListItemIcon>
                    <ExitToApp />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItem>
              ) : (
                <ListItem
                  button
                  component={Link}
                  to="/login"
                  onClick={handleDrawerClose}
                >
                  <ListItemIcon>
                    <Login />
                  </ListItemIcon>
                  <ListItemText primary="Login" />
                </ListItem>
              )}
            </List>
          </Drawer>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;