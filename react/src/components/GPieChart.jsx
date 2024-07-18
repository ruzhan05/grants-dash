// import React, { useState, useEffect } from 'react';
// import { Pie } from 'react-chartjs-2';
// import axios from 'axios';
// import { processData } from '../utils/processPieData'; // Ensure this path is correct
// import { Box } from '@mui/material';

// const GPieChart = ({ width = 'auto', height = '40%' }) => {
//   const [chartData, setChartData] = useState(null);

//   useEffect(() => {
//     axios.get('http://localhost:3002/api/grants')
//       .then((response) => {
//         const { labels, values } = processData(response.data);
//         setChartData({
//           labels,
//           datasets: [
//             {
//               data: values,
//               backgroundColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(255, 159, 64, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(255, 235, 205, 1)',
//                 // Add more colors if needed
//               ],
//               borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(255, 159, 64, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(255, 235, 205, 1)',
//                 // Add more border colors if needed
//               ],
//               borderWidth: 4,
//             },
//           ],
//         });
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

//   if (!chartData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div style={{ alignItems: 'center', justifyContent: 'center' }}>
//       <div style={{ width, height, margin: 'auto', textAlign: 'center' }}>
//         <h1>Grants offered by Funding Organizations</h1>
//         <Pie data={chartData} options={{ maintainAspectRatio: true, aspectRatio: 1 }} />


//       </div>
//     </div>



//   );
// };

// export default GPieChart;







//without DB


import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import data from "../data/grantgovDummy.json"
import { processData } from '../utils/processGpieData'; // Ensure this path is correct
import { Box } from '@mui/material';

const GPieChart = ({ width = 'auto', height = '40%' }) => {
    const { labels, values } = processData(data);



    const chartData = {
        labels,
        datasets: [
            {
                data: values,
                backgroundColor: [

                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 235, 205, 1)',
                    'rgba(204, 153, 255, 1)',
                    'rgba(255,0,0,1)',
                    'rgba(124,252,0, 1)',
                    'rgba(0,255,255, 1)',
                    'rgba(0,0,139,1)',
                    'rgba(210,105,30,1)',
                    'rgba(255,20,147, 1)',
                    'rgba(127,255,212,1)'

                    // Add more colors if needed
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 235, 205, 1)',
                    'rgba(204, 153, 255, 1)',
                    'rgba(255,0,0,1)',
                    'rgba(124,252,0, 1)',
                    'rgba(0,255,255, 1)',
                    'rgba(0,0,139,1)',
                    'rgba(210,105,30,1)',
                    'rgba(255,20,147, 1)',
                    'rgba(127,255,212,1)'
                    // Add more border colors if needed
                ],
                borderWidth: 4,
            },
        ],
    };

    return (
        <div style={{ alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width, height, margin: 'auto', textAlign: 'center' }}>
                <h1>Grants offered by Funding Organizations</h1>
                <Pie data={chartData} options={{ maintainAspectRatio: true, aspectRatio: 1 }} />


            </div>
        </div>



    );
};

export default GPieChart;