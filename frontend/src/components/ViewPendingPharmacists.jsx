import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ViewPendingPharmacists = () => {
  const [pendingPharmacists, setPendingPharmacists] = useState([]);

  const fetchPendingPharmacists = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/admin/pendingRequests",
        { withCredentials: true }
      );
      setPendingPharmacists(response.data.data);
    } catch (error) {
      console.error("Error fetching pending pharmacists:", error);
    }
  };

  useEffect(() => {
    fetchPendingPharmacists();
  }, []);

  const handleApprove = async (pharmacistUsername) => {
    try {
      await axios.put(
        `http://localhost:8000/api/v1/admin/approvePharmacist`,
        { username: pharmacistUsername },
        { withCredentials: true }
      );
      // Refresh the page after successful approval
      window.location.reload();
    } catch (error) {
      console.error("Error approving pharmacist:", error);
    }
  };

  const handleReject = async (pharmacistUsername) => {
    try {
      await axios.put(
        `http://localhost:8000/api/v1/admin/rejectPharmacist`,
        { username: pharmacistUsername },
        { withCredentials: true }
      );
      // Refresh the page after successful rejection
      window.location.reload();
    } catch (error) {
      console.error("Error rejecting pharmacist:", error);
    }
  };

  return (
    <div>
      <h1>Pending Pharmacist Requests</h1>
      <ul>
        {pendingPharmacists.map((pharmacist) => (
          <li key={pharmacist._id}>
            <h3>{pharmacist.name}</h3>
            <p>Email: {pharmacist.email}</p>
            <p>Date of Birth: {pharmacist.dateOfBirth}</p>
            <p>Hourly Rate: {pharmacist.hourlyRate}</p>
            <p>Affiliation: {pharmacist.affiliation}</p>
            <p>Educational Background: {pharmacist.educationalBackground}</p>
            <button onClick={() => handleApprove(pharmacist.username)}>
              Approve
            </button>
            <span> </span>
            <button onClick={() => handleReject(pharmacist.username)}>
              Reject
            </button>
          </li>
        ))}
      </ul>
      <br />
      <Link to="/admins/home">home</Link>
    </div>
  );
};

export default ViewPendingPharmacists;
