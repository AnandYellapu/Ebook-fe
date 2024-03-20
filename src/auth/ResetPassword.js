import React, { useState } from 'react';
import { Typography, TextField, Button, Container, Grid, Card, CardContent, Box } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import SendIcon from '@mui/icons-material/Send';
import { useParams, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack'; // Import useSnackbar hook from notistack
import { useForm } from 'react-hook-form'; // Import useForm hook for client-side validation
import * as yup from 'yup'; // Import yup for schema validation
import api from '../services/api';
import { yupResolver } from '@hookform/resolvers/yup';



const schema = yup.object().shape({
  password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters long')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
});

const ResetPassword = () => {
  const [password, setPassword] = useState('');   //eslint-disable-line
  const { token } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(); // Destructure enqueueSnackbar from useSnackbar
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      // Send a request to the backend to handle the password reset functionality
      await api.post(`/users/reset-password/${token}`, { password: data.password });
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="New Password"
                  variant="outlined"
                  fullWidth
                  type="password"
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message}
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

export default ResetPassword;
