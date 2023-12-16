import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TopNavigation from "./TopNavigation";
import TopNavigationPharmacist from "./TopNavigationPharmacist";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import "../Css/ViewMedicineQuantitySales.css";
import { List } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

const ViewMedicineQuantitySales = () => {
  const [medicineData, setMedicineData] = useState([]);

  const fetchMedicineQuantitySales = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/pharmacist/quantities",
        { withCredentials: true }
      );
      setMedicineData(response.data.data);
      console.log(response.data.data);

      // Save the data to sessionStorage
      sessionStorage.setItem(
        "medicineData",
        JSON.stringify(response.data.data)
      );
    } catch (error) {
      console.error("Error fetching medicine quantity and sales:", error);
    }
  };

  useEffect(() => {
    // Load data from sessionStorage on component mount
    const storedData = sessionStorage.getItem("medicineData");
    if (storedData) {
      setMedicineData(JSON.parse(storedData));
    }

    // Fetch data if sessionStorage is empty
    if (medicineData.length === 0) {
      fetchMedicineQuantitySales();
    }

    // Clear sessionStorage when the component is unmounted
    return () => {
      sessionStorage.clear();
    };
  }, []);

  return (
    <div>
      <TopNavigationPharmacist link="/pharmacists/home" />
      <div className="sales-container">
        <h1>Medicine Quantity and Sales</h1>
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <List>
              {medicineData.map((product) => (
                <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
                  <img
                    src={product.picture}
                    alt={product.name}
                    className="medicine-picture"
                  />

                  <ListItemText
                    primary={product.name}
                    secondary={`Quantity: ${product.quantity}`} // Fix: Concatenate the string and product quantity using template literals
                  />
                  <Typography variant="body2">{product.sales}</Typography>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Container>
        <br />
      </div>
    </div>
  );
};

export default ViewMedicineQuantitySales;
