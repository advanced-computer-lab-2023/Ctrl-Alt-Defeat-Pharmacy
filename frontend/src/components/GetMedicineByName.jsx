import React, { useState } from "react";
import Axios from "axios";

function GetMedicineByName() {
  const [medicineName, setMedicineName] = useState("");
  const [medicine, setMedicine] = useState(null);

  const handleClick = async (e) => {
    e.preventDefault();

    const medicineSearched = await Axios.get(
      `http://localhost:8000/api/v1/pharmacy/medicine/searchByName/${medicineName}`
    );
    console.log(medicineSearched.data.data);
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
      <h2>Medicine Information</h2>
      {medicine &&
        medicine.map((el, idx) => (
          <div style={{ border: "1px solid black", width: "fit-content" }} key={idx}>
            <ul>
              <li>Name: {el.name}</li>
              <li>Price: {el.price}</li>
              <li>Description: {el.description}</li>
              <li>Quantity: {el.quantity}</li>
              <li>Sales: {el.sales}</li>
              <li>Ingredients: {el.ingredients.toString()}</li>
              <li>Medical Use: {el.medicalUse}</li>
            </ul>
          </div>
        ))}
    </div>
  );
}

export default GetMedicineByName;
