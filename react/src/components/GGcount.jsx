// GrantsCount.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GGGrantsCount = () => {
    const [totalGGGrants, setTotalGGGrants] = useState(0);

    useEffect(() => {
        const fetchGGGrantsCount = async () => {
            try {
                const response = await axios.get('http://localhost:3002/api/gggrants/count');
                setTotalGGGrants(response.data.count);
            } catch (error) {
                console.error('Error fetching grants count:', error);
            }
        };

        fetchGGGrantsCount();
    }, []);

    return (
        <div>
            <h1> {totalGGGrants}</h1>
        </div>
    );
};

export default GGGrantsCount;
