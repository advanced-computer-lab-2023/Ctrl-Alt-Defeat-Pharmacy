import React, { useState, useEffect } from "react";
import Axios from "axios";
import TopNavigationPharmacist from "./TopNavigationPharmacist";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import "../Css/AddMedicine.css";
import EditIcon from '@mui/icons-material/Edit';

function EditMedicine() {
  const [prescription, setPrescription] = React.useState('no'); // default value
  const [archive, setArchive] = React.useState(false); // default value

  const handlePrescriptionChange = (event) => {
    setPrescription(event.target.value);
  };

  const handleArchiveChange = (event) => {
    setArchive(event.target.value === 'yes');
  };

  const [res, setRes] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    picture: "",
    // description: "",
    // medicalUse: "",
    prescription: false,
    archive: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditMedicine = async (e) => {
    e.preventDefault();

    const formDataWithoutEmptyValues = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== "")
    );

    // Convert prescription and archive to boolean
    formDataWithoutEmptyValues.prescription = prescription === 'yes';
    formDataWithoutEmptyValues.archive = archive;

    const response = await Axios.patch(
      `http://localhost:8000/api/v1/pharmacist/editMedicine/${formData.name}`,
      formDataWithoutEmptyValues,
      { withCredentials: true }
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
        <EditIcon sx={{ fontSize: 50, marginBottom: 2, color: 'primary.main' }} />
        <Typography variant="h2" sx={{ fontSize: 50, marginBottom: 2, color: 'primary.main' }}>
          Edit Medicine
        </Typography>
        <form onSubmit={handleEditMedicine}>
          <Grid container spacing={2}>
            {/* First Column */}
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ width: '100%', height: '100%' }}>
                <CardContent>
                  <TextField
                    id="outlined-basic"
                    label="Medicine Name"
                    variant="outlined"
                    name="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange(e)}
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
                    onChange={(e) => handleInputChange(e)}
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
                    onChange={(e) => handleInputChange(e)}
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
                    onChange={(e) => handleInputChange(e)}
                    fullWidth
                    sx={{ marginBottom: 2 }}
                  />
                </CardContent>
              </Card>
            </Grid>
            {/* Second Column */}
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ width: '100%', height: '100%' }}>
                <CardContent>
                  <TextField
                    id="outlined-basic"
                    label="Medical Use"
                    variant="outlined"
                    name="medicalUse"
                    value={formData.medicalUse}
                    onChange={(e) => handleInputChange(e)}
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
                    onChange={(e) => handleInputChange(e)}
                    fullWidth
                    rows={4}
                    sx={{ marginBottom: 2 }}
                  />
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

                  <FormControl component="fieldset" sx={{ marginTop: 2 }}>
                    <FormLabel component="legend">Archive</FormLabel>
                    <RadioGroup
                      row
                      aria-label="archive"
                      name="archive"
                      value={archive ? 'yes' : 'no'}
                      onChange={handleArchiveChange}
                    >
                      <FormControlLabel value="no" control={<Radio />} label="No" />
                      <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    </RadioGroup>
                  </FormControl>

                  <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2, width: '100%' }}>
                    Edit Medicine
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </form>
        <br />
        {res && <div>Medicine edited</div>}
      </Box>
      </div>
    </div>
  );
}

export default EditMedicine;
