import React from "react";
import AddAdmin from "./components/AddAdmin";
import RemovePatients from "./components/RemovePatients";
import RemovePharmacists from "./components/RemovePharmacists";
import ViewPendingPharmacists from "./components/ViewPendingPharmacists";
import ViewMedicineQuantitySales from "./components/ViewMedicineQuantitySales";
import PatientMedicinePage from "./components/PatientMedicinePage";
import MedicinePage from "./components/MedicinePage";
import PatientDetails from "./components/PatientDetails";
import PharmacistDetails from "./components/PharmacistDetails";
import PatientRegister from "./components/PatientRegister";
import PharmacistRegister from "./components/PharmacistRegister";
import AddMedicine from "./components/AddMedicine";
import EditMedicine from "./components/EditMedicine";
import ViewCart from "./components/ViewCart";
import Home from "./components/Home";
import Login from "./components/Login";
import AdminHome from "./Pages/AdminHome";
import PharmacistHome from "./components/PharmacistHome";
import PatientHome from "./components/PatientHome";
import Checkout from "./components/Checkout";
import ViewOrder from "./components/ViewOrder";
import VerifyOTP from "./components/VerifyOTP";
import ForgetPassword from "./components/ForgetPassword";
import ResetPassword from "./components/ResetPassword";
import ChangePassword from "./components/ChangePassword";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chart from "./components/Chart";
import Dashboard from "./components/Dashboard";
import Deposits from "./components/Deposits";
import ListItems from "./components/ListItems";
import Title from "./components/Title";
import Orders from "./components/Orders";
import TopNavigationAdmin from "./components/TopNavigationAdmin";
import SalesReport from "./components/SalesReport";
import SalesReportPhar from "./components/SalesReportPhar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/patients/register" element={<PatientRegister />} />
          <Route
            path="/pharmacists/register"
            element={<PharmacistRegister />}
          />
          <Route path="/verifyOTP/:username" element={<VerifyOTP />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/resetPassword/:username" element={<ResetPassword />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          {/* Admin  */}
          <Route path="/admins/home" element={<AdminHome />} />
          <Route path="/admins/addAdmin" element={<AddAdmin />} />
          <Route
            path="/admins/removePharmacist"
            element={<RemovePharmacists />}
          />
          <Route path="/admins/removePatient" element={<RemovePatients />} />
          <Route path="/admins/viewPendingPharmacists" element={<ViewPendingPharmacists />}/>
          <Route path= "admins/patientDetails" element={<PatientDetails />} />
          <Route path= "admins/pharmacistDetails" element={<PharmacistDetails />} />
          <Route path="/admins/medicines" element={<MedicinePage />} />
          <Route
            path="/admins/viewPendingPharmacists"
            element={<ViewPendingPharmacists />}
          />
          {/* Pharmacist */}
          <Route path="/pharmacists/home" element={<PharmacistHome />} />
          <Route
            path="/pharmacists/viewMedicineQuantitySales"
            element={<ViewMedicineQuantitySales />}
          />
          <Route path="/pharmacists/addMedicine" element={<AddMedicine />} />
          <Route path="/pharmacists/editMedicine" element={<EditMedicine />} />
          <Route path="/pharmacists/medicines" element={<MedicinePage />} />
          {/* Patient */}
          <Route path="/patients/home" element={<PatientHome />} />
          <Route path="patients/medicines" element={<PatientMedicinePage />} />
          <Route path="patients/viewOrder" element={<ViewOrder />} />
          <Route path="patients/viewCart" element={<ViewCart />} />
          <Route path="patients/checkout" element={<Checkout />} />
          <Route path="admins/chart" element={<Chart />} />
          <Route path="admins/dashboard" element={<Dashboard />} />
          <Route path="admins/deposits" element={<Deposits />} />
          <Route path="admins/listItems" element={<ListItems />} />
          <Route path="admins/title" element={<Title />} />
          <Route path="admins/orders" element={<Orders />} />
          <Route path="admins/topNavigationAdmin" element={<TopNavigationAdmin />} />
          <Route path="admins/salesReport" element={<SalesReport />} />
          <Route path="pharmacists/salesReportPhar" element={<SalesReportPhar />} />


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
      <ViewMedicineQuantitySales /> Done
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
