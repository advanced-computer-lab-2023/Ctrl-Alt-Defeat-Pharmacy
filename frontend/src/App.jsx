import GetAllMedicine from "./components/GetAllMedicine";
import GetMedicineByName from "./components/GetMedicineByName";
import PatientDetails from "./components/PatientDetails";
import PharmacistDetails from "./components/PharmacistDetails";
import PatientRegister from "./components/PatientRegister";
import PharmacistRegister from "./components/PharmacistRegister";
import AddMedicine from "./components/AddMedicine";
function App() {
  return (
    <>
      <h1>ctrl-alt-defeat-pharmacy</h1>
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
    </>
  );
}

export default App;
