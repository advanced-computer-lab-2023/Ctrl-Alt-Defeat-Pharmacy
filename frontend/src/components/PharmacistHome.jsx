import { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import "../Css/PatientHome.css";
import { ListItemText } from "@mui/material";

import LockIcon from "@mui/icons-material/Lock";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Icon from "@mui/material/Icon";
import Button from "@mui/material/Button";
import TopNavigationPharmacist from "./TopNavigationPharmacist";

function PharmacistHome() {
  const [patient, setPatient] = useState(null);

  const showData = async () => {
    const response = await Axios.get(
      "http://localhost:8000/api/v1/auth/getMe",
      { withCredentials: true }
    );
    console.log(response.data);
    setPatient(response.data.loggedIn);
  };

  useEffect(() => {
    showData();
  }, []);

  return (
    <div>
      <div>
        <TopNavigationPharmacist link="/pharmacists/medicines" />
      </div>
      <div className="main-container">
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <div className="welcome-section">
              <div style={{ display: "flex", alignItems: "center" }}>
                <h2 style={{ color: "grey", marginLeft: "10px" }}>
                  View Profile
                </h2>
              </div>
              {patient && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <AccountCircleIcon
                    style={{
                      fontSize: "150px",
                      color: "grey",
                    }}
                  />
                  <div style={{ width: "100%" }}>
                    <ListItemText
                      primary={patient.name}
                      secondary={`(@${patient.username})`}
                    />
                    <ListItemText secondary={patient.email} />
                    <ListItemText
                      primary={`Wallet: $${Math.floor(patient.wallet)}`}
                    />
                    <div>
                      <Link
                        to="/changePassword"
                        style={{ textDecoration: "none" }}
                      >
                        <Button
                          className="changepassword-button"
                          style={{ marginTop: "10px" }}
                          variant="contained"
                        >
                          <Icon
                            sx={{
                              fontSize: 20,
                              marginRight: "5px",
                            }}
                          >
                            <LockIcon />
                          </Icon>
                          Change Password
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Paper>
        </Container>
      </div>
    </div>
  );
}

export default PharmacistHome;
