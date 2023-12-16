import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";

export default function ReviewOrder(order) {
  order = order.order;
  const products = order?.items || [];

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
              secondary={`Quantity: ${product.quantity}`}
            />
            <Typography variant="body2">
              ${Math.floor(product.price * product.quantity)}
            </Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total Price" />
          <Typography variant="body2">
            ${Math.floor(order?.totalPrice)}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Status" />
          <Typography variant="body2">
            {order?.status
              ? order.status.charAt(0).toUpperCase() + order.status.slice(1)
              : ""}
          </Typography>
        </ListItem>
        {/* Display other order details based on the order schema */}
        {/* For example: Address, Payment Method, etc. */}
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          {/* Display the selected address based on the order */}
          {order ? (
            <>
              <Typography gutterBottom>
                {order?.address.street}, {order?.address.city},
              </Typography>
              <Typography gutterBottom>{order?.address.country}</Typography>
            </>
          ) : (
            <Typography gutterBottom>No Address Selected</Typography>
          )}
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          {/* Display the selected payment method based on the order */}
          <Grid container>
            <Grid item xs={6}>
              <Typography gutterBottom>{order?.paymentMethod}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

ReviewOrder.propTypes = {
  order: PropTypes.object.isRequired,
};
