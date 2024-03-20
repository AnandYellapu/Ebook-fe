import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import UpdateIcon from '@mui/icons-material/Update';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmationDialog from './ConfirmationDialog'; // Import your ConfirmationDialog component
import { useSnackbar } from 'notistack'; // Import useSnackbar hook from Notistack

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [deleteOrderId, setDeleteOrderId] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const { enqueueSnackbar } = useSnackbar(); // Destructure enqueueSnackbar from useSnackbar

  useEffect(() => {
    axios
      .get('https://ebook-backend-3czm.onrender.com/api/orders/all-orders')
      .then((response) => {
        const sortedOrders = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrders(sortedOrders);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
        enqueueSnackbar('Error fetching orders', { variant: 'error' }); // Display error notification
      });
  }, [enqueueSnackbar]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'placed':
        return <UpdateIcon />;
      case 'shipped':
        return <LocalShippingIcon />;
      case 'delivered':
        return <DoneOutlineIcon />;
      default:
        return null;
    }
  };

  const handleNextStatus = (orderId, currentStatus) => {
    let nextStatus;
    if (currentStatus === 'placed') {
      nextStatus = 'shipped';
    } else if (currentStatus === 'shipped') {
      nextStatus = 'delivered';
    }

    if (!nextStatus) {
      return;
    }

    axios
      .post('https://ebook-backend-3czm.onrender.com/api/orders/update-status', {
        orderId,
        status: nextStatus,
      })
      .then((response) => {
        setOrders(
          orders.map((order) => {
            if (order._id === orderId) {
              return { ...order, status: response.data.status };
            }
            return order;
          })
        );
        enqueueSnackbar('Order status updated successfully', { variant: 'success' }); // Display success notification
      })
      .catch((error) => {
        console.error('Error updating order status:', error);
        enqueueSnackbar('Error updating order status', { variant: 'error' }); // Display error notification
      });
  };

  const handleDeleteOrder = (orderId) => {
    setDeleteOrderId(orderId);
    setShowDeleteConfirmation(true); // Show delete confirmation dialog
  };

  const handleDeleteAllOrders = () => {
    setShowDeleteConfirmation(true); // Show delete confirmation dialog
  };

  const handleDeleteOrderConfirmation = () => {
    if (deleteOrderId !== null) {
      axios
        .delete(`https://ebook-backend-3czm.onrender.com/api/orders/${deleteOrderId}`)
        .then(() => {
          // Remove the deleted order from the state
          setOrders(orders.filter((order) => order._id !== deleteOrderId));
          setDeleteOrderId(null);
          setShowDeleteConfirmation(false); // Hide delete confirmation dialog
          enqueueSnackbar('Order deleted successfully', { variant: 'success' }); // Display success notification
        })
        .catch((error) => {
          console.error('Error deleting order:', error);
          enqueueSnackbar('Error deleting order', { variant: 'error' }); // Display error notification
        });
    } else {
      // Delete all orders
      axios
        .delete(`https://ebook-backend-3czm.onrender.com/api/orders/delete-all`)
        .then(() => {
          setOrders([]); // Clear the orders list
          setShowDeleteConfirmation(false); // Hide delete confirmation dialog
          enqueueSnackbar('All orders deleted successfully', { variant: 'success' }); // Display success notification
        })
        .catch((error) => {
          console.error('Error deleting all orders:', error);
          enqueueSnackbar('Error deleting all orders', { variant: 'error' }); // Display error notification
        });
    }
  };

  const closeDeleteConfirmation = () => {
    setShowDeleteConfirmation(false); // Hide delete confirmation dialog
    setDeleteOrderId(null);
  };

  return (
    <div className="all-orders">
      <Typography variant="h4" className="orders-heading" style={{ marginBottom: '20px' }}>
        All Orders
      </Typography>
      {orders.length === 0 && (
        <Typography variant="body1" className="no-orders-message" style={{ marginBottom: '20px' }}>
          There are no orders available.
        </Typography>
      )}

      {orders.length > 0 && (
        <Button
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon />}
          onClick={handleDeleteAllOrders} // Show delete confirmation dialog
          style={{ marginBottom: '10px' }}
        >
          Delete All Orders
        </Button>
      )}

      {orders.map((order, index) => (
        <Paper key={order._id} className="order-details" style={{ marginBottom: '20px' }}>
          {/* Render order details */}
          <Typography variant="h5" className="order-id">
            Order ID: {order._id}
          </Typography>
          <Table className="order-table">
            <TableHead>
              <TableRow>
                <TableCell className="table-header">Title</TableCell>
                <TableCell className="table-header">Quantity</TableCell>
                <TableCell className="table-header">Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.books.map((book) => (
                <TableRow key={book.bookId._id} className="table-row">
                  <TableCell className="table-data">{book.title}</TableCell>
                  <TableCell className="table-data">{book.quantity}</TableCell>
                  <TableCell className="table-data">{book.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Typography variant="subtitle1" className="total" style={{ marginTop: '10px' }}>
            Total: {order.total}
          </Typography>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="subtitle1" className="status" style={{ marginRight: '10px' }}>
              Status: {order.status} {getStatusIcon(order.status)}
            </Typography>
            {order.status !== 'delivered' && (
              <Button
                variant="contained"
                color="primary"
                className="next-button"
                startIcon={getStatusIcon(order.status)}
                onClick={() => handleNextStatus(order._id, order.status)}
              >
                Next
              </Button>
            )}
          </div>
          <Button
            variant="contained"
            color="secondary"
            className="delete-button"
            startIcon={<DeleteIcon />}
            onClick={() => handleDeleteOrder(order._id)}
            style={{ marginTop: '10px' }}
          >
            Delete
          </Button>
        </Paper>
      ))}
      
      {/* Render delete confirmation dialog */}
      <ConfirmationDialog
        open={showDeleteConfirmation}
        title="Confirm Deletion"
        message={deleteOrderId !== null ? "Are you sure you want to delete this order?" : "Are you sure you want to delete all orders?"}
        confirmText="Delete"
        onConfirm={handleDeleteOrderConfirmation}
        onCancel={closeDeleteConfirmation}
      />
    </div>
  );
};

export default AllOrders;
