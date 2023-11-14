import React, { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import "../Css/PatientHome.css"; 

const ViewOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  const handleViewOrder = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.get(
        `http://localhost:8000/api/v1/patient/viewOrder/${orderId}`,{withCredentials: true}
      );
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
        `http://localhost:8000/api/v1/patient/cancelOrder/${orderId}`,[],{withCredentials: true}
      );

      if (response.status === 204) {
        // Update order status locally after cancellation
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
        <Link to="/" className="logo">Logo</Link>
        <Link to="/patients/home">Home</Link>
        <Link to="/patients/medicines">Medicines</Link>
        <Link to="/patients/viewOrder">Orders</Link>
        <Link to="/patients/viewCart">Cart</Link>
     </div>
      <h2>View Order</h2>
      <form onSubmit={handleViewOrder}>
        <label>
          Enter Order ID:
          <input type="text" value={orderId} onChange={(e) => setOrderId(e.target.value)}/>
        </label>
        <button type="submit">View Order</button>
      </form>

      {order && (
        <div>
          <h3>Order Details</h3>
          <p>Order ID: {order._id}</p>
          <p>Status: {order.status}</p>
          <p>Order Date: {order.Date}</p>

          <h4>Delivery Address:</h4>
          <p>{order.address.street}</p>
          <p>{order.address.city}</p>
          <p>{order.address.country}</p>

          <h4>Items:</h4> 
          <ul>
            {order.items.map((item) => (
              <li key={item.medicineId._id}>
                <strong>Name: {item.medicineId.name}</strong>
                <p>Quantity: {item.quantity}</p>
                <img src={item.medicineId.picture} alt={item.medicineId.name} className="medicine-picture" />
              </li>
            ))}
          </ul>

          <div>
          <strong>Total Price: {order.totalPrice}</strong>
          </div>

          <div>    
          {order.status !== "cancelled" && (
            <button onClick={handleCancelOrder}>Cancel Order</button>
          )}
          </div>
        </div>
      )}

      {error && <p>{error}</p>}
    </div>
  );
};

export default ViewOrder;