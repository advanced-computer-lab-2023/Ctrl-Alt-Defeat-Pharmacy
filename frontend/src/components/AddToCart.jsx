import React, { useState } from 'react';
import axios from 'axios';

const AddToCart = () => {
  const [res, setRes] = useState(null);
  const [error, setError] = useState(null);
  const [medicineName, setMedicineName] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const quantityValue = parseInt(quantity, 10);

    try {
      const response = await axios.post('http://localhost:8000/api/v1/patient/addToCart', {
        medicineName,
        quantity: quantityValue,
      }, [] ,{ withCredentials: true });
      setRes(response);
      setError(null);

    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
        setRes(null);
      } else {
        console.error('Error:', error.message);
      }
    }
  };

  return (
    <div>
      <h1>Add a medicine to Cart</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Medicine Name:
          <input type="text" value={medicineName} onChange={(e) => setMedicineName(e.target.value)} />
        </label>
        <br />
        <label>
          Quantity:
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </label>
        <br />
        <button type="submit">Add Medicine</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {res && <div>New Item added to the cart</div>}
    </div>
  );
};

export default AddToCart;
