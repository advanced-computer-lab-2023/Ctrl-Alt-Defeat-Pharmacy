import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Review({ selectedAddress, selectedPaymentMethod }) {
  const [res, setRes] = useState(null);
  const setIsLoading = useState(true);

  useEffect(() => {
    handleSubmit();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/patient/viewCart`,
        { withCredentials: true }
      );
      setRes(response);

      setIsLoading(false);
    } catch (error) {
      console.error(
        "Error fetching cart:",
        error.response?.data?.error || error.message
      );
      setIsLoading(false);
    }
  };
  const products = res?.data?.items || [];
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.medicineId.name} sx={{ py: 1, px: 0 }}>
            <img
              src={product.medicineId.picture}
              alt={product.medicineId.name}
              className="medicine-picture"
            />

            <ListItemText
              primary={product.medicineId.name}
              secondary={`Quantity: ${product.quantity}`} // Fix: Concatenate the string and product quantity using template literals
            />
            <Typography variant="body2">
              {product.medicineId.price * product.quantity}$
            </Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {(res?.data?.totalPrice || 0).toFixed(2)}$
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          {/* Display the selected address */}
          {selectedAddress ? (
            <>
              <Typography gutterBottom>
                {selectedAddress.street}, {selectedAddress.city},
              </Typography>
              <Typography gutterBottom>{selectedAddress.country}</Typography>
            </>
          ) : (
            <Typography gutterBottom>No Address Selected</Typography>
          )}
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            <Grid item xs={6}>
              <Typography gutterBottom>{selectedPaymentMethod}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
Review.propTypes = {
  selectedAddress: PropTypes.object.isRequired,
  selectedPaymentMethod: PropTypes.string.isRequired,
};
