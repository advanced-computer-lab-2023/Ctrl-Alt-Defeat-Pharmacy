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
import TopNavigationAdmin from "./TopNavigationAdmin";
import "../Css/AddMedicine.css";

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

function PharmacistDetails() {
  const [username, setUsername] = useState("");
  const [pharmacists, setPharmacists] = useState([]);
  const [pharmacist, setPharmacist] = useState(null);

  useEffect(() => {
    const fetchAllPharmacists = async () => {
      try {
        const response = await Axios.get(
          "http://localhost:8000/api/v1/admin/getAllPharmacists",
          { withCredentials: true }
        );
        setPharmacists(response.data.data);
      } catch (error) {
        console.error("Error fetching pharmacists:", error);
      }
    };

    fetchAllPharmacists();
  }, []);

  const handleClick = (selectedUsername) => {
    const selectedPharmacist = pharmacists.find((p) => p.username === selectedUsername);
    setPharmacist(selectedPharmacist);
  };

  return (
    <div>
        <TopNavigationAdmin link="/admins/home" />
    <ThemeProvider theme={theme}>
      <div>
        {pharmacist && (
          <div>
            <Typography variant="h2">Pharmacist Information</Typography>
            <Typography variant="h3">Username: {pharmacist.username}</Typography>
            <Typography variant="h3">Name: {pharmacist.name}</Typography>
            <Typography variant="h3">Email: {pharmacist.email}</Typography>
            <Typography variant="h3">Date of Birth: {pharmacist.dateOfBirth}</Typography>
            <Typography variant="h3">Hourly Rate: {pharmacist.hourlyRate}</Typography>
            <Typography variant="h3">Affiliation: {pharmacist.affiliation}</Typography>
            <Typography variant="h3">Educational Background: {pharmacist.educationalBackground}</Typography>
          </div>
        )}
        <br />

        <Typography variant="h2">All Pharmacists</Typography>
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
                  <Typography variant="subtitle1">Hourly Rate</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1">Affiliation</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1">Educational Background</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pharmacists.map((pharmacist) => (
                <TableRow key={pharmacist._id}>
                  <TableCell component="th" scope="row" style={{ border: '1px solid #eee' }}>
                    {pharmacist.username}
                  </TableCell>
                  <TableCell style={{ border: '1px solid #eee' }}>{pharmacist.name}</TableCell>
                  <TableCell style={{ border: '1px solid #eee' }}>{pharmacist.email}</TableCell>
                  <TableCell style={{ border: '1px solid #eee' }}>{pharmacist.dateOfBirth}</TableCell>
                  <TableCell style={{ border: '1px solid #eee' }}>{pharmacist.hourlyRate}</TableCell>
                  <TableCell style={{ border: '1px solid #eee' }}>{pharmacist.affiliation}</TableCell>
                  <TableCell style={{ border: '1px solid #eee' }}>{pharmacist.educationalBackground}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </ThemeProvider>
    </div>
  );
}

export default PharmacistDetails;
