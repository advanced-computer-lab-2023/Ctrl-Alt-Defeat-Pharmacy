import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container } from "@mui/material";
import PersonRemoveAlt1RoundedIcon from '@mui/icons-material/PersonRemoveAlt1Rounded';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TopNavigationAdmin from "./TopNavigationAdmin";
import "../Css/AddMedicine.css";

const RemovePharmacists = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [pharmacists, setPharmacists] = useState([]);
  const [selectedPharmacist, setSelectedPharmacist] = useState("");

  useEffect(() => {
    const getAllPharmacists = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/admin/getAllPharmacists",
          { withCredentials: true }
        );
  
        console.log("API Response:", response); // Log the entire response
  
        if (Array.isArray(response.data.data)) {
          setPharmacists(response.data.data);
        } else {
          console.error("Response data's 'data' property is not an array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching pharmacists:", error);
      }
    };
  
    getAllPharmacists();
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleRemovePharmacist = async () => {
    try {
      // Use the selectedPharmacist for the removal operation
      await axios.delete(
        `http://localhost:8000/api/v1/admin/removePharmacist/${selectedPharmacist}`,
        { withCredentials: true }
      );
  
      // Update the dropdown menu by filtering out the removed pharmacist
      setPharmacists((prevPharmacists) =>
        prevPharmacists.filter((pharmacist) => pharmacist.username !== selectedPharmacist)
      );
  
      setUsername("");
      setMessage("Pharmacist removed successfully");
    } catch (error) {
      console.error("Error removing pharmacist:", error);
      setMessage("Error removing pharmacist");
    }
  };
  

  return (
    <div>
        <TopNavigationAdmin link="/admins/home" />
    <div className="add-medicine-container">
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <React.Fragment>
        <Container maxWidth="sm" sx={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px', textAlign: 'center' }}>
          <div style={{ marginTop: '20px' }}>
            <PersonRemoveAlt1RoundedIcon style={{ fontSize: '35px', color: '#0076c0', marginBottom: '10px' }} />
            <h2 style={{ color: '#0076c0', marginTop: '0', marginBottom: '20px' }}>Remove Pharmacist</h2>
          </div>
          <FormControl variant="filled" sx={{ m: 1, minWidth: 220 }}>
            <InputLabel id="pharmacistDropdown-label">Select Pharmacist</InputLabel>
            <Select
              labelId="pharmacistDropdown-label"
              id="pharmacistDropdown"
              value={selectedPharmacist}
              onChange={(e) => setSelectedPharmacist(e.target.value)}
              label="Select Pharmacist"
              sx={{ textAlign: 'left' }} // Add this style
            >
              <MenuItem value="" disabled>
                Select Pharmacist
              </MenuItem>
              {pharmacists.map((pharmacist) => (
                <MenuItem key={pharmacist.id} value={pharmacist.username}>
                  {pharmacist.username}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <br />
          <button onClick={handleRemovePharmacist}>Remove</button>
          <p>{message}</p>
        </Container>
      </React.Fragment>
    </div>
    </div>
    </div>
  );
  
  
};

export default RemovePharmacists;
