import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import "../Css/CheckoutTrial.css";

export default function Review() {
  const [res, setRes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleUpdateQuantity = async (medicineId, quantity) => {
    try {
      await axios.put(
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
    handleSubmit();
  };

  if (isLoading) {
    return (
      <div>
        <div className="container">
          <h2 className="loading">Loading cart...</h2>
        </div>
      </div>
    );
  }
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
              sx={{ width: "200px" }}
              primary={product.medicineId.name}
              secondary={product.medicineId.description}
            />

            <div className="quantity-controls">
              <IconButton
                // style={iconButtonStyle}
                onClick={() =>
                  handleUpdateQuantity(
                    product.medicineId._id,
                    product.quantity - 1
                  )
                }
              >
                {product.quantity === 1 ? <DeleteIcon /> : <RemoveIcon />}{" "}
              </IconButton>
              <span>{product.quantity}</span>
              <IconButton
                disabled={product.medicineId.quantity <= 0}
                // style={iconButtonStyle}
                onClick={() =>
                  handleUpdateQuantity(
                    product.medicineId._id,
                    product.quantity + 1
                  )
                }
              >
                <AddIcon />
              </IconButton>
            </div>
            <Typography
              variant="body2"
              sx={{ width: "80px", display: "flex", justifyContent: "end" }}
            >
              {(product.medicineId.price * product.quantity).toFixed(2)}$
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
        {/* <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom>{addresses.join(", ")}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
}
