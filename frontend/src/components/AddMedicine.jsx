import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import TopNavigationPharmacist from "./TopNavigationPharmacist";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import "../Css/AddMedicine.css";





function AddMedicine() {
  const [prescription, setPrescription] = React.useState('no'); // default value

  const handlePrescriptionChange = (event) => {
    setPrescription(event.target.value);
  };
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
      prescription: false,
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
      prescription: prescription === 'yes', // Convert to boolean
    };

    const response = await axios.post(
      "http://localhost:8000/api/v1/pharmacist/addMedicine",
      medicine,
      { withCredentials: true,
        // headers: {
        //   'Content-Type': 'multipart/form-data'
        // }
      }
    );
    setRes(response);
  };

  return (
    <div>
            <TopNavigationPharmacist link="/pharmacists/home" />

      <div className="add-medicine-container"> 

      {/* Include TopNavigationPharmacist or other components if needed */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 2,
        }}
      >
        <AddCircleOutlinedIcon sx={{ fontSize: 50, marginBottom: 2, color: 'primary.main' }} />
        <Typography variant="h2" sx={{ fontSize: 50, marginBottom: 2, color: 'primary.main' }}>
          Add Medicine
        </Typography>
        <form onSubmit={handleSubmit}>
          <Card variant="outlined" sx={{ width: '100%', maxWidth: 800 }}>
            <CardContent>
              <Grid container spacing={2}>
                {/* First Column */}
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <TextField
                      id="outlined-basic"
                      label="Medicine Name"
                      variant="outlined"
                      name="name"
                      value={formData.name}
                      onChange={(e) => handleChange(e)}
                      required
                      fullWidth
                      sx={{ marginBottom: 2 }}
                    />
                    <TextField
                      id="outlined-basic"
                      label=""
                      variant="outlined"
                      name="picture"
                      value={formData.picture}
                      onChange={(e) => handleChange(e)}
                      required
                      fullWidth
                      sx={{ marginBottom: 2 }}
                      type="file"
                    />
                    <TextField
                      id="outlined-basic"
                      label="Price"
                      variant="outlined"
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => handleChange(e)}
                      required
                      fullWidth
                      sx={{ marginBottom: 2 }}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Quantity"
                      variant="outlined"
                      name="quantity"
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => handleChange(e)}
                      required
                      fullWidth
                      sx={{ marginBottom: 2 }}
                    />
                  </Box>
                </Grid>
                {/* Second Column */}
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <TextField
                      id="outlined-basic"
                      label="Medical Use"
                      variant="outlined"
                      name="medicalUse"
                      value={formData.medicalUse}
                      onChange={(e) => handleChange(e)}
                      required
                      fullWidth
                      sx={{ marginBottom: 2 }}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Description"
                      variant="outlined"
                      name="description"
                      multiline
                      value={formData.description}
                      onChange={(e) => handleChange(e)}
                      required
                      fullWidth
                      rows={4}
                      sx={{ marginBottom: 2 }}
                    />
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={6}>
                        <TextField
                          id="outlined-basic"
                          label="Ingredients"
                          variant="outlined"
                          name="ingredients"
                          value={formData.ingredients[0]}
                          onChange={(e) => handleChange(e, 0)}
                          required
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Button type="button" onClick={addIngredient} variant="contained" sx={{ width: '100%' }}>
                          Add Ingredient
                        </Button>
                      </Grid>
                    </Grid>
                    {formData.ingredients.slice(1).map((ingredient, index) => (
                      <TextField
                        key={index + 1}
                        id={`outlined-basic-${index + 1}`}
                        label={`Ingredient ${index + 1}`}
                        variant="outlined"
                        name="ingredients"
                        value={ingredient}
                        onChange={(e) => handleChange(e, index + 1)}
                        required
                        fullWidth
                        sx={{ marginBottom: 2 }}
                      />
                    ))}
                  </Box>
                </Grid>
              </Grid>
                    <FormControl component="fieldset" sx={{ marginTop: 2 }}>
        <FormLabel component="legend">Prescription</FormLabel>
        <RadioGroup
          row
          aria-label="prescription"
          name="prescription"
          value={prescription}
          onChange={handlePrescriptionChange}
        >
          <FormControlLabel value="no" control={<Radio />} label="No" />
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
        </RadioGroup>
      </FormControl>
              <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2, width: '100%' }}>
                Add Medicine
              </Button>
            </CardContent>
          </Card>
        </form>
        {res && <div>new medicine added</div>}
      </Box>
      </div>
    </div>
  );

}

export default AddMedicine;