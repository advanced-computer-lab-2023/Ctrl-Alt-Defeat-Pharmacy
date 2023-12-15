import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { useState } from "react";

export default function PaymentForm({ handlePaymentMethodSelect }) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(""); // Define selectedPaymentMethod state

  const handlePaymentChange = (event) => {
    const selectedMethod = event.target.value;
    setSelectedPaymentMethod(selectedMethod); // Set selected payment method in state
    handlePaymentMethodSelect(selectedMethod); // Call the handlePaymentMethodSelect function with the selected method
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <RadioGroup
            value={selectedPaymentMethod}
            onChange={handlePaymentChange}
          >
            <FormControlLabel
              value="cash"
              control={<Radio />}
              label="Cash on Delivery"
            />
            <FormControlLabel
              value="card"
              control={<Radio />}
              label="Credit Card"
            />
            <FormControlLabel
              value="wallet"
              control={<Radio />}
              label="Wallet"
            />
          </RadioGroup>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
