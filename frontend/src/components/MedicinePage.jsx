import React, { useState, useEffect } from "react";
import Axios from "axios";
import "../Css/MedicinePage.css";
import "../Css/PatientHome.css";
import { Link } from "react-router-dom";

function PatientMedicinesPage() {
  const [medicines, setMedicines] = useState([]);
  const [medicalUseFilter, setMedicalUseFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchMedicines = async () => {
    const response = await Axios.get(
      "http://localhost:4000/api/v1/pharmacy/getAllMedicine",
      { withCredentials: true }
    );
    setMedicines(response.data.data);
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleFilter = async () => {
    const filteredMedicines = await Axios.get(
      `http://localhost:4000/api/v1/pharmacy/medicine/searchByMedicalUse/${medicalUseFilter}`,
      { withCredentials: true }
    );
    setMedicines(filteredMedicines.data.data);
  };

  const handleSearch = async () => {
    const searchedMedicines = await Axios.get(
      `http://localhost:4000/api/v1/pharmacy/medicine/searchByName/${searchTerm}`,
      { withCredentials: true }
    );
    setMedicines(searchedMedicines.data.data);
  };

  return (
    <div>
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

        {medicines && (
          <div>
            <h2>List of Available Medicines</h2>
            <ul className="medicine-list">
              {medicines.map((medicine) => (
                <li key={medicine._id} className="medicine-item">
                  <strong>Name: {medicine.name}</strong>
                  <p>Price: ${medicine.price}</p>
                  <img src={medicine.picture} alt="pic" width="150px" />
                  <p>Description: {medicine.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {/* <Link to="/admins/home">home</Link> */}
    </div>
  );
}

export default PatientMedicinesPage;
