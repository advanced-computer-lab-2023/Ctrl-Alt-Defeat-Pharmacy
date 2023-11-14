import React, { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import "../Css/PatientHome.css";
import "../Css/Order.css"; 

const ViewOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  const handleViewOrder = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.get(
        `http://localhost:8000/api/v1/patient/viewOrder/${orderId}`,
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
      <div className="top-navigation">
          <Link to="/patients/home">CTRL-ALT-DEFEAT Pharmacy</Link>
          <Link to="/patients/home">Home</Link>
          <Link to="/patients/medicines">Medicines</Link>
          <Link to="/patients/viewOrder">Orders</Link>
          <Link to="/patients/viewCart">Cart</Link>
        </div>
      <div className="checkout-container"> 
        <h2>View Order</h2>
        <form onSubmit={handleViewOrder}>
          <label>
            Enter Order ID:
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
            />
          </label>
          <button type="submit">View Order</button>
        </form>

        {order && (
          <div>
            <h2>Order Details</h2>
            <p className="text-center">Order ID: {order._id}</p>
            <p className="text-center">Status: {order.status}</p>
            <p className="text-center">Order Date: {order.Date}</p>

            <h2>Delivery Address:</h2>
            <p className="text-center">Street: {order.address.street}</p>
            <p className="text-center">City: {order.address.city}</p>
            <p className="text-center">Country: {order.address.country}</p>

            <h2>Items:</h2>
            {order.items && order.items.length > 0 ? (
              <ul>
                {order.items.map((item) => (
                  <li key={item.medicineId._id} className="checkout-item">
                    <strong>Name: {item.medicineId.name}</strong>
                    <h4>Quantity: {item.quantity}</h4>
                    <img
                      src={item.medicineId.picture}
                      alt={item.medicineId.name}
                      className="medicine-picture"
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <p>Your cart is empty</p>
            )}

            <div>
              <strong>Total Price: {order.totalPrice}</strong>
            </div>

            <br />

            <div>
              {order.status !== "cancelled" && (
                <button onClick={handleCancelOrder} className="button-container">Cancel Order</button>
              )}
            </div>
          </div>
        )}

        {error && <p>{error}</p>}
      </div>
    </div>  
  );
};

export default ViewOrder;
