import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Paper,
  TextField,
  Select,
  MenuItem,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Box,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Edit, Person } from '@mui/icons-material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: '',
  });
  const authToken = sessionStorage.getItem('authToken');

  useEffect(() => {
    if (authToken) {
      axios
        .get('https://ebook-zopw.onrender.com/api/users/profile', {
          headers: { Authorization: authToken },
        })
        .then((response) => {
          setProfile(response.data);
        })
        .catch((error) => {
          console.error('Error fetching profile:', error);
        });
    }
  }, [authToken]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = () => {
    axios
      .put('https://ebook-zopw.onrender.com/api/users/update', formData, {
        headers: { Authorization: authToken },
      })
      .then((response) => {
        setProfile(response.data);
        setFormData({ username: '', email: '', role: '' });
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
      });
  };

  const copyUserId = () => {
    const userIdText = document.getElementById('user-id');
    const textArea = document.createElement('textarea');
    textArea.value = userIdText.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  };

  const centeredText = {
    textAlign: 'center',
  };

  return (
    <Container maxWidth="md" className="container-typo-1">
      <Paper elevation={6} sx={{ p: '20px', marginBottom: '20px', ...centeredText }}>
        <Typography variant="h4" component="h2" gutterBottom>
          <Person /> Profile
        </Typography>
        <div className="profile-details">
          <Typography variant="body1">
            <strong>User ID:</strong>
            <span id="user-id">{profile.userId}</span>
            <Tooltip title="Copy User ID">
              <IconButton onClick={copyUserId}>
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          </Typography>
          <Typography variant="body1">
            <strong>Username:</strong> {profile.username}
          </Typography>
          <Typography variant="body1">
            <strong>Role:</strong> {profile.role}
          </Typography>
        </div>
      </Paper>

      <Paper elevation={6} sx={{ p: '20px', ...centeredText }}>
        <Typography variant="h4" component="h2" gutterBottom>
          <Edit /> Update Profile
        </Typography>
        <form className="update-form">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="New Username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="New Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Grid>
            {profile.role !== 'user' && (
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Role</InputLabel>
                  <Select name="role" value={formData.role} onChange={handleInputChange}>
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            )}
          </Grid>
          <Box sx={{ mt: 3 }}>
            <Button variant="contained" color="primary" onClick={handleUpdateProfile}>
              Update
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Profile;
