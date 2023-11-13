import React, { useState } from "react";
import Axios from "axios";

const ViewOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  const handleViewOrder = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.get(
        `http://localhost:8000/api/v1/pharmacy/viewOrder/${orderId}`,{withCredentials: true}
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
        `http://localhost:8000/api/v1/pharmacy/cancelOrder/${orderId}`,[],{withCredentials: true}
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
          <h3>Order Details</h3>
          <p>Order ID: {order._id}</p>
          <p>Status: {order.status}</p>

          <h4>Items:</h4>
          <ul>
            {order.items.map((item) => (
              <li key={item.medicineId._id}>
                <strong>Name: {item.medicineId.name}</strong>
                <p>Quantity: {item.quantity}</p>
              </li>
            ))}
          </ul>

          <p>Total Price: {order.totalPrice}</p>

          {/* Display other order details as needed */}

          {order.status !== "cancelled" && (
            <button onClick={handleCancelOrder}>Cancel Order</button>
          )}
        </div>
      )}

      {error && <p>{error}</p>}
    </div>
  );
};

export default ViewOrder;