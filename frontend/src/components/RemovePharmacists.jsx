// RemovePharmacists.jsx
import React, { useState } from 'react';
import axios from 'axios';

const RemovePharmacists = () => {
  const [pharmacistIdInput, setPharmacistIdInput] = useState('');

  const handleRemovePharmacist = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/Pharmacy/pharmacist/${pharmacistIdInput}`);
      setPharmacistIdInput('');
    } catch (error) {
      console.error('Error removing pharmacist:', error);
    }
  };

  return (
    <div>
      <h1>Remove Pharmacist</h1>
      <label htmlFor="pharmacistIdInput">Enter Pharmacist ID:</label>
      <input
        type="text"
        id="pharmacistIdInput"
        value={pharmacistIdInput}
        onChange={(e) => setPharmacistIdInput(e.target.value)}
      />
      <button onClick={handleRemovePharmacist}>Remove Pharmacist</button>
    </div>
  );
};

export default RemovePharmacists;
