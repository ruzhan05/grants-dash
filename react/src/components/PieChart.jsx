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
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { processData } from '../utils/processPieData';
import data from '../data/nihData.json'; // Import the JSON data

const PieChart = () => {
  const { labels, values } = processData(data);

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          // Add more colors if needed
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          // Add more border colors if needed
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Grants by Parent Organization</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default PieChart;
