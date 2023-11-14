import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function PatientRegister() {
  const navigate = useNavigate();
  const [res, setRes] = useState(null);
  const [err, setErr] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
    phoneNumber: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    relationToPatient: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: formData.username,
      name: formData.name,
      email: formData.email,
      password: formData.password,
      dateOfBirth: formData.dob,
      gender: formData.gender,
      mobileNumber: formData.phoneNumber,
      emergencyContact: {
        fullName: formData.emergencyContactName,
        mobileNumber: formData.emergencyContactNumber,
        prescriptions: [],
        relationToPatient: formData.relationToPatient,
      },
    };
    console.log("response 1");
    const response = await Axios.post(
      "http://localhost:8000/api/v1/patient/register",
      data,
      { withCredentials: true }
    );
    console.log("response");
    if (response.data.status == "failed") {
      setErr(true);
    } else {
      setErr(false);
      setRes(response);
      setTimeout(() => navigate("/login"), 3000);
    }
  };

  return (
    <div>
      <h2>Patient Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Emergency Contact Name:</label>
          <input
            type="text"
            name="emergencyContactName"
            value={formData.emergencyContactName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Emergency Contact Phone Number:</label>
          <input
            type="tel"
            name="emergencyContactNumber"
            value={formData.emergencyContactNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Emergency Contact relation to the patient:</label>
          <input
            type="text"
            name="relationToPatient"
            value={formData.relationToPatient}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <Link to="/">home</Link>
      {res && <div>patient registered</div>}
      {err && <div>username already exists</div>}
    </div>
  );
}

export default PatientRegister;
