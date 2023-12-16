import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import TopNavigationPharmacist from "./TopNavigationPharmacist";

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
      <TopNavigationPharmacist link="/pharmacists/home" />

    </div>
  );
}

export default PharmacistHome;
