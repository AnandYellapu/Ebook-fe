// // AllOrders.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';


// const AllOrders = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     axios.get('https://ebook-zopw.onrender.com/api/orders/all-orders') 
//       .then((response) => {
//         setOrders(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching orders:', error);
//       });
//   }, []);

//   const handleNextStatus = (orderId, currentStatus) => {
//     let nextStatus;
//     if (currentStatus === 'placed') {
//       nextStatus = 'shipped';
//     } else if (currentStatus === 'shipped') {
//       nextStatus = 'delivered';
//     }

//     if (!nextStatus) {
//       return; 
//     }

//     axios.post('https://ebook-zopw.onrender.com/api/orders/update-status', { orderId, status: nextStatus })
//       .then((response) => {
//         setOrders(orders.map(order => {
//           if (order._id === orderId) {
//             return { ...order, status: response.data.status };
//           }
//           return order;
//         }));
//       })
//       .catch((error) => {
//         console.error('Error updating order status:', error);
//       });
//   };

//   return (
//     <div className="all-orders">
//       <h2 className="orders-heading">All Orders</h2>
//       {orders.map((order) => (
//         <div key={order._id} className="order-details">
//           <h3 className="order-id">Order ID: {order._id}</h3>
//           <table className="order-table">
//             <thead>
//               <tr>
//                 <th className="table-header">Title</th>
//                 <th className="table-header">Quantity</th>
//                 <th className="table-header">Price</th>
//               </tr>
//             </thead>
//             <tbody>
//               {order.books.map((book) => (
//                 <tr key={book.bookId._id} className="table-row">
//                   <td className="table-data">{book.title}</td>
//                   <td className="table-data">{book.quantity}</td>
//                   <td className="table-data">{book.price}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <p className="total">Total: {order.total}</p>
//           <p className="status">Status: {order.status}</p>
//           {order.status !== 'delivered' && (
//             <button
//               className="next-button"
//               onClick={() => handleNextStatus(order._id, order.status)}
//             >
//               Next
//             </button>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default AllOrders;









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

const AllOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get('https://ebook-zopw.onrender.com/api/orders/all-orders')
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  }, []);

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
      .post('https://ebook-zopw.onrender.com/api/orders/update-status', {
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
      })
      .catch((error) => {
        console.error('Error updating order status:', error);
      });
  };

  return (
    <div className="all-orders">
      <Typography variant="h4" className="orders-heading">
        All Orders
      </Typography>
      {orders.map((order) => (
        <Paper key={order._id} className="order-details">
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
          <Typography variant="subtitle1" className="total">
            Total: {order.total}
          </Typography>
          <Typography variant="subtitle1" className="status">
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
        </Paper>
      ))}
    </div>
  );
};

export default AllOrders;
