import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import "../Css/MedicinePage.css";
import "../Css/PatientHome.css";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  TextField,
  InputAdornment,
  IconButton,
  MenuItem,
  Autocomplete,
  InputLabel,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

function PatientMedicinesPage() {
  const [medicines, setMedicines] = useState([]);
  const [medicalUseFilter, setMedicalUseFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [medicineMessages, setMedicineMessages] = useState({});
  const allMedicalUses = [
    ...new Set(medicines.map((medicine) => medicine.medicalUse)),
  ];

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

  const handleFilter = async (value) => {
    setMedicalUseFilter(value);
    const filteredMedicines = await Axios.get(
      `http://localhost:8000/api/v1/pharmacy/medicine/searchByMedicalUse/${medicalUseFilter}`,
      { withCredentials: true }
    );
    setMedicines(filteredMedicines.data.data);
  };

  const handleClearFilter = () => {
    setMedicalUseFilter("");
  };
  const handleSearch = async (value) => {
    setSearchTerm(value);
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
            <TextField
              type="text"
              placeholder="Search by Name"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton onClick={handleSearch}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {/* <button className="search-button" onClick={handleSearch}>
              Search
            </button> */}
          </div>
          <div className="filter-section">
            {/* <InputLabel id="Filter by Medical Use">
              Filter by Medical Use
            </InputLabel> */}
            <Autocomplete
              value={medicalUseFilter}
              onChange={(e, newValue) => handleFilter(newValue)}
              options={allMedicalUses}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Medical Use" />
              )}
            />
          </div>
        </div>

        <h2 style={{ color: "grey" }}>Available Medicines</h2>
        {medicines && (
          <div>
            <ul className="medicine-list">
              {medicines.map((medicine) => (
                <li key={medicine._id} className="medicine-item">
                  <img src={medicine.picture} alt="pic" width="150px" />
                  <strong>{medicine.name}</strong>
                  <p style={{ color: "grey" }}>
                    <br /> {medicine.description}
                    <br />
                    {medicine.quantity === 0 && (
                      <span style={{ color: "red" }}>
                        Currently Unavailable
                      </span>
                    )}
                  </p>
                  <p style={{ color: "#0076c0" }}>
                    Starts from ${medicine.price}
                  </p>

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
