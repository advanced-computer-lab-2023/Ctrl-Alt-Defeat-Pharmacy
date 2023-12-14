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

function PatientMedicinesPage() {
  const [medicines, setMedicines] = useState([]);
  const [medicalUseFilter, setMedicalUseFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [medicineMessages, setMedicineMessages] = useState({});
  const allMedicalUses = [
    ...new Set(medicines.map((medicine) => medicine.medicalUse)),
  ];
  const [res, setRes] = useState(null);

  const fetchMedicines = async () => {
    const response = await Axios.get(
      "http://localhost:8000/api/v1/pharmacy/getAllMedicine",
      { withCredentials: true }
    );
    setMedicines(response.data.data);
  };

  useEffect(() => {
    fetchMedicines();
  }, []);
  useEffect(() => {
    viewCart();
  }, []);

  const handleFilter = async (value) => {
    setMedicalUseFilter(value);
    const filteredMedicines = await Axios.get(
      `http://localhost:8000/api/v1/pharmacy/medicine/searchByMedicalUse/${medicalUseFilter}`,
      { withCredentials: true }
    );
    setMedicines(filteredMedicines.data.data);
  };

  const handleSearch = async (value) => {
    setSearchTerm(value);
    const searchedMedicines = await Axios.get(
      `http://localhost:8000/api/v1/pharmacy/medicine/searchByName/${searchTerm}`,
      { withCredentials: true }
    );
    setMedicines(searchedMedicines.data.data);
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

  const renderCartControls = (medicineName) => {
    const cartItem = res?.data?.items.find(
      (item) => item.medicineId.name === medicineName
    );

    if (cartItem) {
      return (
        <div className="quantity-controls">
          <IconButton onClick={() => addToCart(medicineName)}>
            <AddIcon />
          </IconButton>
          <span>{cartItem.quantity}</span>
          <IconButton
            onClick={() =>
              handleUpdateQuantity(
                cartItem.medicineId._id,
                cartItem.quantity - 1
              )
            }
          >
            <RemoveIcon />
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
  };

  return (
    <div>
      <TopNavigation />
      <div className="medicine-container">
        <div className="filter-search-section">
          <div className="search-section">
            <TextField
              type="text"
              placeholder="Search by Name"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton onClick={handleSearch}>
                      <SearchIcon />
                    </IconButton>
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
                <TextField {...params} label="Medical Use" />
              )}
            />
          </div>
        </div>

        <h2 style={{ color: "grey" }}>Available Medicines</h2>
        {medicines && (
          <div>
            <ul className="medicine-list">
              {medicines.map((medicine) => (
                <li key={medicine._id} className="medicine-item">
                  <img src={medicine.picture} alt="pic" width="150px" />
                  <strong>{medicine.name}</strong>
                  <p style={{ color: "grey" }}>
                    <br /> {medicine.description}
                    <br />
                    {medicine.quantity === 0 && (
                      <span style={{ color: "red" }}>
                        Currently Unavailable
                      </span>
                    )}
                  </p>
                  <p style={{ color: "#0076c0" }}>
                    Starts from ${medicine.price}
                  </p>

                  {medicine.quantity > 0 ? (
                    renderCartControls(medicine.name)
                  ) : (
                    <Button variant="contained" color="grey" disabled>
                      Unavailable
                    </Button>
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
