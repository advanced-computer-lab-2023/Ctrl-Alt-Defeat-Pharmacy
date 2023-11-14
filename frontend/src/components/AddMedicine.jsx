import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function AddMedicine() {
  const [res, setRes] = useState(null);
  const [formData, setFormData] = useState(
    {
      name: "",
      picture: "",
      price: "",
      description: "",
      quantity: "",
      medicalUse: "",
      ingredients: [""],
    },
    [],
    { withCredentials: true }
  );

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "ingredients") {
      const updatedIngredients = [...formData.ingredients];
      updatedIngredients[index] = value;
      setFormData({ ...formData, ingredients: updatedIngredients });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addIngredient = () => {
    setFormData({ ...formData, ingredients: [...formData.ingredients, ""] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const medicine = {
      name: formData.name,
      picture: formData.picture,
      price: formData.price,
      description: formData.description,
      quantity: formData.quantity,
      medicalUse: formData.medicalUse,
      ingredients: formData.ingredients.filter(
        (ingredient) => ingredient.trim() !== ""
      ),
    };

    const response = await axios.post(
      "http://localhost:8000/api/v1/pharmacist/addMedicine",
      medicine,
      { withCredentials: true }
    );
    setRes(response);
  };

  return (
    <div>
      <h2>Add Medicine</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Medicine Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div>
          <label>Picture:</label>
          <input
            type="text"
            name="picture"
            value={formData.picture}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div>
          <label>medical use:</label>
          <input
            type="text"
            name="medicalUse"
            value={formData.medicalUse}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div>
          <label>Ingredients:</label>
          {formData.ingredients.map((ingredient, index) => (
            <div key={index}>
              <input
                type="text"
                name="ingredients"
                value={ingredient}
                onChange={(e) => handleChange(e, index)}
                required
              />
            </div>
          ))}
          <button type="button" onClick={addIngredient}>
            Add Ingredient
          </button>
        </div>
        <button type="submit">Add Medicine</button>
      </form>
      <Link to="/admins/home">home</Link>
      {res && <div>new medicine added</div>}
    </div>
  );
}

export default AddMedicine;
