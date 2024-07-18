// import React, { useEffect, useState } from 'react';
// import { Pie } from 'react-chartjs-2';
// import 'chart.js/auto'; // Import the Chart.js library
// import nihData from '../data/nihData.json';

// const PieChart = () => {
//   const [data, setData] = useState({});

//   useEffect(() => {
//     // Count the occurrences of each 'Parent_Organization'
//     const organizationCounts = {};
//     nihData.forEach(grant => {
//       const org = grant.Parent_Organization;
//       if (!organizationCounts[org]) {
//         organizationCounts[org] = 0;
//       }
//       organizationCounts[org]++;
//     });

//     // Prepare data for the chart
//     const labels = Object.keys(organizationCounts);
//     const counts = Object.values(organizationCounts);

//     setData({
//       labels: labels,
//       datasets: [
//         {
//           data: counts,
//           backgroundColor: [
//             'rgba(255, 99, 132, 0.6)',
//             'rgba(54, 162, 235, 0.6)',
//             'rgba(255, 206, 86, 0.6)',
//             'rgba(75, 192, 192, 0.6)',
//             'rgba(153, 102, 255, 0.6)',
//             'rgba(255, 159, 64, 0.6)'
//           ],
//           borderColor: [
//             'rgba(255, 99, 132, 1)',
//             'rgba(54, 162, 235, 1)',
//             'rgba(255, 206, 86, 1)',
//             'rgba(75, 192, 192, 1)',
//             'rgba(153, 102, 255, 1)',
//             'rgba(255, 159, 64, 1)'
//           ],
//           borderWidth: 1
//         }
//       ]
//     });
//   }, []);

//   const options = {
//     plugins: {
//       title: {
//         display: true,
//         text: 'Grants by Parent Organization'
//       }
//     }
//   };

//   return (
//     <div>
//       <Pie data={data} options={options} />
//     </div>
//   );
// };

// export default PieChart;







// src/PieChart.js
import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { processData } from '../utils/processPieData'; // Ensure this path is correct
import { Box } from '@mui/material';

const PieChart = ({ width = 'auto', height = '40%' }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3002/api/grants')
      .then((response) => {
        const { labels, values } = processData(response.data);
        setChartData({
          labels,
          datasets: [
            {
              data: values,
              backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(255, 235, 205, 1)',
                // Add more colors if needed
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(255, 235, 205, 1)',
                // Add more border colors if needed
              ],
              borderWidth: 4,
            },
          ],
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  if (!chartData) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width, height, margin: 'auto', textAlign: 'center' }}>
        <h1>Grants offered by Funding Organizations</h1>
        <Pie data={chartData} options={{ maintainAspectRatio: true, aspectRatio: 1 }} />


      </div>
    </div>



  );
};

export default PieChart;

