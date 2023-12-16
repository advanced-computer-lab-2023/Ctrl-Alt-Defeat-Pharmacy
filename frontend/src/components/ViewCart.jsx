import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import Paper from "@mui/material/Paper";

import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import Review from "./ViewCartHelper";
import TopNavigation from "./TopNavigation";
import { useNavigate } from "react-router-dom";

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

export default function Checkout() {
  const navigate = useNavigate();

  //   useEffect(() => {
  //     // Perform navigation when the component is mounted
  //     navigate("/patients/checkout");
  //   }, [navigate]);
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
            Cart
          </Typography>

          <React.Fragment>
            <Review />
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                onClick={() => navigate("/patients/checkout")}
                sx={{ mt: 3, ml: 1 }}
              >
                Place order
              </Button>
            </Box>
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
    </React.Fragment>
  );
}
