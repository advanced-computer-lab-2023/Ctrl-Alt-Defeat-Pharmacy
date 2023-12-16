import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0076c0",
    },
  },
  typography: {
    h2: {
      fontSize: "2rem",
      color: "#0076c0",
      marginBottom: "20px",
    },
    h3: {
      fontSize: "1.5rem",
      color: "#0076c0",
      marginBottom: "10px",
    },
    subtitle1: {
      fontSize: "1.2rem",
      color: "#fff",
    },
  },
});

function PatientDetails() {
  const [username, setUsername] = useState("");
  const [patients, setPatients] = useState([]);
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const fetchAllPatients = async () => {
      try {
        const response = await Axios.get(
          "http://localhost:8000/api/v1/admin/getAllPatients",
          { withCredentials: true }
        );
        setPatients(response.data.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchAllPatients();
  }, []);

  const handleClick = (selectedUsername) => {
    const selectedPatient = patients.find((p) => p.username === selectedUsername);
    setPatient(selectedPatient);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        {patient && (
          <div>
            {/* ... (patient information) */}
          </div>
        )}
        <br />

        <Typography variant="h2">All Patients</Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead style={{ backgroundColor: '#0076c0' }}>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle1">Username</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1">Name</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1">Email</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1">Date of Birth</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1">Gender</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1">Mobile Number</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1">Emergency Contact</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient._id}>
                  <TableCell component="th" scope="row" style={{ border: '1px solid #eee' }}>
                    {patient.username}
                  </TableCell>
                  <TableCell style={{ border: '1px solid #eee' }}>{patient.name}</TableCell>
                  <TableCell style={{ border: '1px solid #eee' }}>{patient.email}</TableCell>
                  <TableCell style={{ border: '1px solid #eee' }}>{patient.dateOfBirth}</TableCell>
                  <TableCell style={{ border: '1px solid #eee' }}>{patient.gender}</TableCell>
                  <TableCell style={{ border: '1px solid #eee' }}>{patient.mobileNumber}</TableCell>
                  <TableCell style={{ border: '1px solid #eee' }}>
                    {patient.emergencyContact && (
                      <>
                        {patient.emergencyContact.fullName}<br />
                        {patient.emergencyContact.mobileNumber}
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </ThemeProvider>
  );
}

export default PatientDetails;
