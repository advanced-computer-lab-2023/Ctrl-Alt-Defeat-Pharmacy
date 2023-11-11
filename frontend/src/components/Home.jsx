import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <h1>welcome to ctrl-alt-defeat pharmacy, Guest!</h1>
      <Link to="/patients/register">register as patient</Link>
      <Link to="/pharmacists/register">register as pharmacist</Link>
      <Link to="/login">login</Link>
    </div>
  );
}

export default Home;
