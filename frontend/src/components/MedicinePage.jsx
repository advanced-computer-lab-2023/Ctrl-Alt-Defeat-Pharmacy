import { useState, useEffect } from "react";
import Axios from "axios";
import "../Css/MedicinePage.css";
import "../Css/PatientHome.css";
import TopNavigationPharmacist from "./TopNavigationPharmacist";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import Autocomplete from "@mui/material/Autocomplete";

function PatientMedicinesPage() {
  const [medicines, setMedicines] = useState([]);
  const [medicalUseFilter, setMedicalUseFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [allMedicalUses, setAllMedicalUses] = useState([]);
  const fetchMedicalUses = async () => {
    const response = await Axios.get(
      "http://localhost:8000/api/v1/pharmacy/getAllMedicine",
      { withCredentials: true }
    );
    setMedicines(response.data.data);
    setAllMedicalUses(
      Array.from(
        new Set(response.data.data.map((medicine) => medicine.medicalUse))
      )
    );
  };

  useEffect(() => {
    fetchMedicalUses();
  }, []);
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
    let filteredMedicines = medicines;
    if (value !== null) {
      filteredMedicines = await Axios.get(
        `http://localhost:8000/api/v1/pharmacy/medicine/searchByMedicalUse/${value}`,
        { withCredentials: true }
      );
      setAllMedicalUses(
        Array.from(
          new Set(
            filteredMedicines.data.data.map((medicine) => medicine.medicalUse)
          )
        )
      );
      filteredMedicines = filteredMedicines.data.data;
    } else {
      filteredMedicines = await Axios.get(
        `http://localhost:8000/api/v1/pharmacy/medicine/searchByMedicalUse/${"all"}`,
        { withCredentials: true }
      );
      setAllMedicalUses(
        Array.from(
          new Set(
            filteredMedicines.data.data.map((medicine) => medicine.medicalUse)
          )
        )
      );
      filteredMedicines = filteredMedicines.data.data;
    }
    setMedicines(filteredMedicines);
  };

  const handleSearch = async (value) => {
    setSearchTerm(value);
    let searchedMedicines = medicines;
    if (value !== "") {
      searchedMedicines = await Axios.get(
        `http://localhost:8000/api/v1/pharmacy/medicine/searchByName/${value}`,
        { withCredentials: true }
      );
      searchedMedicines = searchedMedicines.data.data;
    } else {
      searchedMedicines = await Axios.get(
        `http://localhost:8000/api/v1/pharmacy/medicine/searchByName/${"all"}`,
        { withCredentials: true }
      );
      searchedMedicines = searchedMedicines.data.data;
    }
    setMedicines(searchedMedicines);
  };

  return (
    <div>
      <TopNavigationPharmacist link="/pharmacists/home" />
      <div className="medicine-container">
        <div className="filter-search-section">
          <div className="search-section">
            <TextField
              type="text"
              placeholder="Search by Name"
              value={searchTerm}
              sx={{ width: 416 }}
              onChange={(e) => handleSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
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
              style={{ width: 416 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Medical Use"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        {""}
                        <FilterListIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </div>
        </div>

        {medicines && (
          <div>
            <h2>All Medications</h2>
            <ul className="medicine-list">
              {medicines.map((medicine) => (
                <li
                  key={medicine._id}
                  className={`medicine-item ${
                    medicine.archive ? "dimmed" : ""
                  }`}
                >
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
    </div>
  );
}

export default PatientMedicinesPage;
