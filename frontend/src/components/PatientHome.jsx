import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function PatientHome() {
  const [patient, setPatient] = useState(null);
  const handleLogout = async () => {
    const response = await axios.get(
      "http://localhost:8000/api/v1/auth/logout",
      { withCredentials: true }
    );
    console.log(response.data);
  };

  const showData = async () => {
    const response = await axios.get(
      "http://localhost:8000/api/v1/auth/getMe",
      { withCredentials: true }
    );
    console.log(response.data);
    setPatient(response.data.loggedIn);
  };
  return (
    <div>
      <h2>welcome, patient!</h2>
      <button onClick={showData}>show me</button>
      {patient && (
        <div>
          <p>name: {patient.name}</p>
          <p>username: {patient.username}</p>
          <p>email: {patient.email}</p>
        </div>
      )}
      <ul>
        <li>
          <Link to="/" onClick={handleLogout}>
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default PatientHome;
