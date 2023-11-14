import React from "react";
import { Link } from "react-router-dom";
import "../Css/Home.css";

function Home() {
  return (
    <div className="home-container">
      <h1 className="title">Welcome to Ctrl-Alt-Defeat Pharmacy, Guest!</h1>
      <Link to="/patients/register" className="link">
        Register as Patient
      </Link>
      <Link to="/pharmacists/register" className="link">
        Register as Pharmacist
      </Link>
      <Link to="/login" className="link">
        Login
      </Link>
    </div>
  );
}

export default Home;
