import React, { useState, useEffect } from "react";
import Axios from "axios";


const Checkout = ({ patientId }) => {
  const [cart, setCart] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [newStreet, setNewStreet] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newCountry, setNewCountry] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckoutInitiated, setIsCheckoutInitiated] = useState(false);

  const fetchData = async () => {
    try {
      // Fetch cart details
      const cartResponse = await Axios.get(
        `http://localhost:8000/api/v1/pharmacy/viewCart/${patientId}` ,[],{withCredentials: true}
      );
      const cartData = cartResponse.data;

      // Fetch patient addresses
      const addressesResponse = await Axios.get(
        `http://localhost:8000/api/v1/pharmacy/getAddresses/${patientId}`,[],{withCredentials: true}
      );
      const addressesData = addressesResponse.data;

      setCart(cartData);
      setAddresses(addressesData.addresses);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [patientId]);

  const handleAddressSelection = async (e) => {
    e.preventDefault();
    setSelectedAddressId(e.target.value);
  };

  const handleNewStreetChange = (e) => {
    setNewStreet(e.target.value);
  };

  const handleNewCityChange = (e) => {
    setNewCity(e.target.value);
  };

  const handleNewCountryChange = (e) => {
    setNewCountry(e.target.value);
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setIsCheckoutInitiated(true);

    try {
      const requestData = {
        selectedAddressId,
        newAddress: {
          street: newStreet,
          city: newCity,
          country: newCountry,
        },
      };

      const response = await Axios.post(
        `/api/checkout/${patientId}`,
        requestData ,[],{withCredentials: true}
      );

      if (!response.data) {
        throw new Error("Checkout failed");
      }

      setSelectedAddressId("");
      setNewStreet("");
      setNewCity("");
      setNewCountry("");
      fetchData(); // Refetch data after checkout
    } catch (error) {
      console.error("Error during checkout:", error.message);
    }
  };

  if (isLoading) {
    return <p>Loading cart...</p>;
  }

  return (
    <div>
      {!cart || !cart.items || cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <h2>Your Cart</h2>
          {/* Display cart items here */}
          <ul>
            {cart.items.map((item) => (
              <li key={item.medicineId._id}>
                <strong>Name: {item.medicineId.name}</strong>
                <p>Quantity: {item.quantity}</p>
              </li>
            ))}
          </ul>
        </>
      )}

      {isCheckoutInitiated && (
        <>
          <label>Select Address:</label>
          <select onChange={handleAddressSelection}>
            <option value="">Select an Address</option>
            {addresses.map((address) => (
              <option key={address._id} value={address._id}>
                {address.street}, {address.city}, {address.country}
              </option>
            ))}
          </select>

          <div>
            <h2>Add New Address</h2>
            <label>Street:</label>
            <input
              type="text"
              value={newStreet}
              onChange={handleNewStreetChange}
            />

            <label>City:</label>
            <input type="text" value={newCity} onChange={handleNewCityChange} />

            <label>Country:</label>
            <input
              type="text"
              value={newCountry}
              onChange={handleNewCountryChange}
            />
          </div>
        </>
      )}

      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default Checkout;