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
import Checkout from "./components/Checkout";
import ViewOrder from "./components/ViewOrder";

function App() {
  return (
    <div className="App">
      <AddAdmin />
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
      <Checkout />
      <hr />
      <ViewOrder />
    </div>
  );
}

export default App;
