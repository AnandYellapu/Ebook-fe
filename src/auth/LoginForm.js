import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Container, Typography, TextField, Button, Link, Grid } from '@mui/material';
import { Email } from '@mui/icons-material';
import LockIcon from '@mui/icons-material/Lock';
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

      sessionStorage.setItem('authToken', token);
      sessionStorage.setItem('userRole', role);

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
    <Container maxWidth="sm">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" component="div" className="login-Title">
            Login
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <div className="form-label">
            <Email />
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
          <Button type="submit" variant="contained" color="primary" fullWidth className="login-button" onClick={handleSubmit}>
            Login
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" className="forgot-password-link">
            <Link href="/forgot-password">Forgot Password?</Link>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" className="register-link">
            Not Yet Registered? <Link href="/register">Register</Link>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginForm;
