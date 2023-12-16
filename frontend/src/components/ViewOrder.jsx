import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import "../Css/PatientHome.css";
import "../Css/Order.css";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import ReviewOrder from "./ReviewOrder";
import TopNavigation from "./TopNavigation";

const ViewOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const response = await Axios.get(
          `http://localhost:8000/api/v1/patient/viewAllOrders`,
          { withCredentials: true }
        );
        setAllOrders(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      }
    };

    fetchAllOrders();
  }, []);

  const handleViewOrder = async (event, value) => {
    try {
      const response = await Axios.get(
        `http://localhost:8000/api/v1/patient/viewOrder/${value}`,
        { withCredentials: true }
      );
      console.log(response.data);
      setOrder(response.data);
      setError(null);
    } catch (error) {
      setOrder(null);
      setError("Order not found");
    }
  };
  const handleCancelOrder = async () => {
    try {
      const response = await Axios.put(
        `http://localhost:8000/api/v1/patient/cancelOrder/${orderId}`,
        [],
        { withCredentials: true }
      );

      if (response.status === 204) {
        setOrder((prevOrder) => ({
          ...prevOrder,
          status: "cancelled",
        }));
      }
    } catch (error) {
      console.error("Error during order cancellation:", error.message);
    }
  };

  return (
    <div>
      <TopNavigation />
      <div className="order-container">
        <h2>View Order</h2>
        {/* Replace the input field with Autocomplete */}
        <Autocomplete
          options={allOrders.map((order) => order?._id)} // Assuming orderId is the property name for order IDs
          value={order?._id}
          onChange={handleViewOrder}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Select Order ID" variant="outlined" />
          )}
        />
        {order && (
          <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper
              variant="outlined"
              sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
            >
              <ReviewOrder order={order} />
              {order.status !== "cancelled" && (
                <button
                  onClick={handleCancelOrder}
                  className="button-container"
                >
                  Cancel Order
                </button>
              )}
            </Paper>
          </Container>
        )}
        <br />
        <br />
      </div>
    </div>
  );
};

export default ViewOrder;
