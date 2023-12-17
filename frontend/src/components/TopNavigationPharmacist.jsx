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
import Axios from "axios";
import "../Css/TopNavigation.css";
import PropTypes from "prop-types";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import BarChartIcon from "@mui/icons-material/BarChart";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
const TopNavigationPharmacist = (props) => {
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
        <div className="account-icon-container">
          <Link to="/pharmacists/home">
            <IconButton>
              <AccountCircleIcon />
            </IconButton>
          </Link>
        </div>
      </div>
      <Drawer anchor="left" open={showSideNav} onClose={handleToggleSideNav}>
        <List>
          <ListItem
            button
            component={Link}
            to="/pharmacists/medicines"
            onClick={handleToggleSideNav}
          >
            <ListItemIcon>
              <LocalPharmacyIcon />
            </ListItemIcon>
            <ListItemText primary="Medications" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/pharmacists/addMedicine"
            onClick={handleToggleSideNav}
          >
            <ListItemIcon>
              <AddCircleOutlineIcon />
            </ListItemIcon>
            <ListItemText primary="Add Medication" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/pharmacists/editMedicine"
            onClick={handleToggleSideNav}
          >
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="Edit Medication" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/pharmacists/viewMedicineQuantitySales"
            onClick={handleToggleSideNav}
          >
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Medicine Sales" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/pharmacists/chats"
            onClick={handleToggleSideNav}
          >
            <ListItemIcon>
              <ChatBubbleIcon />
            </ListItemIcon>
            <ListItemText primary="Chats" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/pharmacists/home"
            onClick={handleToggleSideNav}
          >
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Account Details" />
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
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

TopNavigationPharmacist.propTypes = {
  link: PropTypes.string.isRequired,
};

export default TopNavigationPharmacist;
