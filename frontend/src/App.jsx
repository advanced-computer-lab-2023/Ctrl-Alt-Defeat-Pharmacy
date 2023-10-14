import GetAllMedicine from "./components/GetAllMedicine"
import GetMedicineByName from "./components/GetMedicineByName"
import PatientDetails from "./components/PatientDetails"
import PharmacistDetails from "./components/PharmacistDetails"
function App() {

  return (
    <>
    <h1>ctrl-alt-defeat-pharmacy</h1>
    <GetAllMedicine/>
  <PharmacistDetails/>
  <PatientDetails/>
  <GetMedicineByName/>
    </>
  )
}

export default App
