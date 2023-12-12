import React, { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

function PatientDetails() {
  const [username, setUsername] = useState("");
  const [patient, setPatient] = useState(null);
  const handleClick = async (e) => {
    e.preventDefault();
    const patientInfo = await Axios.get(
      "http://localhost:4000/api/v1/admin/patientView/" + username,
      { withCredentials: true }
    );
    setPatient(patientInfo.data.data);
  };
  return (
    <div>
      <h2>View Patient</h2>
      <form onSubmit={handleClick}>
        <div>
          <label>Enter Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <button type="submit">View Patient Info</button>
        </div>
      </form>
      {patient && (
        <div>
          <h2>Patient Information</h2>
          <ul>
            <li>Username: {patient.username}</li>
            <li>Name: {patient.name}</li>
            <li>Email: {patient.email}</li>
            <li>Date of Birth: {patient.dateOfBirth}</li>
            <li>Gender: {patient.gender}</li>
            <li>Mobile Number: {patient.mobileNumber}</li>
            <li>
              Emergency Contact:
              <ul>
                <li>Full Name: {patient.emergencyContact.fullName}</li>
                <li>Mobile Number: {patient.emergencyContact.mobileNumber}</li>
              </ul>
            </li>
          </ul>
        </div>
      )}
      <br />
      <Link to="/admins/home">home</Link>
    </div>
  );
}

export default PatientDetails;
