// PharmacistDetails.js
import React, { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

function PharmacistDetails() {
  const [username, setUsername] = useState("");
  const [pharmacist, setPharmacist] = useState(null);

  const handleClick = async (e) => {
    e.preventDefault();
    const pharmacistInfo = await Axios.get(
      "http://localhost:8000/api/v1/admin/pharmacistView/" + username,
      { withCredentials: true }
    );
    setPharmacist(pharmacistInfo.data.data);
  };

  return (
    <div>
      <h2>View Pharmacist </h2>
      <form onSubmit={handleClick}>
        <div>
          <label>Enter Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <button type="submit">View Pharmacist Info</button>
        </div>
      </form>
      {pharmacist && (
        <div>
          <h2>Pharmacist Information</h2>
          <ul>
            <li>Username: {pharmacist.username}</li>
            <li>Name: {pharmacist.name}</li>
            <li>Email: {pharmacist.email}</li>
            <li>Date of Birth: {pharmacist.dateOfBirth}</li>
            <li>Hourly Rate: {pharmacist.hourlyRate}</li>
            <li>Affiliation: {pharmacist.affiliation}</li>
            <li>Educational Background: {pharmacist.educationalBackground}</li>
          </ul>
        </div>
      )}
      <br />
    </div>
  );
}

export default PharmacistDetails;
