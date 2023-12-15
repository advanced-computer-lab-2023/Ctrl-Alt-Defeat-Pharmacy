import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import PaymentForm from "./PaymentForm";
import AddressForm from "./AddressForm";
import Review from "./Review";
import TopNavigation from "./TopNavigation";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Axios from "axios";
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        EL7a2ny
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const steps = ["Shipping address", "Payment details", "Review your order"];

function getStepContent(
  step,
  handleAddressSelect,
  handlePaymentMethodSelect,
  selectedAddress,
  selectedPaymentMethodString
) {
  switch (step) {
    case 0:
      return <AddressForm handleAddressSelect={handleAddressSelect} />;
    case 1:
      return (
        <PaymentForm handlePaymentMethodSelect={handlePaymentMethodSelect} />
      );
    case 2:
      return (
        <Review
          selectedAddress={selectedAddress}
          selectedPaymentMethod={selectedPaymentMethodString}
        />
      );
    default:
      throw new Error("Unknown step");
  }
}

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [cart, setCart] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [selectedPaymentMethodString, setSelectedPaymentMethodString] =
    useState("Cash");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const handleNext = () => {
    if (activeStep !== 2) {
      setActiveStep(activeStep + 1);
    } else {
      pay();
    }
  };
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
  const handleAddressSelect = (selectedAddress) => {
    // Use the selected address in Checkout component
    console.log("Selected Address:", selectedAddress);
    setSelectedAddressId(selectedAddress);
    setSelectedAddress(addresses[selectedAddress]);
    console.log("Selected Address:", addresses[selectedAddress]);
    // You can set it in state or perform other operations with the selected address
  };

  const handlePaymentMethodSelect = (selectedPaymentMethod) => {
    console.log("Selected Payment Method:", selectedPaymentMethod);
    setPaymentMethod(selectedPaymentMethod);
    if (selectedPaymentMethod === "cash") {
      setSelectedPaymentMethodString("Cash");
    } else if (selectedPaymentMethod === "credit") {
      setSelectedPaymentMethodString("Credit Card");
    } else {
      setSelectedPaymentMethodString("Wallet");
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleCheckout = async () => {
    try {
      const response = await Axios.post(
        "http://localhost:8000/api/v1/patient/createStripeCheckoutSession",
        { addressId: selectedAddressId },
        { withCredentials: true }
      );

      if (!response.data) {
        throw new Error("Checkout failed");
      }

      window.location = response.data.url;
    } catch (error) {
      console.error("Error during checkout:", error.message);
      setCheckoutMessage("Failed to place the order. Please try again.");
    }
  };
  const fetchData = async () => {
    try {
      const cartResponse = await Axios.get(
        `http://localhost:8000/api/v1/patient/viewCart`,
        { withCredentials: true }
      );
      const cartData = cartResponse.data;
      setCart(cartData);

      const addressesResponse = await Axios.get(
        `http://localhost:8000/api/v1/patient/getAddresses`,
        { withCredentials: true }
      );
      const addressesData = addressesResponse.data;
      setAddresses(addressesData.addresses);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const pay = async (e) => {
    e.preventDefault();
    if (!selectedAddressId) {
      setCheckoutMessage("Please select a delivery address.");
      return;
    }

    if (paymentMethod === "card") {
      handleCheckout();
    } else {
      try {
        const response = await Axios.post(
          "http://localhost:8000/api/v1/patient/checkout",
          {
            addressId: selectedAddressId,
            withWallet: paymentMethod === "wallet",
          },
          { withCredentials: true }
        );

        if (!response.data) {
          throw new Error("Checkout failed");
        }

        if (response.data.error) {
          setCheckoutMessage(response.data.error);
          return;
        }

        setCheckoutMessage(
          `Order placed successfully. Order ID: ${response.data._id}`
        );
        setSelectedAddressId("");
        fetchData();
      } catch (error) {
        console.error("Error during checkout:", error.message);
        setCheckoutMessage("Failed to place the order. Please try again.");
      }
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <TopNavigation link="/patients/medicines" />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(
                activeStep,
                handleAddressSelect,
                handlePaymentMethodSelect,
                selectedAddress,
                selectedPaymentMethodString
              )}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  {checkoutMessage && (
                    <p className="checkout-message">{checkoutMessage}</p>
                  )}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
        <Copyright />
      </Container>
    </React.Fragment>
  );
}
