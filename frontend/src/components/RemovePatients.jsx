// RemovePatients.jsx
import React, { useState } from "react";
import axios from "axios";

const RemovePatients = () => {
  const [patientIdInput, setPatientIdInput] = useState("");

  const handleRemovePatient = async () => {
    try {
      await axios.delete(
        `http://localhost:4000/api/v1/Pharmacy/patient/${patientIdInput}`
      );
      setPatientIdInput("");
    } catch (error) {
      console.error("Error removing patient:", error);
    }
  };

  return (
    <div>
      <h1>Remove Patient</h1>
      <label htmlFor="patientIdInput">Enter Patient ID:</label>
      <input
        type="text"
        id="patientIdInput"
        value={patientIdInput}
        onChange={(e) => setPatientIdInput(e.target.value)}
      />
      <button onClick={handleRemovePatient}>Remove Patient</button>
    </div>
  );
};

export default RemovePatients;
