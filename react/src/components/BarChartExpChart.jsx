// import React, { useEffect, useState } from 'react';
// import { Bar } from 'react-chartjs-2';
// import 'chart.js/auto'; // Import the Chart.js library
// import nihData from '../data/nihData.json';

// const BarChartExpChart = () => {
//     const [grantsByMonth, setGrantsByMonth] = useState(Array(12).fill(0));

//     useEffect(() => {
//         const countsByMonth = Array(12).fill(0);

//         // Count grants by month
//         nihData.forEach(grant => {
//             if (grant.Expired_Date) { // Check if Expired_Date exists
//                 const monthIndex = new Date(grant.Expired_Date).getMonth(); // Get month index (0-11)
//                 countsByMonth[monthIndex]++;
//             }
//         });

//         setGrantsByMonth(countsByMonth);
//     }, []);

//     // Define month names
//     const monthNames = [
//         'January', 'February', 'March', 'April', 'May', 'June',
//         'July', 'August', 'September', 'October', 'November', 'December'
//     ];

//     // Prepare data for chart
//     const data = {
//         labels: monthNames,
//         datasets: [{
//             label: 'Number of Grants',
//             data: grantsByMonth,
//             backgroundColor: 'rgba(54, 162, 235, 0.6)',
//             borderColor: 'rgb(0,0,0)',
//             borderWidth: 1
//         }]
//     };

//     const options = {
//         scales: {
//             y: {
//                 beginAtZero: true,
//                 title: {
//                     display: true,
//                     text: 'Number of Grants'
//                 }
//             },
//             x: {
//                 title: {
//                     display: true,
//                     text: 'Month'
//                 }
//             }
//         }
//     };

//     return (
//         <div>
//             <Bar data={data} options={options} />
//         </div>
//     );
// };

// export default BarChartExpChart;





// import React, { useEffect, useState } from 'react';
// import { Bar } from 'react-chartjs-2';
// import 'chart.js/auto'; // Import the Chart.js library
// import nihData from '../data/nihData.json';

// const BarChartExpChart = () => {
//     const [grantsByMonthYear, setGrantsByMonthYear] = useState({});

//     useEffect(() => {
//         const countsByMonthYear = {};

//         // Count grants by month and year
//         nihData.forEach(grant => {
//             if (grant.Expired_Date) { // Check if Expired_Date exists
//                 const date = new Date(grant.Expired_Date);
//                 const month = date.toLocaleString('default', { month: 'long' });
//                 const year = date.getFullYear();
//                 const monthYear = `${month} ${year}`;

//                 if (!countsByMonthYear[monthYear]) {
//                     countsByMonthYear[monthYear] = 0;
//                 }
//                 countsByMonthYear[monthYear]++;
//             }
//         });

//         setGrantsByMonthYear(countsByMonthYear);
//     }, []);

//     // Prepare data for chart
//     const sortedMonthYears = Object.keys(grantsByMonthYear).sort((a, b) => {
//         const [monthA, yearA] = a.split(' ');
//         const [monthB, yearB] = b.split(' ');
//         const dateA = new Date(`${monthA} 1, ${yearA}`);
//         const dateB = new Date(`${monthB} 1, ${yearB}`);
//         return dateA - dateB;
//     });
    
//     const counts = sortedMonthYears.map(monthYear => grantsByMonthYear[monthYear]);

//     const data = {
//         labels: sortedMonthYears,
//         datasets: [{
//             label: 'Number of Grants',
//             data: counts,
//             backgroundColor: 'rgba(54, 162, 235, 0.6)',
//             borderColor: 'rgb(0,0,0)',
//             borderWidth: 1
//         }]
//     };

//     const options = {
//         scales: {
//             y: {
//                 beginAtZero: true,
//                 title: {
//                     display: true,
//                     text: 'Number of Grants'
//                 }
//             },
//             x: {
//                 title: {
//                     display: true,
//                     text: 'Month Year'
//                 }
//             }
//         }
//     };

//     return (
//         <div>
//             <Bar data={data} options={options} />
//         </div>
//     );
// };

// export default BarChartExpChart;




import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Import the Chart.js library 
import nihData from '../data/nihData.json';

const LineChartExpChart = () => {
    const [grantsByYear, setGrantsByYear] = useState({});

    useEffect(() => {
        const countsByYear = {};

        // Count grants by year
        nihData.forEach(grant => {
            if (grant.Expired_Date) { // Check if Expired_Date exists
                const year = new Date(grant.Expired_Date).getFullYear();
                if (!countsByYear[year]) {
                    countsByYear[year] = 0;
                }
                countsByYear[year]++;
            }
        });

        setGrantsByYear(countsByYear);
    }, []);

    // Prepare data for chart
    const years = Object.keys(grantsByYear).sort((a, b) => a - b);
    const counts = years.map(year => grantsByYear[year]);

    const data = {
        labels: years,
        datasets: [{
            label: 'Number of Grants',
            data: counts,
            fill: false,
            borderColor: 'rgba(54, 162, 235, 0.6)',
            tension: 0.1
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
                    text: 'Year'
                }
            }
        }
    };

    return (
        <div>
            <Line data={data} options={options} />
        </div>
    );
};

export default LineChartExpChart;
