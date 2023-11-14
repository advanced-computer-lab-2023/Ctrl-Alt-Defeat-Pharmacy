// RemovePharmacists.jsx
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const RemovePharmacists = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const handleRemovePharmacist = async () => {
    try {
      await axios.delete(
        `http://localhost:8000/api/v1/admin/removePharmacist/${username}`,
        { withCredentials: true }
      );
      setUsername("");
      setMessage("Pharmacist removed successfully");
    } catch (error) {
      console.error("Error removing pharmacist:", error);
      setMessage("Error removing pharmacist");
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
      <p>{message}</p>
      <br />
      <Link to="/admins/home">home</Link>
    </div>
  );
};

export default RemovePharmacists;
