import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import sampleData from '../data/grantgovDummy.json';

const GLineChart = ({ width = 'auto', height = '40%' }) => {
    const [yearlyCounts, setYearlyCounts] = useState({});

    useEffect(() => {
        const countGrantsByYear = () => {
            const counts = sampleData.reduce((acc, grant) => {
                const dateParts = grant.ClosingDate.split('/');
                const year = parseInt(dateParts[2], 10);
                if (year === 2024 || year === 2025 || year === 2026 || year === 2027 || year === 2028) {
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

    const years = ['2024', '2025', '2026', '2027', '2028'];
    const data = {
        labels: years,
        datasets: [
            {
                label: 'Number of Grants',
                data: years.map(year => yearlyCounts[year] || 0),
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
                <h1>Grants Expiring by Year</h1>
                <Line data={data} options={options} />
            </div>
        </div>
    );
};

export default GLineChart;
