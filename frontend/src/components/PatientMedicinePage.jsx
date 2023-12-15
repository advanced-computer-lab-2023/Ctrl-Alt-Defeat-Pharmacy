import { useState, useEffect } from "react";
import Axios from "axios";
import "../Css/MedicinePage.css";
import "../Css/PatientHome.css";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  TextField,
  InputAdornment,
  IconButton,
  Autocomplete,
} from "@mui/material";
import TopNavigation from "./TopNavigation";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList"; // Assuming this is the icon you want to use

function PatientMedicinesPage() {
  const [medicines, setMedicines] = useState([]);
  const [medicalUseFilter, setMedicalUseFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [medicineMessages, setMedicineMessages] = useState({});
  // const allMedicalUses = [
  //   ...new Set(medicines.map((medicine) => medicine.medicalUse)),
  // ];
  const [allMedicalUses, setAllMedicalUses] = useState([]);
  const [res, setRes] = useState(null);

  const fetchMedicalUses = async () => {
    const response = await Axios.get(
      "http://localhost:8000/api/v1/pharmacy/getAllMedicine",
      { withCredentials: true }
    );
    setMedicines(response.data.data);
    setAllMedicalUses(
      Array.from(
        new Set(response.data.data.map((medicine) => medicine.medicalUse))
      )
    );
  };

  useEffect(() => {
    fetchMedicalUses();
  }, []);
  useEffect(() => {
    viewCart();
  }, []);

  const handleFilter = async (value) => {
    setMedicalUseFilter(value);
    let filteredMedicines = medicines;
    if (value !== null) {
      filteredMedicines = await Axios.get(
        `http://localhost:8000/api/v1/pharmacy/medicine/searchByMedicalUse/${value}`,
        { withCredentials: true }
      );
      setAllMedicalUses(
        Array.from(
          new Set(
            filteredMedicines.data.data.map((medicine) => medicine.medicalUse)
          )
        )
      );
      filteredMedicines = filteredMedicines.data.data;
    } else {
      filteredMedicines = await Axios.get(
        `http://localhost:8000/api/v1/pharmacy/medicine/searchByMedicalUse/${"all"}`,
        { withCredentials: true }
      );
      setAllMedicalUses(
        Array.from(
          new Set(
            filteredMedicines.data.data.map((medicine) => medicine.medicalUse)
          )
        )
      );
      filteredMedicines = filteredMedicines.data.data;
    }
    setMedicines(filteredMedicines);
  };

  const handleSearch = async (value) => {
    setSearchTerm(value);
    let searchedMedicines = medicines;
    if (value !== "") {
      searchedMedicines = await Axios.get(
        `http://localhost:8000/api/v1/pharmacy/medicine/searchByName/${value}`,
        { withCredentials: true }
      );
      searchedMedicines = searchedMedicines.data.data;
    } else {
      searchedMedicines = await Axios.get(
        `http://localhost:8000/api/v1/pharmacy/medicine/searchByName/${"all"}`,
        { withCredentials: true }
      );
      searchedMedicines = searchedMedicines.data.data;
    }
    setMedicines(searchedMedicines);
  };
  const viewCart = async () => {
    try {
      const response = await Axios.get(
        `http://localhost:8000/api/v1/patient/viewCart`,
        { withCredentials: true }
      );
      setRes(response);
    } catch (error) {
      console.error(
        "Error fetching cart:",
        error.response?.data?.error || error.message
      );
    }
  };

  const handleUpdateQuantity = async (medicineId, quantity) => {
    try {
      await Axios.put(
        `http://localhost:8000/api/v1/patient/updateQuantity`,
        {
          medicineId: medicineId,
          quantity: quantity,
        },
        { withCredentials: true }
      );

      setRes((prevRes) => {
        const updatedItems = prevRes.data.items.map((item) => {
          if (item.medicineId._id === medicineId) {
            if (quantity <= 0) {
              return null;
            }

            const newPrice = item.medicineId.price * quantity;

            return {
              ...item,
              quantity,
              price: newPrice,
            };
          }
          return item;
        });

        const updatedItems2 = updatedItems.filter((item) => item !== null);

        const updatedTotalPrice = updatedItems2.reduce(
          (total, item) => total + item.price,
          0
        );

        return {
          ...prevRes,
          data: {
            ...prevRes.data,
            items: updatedItems2,
            totalPrice: updatedTotalPrice,
          },
        };
      });
    } catch (error) {
      console.error(
        "Error updating quantity:",
        error.response?.data?.error || error.message
      );
    }

    viewCart();
    fetchMedicalUses();
  };

  // const removeFromCart = async (medicineId) => {
  //   try {
  //     await Axios.put(
  //       `http://localhost:8000/api/v1/patient/removeFromCart`,
  //       { medicineId: medicineId },
  //       { withCredentials: true }
  //     );

  //     setRes((prevRes) => {
  //       const updatedItems = prevRes.data.items.filter(
  //         (item) => item.medicineId._id !== medicineId
  //       );

  //       const updatedTotalPrice = updatedItems.reduce(
  //         (total, item) => total + item.price,
  //         0
  //       );

  //       if (updatedItems.length === 0) {
  //         return null;
  //       } else {
  //         return {
  //           ...prevRes,
  //           data: {
  //             ...prevRes.data,
  //             items: updatedItems,
  //             totalPrice: updatedTotalPrice,
  //           },
  //         };
  //       }
  //     });
  //   } catch (error) {
  //     console.error(
  //       "Error removing item from cart:",
  //       error.response?.data?.error || error.message
  //     );
  //   }
  //   viewCart();
  // };

  const addToCart = async (medicineName) => {
    try {
      const response = await Axios.post(
        "http://localhost:8000/api/v1/patient/addToCart",
        {
          medicineName,
          quantity: 1,
        },
        { withCredentials: true }
      );
      console.log(response.data);
      setMedicineMessages({
        ...medicineMessages,
        [medicineName]: { message: "Medicine is added to Cart", error: null },
      });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setMedicineMessages({
          ...medicineMessages,
          [medicineName]: { message: null, error: error.response.data.error },
        });
      } else {
        console.error("Error:", error.message);
      }
    }
    viewCart();
  };

  const renderCartControls = (medicineName, quantity, available) => {
    const cartItem = res?.data?.items.find(
      (item) => item.medicineId.name === medicineName
    );

    if (available || cartItem) {
      if (cartItem) {
        return (
          <div className="quantity-controls">
            <IconButton
              disabled={quantity <= 0}
              // style={iconButtonStyle}
              onClick={() =>
                handleUpdateQuantity(
                  cartItem.medicineId._id,
                  cartItem.quantity + 1
                )
              }
            >
              <AddIcon />
            </IconButton>
            <span>{cartItem.quantity}</span>
            <IconButton
              // style={iconButtonStyle}
              onClick={() =>
                handleUpdateQuantity(
                  cartItem.medicineId._id,
                  cartItem.quantity - 1
                )
              }
            >
              {cartItem.quantity === 1 ? <DeleteIcon /> : <RemoveIcon />}{" "}
            </IconButton>
          </div>
        );
      }
      return (
        <Button
          variant="contained"
          color="primary"
          className="add-to-cart-button"
          onClick={() => addToCart(medicineName)}
          startIcon={<AddIcon />}
        >
          Add to Cart
        </Button>
      );
    } else {
      return (
        <Button variant="contained" color="grey" disabled>
          Unavailable
        </Button>
      );
    }
  };

  return (
    <div>
      <TopNavigation link="/patients/medicines" />
      <div className="medicine-container">
        <div className="filter-search-section">
          <div className="search-section">
            <TextField
              type="text"
              placeholder="Search by Name"
              value={searchTerm}
              sx={{ width: 300 }}
              onChange={(e) => handleSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            {/* <button className="search-button" onClick={handleSearch}>
              Search
            </button> */}
          </div>
          <div className="filter-section">
            {/* <InputLabel id="Filter by Medical Use">
              Filter by Medical Use
            </InputLabel> */}
            <Autocomplete
              value={medicalUseFilter}
              onChange={(e, newValue) => handleFilter(newValue)}
              options={allMedicalUses}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Medical Use"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        {""}
                        <FilterListIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </div>
        </div>

        {/* <h2 style={{ color: "grey" }}> Pharmacy</h2> */}
        {medicines && (
          <div>
            <ul className="medicine-list">
              {medicines.map((medicine) => (
                <li key={medicine._id} className="medicine-item">
                  <img
                    src={medicine.picture}
                    alt="pic"
                    width="150px"
                    className="medicine-image"
                  />
                  <strong>{medicine.name}</strong>
                  <p style={{ color: "grey", height: "60px" }}>
                    <br /> {medicine.description}
                    <br />
                    <br />
                    {medicine.quantity < 5 && medicine.quantity !== 0 && (
                      <span style={{ color: "red" }}>
                        {medicine.quantity} left in stock
                      </span>
                    )}
                    {medicine.quantity === 0 && (
                      <span style={{ color: "red" }}>Out of Stock</span>
                    )}
                  </p>
                  <p style={{ color: "#0076c0" }}>
                    Starts from ${medicine.price}
                  </p>

                  {medicine.quantity > 0
                    ? renderCartControls(medicine.name, medicine.quantity, true)
                    : renderCartControls(
                        medicine.name,
                        medicine.quantity,
                        false
                      )}

                  <div className="cart-message">
                    {medicineMessages[medicine.name]?.message}
                  </div>
                  <div className="cart-error">
                    {medicineMessages[medicine.name]?.error}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <br />
    </div>
  );
}

export default PatientMedicinesPage;
