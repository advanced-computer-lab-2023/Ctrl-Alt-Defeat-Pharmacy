import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddAdmin from "../components/AddAdmin";
import RemovePharmacists from "../components/RemovePharmacists";

import {Outlet, useNavigate} from "react-router-dom";
import {AppBar,Box,Container,CssBaseline,Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import {Add,Remove,Person,AccountCircle,Delete,
  ViewList,
  MedicalServices,
  Update,
  ExitToApp,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LockIcon from "@mui/icons-material/Lock";
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import PendingActionsRoundedIcon from '@mui/icons-material/PendingActionsRounded';
import PersonRemoveAlt1RoundedIcon from '@mui/icons-material/PersonRemoveAlt1Rounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import Dashboard from "../components/Dashboard";
import Button from '@mui/material/Button';





const drawerWidth = 240;


const StyledAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
}));

const StyledDrawerPaper = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
}));

const StyledDrawerContainer = styled("div")(({ theme }) => ({
  overflow: "auto",
}));

const StyledContent = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  flexGrow: 1,
  padding: theme.spacing(3),
  height: "100vh",
  marginLeft: `${drawerWidth}px`, // Adjusted to include the drawer width
  width: `calc(100% - ${drawerWidth}px)`, // Adjusted to subtract the drawer width
}));


function AdminHome() {

  const handleLogout = async () => {
    const response = await axios.get(
      "http://localhost:8000/api/v1/auth/logout",
      { withCredentials: true }
    );
    console.log(response.data);
  

  };

  const [showSideNav, setShowSideNav] = useState(false);

  const handleToggleSideNav = () => {
    setShowSideNav(!showSideNav);
  };

  

  return (
    <div>
      <div>
      <div className="top-navigation">
          <IconButton onClick={handleToggleSideNav}>
            <MenuIcon />
          </IconButton>
          <div className="right-section" style={{ marginLeft: 'auto' }}>
        <Button component={Link} to="/" onClick={handleLogout} color="inherit">
          Logout
        </Button>
      </div>
      </div>
      <Drawer anchor="left" open={showSideNav} onClose={handleToggleSideNav}>
          <List>
            <ListItem
              button
              component={Link}
              to="/admins/home"
              onClick={handleToggleSideNav}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/patients/medicines"
              onClick={handleToggleSideNav}
            >
              <ListItemIcon>
                <LocalPharmacyIcon />
              </ListItemIcon>
              <ListItemText primary="Medicines" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/admins/addadmin"
              onClick={handleToggleSideNav}
            >
              <ListItemIcon>
                <AddCircleSharpIcon />
              </ListItemIcon>
              <ListItemText primary="Add Admin" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/admins/viewPendingPharmacists"
              onClick={handleToggleSideNav}
            >
              <ListItemIcon>
                <PendingActionsRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Pending" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/admins/removePatient"
              onClick={handleToggleSideNav}
            >
            <ListItemIcon>
                <PersonRemoveAlt1RoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Remove Patient" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/admins/removePharmacist"
              onClick={handleToggleSideNav}
            >
              <ListItemIcon>
                <PersonRemoveAlt1RoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Remove Pharmacist" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/admins/patientDetails"
              onClick={handleToggleSideNav}
            >
              <ListItemIcon>
                <InfoRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Patients Details" />
            </ListItem>            
            <ListItem
              button
              component={Link}
              to="/admins/pharmacistDetails"
              onClick={handleToggleSideNav}
            >
              <ListItemIcon>
                <InfoRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Pharmacist Details" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/changePassword"
              onClick={handleToggleSideNav}
            >
              <ListItemIcon>
                <LockIcon />
              </ListItemIcon>
              <ListItemText primary="Change password" />
            </ListItem>
            <hr className="hr" />
            <ListItem
              button
              component={Link}
              to="/"
              className="right"
              onClick={handleLogout}
            >
              <ListItemIcon>
                <LockIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Drawer>
        </div>
      {/* <div className="main-container" style={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}>
        <div className="welcome-section">
          <h2>Hello, Admin!</h2>
          <AddAdmin />
        </div>
      </div> */}

<Dashboard />

    </div>
  );
}

export default AdminHome;