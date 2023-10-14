import React, { useState } from "react";
import axios from "axios";

const AddAdmin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/pharmacy/admin",
        {
          username,
          password,
        }
      );

      console.log("Admin added successfully:", response.data);
    } catch (error) {
      console.error("Error adding admin:", error);
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
      </form>
    </div>
  );
};

export default AddAdmin;
