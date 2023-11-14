// RemovePatients.jsx
import React, { useState } from "react";
import axios from "axios";

const RemovePatients = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const handleRemovePatient = async () => {
    try {
      await axios.delete(
        `http://localhost:8000/api/v1/admin/removePatient/${username}`,{withCredentials: true}
      );
      setUsername("");
      setMessage("Patient removed successfully");
    } catch (error) {
      console.error("Error removing patient:", error);
      setMessage("Error removing patient");
    }
  };

  return (
    <div>
      <h1>Remove Patient</h1>
      <label htmlFor="patientIdInput">Enter Patient username:</label>
      <input
        type="text"
        id="patientIdInput"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleRemovePatient}>Remove Patient</button>
      <p>{message}</p>
    </div>
  );
};

export default RemovePatients;
