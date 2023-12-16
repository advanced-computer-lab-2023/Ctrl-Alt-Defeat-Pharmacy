import { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import "../Css/PatientHome.css";
import { ListItemText } from "@mui/material";

import LockIcon from "@mui/icons-material/Lock";
import TopNavigation from "./TopNavigation";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Icon from "@mui/material/Icon";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

function PatientHome() {
  const [patient, setPatient] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [newStreet, setNewStreet] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newCountry, setNewCountry] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await Axios.get(
        "http://localhost:8000/api/v1/patient/getAddresses",
        {
          withCredentials: true,
        }
      );
      setAddresses(response.data.addresses);
    } catch (error) {
      console.error(
        "Error fetching addresses:",
        error.response?.data?.message || error.message
      );
    }
  };

  const showData = async () => {
    const response = await Axios.get(
      "http://localhost:8000/api/v1/auth/getMe",
      { withCredentials: true }
    );
    console.log(response.data);
    setPatient(response.data.loggedIn);
  };

  const handleNewStreetChange = (e) => {
    setNewStreet(e.target.value);
  };

  const handleNewCityChange = (e) => {
    setNewCity(e.target.value);
  };

  const handleNewCountryChange = (e) => {
    setNewCountry(e.target.value);
  };
  useEffect(() => {
    showData();
  }, []);

  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post(
        "http://localhost:8000/api/v1/patient/addAddress",
        {
          street: newStreet,
          city: newCity,
          country: newCountry,
        },
        { withCredentials: true }
      );

      if (response.data && response.data.address) {
        console.log(response.data);
        setAddresses([...addresses, response.data.address]);
        setMessage("Address added successfully");
        setNewStreet("");
        setNewCity("");
        setNewCountry("");
      } else {
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.error(
        "Error adding address:",
        error.response?.data?.error || error.message
      );
      if (error.response && error.response.data && error.response.data.error) {
        setMessage("Could not add address: " + error.response.data.error);
      }
    }
  };

  return (
    <div>
      <div>
        <TopNavigation link="/patients/medicines" />
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
                    <ListItemText primary={`Wallet: $${patient.wallet}`} />
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

        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <div className="address-section">
              <h2>Add Address</h2>
              <form onSubmit={handleAddAddress}>
                <TextField
                  type="text"
                  value={newStreet}
                  label="Street"
                  onChange={handleNewStreetChange}
                  style={{ "margin-bottom": "15px" }}
                  placeholder="Street"
                />
                <TextField
                  type="text"
                  value={newCity}
                  label="City"
                  onChange={handleNewCityChange}
                  style={{ "margin-bottom": "15px" }}
                  placeholder="City"
                />
                <TextField
                  type="text"
                  value={newCountry}
                  label="Country"
                  onChange={handleNewCountryChange}
                  style={{ "margin-bottom": "15px" }}
                  placeholder="Country"
                />

                <Button
                  variant="contained"
                  className="add-address-button"
                  type="submit"
                >
                  Add
                </Button>
                <div>
                  <p>{message}</p>
                </div>
              </form>
            </div>

            <div className="addresses-section">
              <h2>Addresses</h2>
              {addresses.map((address, index) => (
                <div key={index} className="address-card">
                  <ul>
                    <li>Address {index + 1}</li>
                    <p>Street: {address.street}</p>
                    <p>City: {address.city}</p>
                    <p>Country: {address.country}</p>
                    {/* <button className="remove-Button" onClick={() => handleRemoveAddress(address._id)}>Remove</button> */}
                  </ul>
                </div>
              ))}
            </div>
          </Paper>
        </Container>
      </div>
    </div>
  );
}

export default PatientHome;
