// // Header.js
// import React from 'react';
// import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaBook, FaPlus, FaSignInAlt, FaSignOutAlt, FaShoppingCart } from 'react-icons/fa';
// import { RiLoginCircleFill } from 'react-icons/ri';
// import { useCart } from '../components/CartContext';
// import { BiSolidUserCircle } from 'react-icons/bi';

// const Header = () => {
//   const { cart } = useCart();
//   const navigate = useNavigate();

//  // Function to parse the JWT token
//  const parseToken = (token) => {
//   try {
//     return JSON.parse(atob(token.split('.')[1]));
//   } catch (error) {
//     console.error('Error parsing token:', error);
//     return {};
//   }
// };

// const userToken = sessionStorage.getItem('authToken');
// const userRole = userToken ? parseToken(userToken).role : null;

//   const handleLogout = () => {
//     sessionStorage.removeItem('authToken');
//     navigate('/login');
//     console.log('Logout successful');
//   };

//   return (
//     <Navbar className="custom-navbar" bg="dark" variant="dark" expand="lg">
//       <Navbar.Brand as={Link} to="/" className="navbar-brand">
//         <FaBook className="mr-2" />
//         EBook
//       </Navbar.Brand>
//       <Navbar.Toggle aria-controls="navbar" className="navbar-toggler" />
//       <Navbar.Collapse id="navbar">
//         <Nav className="mr-auto">
//           <Nav.Link as={Link} to="/" className="nav-link">
//             Home
//           </Nav.Link>
//         </Nav>
//         <Nav>
//           <Nav.Link as={Link} to="/shopping-cart" className="nav-link">
//             <FaShoppingCart className="mr-2" />
//             Cart ({cart.length})
//           </Nav.Link>

//           {userToken ? (
//             <NavDropdown title={<BiSolidUserCircle />} id="user-dropdown" className="nav-dropdown">
//               <NavDropdown.Item as={Link} to="/user-profile" className="nav-dropdown-item">
//                 {parseToken(userToken).username}
//               </NavDropdown.Item>
//               <NavDropdown.Divider />
//               {userRole === 'admin' && (
//                 <NavDropdown.Item as={Link} to="/create-book" className="nav-dropdown-item">
//                   <FaPlus className="mr-2" />
//                   Create Book
//                 </NavDropdown.Item>
//               )}
//               <NavDropdown.Item as={Link} to="/login" className="nav-dropdown-item">
//                 <FaSignInAlt className="mr-2" />
//                 Login
//               </NavDropdown.Item>
//               <NavDropdown.Item onClick={handleLogout} className="nav-dropdown-item">
//                 <FaSignOutAlt className="mr-2" />
//                 Logout
//               </NavDropdown.Item>
//             </NavDropdown>
//           ) : (
//             <Nav.Link as={Link} to="/login" className="nav-link">
//             <RiLoginCircleFill className="mr-2" />
//               Login
//             </Nav.Link>
//           )}
//         </Nav>
//       </Navbar.Collapse>
//     </Navbar>
//   );
// };

// export default Header;








import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Badge, Menu, MenuItem } from '@mui/material';
import { ShoppingCart, Book, Add, ExitToApp, AccountCircle, Login } from '@mui/icons-material';
import { useCart } from '../components/CartContext';

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
    console.log('Logout successful');
  };

  const userToken = sessionStorage.getItem('authToken');
  const userRole = userToken ? parseToken(userToken).role : null;

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
        {userToken && ( // Conditionally render cart icon if the user is logged in
          <Link to="/shopping-cart" style={{ textDecoration: 'none', color: 'white' }}>
            <IconButton color="inherit">
              <Badge badgeContent={cart.length} color="error">
                <ShoppingCart fontSize="large" />
              </Badge>
            </IconButton>
          </Link>
        )}
        <div>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <AccountCircle fontSize="large" />
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
