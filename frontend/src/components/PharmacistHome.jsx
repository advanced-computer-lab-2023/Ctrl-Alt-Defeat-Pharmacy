import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

function PharmacistHome() {

  const handleLogout = async () => {
    const response = await Axios.get(
      "http://localhost:8000/api/v1/auth/logout",
      { withCredentials: true }
    );
    console.log(response.data);
  };
 
  const showData = async () => {
    try {
      const response = await Axios.get(
        "http://localhost:8000/api/v1/auth/getMe",
        { withCredentials: true }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <h1>Pharmacist Home</h1>
      <h3>Hello, Pharmacist</h3>
      <br />
      <Link to="/pharmacists/medicines">View Medicines</Link>
      <br />
      <Link to="/pharmacists/addMedicine">Add Medicine</Link>
      <br />
      <Link to="/pharmacists/editMedicine">Edit Medicine</Link>
      <br />
      <Link to="/pharmacists/viewMedicineQuantitySales">View Medicine Quantity Sales</Link>
      <br/>
      <Link to="/pharmacists/fileUpload">FileUpload</Link>
      <br/>
      <Link to="/" onClick={handleLogout}>
        Logout
      </Link>
      <br />
      <Link to="/changePassword">change password</Link>
    </div>
  );
}

export default PharmacistHome;
