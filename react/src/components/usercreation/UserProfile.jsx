import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode"

const UserProfile = () => {
    const token = localStorage.getItem('token');
    const [currUserName, setcurrUserName] = useState('');
    const [currUserMail, setcurrUserMail] = useState('');
    const [currUserGrants, setcurrUserGrants] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    setcurrUserName(decodedToken.name);
                    setcurrUserMail(decodedToken.email);
                    setcurrUserGrants(decodedToken.starredGrants || []);
                } catch (error) {
                    console.error('Error fetching user data', error);
                }
            }
        };

        fetchUserData();
    }, [token]);

    useEffect(() => {
        const fetchStarredGrantsDetails = async () => {
            const grantDetailsPromises = currUserGrants.map(async (grantId) => {
                try {
                    // Assuming response contains grant details
                } catch (error) {
                    console.error(`Error fetching grant details for ${grantId}`, error);
                    return null; // Handle error or return default value
                }
            });

            const grantDetails = await Promise.all(grantDetailsPromises);
            // Assuming grantDetails is an array of grant objects with 'title' field
            // Update state or handle data as needed
        };

        if (currUserGrants.length > 0) {
            fetchStarredGrantsDetails();
        }
    }, [currUserGrants]);

    return (
        <div>
            <h1>User Profile</h1>
            <p><strong>Name:</strong> {currUserName}</p>
            <p><strong>Email:</strong> {currUserMail}</p>
            <h2>Starred Grants</h2>
            <ul>
                {currUserGrants.length > 0 ? (
                    currUserGrants.map((grantId) => (
                        <li key={grantId}>{grantId}</li> // Displaying grant ID temporarily
                    ))
                ) : (
                    <li>No starred grants found.</li>
                )}
            </ul>
        </div>
    );
};

export default UserProfile;
