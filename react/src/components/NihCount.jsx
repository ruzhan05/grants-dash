// GrantsCount.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GrantsCount = () => {
    const [totalGrants, setTotalGrants] = useState(0);

    useEffect(() => {
        const fetchGrantsCount = async () => {
            try {
                const response = await axios.get('http://localhost:3002/api/grants/count');
                setTotalGrants(response.data.count);
            } catch (error) {
                console.error('Error fetching grants count:', error);
            }
        };

        fetchGrantsCount();
    }, []);

    return (
        <div>
            <h1> {totalGrants}</h1>
        </div>
    );
};

export default GrantsCount;
