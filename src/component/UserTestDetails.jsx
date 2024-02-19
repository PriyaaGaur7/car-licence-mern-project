import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserTestDetails.css';

const UserTestDetails = () => {
    const [user, setUser] = useState({});
    const [hasAttemptedTest, setHasAttemptedTest] = useState(false);
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDetails = JSON.parse(localStorage.getItem('details'));

                if (!userDetails || !userDetails._id) {
                    console.error('User ID is undefined or not found in localStorage');
                    navigate('/');
                    return;
                } else {
                    setUser(userDetails);
                    if (userDetails.testGiven) {
                        setHasAttemptedTest(true);
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error.message);
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleStartTest = async () => {
        try {
            const userDetails = JSON.parse(localStorage.getItem('details'));

            // Check if the user has already attempted the test
            if (userDetails.testGiven) {
                console.log('User has already attempted the test.');
                return;
            }

            const response = await axios.put(`https://car-licence-mern-project-backend.vercel.app/api/user/testdetails/${userDetails._id}`);
            console.log('Start Test Response:', response);

            // Update user details
            const updatedUserData = { ...userDetails, last_attempted: new Date(), testGiven: true };
            setUser(updatedUserData);
            localStorage.setItem('details', JSON.stringify(updatedUserData));

            setHasAttemptedTest(true);
        } catch (error) {
            console.error('Error updating last attempted timestamp:', error.message);
        }
    };

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
                <button className='btn' onClick={handleStartTest} disabled={hasAttemptedTest}>
                    Start Test
                </button>
            </div>
            <div className="user-test ">
                <p>You can see your result here</p>
                <Link to="./user-licence">
                    <button className='btn' disabled={!hasAttemptedTest}>Click Here</button>
                </Link>
            </div>
        </div>
    );
};

export default UserTestDetails;
