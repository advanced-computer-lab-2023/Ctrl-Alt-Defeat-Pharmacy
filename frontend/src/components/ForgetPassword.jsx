import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Paper } from "@mui/material";
import "../Css/ForgerPassword.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
const ForgetPassword = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async () => {
    const res = await axios.post(
      "http://localhost:8000/api/v1/auth/forgetPassword",
      { username },
      { withCredentials: true }
    );
    console.log(res.data.status);
    if (res.data.status === "success") {
      navigate(`/verifyOTP/${username}`);
    }
  };

  return (
    <div>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <div className="password-container">
          <Paper
            variant="outlined"
            sx={{
              my: { xs: 3, md: 6 },
              p: { xs: 2, md: 3 },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h2>Forgot Password</h2>
            <TextField
              type="text"
              id="usernameInput"
              value={username}
              sx={{ margin: "10px" }}
              onChange={handleUsernameChange}
              label="Enter your username"
            />
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
            <br />
            <Link to="/login">back</Link>
          </Paper>
        </div>
      </Container>
    </div>
  );
};

export default ForgetPassword;
