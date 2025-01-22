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
