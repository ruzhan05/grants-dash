import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';

const GDoughnutChart = ({ width = 'auto', height = '40%' }) => {
    const [monthlyCounts, setMonthlyCounts] = useState(Array(12).fill(0));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3002/api/gggrants');
                const data = response.data;

                const counts = data.reduce((acc, grant) => {
                    const dateParts = grant.PostedDate.split('/');
                    const year = parseInt(dateParts[2], 10);
                    const month = parseInt(dateParts[0], 10);

                    if (year === 2024 && !isNaN(month)) {
                        acc[month - 1]++;
                    }
                    return acc;
                }, Array(12).fill(0));

                setMonthlyCounts(counts);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const data = {
        labels: [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July'],
        datasets: [
            {
                label: 'Number of Grants',
                data: monthlyCounts,
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(0,0,139,1)',
                    'rgba(210,105,30,1)',
                    'rgba(127,255,212,1)',
                    'rgba(255,20,147, 1)',




                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {};

    return (
        <div style={{ alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width, height, margin: 'auto', textAlign: 'center' }}>
                <h1>Grants Released in 2024 by Month</h1>
                <Doughnut data={data} options={options} />

            </div>
        </div>
    );
};

export default GDoughnutChart;
