import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Css/PatientHome.css"; 

function PatientHome() {
  const [patient, setPatient] = useState(null);

  const handleLogout = async () => {
    const response = await axios.get(
      "http://localhost:8000/api/v1/auth/logout", { withCredentials: true }
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
      <div className="top-navigation">
        <Link to="/" className="logo">Logo</Link>
        <Link to="/patients/home">Home</Link>
        <Link to="/patients/medicines">Medicines</Link>
        <Link to="/patients/viewOrder">Orders</Link>
        <Link to="/patients/addToCart">AddToCart</Link>
        <Link to="/patients/viewCart">Cart</Link>
        <Link to="/" className="right" onClick={handleLogout}>Logout</Link>
      </div>

      <div className="center-content">
        <h2>Welcome to Ctrl-Alt-Defeat Pharmacy</h2>
      </div>

      <div>
        <h2>Welcome, patient!</h2>
        <button onClick={showData}>show me</button>
        {patient && (
          <div>
            <p>name: {patient.name}</p>
            <p>username: {patient.username}</p>
            <p>email: {patient.email}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PatientHome;
