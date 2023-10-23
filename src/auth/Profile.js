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
} from '@mui/material';
import { Edit, Person } from '@mui/icons-material';

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
        .get('http://localhost:1113/api/users/profile', {
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
      .put('http://localhost:1113/api/users/update', formData, {
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

  return (
    <Container>
      <Paper elevation={4} className="profile-section">
        <Typography variant="h4" component="h2" gutterBottom>
          <Person /> Profile
        </Typography>
        <div className="profile-details">
          <Typography variant="body1" className='user-id'>
            User ID: <strong>{profile.userId}</strong>
          </Typography>
          <Typography variant="body1" className='username-username'>
            Username: <strong>{profile.username}</strong>
          </Typography>
          <Typography variant="body1" className='role-role'>
            Role: <strong>{profile.role}</strong>
          </Typography>
        </div>
      </Paper>

      <Paper elevation={4} className="profile-section">
        <Typography variant="h4" component="h2" gutterBottom>
          <Edit /> Update Profile
        </Typography>
        <form className="update-form">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="New Username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="New Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Grid>
            {profile.role !== 'user' && (
              <Grid item xs={12} sm={4}>
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
          <Button variant="contained" color="primary" onClick={handleUpdateProfile}>
            Update
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Profile;
