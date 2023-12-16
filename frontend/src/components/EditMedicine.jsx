import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

function EditMedicine() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    picture: "",
    description: "",
    medicalUse: "",
  });
  const [res, setRes] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditMedicine = async (e) => {
    e.preventDefault();

    const formDataWithoutEmptyValues = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== "")
    );
    const response = await Axios.patch(
      `http://localhost:8000/api/v1/pharmacist/editMedicine/${formData.name}`,
      formDataWithoutEmptyValues,
      { withCredentials: true }
    );
    setRes(response);
  };

  return (
    <div>
      <h2>Edit Medicine</h2>
      <form onSubmit={handleEditMedicine}>
        <div>
          <label>Medicine Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Picture:</label>
          <input
            type="text"
            name="picture"
            value={formData.picture}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Medical Use:</label>
          <input
            type="text"
            name="medicalUse"
            value={formData.medicalUse}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Edit Medicine</button>
      </form>
      <br />
      {res && <div>medicine edited</div>}
    </div>
  );
}

export default EditMedicine;
