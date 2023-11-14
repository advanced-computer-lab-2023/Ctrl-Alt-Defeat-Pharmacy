// RemovePharmacists.jsx
import React, { useState } from 'react';
import axios from 'axios';

const RemovePharmacists = () => {
  const [username, setUsername] = useState('');

  const handleRemovePharmacist = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/admin/removePharmacist/${username}`,[],{withCredentials: true});
      setUsername('');
    } catch (error) {
      console.error('Error removing pharmacist:', error);
    }
  };

  return (
    <div>
      <h1>Remove Pharmacist</h1>
      <label htmlFor="pharmacistIdInput">Enter Pharmacist username:</label>
      <input
        type="text"
        id="pharmacistIdInput"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleRemovePharmacist}>Remove Pharmacist</button>
    </div>
  );
};

export default RemovePharmacists;
