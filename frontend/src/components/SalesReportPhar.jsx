import React, { useState, useEffect } from "react";
import axios from "axios";
import TopNavigationPharmacist from "./TopNavigationPharmacist";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import "../Css/PatientDetails.css";
import { Container } from "@mui/material";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

const SalesReportPhar = () => {
  const [salesData, setSalesData] = useState([]);
  const [medicineName, setMedicineName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [month, setMonth] = useState("");

  const fetchSalesData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/pharmacist/totalSales/${month}`,
        {
          withCredentials: true,
        }
      );
      setSalesData(response.data.totalSalesByMedicine);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };

  const filterSalesData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/pharmacist/totalSales/${month}?medicineName=${medicineName}&startDate=${startDate}&endDate=${endDate}`,
        {
          withCredentials: true,
        }
      );
      setSalesData(response.data.totalSalesByMedicine);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, [medicineName, startDate, endDate, month]);

  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];

  return (
    <div>
      <TopNavigationPharmacist link="/pharmacists/home" />
      <div className="patient-details-container">
        <h1>Monthly Sales Report</h1>
        <div>
          {/* Replace the native input with Material-UI TextField */}
          <TextField
            sx={{ m: 1, width: "25ch", margin: "10px" }}
            id="outlined-basic"
            label="Medicine Name"
            variant="outlined"
            value={medicineName}
            onChange={(e) => setMedicineName(e.target.value)}
          />
        </div>
        <div>
          <FormControl fullWidth>
            <InputLabel id="month-select-label">Month</InputLabel>
            <Select
              sx={{ m: 1, width: "25ch", margin: "10px" }}
              labelId="month-select-label"
              id="month-select"
              value={month}
              label="Month"
              onChange={(e) => setMonth(e.target.value)}
            >
              {months.map((m) => (
                <MenuItem key={m} value={`2023-${m}`}>
                  {`2023-${m}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button onClick={filterSalesData}>Fetch Sales Data</button>
        {/* <ul>
          {salesData.map((product) => (
            <li key={product.medicine}>
              Medicine: {product.medicine}, Total Sale Profit: {product.totalSales}
            </li>
          ))}
        </ul> */}
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <List>
              {salesData.map((product) => (
                <ListItem key={product.medicine} sx={{ py: 1, px: 0 }}>
                  <ListItemText
                    primary={product.medicine}
                    secondary={`Total Sales: $${Math.floor(
                      product.totalSales
                    )}`} // Fix: Concatenate the string and product quantity using template literals
                  />
                  <Typography variant="body2">{product.sales}</Typography>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Container>
      </div>
    </div>
  );
};

export default SalesReportPhar;
