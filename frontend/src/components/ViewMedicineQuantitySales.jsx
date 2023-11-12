import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewMedicineQuantitySales = () => {
  const [medicineData, setMedicineData] = useState([]);

  const fetchMedicineQuantitySales = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/pharmacist/quantities",[], { withCredentials: true }
      );
      setMedicineData(response.data.data);

      // Save the data to sessionStorage
      sessionStorage.setItem(
        "medicineData",
        JSON.stringify(response.data.data)
      );
    } catch (error) {
      console.error("Error fetching medicine quantity and sales:", error);
    }
  };

  const handleFetchClick = () => {
    fetchMedicineQuantitySales();
  };

  useEffect(() => {
    // Load data from sessionStorage on component mount
    const storedData = sessionStorage.getItem("medicineData");
    if (storedData) {
      setMedicineData(JSON.parse(storedData));
    }

    // Clear sessionStorage when the component is unmounted
    return () => {
      sessionStorage.clear();
    };
  }, []);

  return (
    <div>
      <h1>Medicine Quantity and Sales</h1>
      <button onClick={handleFetchClick}>
        Fetch Medicine Quantity and Sales
      </button>
      <ul>
        {medicineData.map((medicine) => (
          <li key={medicine._id}>
            <h3>{medicine.name}</h3>
            <p>Quantity: {medicine.quantity}</p>
            <p>Sales: {medicine.sales}</p>
            {/* Add more details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewMedicineQuantitySales;
