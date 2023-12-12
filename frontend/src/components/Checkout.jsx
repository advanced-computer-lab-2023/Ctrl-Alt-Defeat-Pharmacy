import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import "../Css/Checkout.css";
import "../Css/PatientHome.css";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  useEffect(() => {
    const checkout = async () => {
      const url = new URL(window.location.href);
      const queryParams = new URLSearchParams(url.search);
      const success = queryParams.get("success");
      const addressId = queryParams.get("addressId");
      if (!success) return;

      try {
        const response = await Axios.post(
          "http://localhost:4000/api/v1/patient/checkout",
          { addressId },
          { withCredentials: true }
        );

        if (!response.data) {
          throw new Error("Checkout failed");
        }

        setCheckoutMessage(
          `Order placed successfully. Order ID: ${response.data._id}`
        );
        setSelectedAddressId("");
        fetchData();
        window.history.replaceState(
          {},
          document.title,
          "/patients/healthPackages"
        );
      } catch (error) {
        console.error("Error during checkout:", error.message);
        setCheckoutMessage("Failed to place the order. Please try again.");
      }
    };
    fetchData();
    checkout();
  }, []);

  const fetchData = async () => {
    try {
      const cartResponse = await Axios.get(
        `http://localhost:4000/api/v1/patient/viewCart`,
        { withCredentials: true }
      );
      const cartData = cartResponse.data;
      setCart(cartData);

      const addressesResponse = await Axios.get(
        `http://localhost:4000/api/v1/patient/getAddresses`,
        { withCredentials: true }
      );
      const addressesData = addressesResponse.data;
      setAddresses(addressesData.addresses);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAddressSelection = (e) => {
    setSelectedAddressId(e.target.value);
  };

  const handleCheckout = async () => {
    try {
      const response = await Axios.post(
        "http://localhost:4000/api/v1/patient/createStripeCheckoutSession",
        { addressId: selectedAddressId },
        { withCredentials: true }
      );

      if (!response.data) {
        throw new Error("Checkout failed");
      }

      window.location = response.data.url;
    } catch (error) {
      console.error("Error during checkout:", error.message);
      setCheckoutMessage("Failed to place the order. Please try again.");
    }
  };

  const pay = async (e) => {
    e.preventDefault();
    if (!selectedAddressId) {
      setCheckoutMessage("Please select a delivery address.");
      return;
    }

    if (paymentMethod === "card") {
      handleCheckout();
    } else {
      try {
        const response = await Axios.post(
          "http://localhost:4000/api/v1/patient/checkout",
          {
            addressId: selectedAddressId,
            withWallet: paymentMethod === "wallet",
          },
          { withCredentials: true }
        );

        if (!response.data) {
          throw new Error("Checkout failed");
        }

        if (response.data.error) {
          setCheckoutMessage(response.data.error);
          return;
        }

        setCheckoutMessage(
          `Order placed successfully. Order ID: ${response.data._id}`
        );
        setSelectedAddressId("");
        fetchData();
      } catch (error) {
        console.error("Error during checkout:", error.message);
        setCheckoutMessage("Failed to place the order. Please try again.");
      }
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
        <div className="checkout-section">
          <h3>Your Cart</h3>
          {cart.items && cart.items.length > 0 ? (
            <ul>
              {cart.items.map((item) => (
                <li key={item.medicineId._id} className="checkout-item">
                  <strong>Name: {item.medicineId.name}</strong>
                  <p>Quantity: {item.quantity}</p>
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
        </div>

        <div className="checkout-section">
          <h3>Select Delivery Address:</h3>
          <select onChange={handleAddressSelection}>
            <option value="">Select an Address</option>
            {addresses.map((address) => (
              <option key={address._id} value={address._id}>
                {address.street}, {address.city}, {address.country}
              </option>
            ))}
          </select>
        </div>

        <div className="checkout-section">
          <h3> Pay With</h3>
          <div>
            <input
              type="radio"
              checked={paymentMethod === "cash"}
              id="cash"
              name="payment"
              value="cash"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="cash">Cash on delivery</label>
          </div>
          <div>
            <input
              type="radio"
              checked={paymentMethod === "card"}
              id="card"
              name="payment"
              value="card"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="card">Credit Card</label>
          </div>
          <div>
            <input
              type="radio"
              checked={paymentMethod === "wallet"}
              id="wallet"
              name="payment"
              value="wallet"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="wallet">Wallet</label>
          </div>
        </div>

        <div className="checkout-section">
          <h3>Payment summary</h3>
          <p>Subtotal: ${Math.floor(cart.totalPrice * 100) / 100}</p>
          <p>Delivery fee: $5</p>
          <p>Service fee: ${Math.floor(cart.totalPrice * 0.05 * 100) / 100}</p>
          <p>
            Total: $
            {Math.floor((cart.totalPrice + 5 + cart.totalPrice * 0.05) * 100) /
              100}
          </p>
        </div>

        <div>
          <button onClick={pay} className="checkout-button">
            Place Order
          </button>
          {checkoutMessage && (
            <p className="checkout-message">{checkoutMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
