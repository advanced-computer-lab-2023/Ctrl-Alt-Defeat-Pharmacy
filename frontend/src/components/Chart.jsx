import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import Title from './Title';
import axios from 'axios';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#82CA9D', '#FF6666', '#FFCC99'];

export default function PatientPharmacistPieChart() {
  const [patientCount, setPatientCount] = useState(0);
  const [pharmacistCount, setPharmacistCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch patient count
        const responsePatients = await axios.get('http://localhost:8000/api/v1/admin/getCountOfPatients', { withCredentials: true });
        setPatientCount(responsePatients.data?.data);

        // Fetch pharmacist count
        const responsePharmacists = await axios.get('http://localhost:8000/api/v1/admin/getCountOfPharmacists', { withCredentials: true });
        setPharmacistCount(responsePharmacists.data?.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Run the effect only once on mount

  // Render PieChart with combined data
  const data = [
    { label: 'Patients', value: patientCount },
    { label: 'Pharmacists', value: pharmacistCount },
  ];
  console.log(patientCount, pharmacistCount);

  return (
    <React.Fragment>
      <Title>Patients and Pharmacists</Title>
      <PieChart width={900} height={200}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="label"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </React.Fragment>
  );
}
