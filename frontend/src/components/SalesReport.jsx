import React, { useState, useEffect } from "react";
import axios from "axios";
import TopNavigationAdmin from "./TopNavigationAdmin";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import "../Css/PatientDetails.css";

const SalesReport = () => {
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
    "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"
  ];

  return (
    <div>
      <TopNavigationAdmin link="/admins/home" />
      <div className="patient-details-container">
        <h1>Sales Report</h1>
        <div>
          <label>Month:</label>
          <FormControl fullWidth>
            <InputLabel id="month-select-label">Month</InputLabel>
            <Select
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
        {/* <button onClick={fetchSalesData}>Fetch Sales Data</button> */}
        <ul>
          {salesData.map((product) => (
            <li key={product.medicine}>
              Medicine: {product.medicine}, Quantity: {product.totalSales}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
  
};

export default SalesReport;
