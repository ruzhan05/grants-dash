///main code 


// import React, { useEffect, useState } from 'react';
// import { Bar } from 'react-chartjs-2';
// import 'chart.js/auto'; // Import the Chart.js library
// import nihData from '../data/nihData.json'


// const GrantChart = () => {
//   const [grantsByMonth, setGrantsByMonth] = useState({});

//   useEffect(() => {
//     const countsByMonth = {};

//     // Count grants by month
//     nihData.forEach(grant => {
//       const monthName = new Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(grant.Release_Date));
//       if (!countsByMonth[monthName]) {
//         countsByMonth[monthName] = 0;
//       }
//       countsByMonth[monthName]++;
//     });

//     // Set state with sorted months
//     setGrantsByMonth(countsByMonth);
//   }, []);

//   // Prepare data for chart
//   const months = Object.keys(grantsByMonth).sort((a, b) => {
//     return new Date('2020 ' + a) - new Date('2020 ' + b);
//   });
//   const counts = months.map(month => grantsByMonth[month]);

//   // Check if counts are populated correctly
//   console.log('Months:', months);
//   console.log('Counts:', counts);

//   const data = {
//     labels: months,
//     datasets: [{
//       label: 'Number of Grants',
//       data: counts,
//       backgroundColor: 'rgba(54, 162, 235, 0.6)',
//       borderColor: '	rgb(0,0,0)',
//       borderWidth: 1
//     }]
//   };

//   const options = {
//     scales: {
//       y: {
//         beginAtZero: true,
//         title: {
//           display: true,
//           text: 'Number of Grants'
//         }
//       },
//       x: {
//         title: {
//           display: true,
//           text: 'Month'
//         }
//       }
//     }
//   };

//   return (
//     <div>
//       <Bar data={data} options={options} />
//     </div>
//   );
// };

// export default GrantChart;




////main code






///basic code for creating a chart from a json



// import React from "react";
// import { Chart as ChartJS, defaults } from "chart.js/auto";
// import { Bar, Doughnut, Line } from "react-chartjs-2";

// import "./App.css";

// import revenueData from "./data/revenueData.json";
// import sourceData from "./data/sourceData.json";

// defaults.maintainAspectRatio = false;
// defaults.responsive = true;

// defaults.plugins.title.display = true;
// defaults.plugins.title.align = "start";
// defaults.plugins.title.font.size = 20;
// defaults.plugins.title.color = "black";

// export const App = () => {
//   return (
//     <div className="App">
//       <div className="dataCard revenueCard">
//         <Line
//           data={{
//             labels: revenueData.map((data) => data.label),
//             datasets: [
//               {
//                 label: "Revenue",
//                 data: revenueData.map((data) => data.revenue),
//                 backgroundColor: "#064FF0",
//                 borderColor: "#064FF0",
//               },
//               {
//                 label: "Cost",
//                 data: revenueData.map((data) => data.cost),
//                 backgroundColor: "#FF3030",
//                 borderColor: "#FF3030",
//               },
//             ],
//           }}
//           options={{
//             elements: {
//               line: {
//                 tension: 0.5,
//               },
//             },
//             plugins: {
//               title: {
//                 text: "Monthly Revenue & Cost",
//               },
//             },
//           }}
//         />
//       </div>

//       <div className="dataCard customerCard">
//         <Bar
//           data={{
//             labels: sourceData.map((data) => data.label),
//             datasets: [
//               {
//                 label: "Count",
//                 data: sourceData.map((data) => data.value),
//                 backgroundColor: [
//                   "rgba(43, 63, 229, 0.8)",
//                   "rgba(250, 192, 19, 0.8)",
//                   "rgba(253, 135, 135, 0.8)",
//                 ],
//                 borderRadius: 5,
//               },
//             ],
//           }}
//           options={{
//             plugins: {
//               title: {
//                 text: "Revenue Source",
//               },
//             },
//           }}
//         />
//       </div>

//       <div className="dataCard categoryCard">
//         <Doughnut
//           data={{
//             labels: sourceData.map((data) => data.label),
//             datasets: [
//               {
//                 label: "Count",
//                 data: sourceData.map((data) => data.value),
//                 backgroundColor: [
//                   "rgba(43, 63, 229, 0.8)",
//                   "rgba(250, 192, 19, 0.8)",
//                   "rgba(253, 135, 135, 0.8)",
//                 ],
//                 borderColor: [
//                   "rgba(43, 63, 229, 0.8)",
//                   "rgba(250, 192, 19, 0.8)",
//                   "rgba(253, 135, 135, 0.8)",
//                 ],
//               },
//             ],
//           }}
//           options={{
//             plugins: {
//               title: {
//                 text: "Revenue Sources",
//               },
//             },
//           }}
//         />
//       </div>
//     </div>
//   );
// };







import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Import the Chart.js library
import axios from 'axios';

const GrantChart = () => {
  const [grantsByMonth, setGrantsByMonth] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/grants');
        const data = response.data;

        const countsByMonth = {};

        // Count grants by month
        data.forEach(grant => {
          const monthName = new Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(grant.releaseDate));
          if (!countsByMonth[monthName]) {
            countsByMonth[monthName] = 0;
          }
          countsByMonth[monthName]++;
        });

        // Set state with sorted months
        setGrantsByMonth(countsByMonth);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Prepare data for chart
  const months = Object.keys(grantsByMonth).sort((a, b) => {
    return new Date('2020 ' + a) - new Date('2020 ' + b);
  });
  const counts = months.map(month => grantsByMonth[month]);

  const data = {
    labels: months,
    datasets: [{
      label: 'Number of Grants',
      data: counts,
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
      borderColor: 'rgb(0,0,0)',
      borderWidth: 1
    }]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Grants'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Month'
        }
      }
    }
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default GrantChart;
