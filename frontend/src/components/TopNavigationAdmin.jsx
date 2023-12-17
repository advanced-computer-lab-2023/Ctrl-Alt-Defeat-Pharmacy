import { useState } from "react";
import { Link } from "react-router-dom";
import {
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import LockIcon from "@mui/icons-material/Lock";
import Axios from "axios";
import "../Css/TopNavigation.css";
import PropTypes from "prop-types";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import BarChartIcon from "@mui/icons-material/BarChart";
import HomeIcon from "@mui/icons-material/Home";
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";
import PersonRemoveAlt1RoundedIcon from "@mui/icons-material/PersonRemoveAlt1Rounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import SummarizeIcon from '@mui/icons-material/Summarize';
import SalesReport from "./SalesReport";

const TopNavigationAdmin = (props) => {
  const { link } = props;

  const [showSideNav, setShowSideNav] = useState(false);

  const handleToggleSideNav = () => {
    setShowSideNav(!showSideNav);
  };

  const handleLogout = async () => {
    const response = await Axios.get(
      "http://localhost:8000/api/v1/auth/logout",
      { withCredentials: true }
    );
    console.log(response.data);
  };

  return (
    <div>
      <div className="top-navigation">
        <div className="drawerIcon-container">
          <IconButton onClick={handleToggleSideNav}>
            <MenuIcon />
          </IconButton>
        </div>
        <Link to={link}>
          <div className="logo-container">
            <img
              src="../src/assets/logo.png"
              alt="Pharmacy Logo"
              className="logo"
            />
          </div>
        </Link>
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
            to="/admins/salesReport"
            onClick={handleToggleSideNav}
          >
            <ListItemIcon>
              <SummarizeIcon />
            </ListItemIcon>
            <ListItemText primary="Report" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/pharmacists/medicines"
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
  );
};

export default TopNavigationAdmin;
