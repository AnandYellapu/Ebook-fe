import React, { useState } from 'react';
import { Typography, TextField, Button, Link, Container, Grid, Card, CardContent, Box } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';
import { useSnackbar } from 'notistack'; // Import useSnackbar hook from notistack
import api from '../services/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar(); // Destructure enqueueSnackbar from useSnackbar

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      enqueueSnackbar('Please enter a valid email address', { variant: 'error' });
      return;
    }

    setLoading(true);

    try {
      // Send a request to the backend to handle the forgot password functionality
      await api.post('/users/forgot-password', { email });
      enqueueSnackbar('Password reset instructions sent to your email', { variant: 'success' }); // Display success notification
    } catch (error) {
      if (error.response && error.response.status === 400) {
        enqueueSnackbar('Invalid email address', { variant: 'error' });
      } else if (error.response && error.response.status === 500) {
        enqueueSnackbar('Server error. Please try again later.', { variant: 'error' });
      } else {
        enqueueSnackbar('Failed to send password reset instructions', { variant: 'error' });
      }
      console.error('Error sending password reset instructions:', error);
    } finally {
      setLoading(false);
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
            <EmailIcon sx={{ fontSize: 32 }} />
            <Typography variant="h5" component="div" color="primary" sx={{ textAlign: 'center' }}>
              Forgot Password
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
                <Button type="submit" variant="contained" color="primary" fullWidth startIcon={<SendIcon />} disabled={loading}>
                  {loading ? 'Sending...' : 'Send Reset Instructions'}
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" className="login-link" align="center">
                  <Link href="/login">Back to Login</Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ForgotPassword;
