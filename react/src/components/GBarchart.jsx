import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import sampleData from '../data/grantgovDummy.json';

const GGBarChart = ({ width = 'auto', height = '40%' }) => {
  const [yearlyCounts, setYearlyCounts] = useState({});
  const [selectedYear, setSelectedYear] = useState(null); // Add state for selected year

  useEffect(() => {
    const countGrantsByYear = () => {
      const counts = sampleData.reduce((acc, grant) => {
        const dateParts = grant.PostedDate.split('/');
        const year = parseInt(dateParts[2], 10);
        if (year === 2019 || year === 2020 || year === 2021 || year === 2022 || year === 2023 || year === 2024) {
          if (acc[year]) {
            acc[year]++;
          } else {
            acc[year] = 1;
          }
        }
        return acc;
      }, {});

      setYearlyCounts(counts);
    };

    countGrantsByYear();
  }, []);

  const years = ['2019', '2020', '2021', '2022', '2023', '2024'];

  const data = {
    labels: selectedYear ? [selectedYear] : years, // Show all years if no year is selected
    datasets: [
      {
        label: 'Number of Grants',
        data: selectedYear
          ? [yearlyCounts[selectedYear] || 0]
          : years.map(year => yearlyCounts[year] || 0), // Show data for the selected year or all years
        backgroundColor: 'rgba(75, 192, 192, 1)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width, height, margin: 'auto', textAlign: 'center' }}>
        <h1>Grant Released by Year</h1>
        <div>
          <button onClick={() => setSelectedYear(null)}>All Years</button> {/* Button to show all years */}
          {years.map(year => (
            <button key={year} onClick={() => setSelectedYear(year)}>
              {year}
            </button>
          ))}
        </div>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default GGBarChart;
