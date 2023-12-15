import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Axios from "axios";
import { useState } from "react";
import PropTypes from "prop-types";

export default function AddressForm({ handleAddressSelect }) {
  const [addresses, setAddresses] = React.useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(""); // Define selectedAddressId state

  React.useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const addressesResponse = await Axios.get(
          `http://localhost:8000/api/v1/patient/getAddresses`,
          { withCredentials: true }
        );
        const addressesData = addressesResponse.data;
        setAddresses(addressesData.addresses);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, []);
  const handleAddressChange = (event) => {
    const selectedAddress = event.target.value;
    setSelectedAddressId(selectedAddress); // Set selected address in state
    handleAddressSelect(selectedAddress); // Call the handleAddressSelect function with the selected address
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <RadioGroup value={selectedAddressId} onChange={handleAddressChange}>
            {addresses.map((address, index) => (
              <FormControlLabel
                key={index}
                value={index.toString()} // Use a unique value for each radio button
                control={<Radio color="secondary" />}
                label={`${address.street}, ${address.city}, ${address.country}`} // Customize this as per your address object structure
              />
            ))}
          </RadioGroup>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

AddressForm.propTypes = {
  handleAddressSelect: PropTypes.func.isRequired,
};
