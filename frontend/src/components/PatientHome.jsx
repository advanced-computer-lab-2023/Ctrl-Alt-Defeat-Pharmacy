import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import "../Css/PatientHome.css";
import {
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LockIcon from "@mui/icons-material/Lock";
import TopNavigation from "./TopNavigation";

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

  const handleLogout = async () => {
    const response = await Axios.get(
      "http://localhost:8000/api/v1/auth/logout",
      { withCredentials: true }
    );
    console.log(response.data);
  };

  const [showSideNav, setShowSideNav] = useState(false);

  const handleToggleSideNav = () => {
    setShowSideNav(!showSideNav);
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
        <Drawer anchor="left" open={showSideNav} onClose={handleToggleSideNav}>
          <List>
            <ListItem
              button
              component={Link}
              to="/patients/home"
              onClick={handleToggleSideNav}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/patients/medicines"
              onClick={handleToggleSideNav}
            >
              <ListItemIcon>
                <LocalPharmacyIcon />
              </ListItemIcon>
              <ListItemText primary="Medicines" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/patients/viewOrder"
              onClick={handleToggleSideNav}
            >
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/patients/viewCart"
              onClick={handleToggleSideNav}
            >
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Cart" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/changePassword"
              onClick={handleToggleSideNav}
            >
              <ListItemIcon>
                <LockIcon />
              </ListItemIcon>
              <ListItemText primary="Change password" />
            </ListItem>
            <hr className="hr" />
            <ListItem
              button
              component={Link}
              to="/"
              className="right"
              onClick={handleLogout}
            >
              <ListItemIcon>
                <LockIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Drawer>
      </div>
      <div className="main-container">
        <div className="welcome-section">
          <h2>Hello, Patient !</h2>
          <button onClick={showData}>Show me</button>
          {patient && (
            <div>
              <p>name: {patient.name}</p>
              <p>username: {patient.username}</p>
              <p>email: {patient.email}</p>
            </div>
          )}
        </div>

        <div className="address-section">
          <h2>Add Address</h2>
          <form onSubmit={handleAddAddress}>
            <input
              type="text"
              placeholder="Street"
              value={newStreet}
              onChange={handleNewStreetChange}
            />
            <input
              type="text"
              placeholder="City"
              value={newCity}
              onChange={handleNewCityChange}
            />
            <input
              type="text"
              placeholder="Country"
              value={newCountry}
              onChange={handleNewCountryChange}
            />
            <button type="submit">Add</button>
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
      </div>
    </div>
  );
}

export default PatientHome;
