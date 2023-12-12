import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AddAdmin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/admin/addAdmin",
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
      <h2>Add Admin</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Add Admin</button>
        <p>{message}</p>
      </form>
      <Link to="/admins/home">home</Link>
    </div>
  );
};

export default AddAdmin;
