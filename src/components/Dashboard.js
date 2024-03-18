// Dashboard.js
import React from 'react';
import { Grid, Paper } from '@mui/material';
import Status from './Status';
import ShoppingCart from './ShoppingCart';
import Profile from '../auth/Profile';
import UserOrders from './UserOrders';  // Example: Additional component

const Dashboard = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Status />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <ShoppingCart />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Profile />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <UserOrders />
        </Paper>
      </Grid>
      {/* Add more sections as needed */}
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          {/* Another Component Goes Here */}
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          {/* Yet Another Component Goes Here */}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
