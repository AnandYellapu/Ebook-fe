// AllOrders.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';


const AllOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('https://ebook-zopw.onrender.com/api/orders/all-orders') 
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  }, []);

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

    axios.post('https://ebook-zopw.onrender.com/api/orders/update-status', { orderId, status: nextStatus })
      .then((response) => {
        setOrders(orders.map(order => {
          if (order._id === orderId) {
            return { ...order, status: response.data.status };
          }
          return order;
        }));
      })
      .catch((error) => {
        console.error('Error updating order status:', error);
      });
  };

  return (
    <div className="all-orders">
      <h2 className="orders-heading">All Orders</h2>
      {orders.map((order) => (
        <div key={order._id} className="order-details">
          <h3 className="order-id">Order ID: {order._id}</h3>
          <table className="order-table">
            <thead>
              <tr>
                <th className="table-header">Title</th>
                <th className="table-header">Quantity</th>
                <th className="table-header">Price</th>
              </tr>
            </thead>
            <tbody>
              {order.books.map((book) => (
                <tr key={book.bookId._id} className="table-row">
                  <td className="table-data">{book.title}</td>
                  <td className="table-data">{book.quantity}</td>
                  <td className="table-data">{book.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="total">Total: {order.total}</p>
          <p className="status">Status: {order.status}</p>
          {order.status !== 'delivered' && (
            <button
              className="next-button"
              onClick={() => handleNextStatus(order._id, order.status)}
            >
              Next
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default AllOrders;
