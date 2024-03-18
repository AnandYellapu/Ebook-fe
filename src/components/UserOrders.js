// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import Table from '@mui/material/Table';
// // import TableBody from '@mui/material/TableBody';
// // import TableCell from '@mui/material/TableCell';
// // import TableContainer from '@mui/material/TableContainer';
// // import TableHead from '@mui/material/TableHead';
// // import TableRow from '@mui/material/TableRow';
// // import Paper from '@mui/material/Paper';
// // import Button from '@mui/material/Button';
// // import TextField from '@mui/material/TextField';

// // function OrderHistory() {
// //   const [orders, setOrders] = useState([]);
// //   const [userId, setUserId] = useState('');

// //   useEffect(() => {
// //     const authToken = sessionStorage.getItem('authToken');

// //     if (authToken && userId) {
// //       axios
// //         .get(`https://ebook-zopw.onrender.com/api/orders/user-orders/${userId}?includeTitles=true`, {
// //           headers: {
// //             Authorization: authToken,
// //           },
// //         })
// //         .then((response) => {
// //           const sortedOrders = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
// //           setOrders(sortedOrders);
// //         })
// //         .catch((error) => {
// //           console.error('Error fetching orders:', error);
// //         });
// //     }
// //   }, [userId]);

// //   const handleUserIdChange = (newUserId) => {
// //     setUserId(newUserId);
// //   };

// //   const [showAllBooks, setShowAllBooks] = useState(false);

// //   return (
// //     <div>
// //       <h2>Order History</h2>
// //       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
// //         <TextField
// //           label="User ID"
// //           variant="outlined"
// //           value={userId}
// //           onChange={(e) => setUserId(e.target.value)}
// //         />
// //         <Button
// //           variant="contained"
// //           color="primary"
// //           onClick={() => handleUserIdChange(userId)}
// //           style={{ marginTop: '10px' }}
// //         >
// //           View Orders
// //         </Button>
// //       </div>
// //       <TableContainer component={Paper}>
// //         <Table>
// //           <TableHead>
// //             <TableRow>
// //               <TableCell>Order ID</TableCell>
// //               <TableCell>Total</TableCell>
// //               <TableCell>Status</TableCell>
// //               <TableCell>Book Titles</TableCell>
// //             </TableRow>
// //           </TableHead>
// //           <TableBody>
// //             {orders.map((order) => (
// //               <TableRow key={order._id}>
// //                 <TableCell>{order._id}</TableCell>
// //                 <TableCell>₹{order.total}</TableCell>
// //                 <TableCell>{order.status}</TableCell>
// //                 <TableCell>
// //                   {showAllBooks
// //                     ? order.books.map((book) => book.title).join(', ')
// //                     : order.books.slice(0, 3).map((book) => book.title).join(', ')}
// //                   {order.books.length > 3 && (
// //                     <Button variant="text" color="primary" onClick={() => setShowAllBooks(!showAllBooks)}>
// //                       {showAllBooks ? 'Show Less' : 'Show More'}
// //                     </Button>
// //                   )}
// //                 </TableCell>
// //               </TableRow>
// //             ))}
// //           </TableBody>
// //         </Table>
// //       </TableContainer>
// //     </div>
// //   );
// // }

// // export default OrderHistory;











// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';

// function OrderHistory() {
//   const [orders, setOrders] = useState([]);
//   const [userId, setUserId] = useState('');
//   const [showAllBooks, setShowAllBooks] = useState(false);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const authToken = sessionStorage.getItem('authToken');

//     if (authToken && userId) {
//       setLoading(true);
//       axios
//         .get(`https://ebook-zopw.onrender.com/api/orders/user-orders/${userId}?includeTitles=true`, {
//           headers: {
//             Authorization: authToken,
//           },
//         })
//         .then((response) => {
//           const sortedOrders = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//           setOrders(sortedOrders);
//           setLoading(false);
//         })
//         .catch((error) => {
//           console.error('Error fetching orders:', error);
//           setLoading(false);
//         });
//     }
//   }, [userId]);

//   const handleUserIdChange = (newUserId) => {
//     setUserId(newUserId);
//   };

//   return (
//     <div>
//       <h2>Order History</h2>
//       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
//         <TextField
//           label="User ID"
//           variant="outlined"
//           value={userId}
//           onChange={(e) => setUserId(e.target.value)}
//         />
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => handleUserIdChange(userId)}
//           style={{ marginTop: '10px' }}
//         >
//           View Orders
//         </Button>
//       </div>
//       {loading ? (
//         <p>Loading...</p>
//       ) : orders.length === 0 ? (
//         <p className='no-orders-message'></p>
//       ) : (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Order ID</TableCell>
//                 <TableCell>Total</TableCell>
//                 <TableCell>Status</TableCell>
//                 <TableCell>Book Titles</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {orders.map((order) => (
//                 <TableRow key={order._id}>
//                   <TableCell>{order._id}</TableCell>
//                   <TableCell>₹{order.total}</TableCell>
//                   <TableCell>{order.status}</TableCell>
//                   <TableCell>
//                     {showAllBooks
//                       ? order.books.map((book) => book.title).join(', ')
//                       : order.books.slice(0, 3).map((book) => book.title).join(', ')}
//                     {order.books.length > 3 && (
//                       <Button variant="text" color="primary" onClick={() => setShowAllBooks(!showAllBooks)}>
//                         {showAllBooks ? 'Show Less' : 'Show More'}
//                       </Button>
//                     )}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </div>
//   );
// }

// export default OrderHistory;















import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useSnackbar } from 'notistack'; // Import useSnackbar hook from notistack

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState('');
  const [showAllBooks, setShowAllBooks] = useState(false);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar(); // Destructure enqueueSnackbar from useSnackbar

  useEffect(() => {
    const authToken = sessionStorage.getItem('authToken');

    if (authToken && userId) {
      setLoading(true);
      axios
        .get(`https://ebook-zopw.onrender.com/api/orders/user-orders/${userId}?includeTitles=true`, {
          headers: {
            Authorization: authToken,
          },
        })
        .then((response) => {
          const sortedOrders = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setOrders(sortedOrders);
          setLoading(false);
          enqueueSnackbar('Orders fetched successfully.', { variant: 'success' }); // Display success notification
        })
        .catch((error) => {
          console.error('Error fetching orders:', error);
          setLoading(false);
          enqueueSnackbar('Failed to fetch orders. Please try again.', { variant: 'error' }); // Display error notification
        });
    }
  }, [userId, enqueueSnackbar]);

  const handleUserIdChange = (newUserId) => {
    setUserId(newUserId);
  };

  return (
    <div>
      <h2>Order History</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
        <TextField
          label="User ID"
          variant="outlined"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleUserIdChange(userId)}
          style={{ marginTop: '10px' }}
        >
          View Orders
        </Button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p className='no-orders-message'></p>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Book Titles</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>₹{order.total}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>
                    {showAllBooks
                      ? order.books.map((book) => book.title).join(', ')
                      : order.books.slice(0, 3).map((book) => book.title).join(', ')}
                    {order.books.length > 3 && (
                      <Button variant="text" color="primary" onClick={() => setShowAllBooks(!showAllBooks)}>
                        {showAllBooks ? 'Show Less' : 'Show More'}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default OrderHistory;

