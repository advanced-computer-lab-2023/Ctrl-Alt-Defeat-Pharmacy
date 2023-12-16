import React, { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";
import { Container, ThemeProvider, createTheme } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    secondary: {
      main: "#ffc832",
    },
  },
});

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
    <ThemeProvider theme={theme}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <React.Fragment>
          <Container
            maxWidth="md"
            sx={{
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
              textAlign: "center",
              height: "700px",
            }}
          >
            <div>
              <div style={{ marginTop: "20px" }}>
                <PendingActionsRoundedIcon
                  style={{ fontSize: "35px", color: "#0076c0", marginBottom: "10px" }}
                />
                <h2 style={{ color: "#0076c0", marginTop: "0", marginBottom: "20px" }}>
                  Pending Pharmacist Requests
                </h2>
              </div>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Avatar</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Date of Birth</TableCell>
                      <TableCell>Hourly Rate</TableCell>
                      <TableCell>Affiliation</TableCell>
                      <TableCell>Educational Background</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pendingPharmacists.map((pharmacist) => (
                      <TableRow key={pharmacist._id}>
                        <TableCell>
                          <Stack direction="row" spacing={2}>
                          <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                              {pharmacist.name.charAt(0)}
                          </Avatar>
                          </Stack>
                        </TableCell>
                        <TableCell>{pharmacist.name}</TableCell>
                        <TableCell>{pharmacist.email}</TableCell>
                        <TableCell>{pharmacist.dateOfBirth}</TableCell>
                        <TableCell>{pharmacist.hourlyRate}</TableCell>
                        <TableCell>{pharmacist.affiliation}</TableCell>
                        <TableCell>{pharmacist.educationalBackground}</TableCell>
                        <TableCell>
                          <Button
                            onClick={() => handleApprove(pharmacist.username)}
                            variant="contained"
                            color="primary"
                          >
                            Approve
                          </Button>
                          <Button
                            onClick={() => handleReject(pharmacist.username)}
                            variant="contained"
                            color="secondary"
                          >
                            Reject
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Container>
        </React.Fragment>
      </div>
    </ThemeProvider>
  );
};

export default ViewPendingPharmacists;
