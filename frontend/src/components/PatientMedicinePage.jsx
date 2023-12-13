import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import "../Css/MedicinePage.css";
import "../Css/PatientHome.css";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";

function PatientMedicinesPage() {
  const [medicines, setMedicines] = useState([]);
  const [medicalUseFilter, setMedicalUseFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [medicineMessages, setMedicineMessages] = useState({});

  const fetchMedicines = async () => {
    const response = await Axios.get(
      "http://localhost:8000/api/v1/pharmacy/getAllMedicine",
      { withCredentials: true }
    );
    setMedicines(response.data.data);
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleFilter = async () => {
    const filteredMedicines = await Axios.get(
      `http://localhost:8000/api/v1/pharmacy/medicine/searchByMedicalUse/${medicalUseFilter}`,
      { withCredentials: true }
    );
    setMedicines(filteredMedicines.data.data);
  };

  const handleSearch = async () => {
    const searchedMedicines = await Axios.get(
      `http://localhost:8000/api/v1/pharmacy/medicine/searchByName/${searchTerm}`,
      { withCredentials: true }
    );
    setMedicines(searchedMedicines.data.data);
  };

  const addToCart = async (medicineName) => {
    try {
      const response = await Axios.post(
        "http://localhost:8000/api/v1/patient/addToCart",
        {
          medicineName,
          quantity: 1,
        },
        { withCredentials: true }
      );
      console.log(response.data);
      setMedicineMessages({
        ...medicineMessages,
        [medicineName]: { message: "Medicine is added to Cart", error: null },
      });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setMedicineMessages({
          ...medicineMessages,
          [medicineName]: { message: null, error: error.response.data.error },
        });
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <div>
      <div className="top-navigation">
        <Link to="/patients/home">CTRL-ALT-DEFEAT Pharmacy</Link>
        <Link to="/patients/home">Home</Link>
        <Link to="/patients/medicines">Medicines</Link>
        <Link to="/patients/viewOrder">Orders</Link>
        <Link to="/patients/viewCart">Cart</Link>
      </div>
      <div className="medicine-container">
        <div className="filter-search-section">
          <div className="search-section">
            <h2>Search for Medicine</h2>
            <input
              type="text"
              placeholder="Enter Medicine Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-button" onClick={handleSearch}>
              Search
            </button>
          </div>
          <div className="filter-section">
            <h2>Filter by Medical Use</h2>
            <input
              type="text"
              placeholder="Enter Medical Use"
              value={medicalUseFilter}
              onChange={(e) => setMedicalUseFilter(e.target.value)}
            />
            <button className="filter-button" onClick={handleFilter}>
              Filter by Medical Use
            </button>
          </div>
        </div>

        <h2>Available Medicines</h2>
        {medicines && (
          <div>
            <ul className="medicine-list">
              {medicines.map((medicine) => (
                <li key={medicine._id} className="medicine-item">
                  <img src={medicine.picture} alt="pic" width="150px" />
                  <strong>{medicine.name}</strong>
                  <p>
                    <br /> {medicine.description}
                  </p>
                  <p>Starts from ${medicine.price}</p>

                  {medicine.quantity > 0 ? (
                    <Button
                      variant="contained"
                      color="primary"
                      className="add-to-cart-button"
                      onClick={() => addToCart(medicine.name)}
                      startIcon={<AddIcon />}
                    >
                      Add to Cart
                    </Button>
                  ) : (
                    <Button variant="contained" color="grey" disabled>
                      Unavailable
                    </Button>
                  )}
                  <div className="cart-message">
                    {medicineMessages[medicine.name]?.message}
                  </div>
                  <div className="cart-error">
                    {medicineMessages[medicine.name]?.error}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <br />
    </div>
  );
}

export default PatientMedicinesPage;
