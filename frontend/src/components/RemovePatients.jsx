// RemovePatients.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container } from "@mui/material";
import PersonRemoveAlt1RoundedIcon from '@mui/icons-material/PersonRemoveAlt1Rounded';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";



const RemovePatients = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");

  const getAllPatients = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/admin/getAllPatients",
        { withCredentials: true }
      );

      console.log("API Response:", response);

      if (Array.isArray(response.data.data)) {
        setPatients(response.data.data);
      } else {
        console.error("Response data's 'data' property is not an array:", response.data);
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  useEffect(() => {
    getAllPatients();
  }, []);

  const handleRemovePatient = async () => {
    try {
      await axios.delete(
        `http://localhost:8000/api/v1/admin/removePatient/${selectedPatient}`,
        { withCredentials: true }
      );
      setUsername("");
      setMessage("Patient removed successfully");
      // After successful removal, re-fetch the list of patients
      getAllPatients();
    } catch (error) {
      console.error("Error removing patient:", error);
      setMessage("Error removing patient");
    }
  };
  

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <React.Fragment>
        <Container maxWidth="sm" sx={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px', textAlign: 'center' }}>
          <div style={{ marginTop: '20px' }}>
            <PersonRemoveAlt1RoundedIcon style={{ fontSize: '35px', color: '#0076c0', marginBottom: '10px' }} />
            <h2 style={{ color: '#0076c0', marginTop: '0', marginBottom: '20px' }}>Remove Patient</h2>
          </div>
          <FormControl variant="filled" sx={{ m: 1, minWidth: 220 }}>
            <InputLabel id="patientsDropdown-label">Select Patient</InputLabel>
            <Select
              labelId="patientsDropdown-label"
              id="patientsDropdown"
              value={selectedPatient}
              onChange={(e) => setSelectedPatient(e.target.value)} // Fix this line
              label="Select Patient"
              sx={{ textAlign: 'left' }}
            >
              <MenuItem value="" disabled>
                Select Patient
              </MenuItem>
              {patients.map((patient) => (
                <MenuItem key={patient.id} value={patient.username}>
                  {patient.username}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <br />
          <button onClick={handleRemovePatient}>Remove</button>
          <p>{message}</p>
        </Container>
      </React.Fragment>
    </div>
  );
  
};

export default RemovePatients;
