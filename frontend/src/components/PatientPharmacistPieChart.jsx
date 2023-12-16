import React, { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function PatientPharmacistPieChart() {
  const [patientData, setPatientData] = useState([]);
  const [pharmacistData, setPharmacistData] = useState([]);

  useEffect(() => {
    // Assuming you have functions getAllPatients and getAllPharmacists
    const fetchData = async () => {
      try {
        const patients = await getAllPatients();
        const pharmacists = await getAllPharmacists();

        // Update state with fetched data
        setPatientData(patients);
        setPharmacistData(pharmacists);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Run the effect only once on mount

  // Calculate total patients and pharmacists
  const totalPatients = patientData.reduce((sum, patient) => sum + patient.value, 0);
  const totalPharmacists = pharmacistData.reduce((sum, pharmacist) => sum + pharmacist.value, 0);

  // Render PieChart with combined data
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: totalPatients, label: 'Patients' },
            { id: 1, value: totalPharmacists, label: 'Pharmacists' },
          ],
        },
      ]}
      width={400}
      height={200}
    />
  );
}
