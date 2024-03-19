import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Typography, TextField, Button, Link, Container, Grid, Card, CardContent, Box, FormControlLabel, Checkbox } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import SendIcon from '@mui/icons-material/Send';
import AccountBox from '@mui/icons-material/AccountBox';
import { useSnackbar } from 'notistack'; // Import useSnackbar hook from notistack


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/users/login', { email, password, rememberMe });
      enqueueSnackbar('Login Success', { variant: 'success' });
      const { token } = response.data;

      const decodedToken = parseJwt(token);
      const role = decodedToken.role;
      const userId = decodedToken.userId;

      sessionStorage.setItem('authToken', token);
      sessionStorage.setItem('userRole', role);
      sessionStorage.setItem('userId', userId);

      navigate('/');
    } catch (error) {
      if (error.response.status === 401) {
        enqueueSnackbar('Incorrect email or password', { variant: 'error' });
      } else {
        enqueueSnackbar('Login failed', { variant: 'error' });
      }
      console.error('Error logging in:', error);
    }

    setLoading(false);
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
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2,
            }}
          >
            <AccountBox sx={{ fontSize: 32 }} />
            <Typography variant="h5" component="div" color="primary" sx={{ textAlign: 'center' }}>
              Login
            </Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <EmailIcon />
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  variant="outlined"
                  fullWidth
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <LockIcon />
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Remember Me"
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth startIcon={<SendIcon />} disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
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

export default Login;
