import React, { useEffect, useState } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import axios from 'axios';
import { TableContainer, Paper } from '@mui/material';

// Function to create order data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders when the component mounts
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/admin/getAllOrders",
        { withCredentials: true }
      );
      const data = response.data;

      if (data.status === 'success') {
        // Assuming data.data is an array of orders
        setOrders(data.data);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Address</TableCell>
              {/* Add more header cells based on your order properties */}
              <TableCell>Status</TableCell>
              <TableCell align="right">Total Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{new Date(order.Date).toLocaleString()}</TableCell>
                <TableCell>{`${order.address.street}, ${order.address.city}, ${order.address.country}`}</TableCell>
                {/* Add more cells based on your order properties */}
                <TableCell>{order.status}</TableCell>
                <TableCell align="right">{`$${order.totalPrice}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}