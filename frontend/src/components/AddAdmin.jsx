import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import { Container } from "@mui/material";

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
      <React.Fragment>
        <Container maxWidth="sm" style={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}>
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
              <TextField id="standard-basic" label="Username" variant="outlined" />
            </Box>
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 0, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField id="standard-basic" label="Password" variant="outlined" />
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
        </Container>
      </React.Fragment>
    </div>
  );
};

export default AddAdmin;
