import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function GetAllMedicine() {
  const [medicines, setMedicines] = useState([]);
 
  const handleClick = async (e) => {
    e.preventDefault();
    const allMedicines = await Axios.get(
      "http://localhost:4000/api/v1/Pharmacy/medicine" 
    );
    console.log(allMedicines);
    setMedicines(allMedicines.data.data);
    console.log(medicines)
  };

  return (
    <div>
      <button onClick={handleClick}>View All Medicines</button>
      {medicines && (
        <div>
          <h2>List of Available Medicines</h2>
          <ul>
            {medicines.map((medicine) => (
              <li key={medicine._id}>
                <strong>Name: {medicine.name}</strong>
                <p>Price: ${medicine.price}</p>
                <p>Description: {medicine.description}</p>
                <p>Quantity: {medicine.quantity} in stock</p>
                <p>Sales: {medicine.sales} units sold</p>
                <p>Ingredients: {medicine.ingredients.join(', ')}</p>
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
