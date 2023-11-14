import React from "react";
import AddAdmin from "./components/AddAdmin";
import RemovePatients from "./components/RemovePatients";
import RemovePharmacists from "./components/RemovePharmacists";
import ViewPendingPharmacists from "./components/ViewPendingPharmacists";
import ViewMedicineQuantitySales from "./components/ViewMedicineQuantitySales";
import MedicinesPage from "./components/MedicinePage";
import PatientDetails from "./components/PatientDetails";
import PharmacistDetails from "./components/PharmacistDetails";
import PatientRegister from "./components/PatientRegister";
import PharmacistRegister from "./components/PharmacistRegister";
import AddMedicine from "./components/AddMedicine";
import EditMedicine from "./components/EditMedicine";
import ViewCart from "./components/ViewCart";
import Home from "./components/Home";
import Login from "./components/Login";
import AdminHome from "./components/AdminHome";
import PharmacistHome from "./components/PharmacistHome";
import PatientHome from "./components/PatientHome";
import Checkout from "./components/Checkout";
import ViewOrder from "./components/ViewOrder";
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/patients/register" element={<PatientRegister />} />
          <Route path="/pharmacists/register"element={<PharmacistRegister />} />
          {/* Admin  */}
          <Route path="/admins/home" element={<AdminHome />} />
          <Route path="/admins/addAdmin" element={<AddAdmin />} />
          <Route path="/admins/removePharmacist" element={<RemovePharmacists />}/>
          <Route path="/admins/removePatient" element={<RemovePatients />} />
          <Route path="/admins/viewPendingPharmacists" element={<ViewPendingPharmacists />}/>
          {/* Pharmacist */}
          <Route path="/pharmacists/home" element={<PharmacistHome />} />
          <Route path="/pharmacists/viewMedicineQuantitySales" element={<ViewMedicineQuantitySales />} />
          <Route path="/pharmacists/addMedicine" element={<AddMedicine />} />
          <Route path="/pharmacists/editMedicine" element={<EditMedicine />} />
          <Route path="/pharmacists/medicines" element={<MedicinesPage />} />
          {/* Patient */}
          <Route path="/patients/home" element={<PatientHome />} />
          <Route path="patients/medicines" element={<MedicinesPage />} />
          <Route path="patients/viewOrder" element={<ViewOrder />} />
          <Route path="patients/viewCart" element={<ViewCart />} />
          <Route path="patients/checkout" element={<Checkout />} />
        </Routes>
      </BrowserRouter>

      {/* OLD COMPONENTS PLACEMENT BEFORE NAVIGATION */}
      {/* <AddAdmin /> Done
      <hr />s
      <RemovePatients /> Done
      <hr />
      <RemovePharmacists /> Done
      <hr />
      <ViewPendingPharmacists /> Done
      <hr />
      <ViewMedicineQuantitySales />
      <hr />
      <PatientRegister /> Done
      <hr />
      <PharmacistRegister /> Done
      <hr />
      <GetAllMedicine /> Done
      <hr />
      <PharmacistDetails />
      <hr />
      <PatientDetails />
      <hr />
      <GetMedicineByName />
      <hr />
      <AddMedicine />
      <hr />
      <EditMedicine />
      <hr />
      <AddToCart />
      <hr />
      <ViewCart /> Done */}
    </div>
  );
}

export default App;
