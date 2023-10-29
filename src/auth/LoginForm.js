import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Typography, TextField, Button, Link, Container, Grid, Card, CardContent, Box } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import SendIcon from '@mui/icons-material/Send';
import AccountBox from '@mui/icons-material/AccountBox';
import { toast } from 'react-toastify';


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/users/login', { email, password });
      toast.success('Login Success');
      const { token } = response.data;

      const decodedToken = parseJwt(token);
      const role = decodedToken.role;
      const userId = decodedToken.userId;

      sessionStorage.setItem('authToken', token);
      sessionStorage.setItem('userRole', role);
      sessionStorage.setItem('userId', userId);
      // console.log('Login successful. UserId:', userId);

      // console.log('Login successful. Token:', token);
      // console.log('Login successful. Role is:', role);

      navigate('/');
    } catch (error) {
      toast.error('Login failed');
      console.error('Error logging in:', error);
    }
  };

  // Function to parse JWT token
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };


return (
  <Container maxWidth="sm" className='container-typo-1'>
    <Card variant="outlined" elevation={3} style={{ borderRadius: '16px', overflow: 'hidden' }}>
      <CardContent>
      <Box
      sx={{
        display: 'flex',
        flexDirection: 'column', // Make the items stack vertically
        alignItems: 'center',
        justifyContent: 'center',
        mb: 2,
      }}
    >
      <AccountBox sx={{ fontSize: 32 }} />
      <Typography variant="h5" component="div" color="dark" sx={{ textAlign: 'center' }}>
        Login
      </Typography>
    </Box>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div className="form-label">
                <EmailIcon />
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="form-label">
                <LockIcon />
                <TextField
                  label="Password"
                  variant="outlined"
                  fullWidth
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth className="login-button" startIcon={<SendIcon />}>
                Login
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" className="forgot-password-link" align="center">
                <Link href="/forgot-password">Forgot Password?</Link>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" className="register-link" align="center">
                Not Yet Registered? <Link href="/register">Register</Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  </Container>
);
};

export default LoginForm;
