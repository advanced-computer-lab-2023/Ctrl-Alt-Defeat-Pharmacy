// App.js
import React from "react";
import AddAdmin from "./components/AddAdmin";
import RemovePatients from "./components/RemovePatients";
import RemovePharmacists from "./components/RemovePharmacists";
import ViewPendingPharmacists from "./components/ViewPendingPharmacists";
import ViewMedicineQuantitySales from "./components/ViewMedicineQuantitySales";

function App() {
  return (
    <div className="App">
      <h1>ctrl-alt-defeat-pharmacy</h1>
      <AddAdmin />
      <RemovePatients />
      <RemovePharmacists />
      <ViewPendingPharmacists />
      <ViewMedicineQuantitySales />
    </div>
  );
}

export default App;
