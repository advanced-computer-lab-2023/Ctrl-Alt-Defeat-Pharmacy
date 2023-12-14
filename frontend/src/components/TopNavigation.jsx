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
import HomeIcon from "@mui/icons-material/Home";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LockIcon from "@mui/icons-material/Lock";
import Axios from "axios";

const TopNavigation = (props) => {
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
        <IconButton onClick={handleToggleSideNav}>
          <MenuIcon />
        </IconButton>
        <Link to={props.link}>
          <img
            src="../src/assets/logo.png"
            alt="Pharmacy Logo"
            className="logo"
          />
        </Link>
      </div>
      <Drawer anchor="left" open={showSideNav} onClose={handleToggleSideNav}>
        <List>
          <ListItem
            button
            component={Link}
            to="/patients/home"
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
            to="/patients/viewOrder"
            onClick={handleToggleSideNav}
          >
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/patients/viewCart"
            onClick={handleToggleSideNav}
          >
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Cart" />
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

export default TopNavigation;
