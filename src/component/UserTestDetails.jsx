import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserTestDetails.css';

const UserTestDetails = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const fetchUserData = async () => {
        try {
            const userDetails = JSON.parse(localStorage.getItem('details'));

            if (!userDetails || !userDetails._id) {
                console.error('User ID is undefined or not found in localStorage');
                navigate('/');
                return;
            }

            const response = await axios.get(`https://car-licence-mern-project-backend.vercel.app/api/user/testdetails/${userDetails._id}`);
            const updatedUserData = response.data;
            console.log('Fetched Updated User Data:', updatedUserData);

            setUser(updatedUserData);

            // Check if the user has already attempted the test
            if (updatedUserData.last_attempted !== null && updatedUserData.testGiven) {
                console.log('User has already attempted the test.');
            } else {
                console.log('User has not attempted the test yet.');
            }
        } catch (error) {
            console.error('Error fetching user data:', error.message);
        }
    };

    const handleStartTest = async () => {
        try {
            const userDetails = JSON.parse(localStorage.getItem('details'));

            if (!userDetails || !userDetails._id) {
                console.error('User ID is undefined or not found in localStorage');
                navigate('/');
                return;
            }

            // Fetch updated user data before proceeding
            await fetchUserData();

            // Check if the user has already attempted the test
            if (user.testGiven) {
                console.log('User has already attempted the test. Cannot start again.');
            } else {
                // Proceed to start the test
                const updateResponse = await axios.put(`https://car-licence-mern-project-backend.vercel.app/api/user/testdetails/${userDetails._id}`);
                console.log('Start Test Response:', updateResponse);

                // Update the local state to reflect the new user data
                setUser((prevUser) => ({ ...prevUser, testGiven: true }));
            }
        } catch (error) {
            console.error('Error updating last attempted timestamp:', error.message);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [navigate]);

    return (
        <div className="user-test-details">
            <div className="user-test">
                <p>All the details related to the test</p>
                <Link to="./test-details">
                    <button className='btn'>Read Here</button>
                </Link>
            </div>
            <div className="user-test">
                <p>If you already read the test-details then you can start the test</p>
                <button className='btn' onClick={handleStartTest} disabled={user.testGiven}>
                    Start Test
                </button>
            </div>
            <div className="user-test ">
                <p>You can see your result here</p>
                <Link to="./user-licence">
                    <button className='btn' disabled={!user.testGiven}>Click Here</button>
                </Link>
            </div>
        </div>
    );
};

export default UserTestDetails;
