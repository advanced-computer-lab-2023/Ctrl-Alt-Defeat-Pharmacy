// ViewPendingPharmacists.jsx
import { useState } from "react";
import axios from "axios";

const ViewPendingPharmacists = () => {
  const [pendingPharmacists, setPendingPharmacists] = useState([]);

  const fetchPendingPharmacists = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/Pharmacy/pendingRequests"
      );
      setPendingPharmacists(response.data.data);
    } catch (error) {
      console.error("Error fetching pending pharmacists:", error);
    }
  };

  const handleFetchClick = () => {
    fetchPendingPharmacists();
  };

  return (
    <div>
      <h1>Pending Pharmacist Requests</h1>
      <button onClick={handleFetchClick}>Fetch Pending Pharmacists</button>
      <ul>
        {pendingPharmacists.map((pharmacist) => (
          <li key={pharmacist._id}>
            <h3>{pharmacist.name}</h3>
            <p>Email: {pharmacist.email}</p>
            <p>Date of Birth: {pharmacist.dateOfBirth}</p>
            <p>Hourly Rate: {pharmacist.hourlyRate}</p>
            <p>Affiliation: {pharmacist.affiliation}</p>
            <p>Educational Background: {pharmacist.educationalBackground}</p>
            {/* Add more details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewPendingPharmacists;
