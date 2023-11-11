import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AdminHome() {
  const handleLogout = async () => {
    const response = await axios.get(
      "http://localhost:8000/api/v1/auth/logout",
      { withCredentials: true }
    );
    console.log(response.data);
  };
  return (
    <div>
      <h2>Welcome, Admin!</h2>
      <ul>
        <li>
          <Link to="/admins/addAdmin">Add Admin</Link>
        </li>
        {/* <li>
          <Link to="/admin/removeAdmin">Remove Admin</Link>
        </li> */}
        <li>
          <Link to="/admins/removePharmacist">Remove Pharmacist</Link>
        </li>
        <li>
          <Link to="/admins/removePatient">Remove Patient</Link>
        </li>
        <li>
          <Link to="/admins/viewPendingPharmacists">
            View Pending Pharmacists
          </Link>
        </li>
        {/* 
        <li>
          <Link to="/admin/addPackage">Add Package</Link>
        </li>
        <li>
          <Link to="/admin/updatePackage">Update Package</Link>
        </li>
        <li>
          <Link to="/admin/deletePackage">Delete Package</Link>
        </li> */}
        <li>
          <Link to="/" onClick={handleLogout}>
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default AdminHome;
