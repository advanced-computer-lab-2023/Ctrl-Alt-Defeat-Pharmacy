import React, { useState } from "react";
import Axios from "axios";

function GetAllMedicine() {
  const [medicines, setMedicines] = useState([]);
  const [medicalUseFilter, setMedicalUseFilter] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();
    const allMedicines = await Axios.get(
      "http://localhost:8000/api/v1/pharmacy/getAllMedicine" ,[],{withCredentials: true}
    );
    setMedicines(allMedicines.data.data);
  };

  const handleFilter = async (e) => {
    e.preventDefault();
    const filteredMedicines = await Axios.get(
      `http://localhost:8000/api/v1/pharmacy/medicine/searchByMedicalUse/${medicalUseFilter}`,[],{withCredentials: true}
    );
    setMedicines(filteredMedicines.data.data);
  };

  return (
    <div>
      <div>
        <h2>Filter by Medical Use</h2>
        <input
          type="text"
          placeholder="Enter Medical Use"
          value={medicalUseFilter}
          onChange={(e) => setMedicalUseFilter(e.target.value)}
        />
        <button onClick={handleFilter}>Filter by Medical Use</button>
      </div>
      <button onClick={handleClick}>View All Medicines</button>
      {medicines && (
        <div>
          <h2>List of Available Medicines</h2>
          <ul>
            {medicines.map((medicine) => (
              <li key={medicine._id}>
                <strong>Name: {medicine.name}</strong>
                <p>Price: ${medicine.price}</p>
                <img src={medicine.picture} alt="pic" width='150px' />
                <p>Description: {medicine.description}</p>
                <p>Quantity: {medicine.quantity} in stock</p>
                <p>Sales: {medicine.sales} units sold</p>
                <p>Ingredients: {medicine.ingredients.join(", ")}</p>
                <p>Medical Use: {medicine.medicalUse}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default GetAllMedicine;
