// RemovePatients.jsx
import React, { useState } from "react";
import axios from "axios";

const RemovePatients = () => {
  const [username, setUsername] = useState("");

  const handleRemovePatient = async () => {
    try {
      await axios.delete(
        `http://localhost:8000/api/v1/admin/removePatient/${username}`
      );
      setUsername("");
    } catch (error) {
      console.error("Error removing patient:", error);
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
    </div>
  );
};

export default RemovePatients;
