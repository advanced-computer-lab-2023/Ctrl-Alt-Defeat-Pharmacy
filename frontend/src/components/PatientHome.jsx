import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function PatientHome() {
  const [patient, setPatient] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await axios.get(
      "http://localhost:8000/api/v1/auth/logout", [],
      { withCredentials: true }
    );
    console.log(response.data);
  };

  const showData = async () => {
    const response = await axios.get(
      "http://localhost:8000/api/v1/auth/getMe",[],
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
        <li>
          <Link to="/patients/medicines" onClick={navigate('/patients/medicines')}>
            View All Medicines
          </Link>
        </li>
        <li>
          <Link to="/patients/addToCart" onClick={navigate('/patients/addToCart')}>
            Add to Cart
          </Link>
        </li>
        <li>
          <Link to="/patients/viewCart" onClick={navigate('/patients/viewCart')}>
            View Cart
          </Link>
        </li>
        <li>
          <Link to="/patients/viewOrder" onClick={navigate('/patients/viewOrder')}>
            View Order
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default PatientHome;
