import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function GetMedicineByName() {
  const [medicineName, setMedicineName] = useState("");
  const [medicine, setMedicine] = useState(null);

  const handleClick = async (e) => {
    e.preventDefault();

   
      const medicineSearched = await Axios.get(
        `http://localhost:4000/api/v1/Pharmacy/medicine/searchByName/${medicineName}`
      );
    console.log(medicineSearched.data)
      setMedicine(medicineSearched.data.data);
      
   
  };

 

  return (
    <div>
      <h2>Search for Medicine</h2>
      <form onSubmit={handleClick}>
        <div>
          <label>Enter Medicine Name:</label>
          <input
            type="text"
            value={medicineName}
            onChange={(e) => setMedicineName(e.target.value)}
            required
          />
          <button type="submit">Search</button>
        </div>
      </form>
      {medicine && (
        <div>
          <h2>Medicine Information</h2>
          <ul>
            <li>Name: {medicine.name}</li>
            <li>Price: {medicine.price}</li>
            <li>Description: {medicine.description}</li>
            <li>Quantity: {medicine.quantity}</li>
            <li>Sales: {medicine.sales}</li>
            <li>Ingredients:</li>
           
            <li>Medical Use: {medicine.medicalUse}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default GetMedicineByName;
