import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import { Container } from "@mui/material";
import TopNavigationAdmin from "./TopNavigationAdmin";
import "../Css/AddMedicine.css";

const AddAdmin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/admin/addAdmin",
        {
          username,
          password,
        },
        { withCredentials: true }
      );
      setUsername("");
      setPassword("");
      setMessage("Admin added successfully");

      console.log("Admin added successfully:", response.data);
    } catch (error) {
      console.error("Error adding admin:", error);
      setMessage("Error adding admin");
    }
  };

  return (
    <div>
      <TopNavigationAdmin link="/admins/home" />
      <div className="add-medicine-container">
        <React.Fragment>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <AddCircleSharpIcon style={{ fontSize: '43px', color: '#0076c0', marginBottom: '10px' }} />
              <h2 style={{ color: '#0076c0', marginTop: '0', marginBottom: '20px' }}>Add Admin</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 0, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="standard-basic"
                  label="Username"
                  variant="outlined"
                  value={username}  // Add this line
                  onChange={(e) => setUsername(e.target.value)}  // Add this line
                />
              </Box>
              <Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 0, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="standard-basic"
                  label="Password"
                  variant="outlined"
                  value={password}  // Add this line
                  onChange={(e) => setPassword(e.target.value)}  // Add this line
                />
              </Box>
              <Stack spacing={2} direction="row">
                <Button
                  type="submit"
                  variant="contained"
                  style={{ backgroundColor: '#0076c0', color: '#fff' }}
                >
                  Add
                </Button>
              </Stack>
              <p style={{ color: '#0076c0' }}>{message}</p>
            </form>
        </React.Fragment>
      </div>
    </div>
  );
  
};

export default AddAdmin;
