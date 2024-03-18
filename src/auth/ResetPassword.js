import React, { useState } from 'react';
import { Typography, TextField, Button, Container, Grid, Card, CardContent, Box } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import SendIcon from '@mui/icons-material/Send';
import { useParams, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack'; // Import useSnackbar hook from notistack
import api from '../services/api';

const ResetPasswordForm = () => {
  const [password, setPassword] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(); // Destructure enqueueSnackbar from useSnackbar

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a request to the backend to handle the password reset functionality
      await api.post(`/users/reset-password/${token}`, { password });
      enqueueSnackbar('Password reset successfully', { variant: 'success' }); // Display success notification
      navigate('/login');
    } catch (error) {
      enqueueSnackbar('Failed to reset password', { variant: 'error' }); // Display error notification
      console.error('Error resetting password:', error);
    }
  };

  return (
    <Container maxWidth="sm" style={{ margin: 'auto' }}>
      <Card variant="outlined" elevation={3}>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2,
              mt:5,
            }}
          >
            <LockIcon sx={{ fontSize: 32 }} />
            <Typography variant="h5" component="div" color="primary" sx={{ textAlign: 'center' }}>
              Reset Password
            </Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="New Password"
                  variant="outlined"
                  fullWidth
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  InputProps={{
                    startAdornment: (
                      <LockIcon />
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth startIcon={<SendIcon />}>
                  Reset Password
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ResetPasswordForm;