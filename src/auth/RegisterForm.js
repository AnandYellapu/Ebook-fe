import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Typography, TextField, Button, Link, Container, Grid, CardContent, Box, Card } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';
import AccountBox from '@mui/icons-material/AccountBox';
import LockIcon from '@mui/icons-material/Lock';
import { useSnackbar } from 'notistack'; // Import useSnackbar hook from notistack

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(); // Destructure enqueueSnackbar from useSnackbar

  const handlePasswordChange = (e) => {
    const enteredPassword = e.target.value;
    setPassword(enteredPassword);

    // Password validation logic
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/;
    if (
      enteredPassword.length < 8 ||
      !passwordRegex.test(enteredPassword)
    ) {
      setPasswordError(
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      );
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/users/register', { username, email, password });
      enqueueSnackbar('Registered successfully', { variant: 'success' }); // Display success notification
      navigate('/login');
      console.log('Registration successful', response.data);
    } catch (error) {
      enqueueSnackbar('Registration failed', { variant: 'error' }); // Display error notification
      console.error('Error registering:', error);
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
              Register
            </Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Username"
                  variant="outlined"
                  fullWidth
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <AccountCircleIcon />
                    ),
                  }}
                />
              </Grid>
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
                  onChange={handlePasswordChange}
                  error={!!passwordError}
                  helperText={passwordError}
                  InputProps={{
                    startAdornment: (
                      <LockIcon />
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth startIcon={<SendIcon />}>
                  Register
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" className="login-link" align="center">
                  Already Registered? <Link href="/login">Login</Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default RegisterForm;
