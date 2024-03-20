import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Paper, TextField, Select, MenuItem, Button, Grid, FormControl, InputLabel, Box, IconButton, Tooltip } from '@mui/material';
import { Edit, Person } from '@mui/icons-material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSnackbar } from 'notistack'; 
import { useNavigate } from 'react-router-dom';
import { RingLoader } from 'react-spinners';
import ConfirmationDialog from '../components/ConfirmationDialog'; // Import the ConfirmationDialog component

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({});
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: '',
    profilePhotoUrl: '',
  });
  const authToken = sessionStorage.getItem('authToken');
  const [copied, setCopied] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false); // State variable to control confirmation dialog
  const [confirmationResult, setConfirmationResult] = useState(false); // State variable to store confirmation result
  const { enqueueSnackbar } = useSnackbar(); 

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (authToken) {
          const response = await axios.get('https://ebook-backend-3czm.onrender.com/api/users/profile', {
            headers: { Authorization: authToken },
          });
          setProfile(response.data);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [authToken, formData.profilePhotoUrl]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await axios.put(
        'https://ebook-backend-3czm.onrender.com/api/users/update',
        formData,
        {
          headers: { Authorization: authToken },
        }
      );
      setProfile(response.data);
      setFormData({ ...formData, username: '', email: '', role: '', profilePhotoUrl: '' });
      enqueueSnackbar('Profile updated successfully', { variant: 'success' }); 
    } catch (error) {
      console.error('Error updating profile:', error);
      enqueueSnackbar('Failed to update profile', { variant: 'error' }); 
    }
  };

  const copyUserId = () => {
    const userIdText = document.getElementById('user-id');
    const textArea = document.createElement('textarea');
    textArea.value = userIdText.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
    enqueueSnackbar('User ID copied', { variant: 'info' }); 
  };

  const handleDeleteConfirmation = () => {
    setOpenConfirmation(true);
  };

  const handleConfirmationClose = () => {
    setOpenConfirmation(false);
  };

  const handleDeleteAccount = async () => {
    setOpenConfirmation(false); // Close the confirmation dialog
    if (confirmationResult) {
      setLoading(true);
      setTimeout(async () => {
        try {
          const response = await axios.delete('https://ebook-backend-3czm.onrender.com/api/users/delete', {
            headers: { Authorization: authToken },
          });
          if (response.status === 200) {
            enqueueSnackbar('Account deleted successfully', { variant: 'success' });
            setTimeout(() => {
              navigate('/login');
            }, 2000);
          }
        } catch (error) {
          console.error('Error deleting account:', error);
          enqueueSnackbar('Failed to delete account', { variant: 'error' });
        } finally {
          setLoading(false);
        }
      }, 5000);
    }
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
          {profile.profilePhotoUrl && (
            <div>
              <img
                src={profile.profilePhotoUrl}
                alt="Profile"
                style={{ maxWidth: '20%', marginTop: '10px', borderRadius: '20px' }}
              />
            </div>
          )}
          <Typography variant="body1">
            <strong>User ID:</strong>
            <span id="user-id">{profile.userId}</span>
            <Tooltip title="Copy User ID">
              <IconButton onClick={copyUserId}>
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
            {copied && <span style={{ color: 'green' }}>Copied</span>}
          </Typography>
          <Typography variant="body1">
            <strong>Username:</strong> {profile.username}
          </Typography>
          <Typography variant="body1">
            <strong>Role:</strong> {profile.role}
          </Typography>
        </div>
        <div className="loader-container">
          <RingLoader color={'#76ff7a'} loading={loading} size={70} sx={{alignItem:'center'}} />
        </div>
        <Box mt={2} textAlign="center">
          <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={handleDeleteConfirmation}>
            Delete Account
          </Button>
        </Box>
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
                  <Select name="role" label="Role" value={formData.role} onChange={handleInputChange}>
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          )}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Profile Photo URL"
              name="profilePhotoUrl"
              value={formData.profilePhotoUrl}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
        <Box mt={3} textAlign="center">
          <Button variant="contained" color="primary" onClick={handleUpdateProfile}>
            Update
          </Button>
        </Box>
      </form>
    </Paper>

    {/* Confirmation Dialog for Delete Account */}
    <ConfirmationDialog
      open={openConfirmation}
      title="Delete Account"
      message="Are you sure you want to delete your account? This action cannot be undone."
      confirmText="Delete"
      onConfirm={() => {
        setConfirmationResult(true);
        handleDeleteAccount();
      }}
      onCancel={() => {
        setConfirmationResult(false);
        handleConfirmationClose();
      }}
    />
  </Container>
);
};

export default Profile;

