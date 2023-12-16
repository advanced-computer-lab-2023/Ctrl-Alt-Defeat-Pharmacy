import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {AppBar,  Drawer} from "@mui/material";
import { styled } from "@mui/material/styles";
import Dashboard from "../components/Dashboard";
import TopNavigationAdmin from "../components/TopNavigationAdmin";
import "../Css/PatientDetails.css";

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
      <div classname='patient-details-container'>
    <TopNavigationAdmin link="/admins/home" />
    <div className="drawerIcon-container">
        </div>
      <Dashboard />
      </div>
    </div>
  );
}

export default AdminHome;