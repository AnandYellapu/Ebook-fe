import React, { useState } from 'react';
import { Typography, TextField, Button, Link, Container, Grid, Card, CardContent, Box } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';
import { useSnackbar } from 'notistack'; // Import useSnackbar hook from notistack
import api from '../services/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const { enqueueSnackbar } = useSnackbar(); // Destructure enqueueSnackbar from useSnackbar

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a request to the backend to handle the forgot password functionality
      await api.post('/users/forgot-password', { email });
      enqueueSnackbar('Password reset instructions sent to your email', { variant: 'success' }); // Display success notification
    } catch (error) {
      enqueueSnackbar('Failed to send password reset instructions', { variant: 'error' }); // Display error notification
      console.error('Error sending password reset instructions:', error);
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
                <Button type="submit" variant="contained" color="primary" fullWidth startIcon={<SendIcon />}>
                  Send Reset Instructions
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
