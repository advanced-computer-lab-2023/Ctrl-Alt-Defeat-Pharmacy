import React from "react";
import AddAdmin from "./components/AddAdmin";
import RemovePatients from "./components/RemovePatients";
import RemovePharmacists from "./components/RemovePharmacists";
import ViewPendingPharmacists from "./components/ViewPendingPharmacists";
import ViewMedicineQuantitySales from "./components/ViewMedicineQuantitySales";
import GetAllMedicine from "./components/GetAllMedicine";
import GetMedicineByName from "./components/GetMedicineByName";
import PatientDetails from "./components/PatientDetails";
import PharmacistDetails from "./components/PharmacistDetails";
import PatientRegister from "./components/PatientRegister";
import PharmacistRegister from "./components/PharmacistRegister";
import AddMedicine from "./components/AddMedicine";
import EditMedicine from "./components/EditMedicine";
import AddToCart from "./components/AddToCart";
import ViewCart from "./components/ViewCart";
import Home from "./components/Home";
import Login from "./components/Login";
import AdminHome from "./components/AdminHome";
import PharmacistHome from "./components/PharmacistHome";
import PatientHome from "./components/PatientHome";
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
          <Route path="/admins/home" element={<AdminHome />} />
          <Route path="/admins/addAdmin" element={<AddAdmin />} />
          <Route path="/admins/removePharmacist" element={<RemovePharmacists />}/>
          <Route path="/admins/removePatient" element={<RemovePatients />} />
          <Route path="/admins/viewPendingPharmacists" element={<ViewPendingPharmacists />}/>
          <Route path="/pharmacists/home" element={<PharmacistHome />} />
          <Route path="/patients/home" element={<PatientHome />} />
          <Route path="patients/medicines" element={<GetAllMedicine />} />
          <Route path="patients/viewCart" element={<ViewCart />} />
        </Routes>
      </BrowserRouter>

      {/* OLD COMPONENTS PLACEMENT BEFORE NAVIGATION */}
      {/* <AddAdmin />
      <hr />
      <RemovePatients />
      <hr />
      <RemovePharmacists />
      <hr />
      <ViewPendingPharmacists />
      <hr />
      <ViewMedicineQuantitySales />
      <hr />
      <PatientRegister />
      <hr />
      <PharmacistRegister />
      <hr />
      <GetAllMedicine />
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
      <ViewCart /> */}
    </div>
  );
}

export default App;
